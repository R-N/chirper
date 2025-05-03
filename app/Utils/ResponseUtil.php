<?php

namespace App\Utils;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ResponseUtil
{
    public static function jsonInertiaResponse($data, $view, $statusCode = 200, $overrideStatusCode = false)
    {
        $request = request();

        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json($data, $statusCode);
        }

        $response = Inertia::render($view, $data);

        if ($overrideStatusCode) {
            $response = $response->setStatusCode($statusCode);
        }

        return $response;
    }

    public static function jsonRedirectResponse($data, $route, $statusCode = 200, $overrideStatusCode = false)
    {
        $request = request();

        if ($request->wantsJson() || $request->expectsJson()) {
            if ($route) {
                $data['redirect'] = $route;
            }

            return response()->json($data, $statusCode);
        }

        if (! $route) {
            $route = url()->current();
        }
        if ($statusCode > 299) {
            if (! $route || $route == url()->current()) {
                $route = url()->previous();
            } elseif ($route == url()->previous()) {
                $route = '/';
            } else {
                Log::error($route);
            }
        }
        $response = Redirect::to($route)->with($data);

        if ($overrideStatusCode) {
            $response = $response->setStatusCode($statusCode);
        }

        return $response;
    }

    public static function jsonStayResponse($data, $statusCode = 200, $overrideStatusCode = false)
    {
        return self::jsonRedirectResponse($data, null, $statusCode, $overrideStatusCode);
    }

    public static function jsonRefreshResponse($data, $statusCode = 200, $overrideStatusCode = false)
    {
        return self::jsonRedirectResponse($data, url()->current(), $statusCode, $overrideStatusCode);
    }

    public static function jsonBackResponse($data, $statusCode = 200, $overrideStatusCode = false)
    {
        return self::jsonRedirectResponse($data, url()->previous(), $statusCode, $overrideStatusCode);
    }
}
