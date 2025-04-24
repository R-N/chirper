<?php

namespace App\Actions\Auth;

use Laravel\Fortify\Contracts\LoginResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Utils\ResponseUtil;

class CustomLoginResponse implements LoginResponse
{
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        $user = Auth::user()->loadEntities();

        $token = $user->createToken('auth_token', ['*'])->plainTextToken;

        return ResponseUtil::jsonRedirectResponse([
            'auth_token' => $token,
            'message' => __('auth.login_success'),
            'user' => $user,
        ], route('dashboard'));
    }
}
