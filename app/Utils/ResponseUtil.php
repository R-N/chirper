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
            $data['redirect'] = $route;
            return response()->json($data, $statusCode);
        }

        $response = Redirect::route($route, $data);

        if ($overrideStatusCode) {
            $response = $response->setStatusCode($statusCode);
        }

        return $response;
    }
}
