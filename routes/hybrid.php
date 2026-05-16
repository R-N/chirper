<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Chirps\ChirpController;
use App\Http\Controllers\System\ActivityController;
use App\Http\Controllers\System\BackupController;
use App\Http\Controllers\System\LanguageController;
use App\Http\Controllers\System\RoleController;
use App\Http\Controllers\System\SettingsController;
use App\Http\Controllers\System\UserController;
use App\Http\Controllers\User\ApiTokenController;
use App\Http\Controllers\User\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('verification')->as('verification.')->group(function () {
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verify');
});

Route::middleware(['throttle:6,1'])->group(function () {
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->name('verification.send');
});

Route::middleware('guest')->group(function () {
    Route::prefix('register')->group(function () {
        Route::post('/', [RegisteredUserController::class, 'store'])->name('register');
    });
    Route::prefix('login')->group(function () {
        Route::post('/', [AuthenticatedSessionController::class, 'store'])->name('login');
    });
    Route::prefix('forgot-password')->as('password.')->group(function () {
        Route::post('/', [PasswordResetLinkController::class, 'store'])->name('email');
    });
    Route::prefix('reset-password')->as('password.')->group(function () {
        Route::get('/{token}', [NewPasswordController::class, 'create'])->name('reset');
        Route::post('/', [NewPasswordController::class, 'store'])->name('store');
    });
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
])->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    Route::prefix('confirm-password')->as('password.')->group(function () {
        Route::post('/', [ConfirmablePasswordController::class, 'store'])->name('confirm');
    });
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::prefix('profile')->as('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('user')->as('profile.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'show'])->name('show');
        Route::put('/locale', [LanguageController::class, 'setLocale'])->name('locale');
    });
    Route::get('/user/api-tokens', [ApiTokenController::class, 'index'])->name('api-tokens.index');

    Route::prefix('chirps')->as('chirps.')->group(function () {
        Route::get('/', [ChirpController::class, 'index'])->name('index');
        Route::post('/', [ChirpController::class, 'store'])->name('store');
        Route::match(['put', 'patch'], '/{chirp}', [ChirpController::class, 'update'])->name('update');
        Route::delete('/{chirp}', [ChirpController::class, 'destroy'])->name('destroy');
        Route::get('/export', [ChirpController::class, 'export'])->name('export');
        Route::post('/bulk/destroy', [ChirpController::class, 'bulkDestroy'])->name('bulk.destroy');
    });
    Route::get('/chirps2', [ChirpController::class, 'index2'])->name('chirps.index2');

    Route::prefix('system/backups')->as('system.backups.')->group(function () {
        Route::get('/', [BackupController::class, 'index'])->name('index');
        Route::post('/', [BackupController::class, 'store'])->name('store');
        Route::put('/', [BackupController::class, 'upload'])->name('upload');
        Route::get('/{backup}', [BackupController::class, 'download'])->name('download');
        Route::put('/{backup}', [BackupController::class, 'restore'])->name('restore');
        Route::patch('/{backup}', [BackupController::class, 'rename'])->name('rename');
        Route::delete('/{backup}', [BackupController::class, 'destroy'])->name('destroy');
        Route::get('/export', [BackupController::class, 'export'])->name('export');
    });

    Route::prefix('system/users')->as('system.users.')->middleware(['auth', 'permission:user.view'])->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
        Route::get('/export', [UserController::class, 'export'])->name('export');
    });
    Route::prefix('system/users')->as('system.users.')->middleware(['auth'])->group(function () {
        Route::post('/', [UserController::class, 'store'])->middleware('permission:user.create')->name('store');
        Route::match(['put', 'patch'], '/{user}', [UserController::class, 'update'])->middleware('permission:user.edit')->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->middleware('permission:user.delete')->name('destroy');
        Route::delete('/{user}/password', [UserController::class, 'clearPassword'])->middleware('permission:user.clear-password')->name('clear-password');
        Route::put('/{user}/verified', [UserController::class, 'setVerified'])->middleware('permission:user.set-verified')->name('set-verified');
        Route::put('/{user}/enabled', [UserController::class, 'setEnabled'])->middleware('permission:user.set-enabled')->name('set-enabled');
        Route::put('/{user}/roles', [UserController::class, 'setRoles'])->middleware('permission:user.edit')->name('set-roles');
        Route::put('/{user}/permissions', [UserController::class, 'setPermissions'])->middleware('permission:user.edit')->name('set-permissions');
    });

    Route::prefix('system/roles')->as('system.roles.')->middleware(['auth', 'permission:role.view'])->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/export', [RoleController::class, 'export'])->name('export');
    });
    Route::prefix('system/roles')->as('system.roles.')->middleware(['auth'])->group(function () {
        Route::post('/', [RoleController::class, 'store'])->middleware('permission:role.create')->name('store');
        Route::match(['put', 'patch'], '/{role}', [RoleController::class, 'update'])->middleware('permission:role.edit')->name('update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->middleware('permission:role.delete')->name('destroy');
        Route::put('/{role}/permissions', [RoleController::class, 'setPermissions'])->middleware('permission:role.edit')->name('set-permissions');
    });

    Route::prefix('system/activity')->as('system.activity.')->group(function () {
        Route::get('/', [ActivityController::class, 'index'])->name('index');
        Route::get('/{activity}', [ActivityController::class, 'show'])->name('show');
    });

    Route::prefix('system/settings')->as('system.settings.')->group(function () {
        Route::post('/', [SettingsController::class, 'store'])->name('store');
        Route::get('/', [SettingsController::class, 'index'])->name('index');
        Route::get('/{setting}', [SettingsController::class, 'show'])->name('show');
        Route::match(['put', 'patch'], '/{setting}', [SettingsController::class, 'update'])->name('update');
        Route::delete('/{setting}', [SettingsController::class, 'destroy'])->name('destroy');
    });
});
