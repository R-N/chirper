<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Utils\ArrayUtil;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::query2();

        return ResponseUtil::jsonInertiaResponse([
            'items' => $settings,
            'setting_types' => Setting::TYPES,
        ], 'system/settings/pages/Index');
    }

    public function store(Request $request)
    {
        $data = $request->validate(
            ArrayUtil::filterArray(
                Setting::rules(), [
                    'key', 'type', 'value', 'options',
                ]
            )
        );

        $setting = Setting::create([
            'key' => $data['key'],
            'type' => $data['type'],
            'value' => $data['value'],
            'options' => $data['options'],
        ]);

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('settings.created'),
            'setting' => $setting,
        ], route('system.settings.index'), 201, true);
    }

    public function show(Request $request, Setting $setting)
    {
        return ResponseUtil::jsonInertiaResponse([
            'setting' => $setting,
        ], 'system/settings/pages/Show');
    }

    public function update(Request $request, Setting $setting)
    {
        $validated = $request->validate(
            ArrayUtil::filterArray(Setting::rules(), ['type', 'value'])
        );

        $setting->update($validated);

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('settings.updated'),
            'setting' => $setting,
        ], route('system.settings.index'));
    }

    public function destroy(Request $request, Setting $setting)
    {
        $setting->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('settings.deleted'),
        ], route('system.settings.index'));
    }

    public function fetchTypes()
    {
        return response()->json([
            'items' => Setting::TYPES,
        ]);
    }
}
