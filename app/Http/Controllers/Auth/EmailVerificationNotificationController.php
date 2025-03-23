<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $notification = $request->user()->sendEmailVerificationNotification();

        if (!$request->wantsJson()) {
            return back()->with('status', 'verification-link-sent');
        }
        return response()->json([
            'message' => 'Email verification notification sent',
            'notification' => $notification->toArray(null),
        ], 200);
    }
}
