<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(
    name: 'lang:sync-to-frontend',
    description: 'Sync Laravel language files to Vue frontend'
)]
class SyncLangToFrontend extends Command
{
    protected $signature = 'lang:sync-to-frontend';
    protected $description = 'Sync Laravel language files to Vue frontend';

    public function handle()
    {
        $langPath = resource_path('lang');
        $outputPath = resource_path('js/lang-gen');

        // Get all locales (directories inside the lang folder)
        $locales = collect(File::directories($langPath))->map(fn ($dir) => basename($dir));

        foreach ($locales as $locale) {
            $this->info("Processing locale: $locale");

            // Path to output the locale translations in the frontend folder
            $localeOutputPath = "$outputPath/$locale";
            File::ensureDirectoryExists($localeOutputPath);

            // Recursively process all PHP files in the locale directory
            $this->processDirectory($langPath, $locale, $localeOutputPath);

            $this->info("✅ Translations synced for locale: $locale");
        }

        $this->info("✅ All translations synced to Vue!");
        return Command::SUCCESS;
    }

    private function processDirectory(string $langPath, string $locale, string $localeOutputPath)
    {
        // Get all PHP files in the locale directory, including those in subdirectories
        $files = File::allFiles("$langPath/$locale");

        foreach ($files as $file) {
            $relativePath = str_replace("$langPath/$locale", '', $file->getPathname());
            $group = basename($file, '.php');
            
            $lines = require $file->getPathname();

            // Flatten the array and save it as JSON
            $translations = $this->flattenArray($lines, $group);

            // Remove .php from the file name and append .json
            $outputFilePath = $localeOutputPath . $relativePath;
            $outputFilePath = preg_replace('/\.php$/', '.json', $outputFilePath);

            $outputDir = dirname($outputFilePath);

            // Ensure the directory exists
            File::ensureDirectoryExists($outputDir);

            // Save the translations as JSON
            $this->saveJson($translations, $outputFilePath);
        }
    }

    private function flattenArray(array $array, string $prefix = ''): array
    {
        $result = [];
        foreach ($array as $key => $value) {
            $newKey = $prefix ? "$prefix.$key" : $key;
            if (is_array($value)) {
                $result += $this->flattenArray($value, $newKey);
            } else {
                $value = preg_replace_callback('/:([a-zA-Z0-9_]+)/', function($matches) {
                    return '{' . $matches[1] . '}';
                }, $value);
                
                $result[$newKey] = $value;
            }
        }
        return $result;
    }

    private function saveJson(array $translations, string $outputPath)
    {
        // Save translations as a JSON file
        file_put_contents($outputPath, json_encode($translations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}
