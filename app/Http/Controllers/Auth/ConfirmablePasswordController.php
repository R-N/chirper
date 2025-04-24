<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Utils\ResponseUtil;

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
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('errors.bad_request'),
            ], route('password.confirm'), 400);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.password_confirmed'),
        ], route('dsahboard'));
    }
}
