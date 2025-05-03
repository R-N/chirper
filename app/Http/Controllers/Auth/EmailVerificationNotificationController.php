<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ResponseUtil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $user = User::where('email', $request->email)->first();
        }

        if ($user->hasVerifiedEmail()) {
            throw (new AuthException(AuthExceptionCode::EMAIL_ALREADY_VERIFIED))
                ->setRedirect(route('dashboard'));
        }

        $request->user()->sendEmailVerificationNotification();

        $back = url()->previous();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.email_verification_sent'),
        ], route('verification-link-sent'));
    }
}
