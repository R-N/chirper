<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseUtil;
use App\Models\User;

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
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('auth.user_not_found'),
            ], $redirect, 404);
        }

        if ($user->hasVerifiedEmail()) {
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('auth.email_already_verified'),
            ], $redirect, 302);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.email_verification_success'),
        ], $redirect);
    }
}
