<?php

namespace App\Models;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

use ZipArchive;
use \Illuminate\Support\Facades\Log;
use App\Exceptions\BackupException;
use Illuminate\Contracts\Support\Arrayable;

class Backup implements Arrayable
{
    protected const DISK = 'backup';
    protected static $APP_NAME = 'Chirper';
    protected const TEMP_DIR = 'restore-temp';

    protected static $DISK = null;

    public $id;
    public $size = 0;
    public $modified;

    public static function init(){
        self::$APP_NAME = env("APP_NAME", 'Chirper');
        self::$DISK = Storage::disk(self::DISK);
    }

    public function __construct($file)
    {
        $this->id = basename($file);
        $filePath = self::path1($this->id);
        if (!self::$DISK->exists($filePath)) {
            throw new BackupException("Backup $this->id not found.", BackupException::BACKUP_NOT_FOUND);
        }
        $this->size = self::$DISK->size($filePath);
        $this->modified = self::$DISK->lastModified($filePath);
    }
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'size' => $this->size,
            'modified' => $this->modified,
        ];
    }
    static function path1($file){
        return self::$APP_NAME . "/$file";
    }
    static function path2($file){
        return self::$DISK->path(self::path1($file));
    }

    public static function all()
    {
        $files = self::$DISK->files(self::$APP_NAME);
        $backups = collect($files)
            ->map(fn($file) => new self($file));
        return $backups;
    }
    public static function get($file){
        return new self($file);
    }
    public static function create() 
    {
        Artisan::call('backup:run', [
            // '--filename' => $request->input('id'),
            '--only-db' => true,
        ]);
        $output = Artisan::output();
        if (strpos($output, 'Error') !== false || strpos($output, 'failed') !== false) {
            Log::error('Backup failed: ' . $output);
            throw new BackupException("Backup failed: $output", BackupException::BACKUP_FAILED);
        } 
        Log::info('Backup succeeded: ' . $output);
        return true;
    }
    public function delete(){
        $filePath = self::path1($this->id);
        self::$DISK->delete($filePath);
    }
    public function rename($newName)
    {
        $filePath = self::path1($this->id);
        $newPath = self::path1($newName);
        self::$DISK->move($filePath, $newPath);
        $this->id = $newName;
    }
    public static function save($file)
    {
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs(self::$APP_NAME, $fileName, self::DISK);
        return new self($fileName);
    }

    public function restore(){
        $filePath = self::path1($this->id);

        try{
            // Check if the backup file exists
            if (!self::$DISK->exists($filePath)) {
                throw new BackupException("Backup $this->id not found.", BackupException::BACKUP_NOT_FOUND);
            }
            // Create the temp directory if it doesn't exist
            $tempDir = self::path2(self::TEMP_DIR);
            if (!is_dir($tempDir)) {
                mkdir($tempDir, 0777, true);
            }

            // Define the full path to the backup zip file
            $fullPath = self::$DISK->path($filePath);

            // Open the zip file
            $zip = new ZipArchive();
            if ($zip->open($fullPath) !== TRUE) {
                // If unable to open the zip file
                throw new BackupException("Failed to open ZIP archive: $this->id.", BackupException::FAIL_OPEN_ZIP);
            }
            // Extract the zip file contents to the temp directory
            $zip->extractTo($tempDir);
            $zip->close();

            // Find the extracted SQL file (assuming there is only one SQL file in the zip)
            $sqlDir = $tempDir . DIRECTORY_SEPARATOR . 'db-dumps';
            $extractedFiles = scandir($sqlDir);
            $sqlFile = null;
            foreach ($extractedFiles as $f) {
                if (pathinfo($f, PATHINFO_EXTENSION) === 'sql') {
                    $sqlFile = $f;
                    break;
                }
            }

            if ($sqlFile === null) {
                throw new BackupException("No SQL file found in $this->id backup zip.", BackupException::DB_DUMP_NOT_FOUND);
            }
            // Define the path to the extracted SQL file
            $sqlFilePath = $sqlDir . DIRECTORY_SEPARATOR . $sqlFile;

            // Run the restore command using the extracted SQL file
            $command = "psql -U " . env('DB_USERNAME') . " -d " . env('DB_DATABASE') . " -f $sqlFilePath 2>&1";

            exec($command, $output, $status);

            $output = implode("\n", $output);

            // Check if the restore was successful
            if ($status !== 0) {
                Log::error('Restore failed: ' . $output);
                throw new BackupException("Error restoring backup $this->id: $output", BackupException::RESTORE_FAILED);
            }
            // Return success response
            Log::info('Restore succeeded: ' . $output);
            return true;
        }finally{
            $this->cleanupTemp();
        }
    }
    private function cleanupTemp()
    {
        // Delete the temp directory and all its contents
        self::$DISK->deleteDirectory(self::path1(self::TEMP_DIR));
    }
    
}

Backup::init();
