<?php

namespace App\Models\Traits;
use App\Utils\ArrayUtil;
use App\Utils\ValidationUtil;

trait Validable
{
    public static function validateRequest($request=null, $update=false){
        $rules = ArrayUtil::filterArray(
            self::rules(), 
            self::FILLABLE
        );
        if ($update){
            $rules = ValidationUtil::filterRules($rules, ['required']);
        }
        return ($request ?? request())->validate($rules);
    }
}
