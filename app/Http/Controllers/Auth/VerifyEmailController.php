<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse|JsonResponse
    {
        $redirect = route('dashboard', absolute: false).'?verified=1';
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended($redirect);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        if (!$request->wantsJson()) {
            return redirect()->intended($redirect);
        }
        return response()->json([
            'message' => 'Email verified successfully',
            'redirect' => $redirect,
        ], 200);
    }
}
