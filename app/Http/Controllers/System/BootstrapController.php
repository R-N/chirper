<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

class BootstrapController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user?->loadEntities();

        return response()->json([
            'user' => $user,
            'settings' => Setting::fetchDict(),
            'notifications' => $user?->notifications ?? [],
            'ziggy' => (new Ziggy)->toArray(),
        ]);
    }
}
