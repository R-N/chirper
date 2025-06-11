<?php

namespace App\Models;

use App\Events\ChirpCreated;
use App\Models\Traits\HasRelationshipEntities;
use App\Models\Traits\Validable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chirp extends BaseModel
{
    use HasRelationshipEntities, Validable;

    public const TABLE = 'chirps';
    public const FILLABLE = ['message'];
    protected $table = self::TABLE;
    protected $fillable = self::FILLABLE;

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    protected static array $relationshipEntities = ['user:id,name'];

    public static function columns(): array
    {
        return [
            'id' => [
                'label' => 'ID',
                'type' => 'integer',
                'filter' => 'exact',
                'sort' => true,
                'rules' => 'integer|min:0',
            ],
            'message' => [
                'label' => 'Message',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|max:255',
            ],
            'user.name' => [
                'label' => 'User Name',
                'type' => 'relational',
                'filter' => 'partial',
                'sort' => 'custom:user.name',
                'search' => 'user->name',
                'rules' => User::rules()['name'],
            ],
            'created_at' => [
                'label' => 'Created At',
                'type' => 'datetime',
                'filter' => 'partial',
                'sort' => true,
                'search' => 'chirps.created_at',
                'rules' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            ],
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
