<?php

namespace Tests\Feature;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
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

    public function test_can_sort_chirps_by_multiple_columns(): void
    {
        $olderBeta = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'message' => 'Beta',
            'created_at' => now()->subDays(2),
        ]);
        $newerBeta = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'message' => 'Beta',
            'created_at' => now(),
        ]);
        $alpha = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'message' => 'Alpha',
            'created_at' => now()->subDay(),
        ]);

        $response = $this->actingAs($this->user)->getJson('/api/chirps?sort=message,-created_at');

        $response->assertStatus(200);
        $this->assertSame(
            [$alpha->id, $newerBeta->id, $olderBeta->id],
            collect($response->json('items.data'))->pluck('id')->all()
        );
    }

    public function test_chirps_default_to_newest_first(): void
    {
        $older = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'created_at' => now()->subDay(),
        ]);
        $newer = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'created_at' => now(),
        ]);

        $response = $this->actingAs($this->user)->getJson('/api/chirps');

        $response->assertStatus(200);
        $this->assertSame(
            [$newer->id, $older->id],
            collect($response->json('items.data'))->pluck('id')->all()
        );
    }

    public function test_relationship_sort_preserves_chirp_ids(): void
    {
        $adam = User::factory()->create(['name' => 'Adam']);
        $zoe = User::factory()->create(['name' => 'Zoe']);

        $zoeChirp = Chirp::factory()->create(['user_id' => $zoe->id]);
        $adamChirp = Chirp::factory()->create(['user_id' => $adam->id]);

        $response = $this->actingAs($this->user)->getJson('/api/chirps?sort=user.name');

        $response->assertStatus(200);
        $this->assertSame(
            [$adamChirp->id, $zoeChirp->id],
            collect($response->json('items.data'))->pluck('id')->all()
        );
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

    public function test_can_bulk_delete_chirps_via_api(): void
    {
        $chirps = Chirp::factory()->count(2)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->postJson('/api/chirps/bulk/destroy', [
            'ids' => $chirps->pluck('id')->all(),
        ]);

        $response->assertStatus(200);
        $chirps->each(fn (Chirp $chirp) => $this->assertDatabaseMissing('chirps', ['id' => $chirp->id]));
    }

    public function test_deleting_chirp_removes_stored_photo(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('chirps/photo.jpg', 'photo');
        $chirp = Chirp::factory()->create([
            'user_id' => $this->user->id,
            'photo' => 'chirps/photo.jpg',
        ]);

        $this->actingAs($this->user)
            ->deleteJson("/api/chirps/{$chirp->id}")
            ->assertStatus(200);

        Storage::disk('public')->assertMissing('chirps/photo.jpg');
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

    public function test_chirp_list_with_export_type_returns_download(): void
    {
        Chirp::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/api/chirps?export_type=xlsx');

        $response->assertOk();
        $disposition = strtolower((string) $response->headers->get('content-disposition', ''));
        $this->assertStringContainsString('attachment', $disposition);
        $this->assertStringContainsString('.xlsx', $disposition);
    }
}
