<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_can_list_users_via_api(): void
    {
        User::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->getJson('/api/system/users');

        $response->assertStatus(200);
        $response->assertJsonStructure(['items']);
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
        $user = User::factory()->create(); // enabled & verified by default

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
}
