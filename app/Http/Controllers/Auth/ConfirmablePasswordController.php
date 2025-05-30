<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;
use App\Http\Controllers\Controller;
use App\Utils\ResponseUtil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): Response
    {
        return Inertia::render('user/auth/pages/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw new AuthException(AuthExceptionCode::BAD_REQUEST);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.password_confirmed'),
        ], route('dsahboard'));
    }
}
