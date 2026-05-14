<?php

namespace App\Models;

use App\Events\ChirpCreated;
use App\Models\Traits\HasRelationshipEntities;
use App\Models\Traits\Validable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Traits\LogsActivity;

class Chirp extends BaseModel
{
    use HasFactory, HasRelationshipEntities, LogsActivity, Validable;

    public const TABLE = 'chirps';

    public const FILLABLE = ['message', 'photo'];

    protected $table = self::TABLE;

    protected $fillable = self::FILLABLE;

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    protected $appends = ['photo_url'];

    protected static array $relationshipEntities = ['user:id,name'];

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty();
    }

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
            'photo' => [
                'label' => 'Photo',
                'type' => 'string',
                'table' => true,
                'editable' => false,
                'sort' => true,
                'rules' => 'nullable',
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

    public static function defaultSort()
    {
        return ['-created_at'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        if (! $this->photo) {
            return null;
        }

        return Storage::disk('public')->url($this->photo);
    }

    public function deletePhoto(): void
    {
        if ($this->photo) {
            Storage::disk('public')->delete($this->photo);
        }
    }

    protected static function booted(): void
    {
        static::deleted(function ($chirp) {
            $chirp->deletePhoto();
        });
    }
}
