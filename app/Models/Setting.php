<?php

namespace App\Models;

use App\Support\Cacher;
use App\Support\Decimal;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Spatie\Activitylog\Traits\LogsActivity;

class Setting extends BaseModel
{
    use Traits\Validable, LogsActivity;

    public const TABLE = 'settings';

    protected $table = self::TABLE;

    public const FILLABLE = ['key', 'type', 'value', 'options'];
    protected $fillable = self::FILLABLE;

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty();
    }

    public const TYPES = ['int', 'bool', 'decimal', 'date', 'datetime', 'time', 'enum', 'string', 'array', 'object'];

    protected $casts = [
        'options' => 'array',
    ];

    public static function columns()
    {
        return [
            'key' => [
                'label' => 'Key',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|max:255',
            ],
            'type' => [
                'label' => 'Type',
                'type' => 'string',
                'filter' => 'partial',
                'search' => true,
                'rules' => 'string|max:255|in:'.implode(',', self::TYPES),
            ],
            'value' => [
                'label' => 'Value',
                'type' => 'string',
                'filter' => 'partial',
                'search' => true,
                'rules' => 'nullable|string',
            ],
            'options' => [
                'label' => 'Options',
                'type' => 'json',
                'rules' => 'nullable',
            ],
            'updated_at' => [
                'label' => 'Last Modified',
                'type' => 'datetime',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            ],
        ];
    }

    public static function defaultSort()
    {
        return ['key'];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($setting) {
            if (array_key_exists('value', $setting->getAttributes())) {
                $setting->validateValue($setting->value);
            }
        });
    }

    public static function fetchDict()
    {
        return Cacher::remember(self::TABLE, null, function () {
            return Setting::all()->mapWithKeys(fn ($setting) => [
                $setting->key => $setting->value,
            ]);
        });
    }

    public function getValueAttribute()
    {
        $raw = $this->attributes['value'] ?? null;

        return match ($this->type) {
            'int' => (int) $raw,
            'bool' => filter_var($raw, FILTER_VALIDATE_BOOLEAN),
            'decimal' => Decimal::fromDatabase($raw),
            'date' => Carbon::parse($raw)->startOfDay(),
            'datetime' => Carbon::parse($raw),
            'time' => Carbon::createFromFormat('H:i:s', $raw),
            'enum' => $raw,
            'string' => (string) $raw,
            'array' => json_decode($raw, true),
            'object' => json_decode($raw, true),
            default => $raw,
        };
    }

    public static function getValidationRule($type): string
    {
        return match ($type) {
            'int' => 'integer',
            'bool' => 'boolean',
            'decimal' => 'numeric',
            'date' => 'date',
            'datetime' => 'date',
            'time' => 'date_format:H:i:s',
            'enum' => 'string',
            'string' => 'string',
            'array' => 'array',
            'object' => 'json',
            default => 'nullable',
        };
    }

    public function validateValue($value)
    {
        return Validator::make(
            ['value' => $value],
            ['value' => self::getValidationRule($this->type)]
        )->validate();
    }

    public function update(array $attributes = [], array $options = [])
    {
        if (array_key_exists('value', $attributes)) {
            $this->validateValue($attributes['value']);
        }

        Cacher::forgetAll(self::TABLE);

        return parent::update($attributes, $options);
    }

    public static function get(string $key)
    {
        return Cacher::remember(self::TABLE, $key, fn () => static::where('key', $key)->first()?->value);
    }

    public static function set(string $key, mixed $value)
    {
        $setting = static::firstOrCreate(['key' => $key]);
        $setting->validateValue($value);
        $setting->value = $value;
        $setting->save();
        Cacher::forget(self::TABLE, $key);

        return $setting;
    }
}
