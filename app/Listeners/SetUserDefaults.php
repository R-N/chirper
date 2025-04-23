<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Spatie\Permission\Models\Role;

// Do not use ShouldQueue if you don't want to run php artisan queue:work
class SetUserDefaults
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
    public function handle(Registered $event): void
    {
        $user = $event->user;
        $chirperRole = Role::firstOrCreate(['name' => 'chirper']);
        $user->assignRole($chirperRole);
    }
}
