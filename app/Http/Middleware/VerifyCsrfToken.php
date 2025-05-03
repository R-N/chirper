<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyCsrfToken extends Middleware
{
    // protected $except = [
    //     '/sanctum/csrf-cookie',
    // ];

    // public function handle(Request $request, Closure $next): Response
    // {
    //     return parent::handle($request, $next);
    //     //return $next($request);
    // }
}
