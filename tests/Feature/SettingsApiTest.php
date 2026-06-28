<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class SettingsApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        Permission::create(['name' => 'setting.view', 'guard_name' => 'web']);
        Permission::create(['name' => 'setting.edit', 'guard_name' => 'web']);
        $this->user = User::factory()->create();
        $this->user->givePermissionTo(['setting.view', 'setting.edit']);
    }

    public function test_can_list_settings_via_api(): void
    {
        Setting::create(['key' => 'site_name', 'type' => 'string', 'value' => 'Chirper']);

        $response = $this->actingAs($this->user)->getJson('/api/system/settings');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'items' => ['data'],
            'setting_types',
        ]);
    }

    public function test_can_fetch_setting_types_via_api(): void
    {
        $response = $this->actingAs($this->user)->getJson('/api/system/settings/types');

        $response->assertStatus(200);
        $this->assertSame(Setting::TYPES, $response->json('items'));
    }

    public function test_can_create_update_show_and_delete_setting_via_api(): void
    {
        $create = $this->actingAs($this->user)->postJson('/api/system/settings', [
            'key' => 'items_per_page',
            'type' => 'int',
            'value' => '10',
        ]);

        $create->assertCreated();
        $settingId = Setting::where('key', 'items_per_page')->value('id');

        $show = $this->actingAs($this->user)->getJson("/api/system/settings/{$settingId}");
        $show->assertStatus(200);
        $this->assertSame('items_per_page', $show->json('setting.key'));

        $update = $this->actingAs($this->user)->patchJson("/api/system/settings/{$settingId}", [
            'value' => '25',
        ]);

        $update->assertStatus(200);
        $this->assertDatabaseHas('settings', [
            'id' => $settingId,
            'value' => '25',
        ]);

        $delete = $this->actingAs($this->user)->deleteJson("/api/system/settings/{$settingId}");
        $delete->assertStatus(200);
        $this->assertDatabaseMissing('settings', ['id' => $settingId]);
    }

    public function test_setting_value_is_validated_against_type(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/system/settings', [
            'key' => 'items_per_page',
            'type' => 'int',
            'value' => 'not-an-integer',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['value']);
    }

    public function test_fetch_dict_cache_is_invalidated_when_settings_change(): void
    {
        $setting = Setting::create(['key' => 'site_name', 'type' => 'string', 'value' => 'Old Name']);

        $this->assertSame('Old Name', Setting::fetchDict()['site_name']);

        $this->actingAs($this->user)
            ->patchJson("/api/system/settings/{$setting->id}", ['value' => 'New Name'])
            ->assertStatus(200);

        $this->assertSame('New Name', Setting::fetchDict()['site_name']);

        $this->actingAs($this->user)
            ->deleteJson("/api/system/settings/{$setting->id}")
            ->assertStatus(200);

        $this->assertArrayNotHasKey('site_name', Setting::fetchDict()->all());
    }

    public function test_setting_accessors_cast_values_by_type(): void
    {
        $int = Setting::create(['key' => 'int_setting', 'type' => 'int', 'value' => '7']);
        $bool = Setting::create(['key' => 'bool_setting', 'type' => 'bool', 'value' => '1']);
        $decimal = Setting::create(['key' => 'decimal_setting', 'type' => 'decimal', 'value' => '12.34']);

        $this->assertSame(7, $int->fresh()->value);
        $this->assertTrue($bool->fresh()->value);
        $this->assertSame(1234, $decimal->fresh()->value->cents);
    }

    public function test_unauthenticated_user_cannot_access_settings(): void
    {
        $response = $this->getJson('/api/system/settings');

        $response->assertStatus(401);
    }
}
