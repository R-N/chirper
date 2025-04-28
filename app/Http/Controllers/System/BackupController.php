<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Backup;
use App\Utils\ResponseUtil;
use App\Utils\ExportUtil;
use App\Utils\ValidationUtil;
use App\Utils\ArrayUtil;

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
        $validated = $request->validate(
            ValidationUtil::filterRules(
                ArrayUtil::filterArray(
                    Backup::rules(), ["id"]
                ), ["required"]
            )
        );
        Backup::create();
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
        $validated = $request->validate(
            ValidationUtil::filterRules(
                ArrayUtil::filterArray(
                    Backup::rules(), ["id"]
                ), ["required"]
            )
        );
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
        $backup->restore();
        return ResponseUtil::jsonRedirectResponse([
            'message' => __('backup.restored'),
        ], route('system.backups.index'));
    }

    public function export($type='xlsx')
    {
        return ExportUtil::export(Backup::class, $type);
    }
}
