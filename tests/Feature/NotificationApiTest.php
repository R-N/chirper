<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\Notification;
use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list_notifications(): void
    {
        $this->seedNotification();

        $response = $this->actingAs($this->user)->getJson('/api/notifications');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
        $this->assertCount(1, $response->json('items'));
    }

    public function test_can_mark_notification_read(): void
    {
        $this->seedNotification();
        $id = $this->user->notifications()->first()->id;

        $response = $this->actingAs($this->user)->patchJson("/api/notifications/{$id}");

        $response->assertOk();
        $this->assertNotNull($this->user->notifications()->find($id)->read_at);
    }

    public function test_can_delete_notification(): void
    {
        $this->seedNotification();
        $id = $this->user->notifications()->first()->id;

        $response = $this->actingAs($this->user)->deleteJson("/api/notifications/{$id}");

        $response->assertOk();
        $this->assertNull($this->user->notifications()->find($id));
    }

    public function test_bulk_mark_as_read(): void
    {
        $this->seedNotification();
        $id = $this->user->notifications()->first()->id;

        $response = $this->actingAs($this->user)->postJson('/api/notifications/mark-as-read', [
            'ids' => [$id],
        ]);

        $response->assertOk();
        $this->assertNotNull($this->user->notifications()->find($id)->read_at);
    }

    public function test_bulk_destroy_deletes_read_notifications(): void
    {
        $this->seedNotification();
        $n = $this->user->notifications()->first();
        $n->markAsRead();

        $response = $this->actingAs($this->user)->postJson('/api/notifications/destroy', [
            'ids' => [$n->id],
        ]);

        $response->assertOk();
        $this->assertNull($this->user->notifications()->find($n->id));
    }

    public function test_unauthenticated_cannot_access_notifications(): void
    {
        $response = $this->getJson('/api/notifications');

        $response->assertUnauthorized();
    }

    private function seedNotification(): void
    {
        $this->user->notify(new class extends Notification
        {
            public function via(object $notifiable): array
            {
                return ['database'];
            }

            public function toArray(object $notifiable): array
            {
                return ['body' => 'test'];
            }
        });
    }
}
