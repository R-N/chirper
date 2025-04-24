<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class SetUserLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->locale) {
            App::setLocale(Auth::user()->locale);
        }else{
            App::setLocale(Session::get('locale', config('app.locale')));
        }
        return $next($request);
    }
}
