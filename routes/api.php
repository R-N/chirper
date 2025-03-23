<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/session-debug', function (Request $request) {
    return response()->json([
        'session_id' => session()->getId(),
        'auth_user' => auth()->user(),
        'chirper_session' => request()->cookie('chirper_session'),
        'session_data' => session()->all(),
    ]);
});

Route::get('/csrf-debug', function (Request $request) {
    return response()->json([
        'csrf_token' => csrf_token(),
        'xsrf_token_cookie' => $request->cookie('XSRF-TOKEN'),
        'session_id' => session()->getId(),
    ]);
});

require __DIR__.'/auth.php';
