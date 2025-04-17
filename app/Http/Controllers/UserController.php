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

class UserController extends Controller
{
    public function index() {
        $users = User::withEntities()
            ->select(
                'id', 'email', 'name', 'enabled', 'email_verified_at'
            )->get();
        return ResponseUtil::jsonInertiaResponse([
            "users" => $users
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
    
        // Assign roles if provided
        if (!empty($data['roles'])) {
            $user->syncRoles($data['roles']);
        }
    
        // Generate a password reset token
        $token = Password::getRepository()->create($user);

        // Send the password reset notification with the token
        $user->sendPasswordResetNotification($token);
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => "User created.",
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
            "message" => "User updated.",
            "user" => $user
        ], route('system.users.index'));
    }

    public function clearPassword(Request $request, User $user) {
        $user->password = null;

        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => "User password cleared.",
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
            "message" => "User enabled set to $user->enabled.",
            "user" => $user
        ], route('system.users.index'));
    }


    public function setVerified(Request $request, User $user) {
        $data = $request->validate([
            'verified' => ['required', 'boolean'],
        ]);
        $verified = $data["verified"];

        if ($verified){
            $user->email_verified_at = now();
        }else{
            $user->email_verified_at = null;
        }

        $user->save();
    
        $user->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            "message" => "User verified set to $user->verified.",
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
            "message" => "User roles updated.",
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
            "message" => "User permissions updated.",
            "user" => $user
        ], route('system.users.index'));
    }

    public function destroy(Request $request, User $user) {
        if ($user->enabled || $user->email_verified_at !== null) {
            return ResponseUtil::jsonRedirectResponse([
                "error" => "User must be unverified and disabled first.",
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
}
