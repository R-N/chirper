<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\General\GeneralController;
use App\Http\Controllers\Guest\GuestController;


Route::get('/', [GuestController::class, 'index'])->name('welcome');

Route::prefix('verification')->as('verification.')->group(function(){
    Route::get('verify-email', EmailVerificationPromptController::class)->name('notice');
});

Route::middleware('guest')->group(function () {
  Route::prefix('login')->group(function(){
      Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');
  });
  Route::prefix('forgot-password')->as('password.')->group(function(){
    Route::get('/', [PasswordResetLinkController::class, 'create'])->name('request');
  });
  Route::prefix('register')->group(function(){
      Route::get('/', [RegisteredUserController::class, 'create'])->name('register');
  });
});

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');

  Route::prefix('confirm-password')->as('password.')->group(function(){
    Route::get('/', [ConfirmablePasswordController::class, 'show'])
        ->name('confirm');
  });
});

require __DIR__.'/hybrid.php';
