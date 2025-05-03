<?php

// created with php artisan make:notification NewChirp

namespace App\Notifications;

use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

// Do not use ShouldQueue if you don't want to run php artisan queue:work
class NewChirp extends Notification
{
    public $chirp;

    public function __construct($chirp)
    {
        Log::info('Notification created!');
        $this->chirp = $chirp;
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function message()
    {
        return __('chirp.new', ['username' => $this->chirp->user->name]);
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->message())
            ->greeting($this->message())
            ->line(Str::limit($this->chirp->message, 50))
            ->action(__('chirp.visit_app'), url('/'));
    }

    public function toDatabase($notifiable)
    {
        return [
            'url' => '/chirps/',
            'message' => $this->message(),
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'url' => '/chirps/',
            'message' => $this->message(),
        ]);
    }
}
