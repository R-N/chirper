<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BackupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiTokenController;
use App\Models\Backup;

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

Route::middleware('auth:sanctum', 'verified')->group(function () {
    Route::resource('chirps', ChirpController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->parameters(['' => 'chirp']);
    Route::get('/chirps2', [ChirpController::class, 'index2'])->name('chirps.index2');
    Route::get('/chirps/export', [ChirpController::class, 'export'])->name('chirps.export');
    // Route::delete('/chirps/bulk', [ChirpController::class, 'bulkDestroy'])->name('chirps.bulk.destroy');
    Route::post('/chirps/bulk/destroy', [ChirpController::class, 'bulkDestroy'])->name('chirps.bulk.destroy');
});

Route::bind('backup', function ($value) {
    return new Backup($value);
});
Route::middleware('auth:sanctum')->prefix('system/backups')->group(function () {
    Route::get('/', [BackupController::class, 'index'])->name('system.backups.index');
    Route::post('/', [BackupController::class, 'store'])->name('system.backups.store');
    Route::put('/', [BackupController::class, 'upload'])->name('system.backups.upload');
    Route::get('/{backup}', [BackupController::class, 'download'])->name('system.backups.download');
    Route::patch('/{backup}', [BackupController::class, 'rename'])->name('system.backups.rename');
    Route::delete('/{backup}', [BackupController::class, 'destroy'])->name('system.backups.destroy');
    Route::put('/{backup}', [BackupController::class, 'restore'])->name('system.backups.restore');
    Route::get('/export', [BackupController::class, 'export'])->name('system.backups.export');
});

Route::prefix('system/users')->as('system.users.')->middleware(['auth'])->group(function () {
    Route::resource('/', UserController::class)
        ->parameters(['' => 'user'])
        ->only(['index', 'store', 'update', 'destroy']);
    Route::delete('/{user}/password', [UserController::class, 'clearPassword'])->name('clear-password');
    Route::put('/{user}/verified', [UserController::class, 'setVerified'])->name('set-verified');
    Route::put('/{user}/enabled', [UserController::class, 'setEnabled'])->name('set-enabled');
    Route::put('/{user}/roles', [UserController::class, 'setRoles'])->name('set-roles');
    Route::put('/{user}/permissions', [UserController::class, 'setPermissions'])->name('set-permissions');
    Route::get('/roles', [UserController::class, 'getAvailableRoles'])->name('get-available-roles');
    Route::get('/permissions', [UserController::class, 'getAvailablePermissions'])->name('get-available-permissions');
    Route::get('/export', [UserController::class, 'export'])->name('export');
});

require __DIR__.'/auth.php';
