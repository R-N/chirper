<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Symfony\Component\Console\Attribute\AsCommand;

// #[AsCommand(
//     name: 'make:admin-user {email?} {password?} {name?}',
//     description: 'Create an admin user with given email and password'
// )]
class CreateAdminUser extends Command
{
    protected $signature = 'make:admin-user {email?} {password?} {name?}';

    protected $description = 'Create an admin user with given email and password';

    public function handle()
    {
        $email = $this->argument('email') ?? $this->ask('Enter admin email');
        $password = $this->argument('password') ?? $this->secret('Enter admin password');
        $name = $this->argument('name') ?? $this->ask('Enter admin name');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $user->assignRole($adminRole);

        event(new Registered($user));

        $this->info("Admin user created: $email");
    }
}
