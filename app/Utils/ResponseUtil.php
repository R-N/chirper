<?php

namespace App\Utils;

use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ResponseUtil
{
    public static function jsonInertiaResponse($data, $view, $statusCode = 200, $overrideStatusCode = false)
    {
        $request = request();

        if ($request->wantsJson()) {
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

        if ($request->wantsJson()) {
            if ($route)
                $data['redirect'] = $route;
            return response()->json($data, $statusCode);
        }

        if (!$route)
            $route = url()->current();
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
