<?php

//created with php artisan make:listener SendChirpCreatedNotifications --event=ChirpCreated

namespace App\Listeners;

use App\Events\ChirpCreated;
use App\Models\User;
use App\Notifications\NewChirp;

// Do not use ShouldQueue if you don't want to run php artisan queue:work
class SendChirpCreatedNotifications 
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