<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class SpaModeTest extends TestCase
{
    use RefreshDatabase;

    public function test_spa_mode_config_reads_from_env(): void
    {
        $this->assertEquals(
            env('VITE_APP_MODE', 'inertia') === 'spa',
            config('app.spa_mode')
        );
    }

    public function test_hybrid_routes_return_json_for_api_requests(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/chirps');

        $response->assertStatus(200);
        $response->assertJsonStructure(['items']);
    }

    public function test_hybrid_routes_return_inertia_for_web_requests(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/chirps');

        $response->assertStatus(200);
    }

    public function test_api_routes_have_api_prefix(): void
    {
        $this->assertTrue(Route::has('api.bootstrap'));
        $this->assertTrue(Route::has('api.chirps.index'));
    }

    public function test_web_routes_exist_for_inertia_pages(): void
    {
        $this->assertTrue(Route::has('dashboard'));
        $this->assertTrue(Route::has('welcome'));
        $this->assertTrue(Route::has('login'));
    }

    public function test_bootstrap_endpoint_available_as_api_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/bootstrap');

        $response->assertStatus(200);
        $response->assertJsonStructure(['user', 'settings', 'ziggy']);
    }

    public function test_crud_endpoints_available_via_api(): void
    {
        Permission::create(['name' => 'user.view']);
        Permission::create(['name' => 'role.view']);
        Permission::create(['name' => 'activity.view']);
        Permission::create(['name' => 'setting.view']);
        $role = Role::create(['name' => 'viewer', 'guard_name' => 'web', 'level' => 5]);
        $role->syncPermissions(['user.view', 'role.view', 'activity.view', 'setting.view']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $endpoints = [
            ['get', '/api/chirps'],
            ['get', '/api/system/users'],
            ['get', '/api/system/activity'],
            ['get', '/api/system/settings'],
        ];

        foreach ($endpoints as [$method, $url]) {
            $response = $this->actingAs($user)->{$method . 'Json'}($url);
            $this->assertEquals(200, $response->status(), "Failed: {$method} {$url}");
        }
    }
}
