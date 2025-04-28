<?php

namespace App\Utils;

use App\Utils\ArrayUtil;

class ValidationUtil
{
  public static function mergeRules($baseRules, $newRules, $union=true)
  {
    $mergedRules = $newRules;
  
    foreach ($baseRules as $key => $baseRule) {
      if (array_key_exists($key, $newRules)) {
        $mergedRules[$key] = $newRules[$key] . '|' . $baseRule;
      } else if ($union) {
        $mergedRules[$key] = $baseRule;
      }
    }
  
    return $mergedRules;
  }
  public static function duplicateRules(array $rules)
  {
    $newRules = $rules;

    foreach ($rules as $key => $value) {
      $newKey = str_replace('.', '_', $key);

      if (!array_key_exists($newKey, $newRules)) {
        $newRules[$newKey] = $value;
      }
    }

    return $newRules;
  }
  public static function filterRules($rules, $toRemove=[
    "required", "confirmed", "exists", "unique"
  ], $inclusive=false)
  {
      $filteredRules = [];
  
      foreach ($rules as $field => $rule) {
          $parts = is_array($rule) ? $rule : explode('|', $rule);
  
          $parts = array_filter($parts, function ($part) use ($toRemove, $inclusive) {
              foreach ($toRemove as $remove) {
                  if (str_starts_with($part, $remove)) {
                      return $inclusive;
                  }
              }
              return !$inclusive;
          });
  
          $filteredRules[$field] = is_array($rule) ? array_values($parts) : implode('|', $parts);
      }
  
      return $filteredRules;
  }

  public static function filterInRules($rules, $toRemove=[
    "string", "numeric", "integer", "boolean", "max"
  ])
  {
    return self::filterRules($rules, $toRemove, true);
  }
  
  public static function prefixFilterRules($rules)
  {
      $newRules = [];

      foreach ($rules as $key => $rule) {
          $newKey = "filter[$key]";
          $newRules[$newKey] = $rule;
      }

      return $newRules;
  }
  
  public static function prefixItemRules($rules, $item)
  {
      $newRules = [];

      foreach ($rules as $key => $rule) {
          $newKey = "$item.$key";
          $newRules[$newKey] = $rule;
      }

      return $newRules;
  }

  public static function buildQuerySort($item, $fields){
    $fields = array_merge($fields, array_map(function($field) use ($item){
      return "$item.$field";
    }, $fields));
    $fields = array_merge($fields, array_map(function($field) use ($item){
      return "-$field";
    }, $fields));
    return "in:" . implode(',', $fields);
  }

  public static function buildQueryRules($item, $rules, $fields){
    $filters = self::prefixFilterRules(
      self::prefixItemRules(
        self::duplicateRules(
          self::filterInRules(
            ArrayUtil::filterArray(
              $rules, $fields
            )
          )
        ), $item
      )
    );
    return self::mergeRules($filters, [
      "search" => "string|max:255",
      "sort" => self::buildQuerySort($item, $fields)
    ], true);
  }
}

