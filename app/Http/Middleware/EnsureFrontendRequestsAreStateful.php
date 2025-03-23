<?php

namespace App\Http\Middleware;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful as Middleware;

class EnsureFrontendRequestsAreStateful extends Middleware
{
    protected function configureSecureCookieSessions()
    {
        config([
            'session.http_only' => true,
            //'session.same_site' => 'lax',
        ]);
    }
}
