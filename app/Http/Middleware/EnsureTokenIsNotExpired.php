<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\AuthenticationException;
use App\Utils\ResponseUtil;
use Laravel\Sanctum\PersonalAccessToken;

class EnsureTokenIsNotExpired
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->user()?->currentAccessToken();

        if ($token && ($token instanceof PersonalAccessToken || isset($token->expires_at))){
            if ($token->expires_at?->isPast()) {
                return ResponseUtil::jsonRedirectResponse([
                    'message' => __('errors.token_expired'),
                    'show' => true,
                ], route('login'), 401);
                throw new AuthenticationException(__('errors.token_expired'));
            }
        }

        return $next($request);
    }
}
