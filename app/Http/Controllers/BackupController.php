<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Response; 
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Utils\ResponseUtil;
use App\Models\Backup;
use App\Exceptions\BackupException;

class BackupController extends Controller
{
    public function index(Request $request) : Response|JsonResponse
    {
        $backups = Backup::all();
        return ResponseUtil::jsonInertiaResponse([
            'backups' => $backups,
        ], 'system/backups/pages/Index');
    }

    public function store(Request $request) : RedirectResponse|JsonResponse
    {
        try{
            Backup::create();
        }catch(BackupException $e){
            switch($e->getCode()){
                case BackupException::BACKUP_FAILED: {
                    return ResponseUtil::jsonRedirectResponse([
                        'message' => $e->getMessage()
                    ], route('system.backups.index'), 500);
                }
            }
            throw $e;
        }
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Backup created.',
        ], route('system.backups.index'), 201);
    }

    public function show(Backup $backup) : BinaryFileResponse
    {
        return $this->download($backup);
    }

    public function download(Backup $backup) : BinaryFileResponse
    {
        $filePath = Backup::path2($backup->id);
        return response()->download($filePath);
    }

    public function destroy(Request $request, Backup $backup) 
    {
        $backup->delete();
        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$backup->id} deleted.",
        ], route('system.backups.index'));
    }

    public function rename(Request $request, Backup $backup)
    {
        $newName = $request->input('id');
        $oldName = $backup->id;
        $backup->rename($newName);

        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$oldName} renamed to {$newName}.",
            'backup' => $backup,
        ], route('system.backups.index'));
    }

    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|file']);
        $file = $request->file('file');
        $backup = Backup::save($file);
        return ResponseUtil::jsonRedirectResponse([
            'message' => "Backup {$backup->id} uploaded.",
            'backup' => $backup,
        ], route('system.backups.index'), 201);
    }

    public function restore(Request $request, Backup $backup)
    {
        try{
            $backup->restore();
            return ResponseUtil::jsonRedirectResponse([
                'message' => "Backup $backup->id restored.",
            ], route('system.backups.index'));
        }catch(BackupException $e){
            switch($e->getCode()){
                case BackupException::BACKUP_NOT_FOUND: 
                case BackupException::DB_DUMP_NOT_FOUND: {
                    return ResponseUtil::jsonRedirectResponse([
                        'message' => $e->getMessage()
                    ], route('system.backups.index'), 404);
                }
                case BackupException::FAIL_OPEN_ZIP:
                case BackupException::RESTORE_FAILED: {
                    return ResponseUtil::jsonRedirectResponse([
                        'message' => $e->getMessage()
                    ], route('system.backups.index'), 500);
                }
            }
            throw $e;
        }
    }

}
