<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if ($request->wantsJson() || $request->expectsJson() || $request->ajax()) {
                    $user = Auth::user()->loadEntities();
                    $token = $user->createToken('auth_token', ['*'])->plainTextToken;

                    return response()->json([
                        'auth_token' => $token,
                        'user' => $user,
                        'message' => __('auth.login_success'),
                        'redirect' => route('dashboard'),
                    ]);
                }

                return redirect(route('dashboard'));
            }
        }

        return $next($request);
    }
}
