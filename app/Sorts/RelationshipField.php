<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\Sorts\Sort;

class RelationshipField implements Sort
{
    public function __construct(private readonly ?array $columns = null) {}

    public function __invoke(Builder $query, bool $descending, string $property): Builder
    {
        $parts = $this->columns ?: explode('->', str_replace('.', '->', $property));
        $direction = $descending ? 'desc' : 'asc';
        $relationName = array_shift($parts);
        $field = implode('.', $parts);
        $model = $query->getModel();

        if (! $relationName || ! $field || ! method_exists($model, $relationName)) {
            return $query;
        }

        $relation = $model->{$relationName}();
        $baseTable = $model->getTable();
        $baseKey = $model->getQualifiedKeyName();

        if ($relation instanceof BelongsTo) {
            $relatedTable = $relation->getRelated()->getTable();
            $alias = "{$relationName}_sort";
            $qualifiedField = "{$alias}.{$field}";

            return $query
                ->select("{$baseTable}.*")
                ->leftJoin(
                    "{$relatedTable} as {$alias}",
                    $relation->getQualifiedForeignKeyName(),
                    '=',
                    "{$alias}.{$relation->getOwnerKeyName()}"
                )
                ->orderBy($qualifiedField, $direction);
        }

        if ($relation instanceof BelongsToMany) {
            $relatedTable = $relation->getRelated()->getTable();
            $pivotTable = $relation->getTable();

            return $query
                ->orderBy(
                    DB::table($relatedTable)
                        ->select("{$relatedTable}.{$field}")
                        ->join(
                            $pivotTable,
                            "{$relatedTable}.{$relation->getRelatedKeyName()}",
                            '=',
                            "{$pivotTable}.{$relation->getRelatedPivotKeyName()}"
                        )
                        ->whereColumn("{$pivotTable}.{$relation->getForeignPivotKeyName()}", $baseKey)
                        ->orderBy("{$relatedTable}.{$field}", $direction)
                        ->limit(1),
                    $direction
                );
        }

        if ($relation instanceof HasOneOrMany) {
            $related = $relation->getRelated();
            $relatedTable = $related->getTable();

            return $query
                ->orderBy(
                    $related->newQuery()
                        ->select($field)
                        ->whereColumn($relation->getQualifiedForeignKeyName(), $baseKey)
                        ->orderBy("{$relatedTable}.{$field}", $direction)
                        ->limit(1),
                    $direction
                );
        }

        return $query;
    }
}
