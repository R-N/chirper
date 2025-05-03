<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\System\DebugController;
use App\Http\Controllers\System\LanguageController;
use App\Http\Controllers\System\SettingsController;
use App\Http\Controllers\System\UserController;
use App\Http\Controllers\System\ValidationRulesController;
use App\Http\Controllers\User\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::as('api.')->group(function () {
    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
    ])->group(function () {

        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::prefix('system/settings')->as('system.settings.')->group(function () {
            Route::get('/types', [SettingsController::class, 'fetchTypes'])->name('fetch-types');
        });

        Route::prefix('system/users')->as('system.users.')->middleware(['auth'])->group(function () {
            Route::get('/roles', [UserController::class, 'getAvailableRoles'])->name('get-available-roles');
            Route::get('/permissions', [UserController::class, 'getAvailablePermissions'])->name('get-available-permissions');
        });

        Route::get('refresh-token', [AuthenticatedSessionController::class, 'refreshToken'])->name('token.refresh');

        Route::prefix('notifications')->as('notifications.')->middleware('auth')->group(function () {
            Route::get('/', [NotificationController::class, 'index'])->name('index');
            Route::delete('/{id}', [NotificationController::class, 'destroy'])->name('destroy');
            Route::patch('/{id}', [NotificationController::class, 'markAsRead'])->name('read');
            Route::post('/mark-as-read', [NotificationController::class, 'bulkMarkAsRead'])->name('bulk.read');
            Route::post('/destroy', [NotificationController::class, 'bulkDestroy'])->name('bulk.destroy');
        });
    });

    Route::prefix('lang')->as('lang.')->group(function () {
        Route::get('/{locale}', [LanguageController::class, 'get'])->name('get');
        Route::get('/', [LanguageController::class, 'index'])->name('index');
    });

    Route::prefix('validation')->as('validation.')->group(function () {
        Route::get('/rules', [ValidationRulesController::class, 'index']);
        Route::get('/rules/{item}', [ValidationRulesController::class, 'show']);
    });

    if (config('app.debug')) {
        Route::prefix('debug')->as('debug.')->group(function () {
            Route::get('/session', [DebugController::class, 'session']);
            Route::get('/csrf', [DebugController::class, 'csrf']);
        });
    }

    require __DIR__.'/hybrid.php';

});
