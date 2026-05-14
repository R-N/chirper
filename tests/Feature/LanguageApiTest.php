<?php

namespace Tests\Feature;

use Tests\TestCase;

class LanguageApiTest extends TestCase
{
    public function test_lang_index_returns_locale_list(): void
    {
        $response = $this->getJson('/api/lang');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
        $items = $response->json('items');
        $this->assertContains('en', $items);
        $this->assertContains('id', $items);
    }

    public function test_lang_get_returns_translation_groups(): void
    {
        $response = $this->getJson('/api/lang/en');

        $response->assertOk();
        $response->assertJsonStructure(['items']);
        $this->assertArrayHasKey('chirp', $response->json('items'));
    }

    public function test_lang_get_unknown_locale_returns_404(): void
    {
        $response = $this->getJson('/api/lang/zz-nonexistent');

        $response->assertNotFound();
    }
}
