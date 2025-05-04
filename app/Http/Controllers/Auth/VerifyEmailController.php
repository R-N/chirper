<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ResponseUtil;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request): RedirectResponse|JsonResponse
    {
        $redirect = route('dashboard', absolute: false).'?verified=1';
        $user = $request->user() ?? User::findOrFail($request->route('id'));

        if (!$user) {
            throw new AuthException(AuthExceptionCode::USER_NOT_FOUND);
        }

        if ($user->hasVerifiedEmail()) {
            throw (new AuthException(AuthExceptionCode::EMAIL_ALREADY_VERIFIED))
                ->setRedirect(route('dashboard'));
        }

        if (!hash_equals(sha1($user->getEmailForVerification()), (string) $request->route('hash'))) {
            throw (new AuthException(AuthExceptionCode::INVALID_TOKEN));
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('auth.email_verification_success'),
        ], $redirect);
    }
}
