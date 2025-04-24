<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Utils\ResponseUtil;
use App\Models\Backup;
use App\Exceptions\BackupException;
use App\Utils\ExportUtil;

class BackupController extends Controller
{
    public function index(Request $request)
    {
        if ($request->query("export_type"))
            return $this->export();
        $backups = Backup::all();
        return ResponseUtil::jsonInertiaResponse([
            'items' => $backups,
        ], 'system/backups/pages/Index');
    }

    public function store(Request $request)
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
            'message' => __('backup.created'),
        ], route('system.backups.index'), 201);
    }

    public function show(Backup $backup)
    {
        return $this->download($backup);
    }

    public function download(Backup $backup)
    {
        $filePath = Backup::path2($backup->id);
        return response()->download($filePath);
    }

    public function destroy(Request $request, Backup $backup) 
    {
        $backup->delete();
        return ResponseUtil::jsonRedirectResponse([
            'message' => __('backup.deleted', ['backup_id' => $backup->id]),
        ], route('system.backups.index'));
    }

    public function rename(Request $request, Backup $backup)
    {
        $newName = $request->input('id');
        $oldName = $backup->id;
        $backup->rename($newName);

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('backup.renamed', [
                'old_name' => $oldName,
                'new_name' => $newName,
            ]),
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
            'message' => __('backup.uploaded'),
            'backup' => $backup,
        ], route('system.backups.index'), 201);
    }

    public function restore(Request $request, Backup $backup)
    {
        try{
            $backup->restore();
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('backup.restored'),
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

    public function export($type='xlsx')
    {
        return ExportUtil::export(Backup::class, $type);
    }
}
