<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chirp', function ($user) {
    return true; // Or any logic to authorize the user, like checking if they are allowed to listen to this channel
});
