<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;
use App\Utils\ResponseUtil;

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
            'message' => 'Login successful.',
            'user' => $user,
        ], route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse|JsonResponse
    {
        $token = $request->user()->currentAccessToken();
        if ($token && $token instanceof PersonalAccessToken){
            $token->delete();
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ResponseUtil::jsonRedirectResponse([
            "message" => "Logged out.",
        ], route('login'));
    }
}
