<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Utils\ResponseUtil;
use App\Utils\ExceptionUtil;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\SetUserLocale::class,
        ])->statefulApi();

        $middleware->api(append: [
            \App\Http\Middleware\EnsureTokenIsNotExpired::class,
            \App\Http\Middleware\SetUserLocale::class,
        ]);

        // $middleware->validateCsrfTokens();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e, Request $request) {
            ExceptionUtil::shouldShow($e);
            $data = ExceptionUtil::toArray($e);
            $statusCode = ExceptionUtil::getStatusCode($e);
            if (property_exists($e, 'redirect') && $e->redirect){
                return ResponseUtil::jsonRedirectResponse($data, $e->redirect, $statusCode, true);
            }else if (isset($data['show']) && $data['show']){
                return ResponseUtil::jsonStayResponse($data, $statusCode, true);
            }
            return null;
        });
    })->create();
