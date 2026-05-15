<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Utils\ArrayUtil;
use App\Utils\ExportUtil;
use App\Utils\ResponseUtil;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
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

        return ResponseUtil::jsonInertiaResponse([
            'items' => Role::query2(),
        ], 'system/roles/pages/Index');
    }

    public function store(Request $request)
    {
        $this->normalizeRelationInput($request, 'permissions');

        $data = $request->validate(
            ArrayUtil::filterArray(
                Role::rules(),
                ['name', 'guard_name', 'permissions', 'permissions.*']
            )
        );

        $permissions = $data['permissions'] ?? [];
        unset($data['permissions']);

        $role = Role::create($data);
        $role->syncPermissions($permissions);
        $role->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('role.created'),
            'role' => $role,
        ], route('system.roles.index'), 201, true);
    }

    public function update(Request $request, Role $role)
    {
        $this->normalizeRelationInput($request, 'permissions');

        $rules = ValidationUtil::filterRules(
            ArrayUtil::filterArray(
                Role::rules(),
                ['name', 'guard_name', 'permissions', 'permissions.*']
            ),
            ['required']
        );
        $rules = ValidationUtil::ignoreUniqueId($rules, $role->id);

        $data = $request->validate($rules);
        $permissions = $data['permissions'] ?? null;
        unset($data['permissions']);

        $role->update($data);
        if ($permissions !== null) {
            $role->syncPermissions($permissions);
        }
        $role->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('role.updated'),
            'role' => $role,
        ], route('system.roles.index'));
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('role.deleted'),
        ], route('system.roles.index'));
    }

    public function setPermissions(Request $request, Role $role)
    {
        $this->normalizeRelationInput($request, 'permissions');

        $data = $request->validate(
            ArrayUtil::filterArray(
                Role::rules(),
                ['permissions', 'permissions.*']
            )
        );

        $role->syncPermissions($data['permissions'] ?? []);
        $role->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('role.permissions_updated'),
            'role' => $role,
        ], route('system.roles.index'));
    }

    public function getAvailablePermissions()
    {
        return response()->json([
            'permissions' => Permission::query()->orderBy('name')->get(),
        ]);
    }

    public function export($type = 'xlsx')
    {
        return ExportUtil::export(Role::class, $type);
    }
}
