<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function session(Request $request)
    {
        return response()->json([
            'session_id' => session()->getId(),
            'auth_user' => auth()->user(),
            'chirper_session' => request()->cookie('chirper_session'),
            'session_data' => session()->all(),
        ]);
    }

    public function csrf(Request $request)
    {
        return response()->json([
            'csrf_token' => csrf_token(),
            'xsrf_token_cookie' => $request->cookie('XSRF-TOKEN'),
            'session_id' => session()->getId(),
        ]);
    }
}
