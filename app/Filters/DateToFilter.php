<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class DateToFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $field): Builder
    {
        return $query->where('created_at', '<=', $value . ' 23:59:59');
    }
}
