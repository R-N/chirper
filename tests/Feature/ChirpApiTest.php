<?php

namespace Tests\Feature;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChirpApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list_chirps_via_api(): void
    {
        Chirp::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->getJson('/api/chirps');

        $response->assertStatus(200);
        $response->assertJsonStructure(['items']);
    }

    public function test_can_create_chirp_via_api(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/chirps', [
            'message' => 'Hello from API!',
        ]);

        $response->assertSuccessful();
        $this->assertDatabaseHas('chirps', ['message' => 'Hello from API!']);
    }

    public function test_can_update_chirp_via_api(): void
    {
        $chirp = Chirp::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->patchJson("/api/chirps/{$chirp->id}", [
            'message' => 'Updated message',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('chirps', [
            'id' => $chirp->id,
            'message' => 'Updated message',
        ]);
    }

    public function test_can_delete_chirp_via_api(): void
    {
        $chirp = Chirp::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->deleteJson("/api/chirps/{$chirp->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('chirps', ['id' => $chirp->id]);
    }

    public function test_chirp_validation_requires_message(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/chirps', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['message']);
    }

    public function test_chirp_validation_max_length(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/chirps', [
            'message' => str_repeat('a', 256),
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['message']);
    }

    public function test_unauthenticated_user_cannot_access_chirps(): void
    {
        $response = $this->getJson('/api/chirps');

        $response->assertStatus(401);
    }
}
