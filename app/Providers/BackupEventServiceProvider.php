<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Backup\Events\DumpingDatabase;
use Illuminate\Support\Facades\Event;

class BackupEventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Add --clean to pg_dump command
        Event::listen(DumpingDatabase::class, function (DumpingDatabase $event) {
            if (method_exists($event->dbDumper, 'addExtraOption')) {
                $event->dbDumper->addExtraOption('--clean');
                $event->dbDumper->addExtraOption('--if-exists'); // optional but safer
            }
        });
    }
}
