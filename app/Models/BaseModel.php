<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use App\Utils\QueryUtil;
use App\Utils\ExportUtil;
use App\Utils\ValidationUtil;
use App\Filters\GlobalSearch;
use App\Sorts\RelationshipField;
use App\Models\Traits\HasRelationshipEntities;

abstract class BaseModel extends Model
{
    protected $table;
    protected $fillable;
    protected static $hasRelationshipEntities = false;

    public function __construct($attributes=[])
    {
        parent::__construct($attributes);

        $this->table = $this->table ?? static::TABLE ?? $this->getTable();
        $this->fillable = $this->fillable ?? static::FILLABLE;
    }
    public static function booted()
    {
        static::$hasRelationshipEntities = in_array(HasRelationshipEntities::class, class_uses(static::class));
    }
    /**
     * Returns column definitions.
     */
    public static function columns()
    {
        return [];
    }

    /**
     * Auto-generates validation rules from COLUMNS.
     */
    public static function rules()
    {
        return ValidationUtil::duplicateRules(
            collect(static::columns())
                ->filter(fn($meta) => isset($meta['rules']))
                ->mapWithKeys(fn($meta, $key) => [$key => $meta['rules']])
                ->all()
        );
    }

    public static function defaultSort(){
      return [];
    }

    /**
     * Returns a Spatie query builder with filters and sorts based on COLUMNS.
     */
    public static function query2(bool $raw = false)
    {
        $columns = static::columns();

        $filterFields = [];
        $searchable = [];

        foreach ($columns as $key => $meta) {
            if (isset($meta['filter'])) {
                match ($meta['filter']) {
                    'exact'   => $filterFields[] = AllowedFilter::exact($key),
                    'partial' => $filterFields[] = AllowedFilter::partial($key),
                    // 'search'  => $searchable[] = $key,
                    default   => null
                };
            }
            if (isset($meta['search']) && $meta['search']) {
                if ($meta['search'] === true){
                    $searchable[] = str_replace('.', '->', $key);
                }else{
                    $searchable[] = $meta['search'];
                }
            }
        }

        if ($searchable) {
            array_unshift($filterFields, AllowedFilter::custom('search', new GlobalSearch($searchable)));
        }

        $sortFields = [];
        foreach ($columns as $key => $meta) {
            if (!isset($meta['sort']) || !$meta['sort']) continue;
            if (str_starts_with($meta['sort'], 'custom:')) {
                $sortFields[] = AllowedSort::custom($key, new RelationshipField(explode('.', $key)));
            } else {
                $sortFields[] = $key;
            }
        }

        request()->validate(
            ValidationUtil::buildQueryRules(
                (new static)->getTable(),
                static::rules(),
                array_keys($columns)
            )
        );

        $query = QueryBuilder::for(static::class)
            ->withEntities()
            ->allowedFilters($filterFields)
            ->allowedSorts($sortFields);
        if (static::defaultSort()){
            $query = $query->defaultSort(static::defaultSort());
        }

        return $raw ? $query : QueryUtil::paginateQuery($query);
    }

    /**
     * Exports data with mapped headers.
     */
    public static function collection($filter = null)
    {
        $items = static::query2(true)
            ->get()
            ->map(fn ($item) => $item->toExportArray());

        return ExportUtil::filter($items, $filter);
    }

    /**
     * Returns export-ready array: key = human label, value = value.
     */
    public function toExportArray()
    {
        $raw = $this->toArray();
        $out = [];

        foreach (static::columns() as $key => $meta) {
            $out[$meta['label'] ?? $key] = data_get($raw, $key);
        }

        return $out;
    }
}
