<?php

namespace Tests\Feature;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list_activity_via_api(): void
    {
        // Creating a chirp triggers activity log
        Chirp::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->getJson('/api/system/activity');

        $response->assertStatus(200);
        $response->assertJsonStructure(['items']);
    }

    public function test_can_show_activity_via_api(): void
    {
        // Creating a chirp triggers activity log
        Chirp::factory()->create(['user_id' => $this->user->id]);

        $activity = \Spatie\Activitylog\Models\Activity::first();
        $this->assertNotNull($activity);

        $response = $this->actingAs($this->user)->getJson("/api/system/activity/{$activity->id}");

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_access_activity(): void
    {
        $response = $this->getJson('/api/system/activity');

        $response->assertStatus(401);
    }

    public function test_activity_records_chirp_creation(): void
    {
        $initialCount = \Spatie\Activitylog\Models\Activity::count();

        Chirp::factory()->create(['user_id' => $this->user->id]);

        $this->assertEquals($initialCount + 1, \Spatie\Activitylog\Models\Activity::count());
    }
}
