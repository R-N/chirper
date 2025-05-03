<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LoginResponse;
use App\Actions\Auth\CustomLoginResponse;
use Inertia\Inertia;
use App\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LoginResponse::class, CustomLoginResponse::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        $user = request()->user();
        Inertia::share([
            'settings' => Setting::fetchDict(),
            'user' => $user,
            'notifications' => $user?->notifications
        ]);
    }
}
