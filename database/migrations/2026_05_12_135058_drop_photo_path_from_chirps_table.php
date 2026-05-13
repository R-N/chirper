<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('chirps', function (Blueprint $table) {
            if (Schema::hasColumn('chirps', 'photo_path')) {
                $table->dropColumn('photo_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('chirps', function (Blueprint $table) {
            if (!Schema::hasColumn('chirps', 'photo_path')) {
                $table->string('photo_path', 255)->nullable();
            }
        });
    }
};
