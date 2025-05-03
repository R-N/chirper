<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class GenericExport implements FromCollection, WithHeadings
{
    protected $data;

    protected $headers;

    public function __construct($data, $headers = null)
    {
        $this->data = collect($data);
        $this->headers = $headers;
        if (! $this->headers) {
            $first = $this->data->first();
            if ($first) {
                $this->headers = array_keys($first);
            }
        }
    }

    public function collection()
    {
        return $this->data;
    }

    public function headings(): array
    {
        return $this->headers;
    }
}
