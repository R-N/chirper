<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('user/auth/pages/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            if (!$request->wantsJson()) {
                return back()->with('status', __($status));
            }
            if ($status == Password::RESET_LINK_SENT) {
                return response()->json([
                    'message' => 'Reset link sent'
                ]);
            }
        }
        $exc = ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
        if (!$request->wantsJson()) {
            throw $exc;
        }
        return response()->json([
            'error'   => true,
            'message' => $exc->getMessage(),
            'code'    => $exc->getCode(),
            // 'file'    => $exc->getFile(),
            // 'line'    => $exc->getLine(),
            // 'trace'   => $exc->getTrace()
        ], 500);
    }
}
