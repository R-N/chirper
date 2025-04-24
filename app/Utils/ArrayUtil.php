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
}
