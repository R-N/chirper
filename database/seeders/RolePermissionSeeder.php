<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define roles and their permissions
        $rolesLevels = [
            'admin' => 10,
            'chirper' => 0,
        ];
        $rolesPermissions = [
            'admin' => [
                'user.create',
                'user.edit',
                'user.view',
                'user.delete',
                'user.unverify',
                'user.set-verified',
                'user.set-enabled',
                'user.clear-password',
            ],
            'chirper' => [
                'chirp.create',
                'chirp.edit',
                'chirp.view',
                'chirp.delete',
            ],
        ];

        // Define permissions
        $permissions = [];
        $permissions = collect($rolesPermissions)
            ->flatten()
            ->merge($permissions)
            ->unique()
            ->values()->all();

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        foreach ($rolesPermissions as $roleName => $perms) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($perms);
        }
        // Set role levels
        foreach ($rolesLevels as $roleName => $level) {
            Role::updateOrCreate(
                ['name' => $roleName],
                ['level' => $level]
            );
        }

    }
}
