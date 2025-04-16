<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

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
            $redirect = route('dashboard', absolute: false);
            if (!$request->wantsJson()) {
                return redirect()->intended($redirect);
            }
            return response()->json([
                'message' => 'Email already verified',
                'redirect' => $redirect,
            ], 301);
        }

        $request->user()->sendEmailVerificationNotification();

        if (!$request->wantsJson()) {
            return back()->with('status', 'verification-link-sent');
        }
        return response()->json([
            'message' => 'Email verification notification sent',
        ], 200);
    }
}
