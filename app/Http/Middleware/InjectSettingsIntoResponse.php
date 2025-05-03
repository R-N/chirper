<?php

namespace App\Http\Middleware;

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Setting;

class InjectSettingsIntoResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only apply to JSON responses
        if ($response instanceof \Illuminate\Http\JsonResponse) {
            $settings = Setting::fetchDict();

            $data = $response->getData(true); // array format
            $data['settings'] = $settings;

            $response->setData($data);
        }

        return $response;
    }
}
