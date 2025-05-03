<?php

namespace App\Utils;

use App\Exports\GenericExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;

class ExportUtil
{
    public static function filter($items, $filter = null)
    {
        if ($filter) {
            $items = $items->map(function ($item) use ($filter) {
                return Arr::only($item, $filter);
            });
        }

        return $items;
    }

    public static function export($model, $export, $type = 'xlsx')
    {
        $request = request();
        $type = $request->query('export_type', $type);
        $columns = $request->query('columns', null);
        $name = class_basename($model);
        $timestamp = now();
        $filename = "{$name}_{$timestamp}";

        $items = $model::collection($columns);

        switch ($type) {
            case 'csv':
                return Excel::download(
                    new GenericExport($items),
                    "$filename.csv",
                    \Maatwebsite\Excel\Excel::CSV
                );
            case 'pdf':
                try {
                    $headings = $columns || array_keys($items[0]);
                    $pdf = Pdf::loadView('exports.generic_pdf', [
                        'name' => $name,
                        'timestamp' => $timestamp,
                        'headings' => $headings,
                        'items' => $items,
                    ]);

                    return $pdf->download("$filename.pdf");
                } catch (Exception $e) {
                    return Excel::download(
                        new GenericExport($items),
                        "$filename.pdf",
                        \Maatwebsite\Excel\Excel::DOMPDF
                    );
                }
            case 'xlsx':
                return Excel::download(
                    new GenericExport($items),
                    "$filename.xlsx"
                );
        }
        abort(400);
    }
}
