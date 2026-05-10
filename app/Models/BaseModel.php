<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasColumnDefinitions;

abstract class BaseModel extends Model
{
    use HasColumnDefinitions;

    protected $table;
    protected $fillable;

    public function __construct($attributes=[])
    {
        parent::__construct($attributes);

        $this->table = $this->table ?? static::TABLE ?? $this->getTable();
        $this->fillable = $this->fillable ?? static::FILLABLE;
    }
}
