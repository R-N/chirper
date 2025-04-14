<?php

namespace App\Actions\Auth;

use Laravel\Fortify\Contracts\LoginResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CustomLoginResponse implements LoginResponse
{
    public function toResponse($request): JsonResponse|RedirectResponse
    {
      if (!$request->wantsJson()) {
          return redirect()->intended(route('dashboard', absolute: false));
      }

      $user = Auth::user();

      $token = $user->createToken('auth_token', ['*'])->plainTextToken;

      return response()->json([
          'auth_token' => $token,
          'user' => $user,
          'message' => 'Login successful',
          'redirect' => route('dashboard', absolute: false)
      ], 200);
    }
}
