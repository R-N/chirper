<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class NotNullFilter implements Filter
{
    protected $column;

    public function __construct(string $column)
    {
        $this->column = $column;
    }

    /**
     * Apply the filter to the query.
     *
     * @param  mixed  $value
     */
    public function __invoke(Builder $query, $value, string $field): Builder
    {
        if ($value === 'null') {
            return $query->whereNull($this->column);
        } elseif ($value === 'not_null') {
            return $query->whereNotNull($this->column);
        }

        return $query;
    }
}
