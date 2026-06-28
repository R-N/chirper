<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class BackupApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_backups_when_empty(): void
    {
        $user = User::factory()->create();
        Permission::create(['name' => 'backup.manage', 'guard_name' => 'web']);
        $user->givePermissionTo('backup.manage');

        $response = $this->actingAs($user)->getJson('/api/system/backups');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
    }

    public function test_unauthenticated_cannot_list_backups(): void
    {
        $response = $this->getJson('/api/system/backups');

        $response->assertUnauthorized();
    }
}
