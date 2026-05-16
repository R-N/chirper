<?php

namespace App\Support;

use App\Models\Role;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;

class RoleAuthorization
{
    public static function highestLevel($user): int
    {
        return $user->roles->max('level') ?? 0;
    }

    public static function canManagePeers($user): bool
    {
        return $user->roles->contains(fn ($role) => $role->can_manage_peers);
    }

    public static function isTargetPeer($actor, $target): bool
    {
        $actorLevel = static::highestLevel($actor);
        $targetLevel = $target instanceof Role
            ? $target->level
            : static::highestLevel($target);

        return $targetLevel >= $actorLevel;
    }

    public static function assignableRoles($user): Collection
    {
        $level = static::highestLevel($user);
        $canManagePeers = static::canManagePeers($user);

        return Role::where('level', '<', $level)
            ->when($canManagePeers, fn ($q) => $q->orWhere('level', $level))
            ->orderBy('level', 'desc')
            ->get();
    }

    public static function assignablePermissions($user): Collection
    {
        $permissionNames = $user->roles->flatMap->permissions->pluck('name')->unique();

        return Permission::whereIn('name', $permissionNames)
            ->orderBy('name')
            ->get();
    }

    public static function canCreateRole($user, int $level, bool $canManagePeers = false): bool
    {
        $ownLevel = static::highestLevel($user);

        if ($level > $ownLevel) {
            return false;
        }

        if ($level === $ownLevel && ! static::canManagePeers($user)) {
            return false;
        }

        if ($canManagePeers && $level >= $ownLevel) {
            return false;
        }

        return true;
    }

    public static function canEditRole($user, Role $target): bool
    {
        $ownLevel = static::highestLevel($user);

        if ($target->level > $ownLevel) {
            return false;
        }

        if ($target->level === $ownLevel) {
            return static::canManagePeers($user);
        }

        return true;
    }

    public static function canDeleteRole($user, Role $target): bool
    {
        return $target->level < static::highestLevel($user);
    }

    public static function canEditUserRoles($user, $target): bool
    {
        return static::highestLevel($target) <= static::highestLevel($user);
    }

    public static function canRemoveUserRole($user, $target, Role $role): bool
    {
        $ownLevel = static::highestLevel($user);
        $targetHighest = static::highestLevel($target);

        if ($targetHighest >= $ownLevel) {
            return false;
        }

        return true;
    }

    public static function canRemoveUserPermission($user, $target): bool
    {
        return static::highestLevel($target) < static::highestLevel($user);
    }

    public static function assertRoleCreate($user, int $level, bool $canManagePeers = false): void
    {
        if (! static::canCreateRole($user, $level, $canManagePeers)) {
            throw new AuthorizationException(__('role.cannot_create_role'));
        }
    }

    public static function assertRoleUpdate($user, Role $target, ?int $newLevel = null, ?bool $newCanManagePeers = null): void
    {
        if (! static::canEditRole($user, $target)) {
            throw new AuthorizationException(__('role.cannot_edit_role'));
        }

        $ownLevel = static::highestLevel($user);
        $isPeer = $target->level === $ownLevel;

        if ($isPeer) {
            if ($newLevel !== null && $newLevel !== $target->level) {
                throw new AuthorizationException(__('role.cannot_change_peer_level'));
            }
            if ($newCanManagePeers !== null && $newCanManagePeers !== $target->can_manage_peers) {
                throw new AuthorizationException(__('role.cannot_change_peer_management'));
            }
        }

        if ($newLevel !== null && $newLevel >= $ownLevel && $newLevel !== $target->level) {
            throw new AuthorizationException(__('role.cannot_set_level_higher'));
        }
    }

    public static function assertRoleDelete($user, Role $target): void
    {
        if (! static::canDeleteRole($user, $target)) {
            throw new AuthorizationException(__('role.cannot_delete_role'));
        }
    }

    public static function assertUserRoles($user, $target, array $newRoles, array $oldRoles = []): void
    {
        $ownLevel = static::highestLevel($user);
        $canManagePeers = static::canManagePeers($user);
        $targetHighest = static::highestLevel($target);
        $isTargetPeer = $targetHighest >= $ownLevel;

        if ($isTargetPeer && ! $canManagePeers) {
            throw new AuthorizationException(__('user.cannot_edit_peer'));
        }

        $assignable = static::assignableRoles($user);
        $assignableNames = $assignable->pluck('name')->toArray();

        foreach ($newRoles as $roleName) {
            if (! in_array($roleName, $assignableNames)) {
                throw new AuthorizationException(__('user.cannot_assign_role', ['role' => $roleName]));
            }
        }

        if ($isTargetPeer) {
            $removed = array_diff($oldRoles, $newRoles);
            if (! empty($removed)) {
                throw new AuthorizationException(__('user.cannot_remove_peer_roles'));
            }
        }
    }

    public static function assertUserPermissions($user, $target, array $newPermissions, array $oldPermissions = []): void
    {
        $ownLevel = static::highestLevel($user);
        $canManagePeers = static::canManagePeers($user);
        $targetHighest = static::highestLevel($target);
        $isTargetPeer = $targetHighest >= $ownLevel;

        if ($isTargetPeer && ! $canManagePeers) {
            throw new AuthorizationException(__('user.cannot_edit_peer'));
        }

        $assignable = static::assignablePermissions($user);
        $assignableNames = $assignable->pluck('name')->toArray();

        foreach ($newPermissions as $permName) {
            if (! in_array($permName, $assignableNames)) {
                throw new AuthorizationException(__('user.cannot_assign_permission', ['permission' => $permName]));
            }
        }

        if ($isTargetPeer) {
            $removed = array_diff($oldPermissions, $newPermissions);
            if (! empty($removed)) {
                throw new AuthorizationException(__('user.cannot_remove_peer_permissions'));
            }
        }
    }
}
