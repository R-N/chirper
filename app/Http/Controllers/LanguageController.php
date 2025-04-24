<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Utils\ArrayUtil;

class LanguageController extends Controller
{
    function index(Request $request){
        $path = resource_path('lang');
    
        if (!File::exists($path)) {
            return response()->json([]);
        }
    
        $locales = collect(File::directories($path))
            ->map(fn($p) => basename($p))
            ->values();
    
        return response()->json([
            'items' => $locales,
        ]);
    }
    function get(Request $request, $locale){
        $path = resource_path("lang/{$locale}");

        if (!File::exists($path)) {
            return response()->json(['message' => __('lang.locale_not_found')], 404);
        }

        $translations = [];

        collect(File::allFiles($path))->each(function ($file) use (&$translations) {
            $key = $file->getFilenameWithoutExtension();
            $translations[$key] = require $file->getPathname();
        });
        // Convert all :param to {param} recursively
        $converted = ArrayUtil::arrayMapRecursive(function ($value) {
            if (is_string($value)) {
                return preg_replace('/:(\w+)/', '{$1}', $value);
            }
            return $value;
        }, $translations);
    
        return response()->json([
            'items' => $converted,
        ]);
    }
}
