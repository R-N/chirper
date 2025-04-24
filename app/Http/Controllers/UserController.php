<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Utils\ResponseUtil;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Password;
use App\Utils\ExportUtil;

class UserController extends Controller
{
    public function index(Request $request) {
        if ($request->query("export_type"))
            return $this->export();
        $users = User::query2();
        return ResponseUtil::jsonInertiaResponse([
            "items" => $users
        ], "system/users/pages/Index");
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);
    
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
            "message" => __('user.created'),
            "user" => $user
        ], route('system.users.index'), 201, true);
    }
    
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'email' => ['email', Rule::unique('users')->ignore($user->id)],
            'name' => 'string',
            'enabled' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);
    
        $user->update($data);
    
        // Save the user
        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('user.updated'),
            "user" => $user
        ], route('system.users.index'));
    }

    public function clearPassword(Request $request, User $user) {
        $user->password = null;

        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('user.password_cleared'),
            "user" => $user
        ], route('system.users.index'));
    }

    public function setEnabled(Request $request, User $user) {
        $data = $request->validate([
            'enabled' => ['required', 'boolean'],
        ]);
        $enabled = $data["enabled"];

        $user->enabled = $enabled;

        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('user.enabled_set', ['enabled' => $user->enabled]),
            "user" => $user
        ], route('system.users.index'));
    }


    public function setVerified(Request $request, User $user) {
        $data = $request->validate([
            'verified' => ['required', 'boolean'],
        ]);

        $user->setVerified($data["verified"]);

        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" =>  __('user.verified_set', ['verified' => $user->verified]),
            "user" => $user
        ], route('system.users.index'));
    }

    
    public function setRoles(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
        ]);
    
        // Update the email address
        $user->update($data);
        // Save the user
        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('user.roles_updated'),
            "user" => $user
        ], route('system.users.index'));
    }

    public function setPermissions(Request $request, User $user)
    {
        $data = $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);
    
        // Update the email address
        $user->update($data);
        // Save the user
        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => __('user.permissions_updated'),
            "user" => $user
        ], route('system.users.index'));
    }

    public function destroy(Request $request, User $user) {
        if ($user->enabled || $user->email_verified_at !== null) {
            return ResponseUtil::jsonRedirectResponse([
                "message" => __('user.require_disabled_unverified'),
                "display" => true,
            ], route('system.users.index'), 400);
        }
        $user->delete();
        return ResponseUtil::jsonRedirectResponse([
            "message" => "User deleted.",
        ], route('system.users.index'));
    }

    public function getAvailableRoles(){
        $allowedRoles = ['chirper'];
        $roles = Role::whereIn('name', $allowedRoles)->get();
        return response()->json([
            'roles' => $roles,
        ]);
    }

    public function getAvailablePermissions(){
        $allowedPermissions = [];
        $permissions = Role::whereIn('name', $allowedPermissions)->get();
        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    public function export($type='xlsx')
    {
        return ExportUtil::export(User::class, $type);
    }
}
