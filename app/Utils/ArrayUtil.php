<?php

namespace App\Utils;


class ArrayUtil
{
  public static function arrayMapRecursive(callable $callback, array $array): array
  {
      $result = [];
  
      foreach ($array as $key => $value) {
          if (is_array($value)) {
              $result[$key] = self::arrayMapRecursive($callback, $value);
          } else {
              $result[$key] = $callback($value);
          }
      }
  
      return $result;
  }
  public static function filterArray(array $array, array $keys): array
  {
      return array_intersect_key($array, array_flip($keys));
  }
}
