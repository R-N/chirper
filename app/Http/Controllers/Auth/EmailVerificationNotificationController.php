<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Utils\ResponseUtil;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);
        
            $user = User::where('email', $request->email)->first();
        }

        if ($user->hasVerifiedEmail()) {
            return ResponseUtil::jsonRedirectResponse([
                'message' => 'Email already verified',
            ], route('dashboard'), 302);
        }

        $request->user()->sendEmailVerificationNotification();

        $back = url()->previous();
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Email verification notification sent',
        ], route('verification-link-sent'));
    }
}
