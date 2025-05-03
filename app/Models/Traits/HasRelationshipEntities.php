<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;

trait HasRelationshipEntities
{
    // This should be overridden by each model using the trait
    // protected static array $relationshipEntities = [];

    public function scopeWithEntities($query)
    {
        return $query->with(static::$relationshipEntities);
    }

    public function loadEntities()
    {
        return $this->load(static::$relationshipEntities);
    }

    public static function getRelationshipEntities(): array
    {
        return static::$relationshipEntities;
    }
}
