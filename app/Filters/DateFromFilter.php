<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class DateFromFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $field): Builder
    {
        return $query->where('created_at', '>=', $value);
    }
}
