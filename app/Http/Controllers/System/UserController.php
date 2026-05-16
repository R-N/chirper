<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\RoleAuthorization;
use App\Utils\ArrayUtil;
use App\Utils\ExportUtil;
use App\Utils\ResponseUtil;
use App\Utils\ValidationUtil;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    private function normalizeRelationInput(Request $request, string $field): void
    {
        if ($request->has($field)) {
            $values = $request->input($field);
            if (is_array($values)) {
                $request->merge([
                    $field => array_map(fn($v) => is_string($v) ? $v : ($v['name'] ?? $v), $values),
                ]);
            }
        }
    }

    public function index(Request $request)
    {
        if ($request->query('export_type')) {
            return $this->export();
        }

        $users = User::query2();

        return ResponseUtil::jsonInertiaResponse([
            'items' => $users,
        ], 'system/users/pages/Index');
    }

    public function show(Request $request, User $user)
    {
        $user->loadEntities();

        return ResponseUtil::jsonInertiaResponse([
            'item' => $user,
        ], 'system/users/pages/Show');
    }

    public function store(Request $request)
    {
        $this->normalizeRelationInput($request, 'roles');
        $this->normalizeRelationInput($request, 'permissions');

        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), [
                    'name', 'email',
                    'roles', 'roles.*',
                    'permissions', 'permissions.*',
                ]
            )
        );

        if (isset($data['roles'])) {
            RoleAuthorization::assertUserRoles($request->user(), new User, $data['roles']);
        }
        if (isset($data['permissions'])) {
            RoleAuthorization::assertUserPermissions($request->user(), new User, $data['permissions']);
        }

        $user = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
        ]);
        $user->update($data);

        event(new Registered($user));

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.created'),
            'user' => $user,
        ], route('system.users.index'), 201, true);
    }

    public function update(Request $request, User $user)
    {
        $this->normalizeRelationInput($request, 'roles');
        $this->normalizeRelationInput($request, 'permissions');

        $rules = ValidationUtil::filterRules(
            ArrayUtil::filterArray(
                User::rules(), [
                    'name', 'email',
                    'roles', 'roles.*',
                    'permissions', 'permissions.*',
                ]
            ), ['required']
        );
        $rules = ValidationUtil::ignoreUniqueId($rules, $user->id);

        $data = $request->validate($rules);

        if (isset($data['roles'])) {
            $oldRoles = $user->roles->pluck('name')->toArray();
            RoleAuthorization::assertUserRoles($request->user(), $user, $data['roles'], $oldRoles);
        }
        if (isset($data['permissions'])) {
            $oldPermissions = $user->permissions->pluck('name')->toArray();
            RoleAuthorization::assertUserPermissions($request->user(), $user, $data['permissions'], $oldPermissions);
        }

        $user->update($data);
        $user->save();
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.updated'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function clearPassword(Request $request, User $user)
    {
        $user->update([
            'password' => null,
        ]);

        $user->save();

        $user->resetPassword();

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.password_cleared'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function setEnabled(Request $request, User $user)
    {
        $field = 'enabled';
        $data = $request->validate(
            ValidationUtil::mergeRules(
                ArrayUtil::filterArray(
                    User::rules(), [$field]
                ), [$field => 'required'], true
            )
        );
        $enabled = $data['enabled'];

        $user->enabled = $enabled;

        $user->save();

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.enabled_set', ['enabled' => $user->enabled]),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function setVerified(Request $request, User $user)
    {
        $field = 'verified';
        $data = $request->validate(
            ValidationUtil::mergeRules(
                ArrayUtil::filterArray(
                    User::rules(), [$field]
                ), [$field => 'required'], true
            )
        );

        $user->setVerified($data['verified']);

        $user->save();

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.verified_set', ['verified' => $user->verified]),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function setRoles(Request $request, User $user)
    {
        $this->normalizeRelationInput($request, 'roles');

        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), ['roles', 'roles.*']
            ),
        );

        $oldRoles = $user->roles->pluck('name')->toArray();
        RoleAuthorization::assertUserRoles($request->user(), $user, $data['roles'], $oldRoles);

        $user->update($data);
        $user->save();
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.roles_updated'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function setPermissions(Request $request, User $user)
    {
        $this->normalizeRelationInput($request, 'permissions');

        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), ['permissions', 'permissions.*']
            ),
        );

        $oldPermissions = $user->permissions->pluck('name')->toArray();
        RoleAuthorization::assertUserPermissions($request->user(), $user, $data['permissions'], $oldPermissions);

        $user->update($data);
        $user->save();
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.permissions_updated'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->enabled || $user->email_verified_at !== null) {
            return ResponseUtil::jsonRedirectResponse([
                'message' => __('user.require_disabled_unverified'),
                'display' => true,
            ], route('system.users.index'), 400);
        }
        $user->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => 'User deleted.',
        ], route('system.users.index'));
    }

    public function getAvailableRoles(Request $request)
    {
        return response()->json([
            'roles' => RoleAuthorization::assignableRoles($request->user()),
        ]);
    }

    public function getAvailablePermissions(Request $request)
    {
        return response()->json([
            'permissions' => RoleAuthorization::assignablePermissions($request->user()),
        ]);
    }

    public function export($type = 'xlsx')
    {
        return ExportUtil::export(User::class, $type);
    }
}
