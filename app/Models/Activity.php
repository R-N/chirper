<?php

namespace App\Models;

use App\Models\Traits\HasColumnDefinitions;
use Spatie\Activitylog\Models\Activity as SpatieActivity;

class Activity extends SpatieActivity
{
    use HasColumnDefinitions;

    public const TABLE = 'activity_log';

    protected $table = self::TABLE;

    protected $appends = [
        'causer_name',
        'subject_label',
    ];

    public static function columns()
    {
        return [
            'id' => [
                'label' => 'ID',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
            ],
            'log_name' => [
                'label' => 'Log',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
            ],
            'description' => [
                'label' => 'Event',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
            ],
            'subject_type' => [
                'label' => 'Subject Type',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
            ],
            'subject_id' => [
                'label' => 'Subject ID',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
            ],
            'causer_type' => [
                'label' => 'Causer Type',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
            ],
            'causer_id' => [
                'label' => 'Causer ID',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
            ],
            'properties' => [
                'label' => 'Properties',
                'type' => 'json',
                'sort' => false,
            ],
            'created_at' => [
                'label' => 'Created At',
                'type' => 'datetime',
                'filter' => 'partial',
                'sort' => true,
            ],
            'date_from' => [
                'label' => 'From',
                'type' => 'date',
                'filter' => 'custom',
                'filter_class' => \App\Filters\DateFromFilter::class,
            ],
            'date_to' => [
                'label' => 'To',
                'type' => 'date',
                'filter' => 'custom',
                'filter_class' => \App\Filters\DateToFilter::class,
            ],
        ];
    }

    public static function defaultSort()
    {
        return ['-id'];
    }

    public function getCauserNameAttribute(): ?string
    {
        return $this->causer?->name;
    }

    public function getSubjectLabelAttribute(): ?string
    {
        if ($this->subject) {
            $shortName = (new \ReflectionClass($this->subject))->getShortName();

            return $shortName.': '.($this->subject->name ?? '#'.$this->subject->id);
        }

        if ($this->subject_type && $this->subject_id) {
            $shortName = class_basename($this->subject_type);

            return $shortName.' #'.$this->subject_id;
        }

        return null;
    }
}
