<?php

namespace App\Providers;

use App\Models\Backup;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Route::bind('backup', function ($value) {
            return new Backup($value);
        });
        Route::pattern('user', '[0-9]+');
    }
}
