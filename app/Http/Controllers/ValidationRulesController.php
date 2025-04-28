<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Backup;
use App\Models\User;

class ValidationRulesController extends Controller
{
    const ITEMS = ['chirp', 'backup', 'user'];

    function getRules($item){
        return match($item){
            'chirp' => Chirp::rules(),
            'backup' => Backup::rules(),
            'user' => User::rules(),
        };
    }

    public function index($request)
    {
        return response()->json(array_map(function($item){
            return $this->getRules($item);
        }, self::ITEMS));
    }

    public function show($request, $item)
    {
        $request->validate([
            "item" => "in:" . implode(',', self::ITEMS)
        ]);
        return response()->json([
            'data' => $this->getRules($item)
        ]);
    }
}
