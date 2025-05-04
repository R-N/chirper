<?php

// created with php artisan make:model -mrc Chirp

namespace App\Models;

use App\Events\ChirpCreated;
use App\Filters\GlobalSearch;
use App\Models\Traits\HasRelationshipEntities;
use App\Sorts\RelationshipField;
use App\Utils\ExportUtil;
use App\Utils\QueryUtil;
use App\Utils\ValidationUtil;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Traits\Validable;

class Chirp extends Model
{
    public const TABLE = 'chirps';

    protected $table = self::TABLE;

    use HasRelationshipEntities;

    protected static array $relationshipEntities = ['user:id,name'];

    use Validable;
    public const FILLABLE = ['message'];
    // this determines which fields may be mass set
    protected $fillable = self::FILLABLE;

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function query2($raw = false)
    {
        $validated = request()->validate(
            ValidationUtil::buildQueryRules('chirps', Chirp::rules(), [
                'user.name', 'message', 'created_at',
            ])
        );
        $items = QueryBuilder::for(Chirp::class)
            ->withEntities()
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalSearch([
                    'message', 'user->name', 'chirps.created_at',
                ])),
                AllowedFilter::exact('user.id'),
                AllowedFilter::partial('user.name'),
                AllowedFilter::partial('message'),
                AllowedFilter::partial('chirps.created_at'),
            ])
            ->allowedSorts([
                'chirps.created_at',
                AllowedSort::custom('user.name', new RelationshipField(['user->name'])),
            ])
            ->defaultSort([
                '-chirps.created_at',
                AllowedSort::custom('user.name', new RelationshipField(['user->name'])),
            ]);
        if ($raw) {
            return $items;
        }
        $items = QueryUtil::paginateQuery($items);

        return $items;
    }

    public static function collection($filter = null)
    {
        $items = self::query2(true)
            ->get()
            ->map(fn ($item) => [
                'ID' => $item->id,
                'Message' => $item->message,
                'Created At' => $item->created_at->toDateTimeString(),
                'Modified At' => $item->modified_at?->toDateTimeString(),
                'User ID' => $item->user?->id,
                'User Name' => $item->user?->name,
            ]);
        $items = ExportUtil::filter($items, $filter);

        return $items;
    }

    public static function rules()
    {
        $userRules = User::rules();
        $rules = [
            'message' => 'required|string|max:255',
            'created_at' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            'modified_at' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            'user.id' => 'required|integer|min:0|exists:users,id',
            'user.name' => $userRules['name'],
        ];
        $rules = ValidationUtil::duplicateRules($rules);

        return $rules;
    }
}
