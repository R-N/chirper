<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BackupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiTokenController;

Route::get('/', function () {
    return Inertia::render('guest/pages/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('general/pages/Dashboard');
    })->name('dashboard');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/user/api-tokens', [ApiTokenController::class, 'index'])->name('api-tokens.index');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth:sanctum', 'verified']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chirps2', [ChirpController::class, 'index2'])->name('chirps.index2');
});

Route::middleware('auth:sanctum')->prefix('system/backup')->group(function () {
    Route::get('/', [BackupController::class, 'index'])->name('system.backup.index');
    Route::post('/', [BackupController::class, 'store'])->name('system.backup.store');
    Route::put('/', [BackupController::class, 'upload'])->name('system.backup.upload');
    Route::get('/{file}', [BackupController::class, 'download'])->name('system.backup.download');
    Route::patch('/{file}', [BackupController::class, 'rename'])->name('system.backup.rename');
    Route::delete('/{file}', [BackupController::class, 'destroy'])->name('system.backup.destroy');
    Route::put('/{file}', [BackupController::class, 'restore'])->name('system.backup.restore');
});

require __DIR__.'/auth.php';
