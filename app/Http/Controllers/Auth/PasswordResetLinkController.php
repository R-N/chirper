<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;
use App\Http\Controllers\Controller;
use App\Utils\ResponseUtil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
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

        $email = trans($status);
        if ($status == Password::RESET_LINK_SENT) {
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('auth.password_reset_sent'),
                'status' => __($status),
                'email' => $email,
            ], url()->previous());
        }

        throw (new AuthException(AuthExceptionCode::PASSWORD_RESET_SEND_FAIL))
            ->setStatus(__($status));
    }
}
