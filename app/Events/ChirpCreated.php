<?php

//created with php artisan make:event ChirpCreated

namespace App\Events;

use App\Models\Chirp;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

// Do not use ShouldQueue if you don't want to run php artisan queue:work
class ChirpCreated 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Chirp $chirp)
    {
        //public means it's also set as attribute
    }

    public function broadcastOn(): array
    {
        return [
            // ?
            new PrivateChannel('chirp'),
        ];
    }
}
