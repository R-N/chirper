<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ArrayUtil;
use App\Utils\ExportUtil;
use App\Utils\ResponseUtil;
use App\Utils\ValidationUtil;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
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
        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), [
                    'name', 'email',
                    'roles', 'roles.*',
                    'permissions', 'permissions.*',
                ]
            )
        );

        // Create the user without setting a password
        $user = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
        ]);
        $user->update($data);

        // Generate a password reset token
        $token = Password::getRepository()->create($user);

        event(new Registered($user));

        // Send the password reset notification with the token
        $user->sendPasswordResetNotification($token);

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.created'),
            'user' => $user,
        ], route('system.users.index'), 201, true);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate(
            ValidationUtil::filterRules(
                ArrayUtil::filterArray(
                    User::rules(), [
                        'name', 'email',
                        'roles', 'roles.*',
                        'permissions', 'permissions.*',
                    ]
                ), ['required']
            )
        );

        $user->update($data);

        // Save the user
        $user->save();

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.updated'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function clearPassword(Request $request, User $user)
    {
        $user->password = null;

        $user->save();

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
        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), ['roles', 'roles.*']
            ),
        );

        // Update the email address
        $user->update($data);
        // Save the user
        $user->save();

        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('user.roles_updated'),
            'user' => $user,
        ], route('system.users.index'));
    }

    public function setPermissions(Request $request, User $user)
    {
        $data = $request->validate(
            ArrayUtil::filterArray(
                User::rules(), ['permissions', 'permissions.*']
            ),
        );

        // Update the email address
        $user->update($data);
        // Save the user
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

    public function getAvailableRoles()
    {
        Log::info('HELLO');
        $allowedRoles = ['chirper'];
        $roles = Role::whereIn('name', $allowedRoles)->get();

        return response()->json([
            'roles' => $roles,
        ]);
    }

    public function getAvailablePermissions()
    {
        $allowedPermissions = [];
        $permissions = Role::whereIn('name', $allowedPermissions)->get();

        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    public function export($type = 'xlsx')
    {
        return ExportUtil::export(User::class, $type);
    }
}
