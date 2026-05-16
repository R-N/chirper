<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web', 'level' => 10, 'can_manage_peers' => true]);
        Permission::create(['name' => 'chirp.view', 'guard_name' => 'web']);
        Permission::create(['name' => 'chirp.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.view', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.delete', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.set-verified', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.set-enabled', 'guard_name' => 'web']);
        $adminRole->syncPermissions(['chirp.view', 'chirp.create', 'user.create', 'user.edit', 'user.view', 'user.delete', 'user.set-verified', 'user.set-enabled']);

        $this->admin = User::factory()->create();
        $this->admin->assignRole('admin');
    }

    public function test_can_list_users_via_api(): void
    {
        User::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->getJson('/api/system/users');

        $response->assertStatus(200);
        $response->assertJsonStructure(['items']);
    }

    public function test_can_fetch_available_roles_via_api(): void
    {
        Role::create(['name' => 'chirper', 'guard_name' => 'web', 'level' => 0]);

        $response = $this->actingAs($this->admin)->getJson('/api/system/users/roles');

        $response->assertOk();
        $response->assertJsonStructure(['roles']);
        $this->assertCount(2, $response->json('roles'));
    }

    public function test_can_fetch_available_permissions_via_api(): void
    {
        $response = $this->actingAs($this->admin)->getJson('/api/system/users/permissions');

        $response->assertOk();
        $response->assertJsonStructure(['permissions']);
        $names = collect($response->json('permissions'))->pluck('name')->all();
        $this->assertContains('chirp.view', $names);
    }

    public function test_can_show_user_via_api(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)->getJson("/api/system/users/{$user->id}");

        $response->assertStatus(200);
    }

    public function test_can_update_user_name_via_api(): void
    {
        $user = User::factory()->create(['name' => 'Old Name']);

        $response = $this->actingAs($this->admin)->patchJson("/api/system/users/{$user->id}", [
            'name' => 'New Name',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'New Name',
        ]);
    }

    public function test_can_delete_user_via_api(): void
    {
        $user = User::factory()->create([
            'enabled' => false,
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($this->admin)->deleteJson("/api/system/users/{$user->id}");

        $response->assertSuccessful();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_cannot_delete_enabled_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)->deleteJson("/api/system/users/{$user->id}");

        $response->assertStatus(400);
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    public function test_unauthenticated_user_cannot_access_users(): void
    {
        $response = $this->getJson('/api/system/users');

        $response->assertStatus(401);
    }

    public function test_user_email_must_be_valid(): void
    {
        $response = $this->actingAs($this->admin)->postJson('/api/system/users', [
            'name' => 'Test User',
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_can_set_user_enabled_and_verified_flags(): void
    {
        $user = User::factory()->unverified()->create(['enabled' => false]);

        $this->actingAs($this->admin)
            ->putJson("/api/system/users/{$user->id}/enabled", ['enabled' => true])
            ->assertStatus(200);

        $this->actingAs($this->admin)
            ->putJson("/api/system/users/{$user->id}/verified", ['verified' => true])
            ->assertStatus(200);

        $user->refresh();
        $this->assertTrue((bool) $user->enabled);
        $this->assertTrue($user->verified);
    }

    public function test_can_update_user_roles_and_permissions_from_object_payloads(): void
    {
        $chirperRole = Role::create(['name' => 'chirper', 'guard_name' => 'web', 'level' => 0]);
        $user = User::factory()->create();

        $this->actingAs($this->admin)
            ->putJson("/api/system/users/{$user->id}/roles", [
                'roles' => [['name' => 'chirper']],
            ])
            ->assertStatus(200);

        $this->actingAs($this->admin)
            ->putJson("/api/system/users/{$user->id}/permissions", [
                'permissions' => [['name' => 'chirp.view']],
            ])
            ->assertStatus(200);

        $this->assertTrue($user->fresh()->hasRole('chirper'));
        $this->assertTrue($user->fresh()->hasPermissionTo('chirp.view'));
    }

    public function test_user_email_update_resets_verification(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'old@example.com']);

        $this->actingAs($this->admin)->patchJson("/api/system/users/{$user->id}", [
            'name' => $user->name,
            'email' => 'new@example.com',
        ])->assertStatus(200);

        $user->refresh();
        $this->assertSame('new@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }
}
