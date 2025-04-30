<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\AuthenticationException;
use App\Utils\ResponseUtil;
use Laravel\Sanctum\PersonalAccessToken;
use App\Exceptions\AuthException;
use App\Exceptions\AuthExceptionCode;

class EnsureTokenIsNotExpired
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->user()?->currentAccessToken();

        if ($token && ($token instanceof PersonalAccessToken || isset($token->expires_at))){
            if ($token->expires_at?->isPast()) {
                throw (new AuthException(AuthExceptionCode::TOKEN_EXPIRED))->setRedirect(route('login'));
            }
        }

        return $next($request);
    }
}
