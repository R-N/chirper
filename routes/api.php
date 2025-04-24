<?php

use App\Http\Controllers\LanguageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

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
Route::get('/lang/{locale}', [LanguageController::class, 'get'])->name('lang.get');
Route::get('/lang', [LanguageController::class, 'index'])->name('lang.index');


require __DIR__.'/auth.php';
