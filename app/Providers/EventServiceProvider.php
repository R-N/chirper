<?php

namespace App\Providers;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Events\Registered;
use App\Listeners\SetUserDefaults;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SetUserDefaults::class,
        ],
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
