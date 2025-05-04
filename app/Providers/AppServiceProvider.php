<?php

namespace App\Providers;

use App\Actions\Auth\CustomLoginResponse;
use App\Models\Setting;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse;
use Illuminate\Support\Facades\Schema;

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
            'settings' => Schema::hasTable('settings') ? Setting::fetchDict() : [],
            'user' => $user,
            'notifications' => $user?->notifications ?? [],
        ]);
    }
}
