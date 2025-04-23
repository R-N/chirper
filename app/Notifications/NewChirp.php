<?php

// created with php artisan make:notification NewChirp

namespace App\Notifications;

use App\Models\Chirp;
use Illuminate\Support\Str;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Support\Facades\Log;

// Do not use ShouldQueue if you don't want to run php artisan queue:work
class NewChirp extends Notification 
{

    public $chirp;

    public function __construct($chirp)
    {
        Log::info("Notification created!");
        $this->chirp = $chirp;
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject("New Chirp from {$this->chirp->user->name}")
                    ->greeting("New Chirp from {$this->chirp->user->name}")
                    ->line(Str::limit($this->chirp->message, 50))
                    ->action('Go to Chirper', url('/'))
                    ->line('Thank you for using our application!');
    }

    public function toDatabase($notifiable)
    {
        return [
            'url' => '/chirps/',
            'message' => "{$this->chirp->user->name} posted a new chirp!",
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'url' => '/chirps/',
            'message' => "{$this->chirp->user->name} posted a new chirp!",
        ]);
    }
}
