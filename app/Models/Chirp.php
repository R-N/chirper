<?php

// created with php artisan make:model -mrc Chirp

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Traits\HasRelationshipEntities;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Filters\GlobalSearch;
use App\Filters\NotNullFilter;
use App\Sorts\RelationshipField;


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

    public static function query2(){
        
        $perPage = request()->query('per_page', 10);
        // Chirps has belongsTo relationship with User as user
        $chirps = QueryBuilder::for(Chirp::class)
            ->withEntities()
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalSearch(['message', 'user.name', 'created_at'])),
                AllowedFilter::partial('user.name'),
                AllowedFilter::partial('message'),
                AllowedFilter::partial('created_at'),
            ])
            ->allowedSorts([
                'user.name', 'created_at'
            ])
            ->defaultSort('-created_at,name')
            ->paginate($perPage)
            ->withQueryString();
        return $chirps;
    }
}
