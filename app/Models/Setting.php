<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use App\Support\Decimal;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Filters\GlobalSearch;
use App\Utils\QueryUtil;
use App\Utils\ExportUtil;
use App\Utils\ValidationUtil;
use Illuminate\Support\Facades\Validator;

class Setting extends Model
{
    public const TABLE = "settings";
    protected $table = self::TABLE;

    protected $fillable = ['key', 'type', 'value', 'options'];
    public const TYPES = ['int', 'bool', 'decimal', 'date', 'datetime', 'time', 'enum', 'string'];

    protected $casts = [
        'options' => 'array',
    ];

    public function getValueAttribute()
    {
        $raw = $this->attributes['value'] ?? null;
        return match ($this->type) {
            'int'       => (int) $raw,
            'bool'      => filter_var($raw, FILTER_VALIDATE_BOOLEAN),
            'decimal'   => Decimal::fromDatabase($raw),
            'date'      => Carbon::parse($raw)->startOfDay(),
            'datetime'  => Carbon::parse($raw),
            'time'      => Carbon::createFromFormat('H:i:s', $raw),
            'enum'      => $raw, // assume you’ll validate externally
            'string'    => (string) $raw,
            default     => $raw,
        };
    }

    public static function getValidationRule($type): string
    {
        return match ($type) {
            'int'       => 'integer',
            'bool'      => 'boolean',
            'decimal'   => 'numeric',
            'date'      => 'date',
            'datetime'  => 'date',
            'time'      => 'date_format:H:i:s',
            'enum'      => 'string',
            'string'    => 'string',
            default     => 'nullable',
        };
    }

    public function validateValue($value){
        $validated = Validator::make(
            ['value' => $value],
            ['value' => self::getValidationRule($this->type)] // assume this returns a string or array
        )->validate();
    }

    public function update(array $attributes = [], array $options = [])
    {
        if (array_key_exists('value', $attributes)) {
            $this->validateValue($attributes['value']);
    
            // $attributes['value'] = self::toDatabase($attributes['value']);
        }
    
        return parent::update($attributes, $options);
    }
    
    public static function get(string $key)
    {
        return cache()->remember("setting_{$key}", 3600, fn () =>
            static::where('key', $key)->first()?->casted_value
        );
    }

    public static function set(string $key, mixed $value)
    {
        $setting = static::firstOrCreate(['key' => $key]);
        $setting->value = $value;
        $setting->save();
        self::forget("setting_{$key}");
        return $setting;
    }

    public static function forget(string $key){
        cache()->forget("setting_{$key}");
    }
    public static function query2($raw=false){
        $validated = request()->validate(
            ValidationUtil::buildQueryRules("settings", Setting::rules(), [
                'key', 'type', 
            ])
        );
        $items = QueryBuilder::for(Setting::class)
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalSearch([
                    'key', 'type', 'value', 'updated_at'
                ])),
                AllowedFilter::exact('id'),
                AllowedFilter::partial('key'),
                AllowedFilter::partial('type'),
                AllowedFilter::partial('value'),
                AllowedFilter::partial('updated_at'),
            ])
            ->allowedSorts([
                'key',
                'updated_at',
            ])
            ->defaultSort([
                'key',
            ]);
        if ($raw)
            return $items;
        $items = QueryUtil::paginateQuery($items);
        return $items;
    }

    public static function collection($filter=null){
        $items = self::query2(true)
            ->get()
            ->map(fn($item) => [
                'Key' => $item->key,
                'Type' => $item->type,
                'Value' => $item->value,
                'Options' => $item->options,
                'Last Modified' => $item->updated_at,
            ]);
        $items = ExportUtil::filter($items, $filter);
        return $items;
    }

    public static function rules()
    {
        $rules = [
            'key' => 'required|string|max:255',
            'type' => 'string|max:255|in:' . implode(',', self::TYPES),
            'value' => 'nullable|string',
            'options' => 'nullable',
            'updated_at' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
        ];
        $rules = ValidationUtil::duplicateRules($rules);
        return $rules;
    }
}
