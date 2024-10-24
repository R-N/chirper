<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chirp extends Model
{
    # this determines which fields may be mass set
    protected $fillable = [
        'message',
    ];
}
