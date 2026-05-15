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
        $this->admin = User::factory()->create();
    }

    public function test_can_list_roles_via_api(): void
    {
        Role::create(['name' => 'manager', 'guard_name' => 'web']);

        $response = $this->actingAs($this->admin)->getJson('/api/system/roles');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
    }

    public function test_can_create_role_with_permissions_from_object_payloads(): void
    {
        Permission::create(['name' => 'chirp.view', 'guard_name' => 'web']);

        $response = $this->actingAs($this->admin)->postJson('/api/system/roles', [
            'name' => 'manager',
            'guard_name' => 'web',
            'permissions' => [['name' => 'chirp.view']],
        ]);

        $response->assertCreated();
        $role = Role::where('name', 'manager')->firstOrFail();
        $this->assertTrue($role->hasPermissionTo('chirp.view'));
    }

    public function test_can_update_role_permissions_from_object_payloads(): void
    {
        Permission::create(['name' => 'chirp.view', 'guard_name' => 'web']);
        $role = Role::create(['name' => 'manager', 'guard_name' => 'web']);

        $this->actingAs($this->admin)
            ->putJson("/api/system/roles/{$role->id}/permissions", [
                'permissions' => [['name' => 'chirp.view']],
            ])
            ->assertOk();

        $this->assertTrue($role->fresh()->hasPermissionTo('chirp.view'));
    }
}
