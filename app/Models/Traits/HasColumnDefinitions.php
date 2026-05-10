<?php

namespace App\Models\Traits;

use App\Filters\GlobalSearch;
use App\Sorts\RelationshipField;
use App\Utils\ExportUtil;
use App\Utils\QueryUtil;
use App\Utils\ValidationUtil;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

trait HasColumnDefinitions
{
    public static function columns()
    {
        return [];
    }

    public static function rules()
    {
        return ValidationUtil::duplicateRules(
            collect(static::columns())
                ->filter(fn($meta) => isset($meta['rules']))
                ->mapWithKeys(fn($meta, $key) => [$key => $meta['rules']])
                ->all()
        );
    }

    public static function defaultSort()
    {
        return [];
    }

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
                    'custom'  => $filterFields[] = AllowedFilter::custom(
                        $key,
                        isset($meta['filter_class'])
                            ? new $meta['filter_class']($meta['filter_column'] ?? $key)
                            : null
                    ),
                    default   => null
                };
            }
            if (isset($meta['search']) && $meta['search']) {
                $searchable[] = $meta['search'] === true
                    ? str_replace('.', '->', $key)
                    : $meta['search'];
            }
        }

        if ($searchable) {
            array_unshift($filterFields, AllowedFilter::custom('search', new GlobalSearch($searchable)));
        }

        $sortFields = [];
        foreach ($columns as $key => $meta) {
            if (!isset($meta['sort']) || !$meta['sort']) continue;
            $sortColumn = $meta['sort_column'] ?? $key;
            if (str_starts_with((string) $meta['sort'], 'custom:')) {
                $sortFields[] = AllowedSort::custom($key, new RelationshipField(explode('.', $sortColumn)));
            } else {
                $sortFields[] = $sortColumn;
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
            ->allowedFilters($filterFields)
            ->allowedSorts($sortFields);

        if (in_array(HasRelationshipEntities::class, class_uses(static::class))) {
            $query = $query->withEntities();
        }
        if (static::defaultSort()) {
            $query = $query->defaultSort(static::defaultSort());
        }

        return $raw ? $query : QueryUtil::paginateQuery($query);
    }

    public static function collection($filter = null)
    {
        $items = static::query2(true)
            ->get()
            ->map(fn ($item) => $item->toExportArray());

        return ExportUtil::filter($items, $filter);
    }

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
