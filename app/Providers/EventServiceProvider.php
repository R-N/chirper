<?php

namespace App\Providers;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Events\Registered;
use App\Listeners\SetUserDefaults;
use App\Listeners\SendChirpCreatedNotifications;
use App\Events\ChirpCreated;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SetUserDefaults::class,
        ],
        ChirpCreated::class => [
            SendChirpCreatedNotifications::class,
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
