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
        'level',
        'can_manage_peers',
        'permissions',
    ];

    protected $table = self::TABLE;

    protected static array $relationshipEntities = ['permissions'];

    protected static function booted(): void
    {
        static::creating(function (self $role) {
            if (empty($role->guard_name)) {
                $role->guard_name = 'web';
            }
        });
    }

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
            'level' => [
                'label' => 'Level',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
                'rules' => 'required|integer|min:0',
            ],
            'can_manage_peers' => [
                'label' => 'Manage Peers',
                'type' => 'bool',
                'filter' => 'exact',
                'sort' => true,
                'rules' => 'boolean',
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
