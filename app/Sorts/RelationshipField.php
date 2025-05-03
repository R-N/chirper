<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class RelationshipField implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): Builder
    {
        // Split the property by '.' to handle nested relations
        $parts = explode('->', $property);

        // Initialize direction
        $direction = $descending ? 'desc' : 'asc';

        // Start by setting the initial relation and field
        $relation = array_shift($parts);  // Take the first part as relation
        $field = implode('.', $parts);   // Join the remaining parts as the nested field

        // Apply the sorting via a loop
        while ($parts) {
            $query = $this->applySort($query, $relation, $field, $direction);

            // Update the relation and field
            $relation = array_shift($parts);
            $field = implode('.', $parts);
        }

        // Final sorting on the last field
        return $this->applySort($query, $relation, $field, $direction);
    }

    /**
     * Apply sorting for a given relation and field.
     */
    private function applySort(Builder $query, string $relation, string $field, string $direction): Builder
    {
        // Ensure the relation exists
        if (method_exists($query->getModel(), $relation)) {
            $relatedTable = $relation.'s'; // Assuming plural table name (customize as needed)

            // Join related table if necessary
            $query = $query->join($relatedTable, "{$query->getModel()->getTable()}.{$relation}_id", '=', "{$relatedTable}.id");

            // Sort by the field
            $query = $query->orderBy("{$relatedTable}.{$field}", $direction);
        }

        return $query;
    }
}
