<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class RoleApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web', 'level' => 10, 'can_manage_peers' => true]);
        Permission::create(['name' => 'chirp.view', 'guard_name' => 'web']);
        Permission::create(['name' => 'chirp.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'role.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'role.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'role.view', 'guard_name' => 'web']);
        Permission::create(['name' => 'role.delete', 'guard_name' => 'web']);
        $adminRole->syncPermissions(['chirp.view', 'chirp.create', 'role.create', 'role.edit', 'role.view', 'role.delete']);

        $this->admin = User::factory()->create();
        $this->admin->assignRole('admin');
    }

    public function test_can_list_roles_via_api(): void
    {
        Role::create(['name' => 'manager', 'guard_name' => 'web', 'level' => 0]);

        $response = $this->actingAs($this->admin)->getJson('/api/system/roles');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
    }

    public function test_can_create_role_with_permissions_from_object_payloads(): void
    {
        $response = $this->actingAs($this->admin)->postJson('/api/system/roles', [
            'name' => 'manager',
            'level' => 5,
            'permissions' => [['name' => 'chirp.view']],
        ]);

        $response->assertCreated();
        $role = Role::where('name', 'manager')->firstOrFail();
        $this->assertTrue($role->hasPermissionTo('chirp.view'));
    }

    public function test_can_update_role_permissions_from_object_payloads(): void
    {
        $role = Role::create(['name' => 'manager', 'guard_name' => 'web', 'level' => 5]);

        $this->actingAs($this->admin)
            ->putJson("/api/system/roles/{$role->id}/permissions", [
                'permissions' => [['name' => 'chirp.view']],
            ])
            ->assertOk();

        $this->assertTrue($role->fresh()->hasPermissionTo('chirp.view'));
    }

    public function test_cannot_create_role_at_higher_level(): void
    {
        $response = $this->actingAs($this->admin)->postJson('/api/system/roles', [
            'name' => 'super-admin',
            'level' => 15,
        ]);

        $response->assertForbidden();
    }

    public function test_cannot_delete_role_at_same_level(): void
    {
        $role = Role::create(['name' => 'peer', 'guard_name' => 'web', 'level' => 10]);

        $response = $this->actingAs($this->admin)->deleteJson("/api/system/roles/{$role->id}");

        $response->assertForbidden();
    }

    public function test_can_delete_role_at_lower_level(): void
    {
        $role = Role::create(['name' => 'underling', 'guard_name' => 'web', 'level' => 5]);

        $response = $this->actingAs($this->admin)->deleteJson("/api/system/roles/{$role->id}");

        $response->assertOk();
        $this->assertDatabaseMissing('roles', ['name' => 'underling']);
    }
}
