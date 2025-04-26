<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use App\Utils\ResponseUtil;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function getSessions(){
        $sessions = DB::table('sessions')
            ->where('user_id', request()->user()->id)
            ->get();
        return $sessions;
    }

    public function edit(Request $request): Response
    {
        $user = $request->user()->loadEntities();
        return ResponseUtil::jsonInertiaResponse([
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,
            'sessions' => $this->getSessions(),
        ], 'user/profile/pages/Edit');
    }

    /**
     * Display the user's profile form.
     */
    public function show(Request $request): Response|JsonResponse
    {
        $user = $request->user()->loadEntities();
        return ResponseUtil::jsonInertiaResponse([
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,
            'sessions' => $this->getSessions(),
        ], 'user/profile/pages/Show');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse|JsonResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        $user->save();
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'user' => $user,
            "message" => __('profile.updated'),
        ], route('profile.edit'));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse|JsonResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        // 🔥 If using token-based auth, revoke tokens
        $tokens = $user->tokens();
        if ($tokens){
            $tokens->delete();
        }

        Auth::guard('web')->logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('profile.deleted'),
        ], route('login'));
    }
}
