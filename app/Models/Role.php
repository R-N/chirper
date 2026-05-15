<?php

namespace App\Models;

use App\Models\Traits\HasColumnDefinitions;
use App\Models\Traits\HasRelationshipEntities;
use App\Models\Traits\Validable;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasColumnDefinitions;
    use HasRelationshipEntities;
    use Validable;

    public const TABLE = 'roles';

    public const FILLABLE = [
        'name',
        'guard_name',
        'permissions',
    ];

    protected $table = self::TABLE;

    protected static array $relationshipEntities = ['permissions'];

    public static function columns()
    {
        return [
            'id' => [
                'label' => 'ID',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
            ],
            'name' => [
                'label' => 'Name',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|max:255|unique:roles,name',
            ],
            'guard_name' => [
                'label' => 'Guard',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|max:255',
            ],
            'permissions.name' => [
                'label' => 'Permissions',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => 'custom:permissions.name',
                'search' => 'permissions->name',
                'rules' => 'string|max:255|exists:permissions,name',
            ],
            'permissions' => [
                'rules' => 'array',
            ],
            'permissions.*' => [
                'rules' => 'string|max:255|exists:permissions,name',
            ],
        ];
    }

    public static function defaultSort()
    {
        return ['name'];
    }
}
