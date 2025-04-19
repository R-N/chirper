<?php

// created with php artisan make:model -mrc Chirp

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Traits\HasRelationshipEntities;


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
}
