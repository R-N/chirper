<?php

namespace App\Utils;

class QueryUtil
{
  public static function paginateQuery($query, $default=null)
  {
    $perPage = request()->query('per_page', $default);
    if ($perPage) {
        return $query->paginate($perPage)->withQueryString();
    }
    return ['data' => $query->get()];
  }
  public static function maybePaginateQuery($query, $paginate=true, $default=null)
  {
    if ($paginate){
      return QueryUtil::paginateQuery($query, $default);
    }
    return ['data' => $query->get()];
  }
}
