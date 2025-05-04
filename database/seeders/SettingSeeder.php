<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::updateOrCreate([
            'key' => 'default_currency',
        ], [
            'type' => 'enum',
            'value' => 'IDR',
            'options' => json_encode(['IDR', 'USD']),
        ]);
    }
}
