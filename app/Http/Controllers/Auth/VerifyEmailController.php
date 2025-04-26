<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseUtil;
use App\Models\User;
use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse|JsonResponse
    {
        $redirect = route('dashboard', absolute: false).'?verified=1';
        $user = $request->user() ?? User::firstOrFail($request->input('email'));

        if (!$user){
            throw new AuthException(AuthExceptionCode::USER_NOT_FOUND);
        }

        if ($user->hasVerifiedEmail()) {
            throw (new AuthException(AuthExceptionCode::EMAIL_ALREADY_VERIFIED))
                ->setRedirect(route('dashboard'));
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.email_verification_success'),
        ], $redirect);
    }
}
