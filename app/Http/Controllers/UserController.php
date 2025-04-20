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
use App\Filters\GlobalSearch;
use App\Filters\NotNullFilter;
use App\Sorts\RelationshipField;

class UserController extends Controller
{
    public function index(Request $request) {
        $users = User::query2();
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

        $user->setVerified($data["verified"]);

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
                "message" => "User must be unverified and disabled first.",
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
}
