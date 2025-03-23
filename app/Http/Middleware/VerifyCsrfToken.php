<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

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
