<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

use Inertia\Inertia;
use Inertia\Response; 
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use ZipArchive;
use \Illuminate\Support\Facades\Log;
use App\Utils\ResponseUtil;

class BackupController extends Controller
{
    protected $disk = 'backup';
    protected $appName = 'Chirper';
    protected $tempDir = 'restore-temp';

    public function __construct() {
        $this->appName = env("APP_NAME", 'Chirper');
    }

    function path1($file){
        return "$this->appName/$file";
    }
    function path2($file){
        return Storage::disk($this->disk)->path($this->path1($file));
    }

    function getBackupInfo($file){
        $disk = Storage::disk($this->disk);
        $backup = [
            'id' => basename($file),
            'size' => $disk->size($file),
            'modified' => $disk->lastModified($file),
        ];
        return $backup;
    }

    public function index(Request $request) : Response|JsonResponse
    {
        $files = Storage::disk($this->disk)->files($this->appName);
        $backups = collect($files)->map(fn($file) => $this->getBackupInfo($file));
        return ResponseUtil::jsonInertiaResponse([
            'backups' => $backups,
        ], 'system/backups/pages/Index');
    }

    public function store(Request $request) : RedirectResponse|JsonResponse
    {
        Artisan::call('backup:run', [
            // '--filename' => $request->input('id'),
            '--only-db' => true,
        ]);
        $output = Artisan::output();
        if (strpos($output, 'Error') !== false || strpos($output, 'failed') !== false) {
            Log::error('Backup failed: ' . $output);
            return ResponseUtil::jsonRedirectResponse([
                'message' => "Backup failed: $output",
            ], route('system.backups.index'), 500);
        } 
        Log::info('Backup succeeded: ' . $output);
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Backup created.',
        ], route('system.backups.index'), 201);
    }

    public function show($file) : BinaryFileResponse
    {
        return $this->download($file);
    }

    public function download($file) : BinaryFileResponse
    {
        $filePath = $this->path2($file);
        return response()->download($filePath);
    }

    public function destroy(Request $request, $file) 
    {
        $filePath = $this->path1($file);
        Storage::disk($this->disk)->delete($filePath);
        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$file} deleted.",
        ], route('system.backups.index'));
    }

    public function rename(Request $request, $file)
    {
        $newName = $request->input('id');
        $filePath = $this->path1($file);
        $newPath = $this->path1($newName);
        Storage::disk($this->disk)->move($filePath, $newPath);
        
        $backup = $this->getBackupInfo($newPath);

        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$file} renamed to {$newName}.",
            'backup' => $backup,
        ], route('system.backups.index'));
    }

    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|file']);
        $file = $request->file('file')->getClientOriginalName();
        $filePath = $request->file('file')->storeAs($this->appName, $file, $this->disk);
        $backup = $this->getBackupInfo($this->path1($file));
        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$file} uploaded.",
            'backup' => $backup,
        ], route('system.backups.index'), 201);
    }

    public function restore(Request $request, $file)
    {
        $filePath = $this->path1($file);

        try{
            // Check if the backup file exists
            if (!Storage::disk($this->disk)->exists($filePath)) {
                return ResponseUtil::jsonRedirectResponse([
                    'message' => "Backup $file not found.",
                ], route('system.backups.index'), 404);
            }
            // Create the temp directory if it doesn't exist
            $tempDir = $this->path2($this->tempDir);
            if (!is_dir($tempDir)) {
                mkdir($tempDir, 0777, true);
            }

            // Define the full path to the backup zip file
            $fullPath = Storage::disk($this->disk)->path($filePath);

            // Open the zip file
            $zip = new ZipArchive();
            if ($zip->open($fullPath) !== TRUE) {
                // If unable to open the zip file
                return ResponseUtil::jsonRedirectResponse([
                    'message' => "Failed to open ZIP archive: $file.",
                ], route('system.backups.index'), 500);
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
                return ResponseUtil::jsonRedirectResponse([
                    'message' => "No SQL file found in $file backup zip.",
                ], route('system.backups.index'), 404);
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
                return ResponseUtil::jsonRedirectResponse([
                    'message' => "Error restoring backup $file: $output",
                ], route('system.backups.index'), 500);
            }
            // Return success response
            Log::info('Restore succeeded: ' . $output);
            return ResponseUtil::jsonRedirectResponse([
                'message' => "Backup $file restored.",
            ], route('system.backups.index'));
        }finally{
            $this->cleanupTemp();
        }
    }

    private function cleanupTemp()
    {
        // Delete the temp directory and all its contents
        Storage::disk($this->disk)->deleteDirectory($this->path1($this->tempDir));
    }
}
