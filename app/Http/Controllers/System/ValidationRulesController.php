<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Backup;
use App\Models\Chirp;
use App\Models\User;

class ValidationRulesController extends Controller
{
    const ITEMS = ['chirp', 'backup', 'user'];

    public function getRules($item)
    {
        return match ($item) {
            'chirp' => Chirp::rules(),
            'backup' => Backup::rules(),
            'user' => User::rules(),
        };
    }

    public function index()
    {
        return response()->json(array_map(function ($item) {
            return $this->getRules($item);
        }, self::ITEMS));
    }

    public function show(string $item)
    {
        abort_unless(in_array($item, self::ITEMS, true), 404);

        return response()->json([
            'data' => $this->getRules($item),
        ]);
    }
}
