<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(
    name: 'validation:export',
    description: 'Export validation rules to Vue frontend as JSON'
)]
class ExportValidationRules extends Command
{
    protected $signature = 'validation:export';

    protected $description = 'Export validation rules to Vue frontend as JSON';

    public function handle()
    {
        $rulesPath = resource_path('js/validations-gen');

        if (! File::exists($rulesPath)) {
            File::makeDirectory($rulesPath, 0755, true);
        }

        $models = $this->getModels(app_path('Models'));

        foreach ($models as $modelClass) {
            if (! method_exists($modelClass, 'rules') || ! defined("$modelClass::TABLE")) {
                $this->warn("Skipping $modelClass (no rules() or TABLE constant)");

                continue;
            }

            $rules = $modelClass::rules();
            $tableName = $modelClass::TABLE;
            $json = json_encode($rules, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

            File::put("$rulesPath/{$tableName}.json", $json);

            $this->info("Exported rules for {$tableName}.");
        }

        $this->info('All validation rules exported successfully!');
    }

    private function getModels($path)
    {
        $models = [];

        foreach (File::allFiles($path) as $file) {
            $relativePath = str_replace([app_path().DIRECTORY_SEPARATOR, '.php'], '', $file->getRealPath());
            $class = str_replace(DIRECTORY_SEPARATOR, '\\', $relativePath);
            $fullClass = 'App\\'.$class;

            if (! class_exists($fullClass)) {
                continue;
            }

            $reflection = new \ReflectionClass($fullClass);

            if ($reflection->isAbstract() || $reflection->isTrait()) {
                continue;
            }

            // 🛠 No check for extends Model anymore
            $models[] = $fullClass;
        }

        return $models;
    }
}
