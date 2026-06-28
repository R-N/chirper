<?php

namespace Tests\Feature;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

/**
 * Regression tests for the access-control hardening:
 * - ownership scoping on user-owned CRUD (chirp IDOR)
 * - permission gates on settings / activity / backups
 * - storage path-traversal protection
 */
class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    // --- Ownership scoping (IDOR) ---

    public function test_user_cannot_update_another_users_chirp(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        $chirp = Chirp::factory()->create(['user_id' => $owner->id, 'message' => 'original']);

        $response = $this->actingAs($attacker)->patchJson("/api/chirps/{$chirp->id}", [
            'message' => 'hijacked',
        ]);

        $response->assertNotFound();
        $this->assertSame('original', $chirp->fresh()->message);
    }

    public function test_user_cannot_delete_another_users_chirp(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        $chirp = Chirp::factory()->create(['user_id' => $owner->id]);

        $response = $this->actingAs($attacker)->deleteJson("/api/chirps/{$chirp->id}");

        $response->assertNotFound();
        $this->assertDatabaseHas('chirps', ['id' => $chirp->id]);
    }

    public function test_bulk_delete_only_removes_own_chirps(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        $victimChirp = Chirp::factory()->create(['user_id' => $owner->id]);
        $ownChirp = Chirp::factory()->create(['user_id' => $attacker->id]);

        $this->actingAs($attacker)->postJson('/api/chirps/bulk/destroy', [
            'ids' => [$victimChirp->id, $ownChirp->id],
        ]);

        $this->assertDatabaseHas('chirps', ['id' => $victimChirp->id]);
        $this->assertDatabaseMissing('chirps', ['id' => $ownChirp->id]);
    }

    // --- Permission gates ---

    public function test_user_without_permission_cannot_write_settings(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/system/settings', ['key' => 'x', 'type' => 'int', 'value' => '1'])
            ->assertForbidden();
    }

    public function test_user_without_permission_cannot_list_activity(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/system/activity')
            ->assertForbidden();
    }

    public function test_user_without_permission_cannot_list_backups(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/system/backups')
            ->assertForbidden();
    }

    public function test_permission_holder_can_list_activity(): void
    {
        Permission::create(['name' => 'activity.view', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->givePermissionTo('activity.view');

        $this->actingAs($user)
            ->getJson('/api/system/activity')
            ->assertOk();
    }

    // --- Storage path traversal ---

    public function test_storage_route_serves_public_files(): void
    {
        Storage::disk('public')->put('docs/hello.txt', 'public-content');

        $response = $this->get('/storage/docs/hello.txt');

        $response->assertOk();
        $this->assertSame('public-content', $response->baseResponse->getFile()->getContent());
    }

    public function test_storage_route_blocks_path_traversal(): void
    {
        // A secret living outside the public disk.
        $secret = storage_path('app/secret.txt');
        file_put_contents($secret, 'TOP-SECRET');

        try {
            // Traversal must not resolve to the secret outside the public disk.
            $this->get('/storage/' . rawurlencode('../secret.txt'))->assertNotFound();
            $this->get('/storage/../secret.txt')->assertNotFound();
        } finally {
            @unlink($secret);
        }
    }
}
