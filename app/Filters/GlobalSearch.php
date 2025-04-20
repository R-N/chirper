<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Support\Facades\Log;

class GlobalSearch implements Filter
{
    protected array $searchableFields;

    public function __construct(array $searchableFields = [])
    {
        $this->searchableFields = $searchableFields;
    }

    public function __invoke(Builder $query, $value, string $property): Builder
    {
        if (empty($this->searchableFields)) {
            $model = $query->getModel();
            $this->searchableFields = method_exists($model, 'searchableFields')
                ? $model->searchableFields()
                : $model->getFillable();
        }

        return $query->where(function ($query) use ($value) {
            foreach ($this->searchableFields as $fieldPath) {
                $parts = explode('->', $fieldPath);

                if (count($parts) === 1) {
                    // Simple column on current model
                    $query->orWhere($parts[0], 'like', "%{$value}%");
                } else {
                    // Build nested orWhereHas chain
                    $field = array_pop($parts); // The last one is the field
                    $query->orWhereHas(implode('.', $parts), function ($q) use ($field, $value) {
                        $q->where($field, 'like', "%{$value}%");
                    });
                }
            }
        });
    }
}
