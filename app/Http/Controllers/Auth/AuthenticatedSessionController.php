<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Utils\ResponseUtil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('user/auth/pages/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse|JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user()->loadEntities();

        $token = $user->createToken('auth_token', ['*'])->plainTextToken;

        return ResponseUtil::jsonRedirectResponse([
            'auth_token' => $token,
            'message' => __('auth.login_success'),
            'user' => $user,
        ], route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse|JsonResponse
    {
        $token = $request->user()->currentAccessToken();
        if ($token && ($token instanceof PersonalAccessToken || isset($token->delete))) {
            $token->delete();
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.logout_success'),
        ], route('login'));
    }

    public function refreshToken(Request $request)
    {
        $user = $request->user();

        $newToken = $user->refreshToken()->plainTextToken;

        return ResponseUtil::jsonRedirectResponse([
            'auth_token' => $newToken,
        ], url()->previous());
    }
}
