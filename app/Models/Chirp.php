<?php

// created with php artisan make:model -mrc Chirp

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Traits\HasRelationshipEntities;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use App\Filters\GlobalSearch;
use App\Filters\NotNullFilter;
use App\Sorts\RelationshipField;
use App\Utils\QueryUtil;
use Illuminate\Support\Facades\Log;
use App\Utils\ExportUtil;

class Chirp extends Model
{
    use HasRelationshipEntities;

    protected static array $relationshipEntities = ["user:id,name"];
    # this determines which fields may be mass set
    protected $fillable = [
        'message',
    ];
 
    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function query2($raw=false){
        // Chirps has belongsTo relationship with User as user
        $items = QueryBuilder::for(Chirp::class)
            ->withEntities()
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalSearch([
                    'message', 'user->name', 'chirps.created_at'
                ])),
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
                AllowedSort::custom('user.name', new RelationshipField(['user->name']))
            ]);
        if ($raw)
            return $items;
        $items = QueryUtil::paginateQuery($items);
        return $items;
    }

    public static function collection($filter=null){
        $items = self::query2(true)
            ->get()
            ->map(fn($item) => [
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
}
