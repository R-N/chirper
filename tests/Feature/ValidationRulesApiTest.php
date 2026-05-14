<?php

namespace Tests\Feature;

use Tests\TestCase;

class ValidationRulesApiTest extends TestCase
{
    public function test_validation_rules_index_returns_rules_for_each_item(): void
    {
        $response = $this->getJson('/api/validation/rules');

        $response->assertOk();
        $data = $response->json();
        $this->assertIsArray($data);
        $this->assertCount(3, $data);
        $this->assertIsArray($data[0]);
    }

    public function test_validation_rules_show_chirp(): void
    {
        $response = $this->getJson('/api/validation/rules/chirp');

        $response->assertOk();
        $response->assertJsonStructure(['data']);
        $this->assertIsArray($response->json('data'));
    }

    public function test_validation_rules_show_unknown_returns_404(): void
    {
        $response = $this->getJson('/api/validation/rules/invalid');

        $response->assertNotFound();
    }
}
