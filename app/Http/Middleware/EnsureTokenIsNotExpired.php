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
        $user = $request->user();

        $token = $user?->currentAccessToken();

        if ($token && ($token instanceof PersonalAccessToken || isset($token->expires_at))){
            if ($token->expires_at?->isPast()) {
                throw (new AuthException(AuthExceptionCode::TOKEN_EXPIRED))->setRedirect(route('login'));
            }
        }

        $response = $next($request);

        // if ($user && $response instanceof \Illuminate\Http\JsonResponse) {

        //     $data = $response->getData(true);
        //     $data['auth_token'] = $user->refreshToken()->plainTextToken;

        //     $response->setData($data);
        // }

        return $response;
    }
}
