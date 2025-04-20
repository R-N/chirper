<?php

namespace App\Utils;

class QueryUtil
{
  public static function paginateQuery($query, $default = null)
  {
    $perPage = request()->query('per_page', $default);
    if ($perPage) {
        return $query->paginate($perPage)->withQueryString();
    }
    return $query->get();
  }
}
