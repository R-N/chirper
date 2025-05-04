<?php

namespace App\Models\Traits;
use App\Utils\ArrayUtil;

trait Validable
{
    public static function validateRequest($request=null){
        return ($request ?? request())->validate(
            ArrayUtil::filterArray(
                self::rules(), 
                self::FILLABLE
            )
        );
    }
}
