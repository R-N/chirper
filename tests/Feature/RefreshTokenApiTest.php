<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RefreshTokenApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_refresh_token_returns_auth_token_for_verified_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/refresh-token');

        $response->assertOk();
        $response->assertJsonStructure(['auth_token']);
        $this->assertNotEmpty($response->json('auth_token'));
    }

    public function test_refresh_token_requires_authentication(): void
    {
        $response = $this->getJson('/api/refresh-token');

        $response->assertUnauthorized();
    }
}
