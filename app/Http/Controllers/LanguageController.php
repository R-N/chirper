<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Utils\ArrayUtil;
use App\Utils\ResponseUtil;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use App\Exceptions\LanguageException;
use App\Exceptions\LanguageExceptionCode;

class LanguageController extends Controller
{
    function index(Request $request){
        $path = resource_path('lang');
    
        if (!File::exists($path)) {
            throw new LanguageException(LanguageExceptionCode::NOT_FOUND);
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
            throw new LanguageException(LanguageExceptionCode::NOT_FOUND);
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
    
    function setLocale(Request $request) {
        $locale = $request->input('locale');
        Session::put('locale', $locale);
        $user = $request->user();
        if ($user){
            $user->locale = $locale;
            $user->save();
        }
        App::setLocale($locale);
        $user->loadEntities();
        return ResponseUtil::jsonRedirectResponse([
            'user' => $user,
            'message' => __('settings.locale_updated', ['locale' => $locale]),
        ], url()->previous());
    }
}
