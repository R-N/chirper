<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesLevels = [
            'admin' => 10,
            'chirper' => 0,
        ];

        $rolesPermissions = [
            'admin' => [
                // User management
                'user.create',
                'user.edit',
                'user.view',
                'user.delete',
                'user.unverify',
                'user.set-verified',
                'user.set-enabled',
                'user.clear-password',
                // Role management
                'role.create',
                'role.edit',
                'role.view',
                'role.delete',
            ],
            'chirper' => [
                'chirp.create',
                'chirp.edit',
                'chirp.view',
                'chirp.delete',
            ],
        ];

        $permissions = collect($rolesPermissions)
            ->flatten()
            ->unique()
            ->values()
            ->all();

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        foreach ($rolesPermissions as $roleName => $perms) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($perms);
        }

        foreach ($rolesLevels as $roleName => $level) {
            Role::updateOrCreate(
                ['name' => $roleName],
                ['level' => $level]
            );
        }

        // Set can_manage_peers on admin
        Role::where('name', 'admin')->update(['can_manage_peers' => true]);
    }
}
