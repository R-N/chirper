<?php

namespace App\Providers;

use App\Events\ChirpCreated;
use App\Listeners\SendChirpCreatedNotifications;
use App\Listeners\SetUserDefaults;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

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
