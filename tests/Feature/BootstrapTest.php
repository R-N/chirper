<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BootstrapTest extends TestCase
{
    use RefreshDatabase;

    public function test_bootstrap_returns_user_data(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => ['id', 'name', 'email'],
            'settings',
            'notifications',
            'ziggy' => ['url', 'port', 'routes'],
        ]);
    }

    public function test_bootstrap_requires_authentication(): void
    {
        $response = $this->getJson('/api/bootstrap');

        $response->assertStatus(401);
    }

    public function test_bootstrap_returns_settings(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $this->assertIsArray($response->json('settings'));
    }

    public function test_bootstrap_returns_ziggy_routes(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $routes = $response->json('ziggy.routes');
        $this->assertArrayHasKey('dashboard', $routes);
        $this->assertArrayHasKey('login', $routes);
    }

    public function test_bootstrap_user_matches_authenticated_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $this->assertEquals($user->id, $response->json('user.id'));
        $this->assertEquals($user->email, $response->json('user.email'));
    }

    public function test_bootstrap_returns_empty_notifications_for_new_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $this->assertEquals([], $response->json('notifications'));
    }
}
