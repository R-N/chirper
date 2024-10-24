<?php

//created with php artisan make:listener SendChirpCreatedNotifications --event=ChirpCreated

namespace App\Listeners;

use App\Events\ChirpCreated;
use App\Models\User;
use App\Notifications\NewChirp;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendChirpCreatedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ChirpCreated $event): void
    {
        // for all user except the author of the chirp,
        foreach (User::whereNot('id', $event->chirp->user_id)->cursor() as $user) {
            // notify with NewChirp
            $user->notify(new NewChirp($event->chirp));
        }
    }
}