<?php

namespace App\Http\Controllers\System;

use App\Exceptions\LanguageException;
use App\Exceptions\LanguageExceptionCode;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ArrayUtil;
use App\Utils\ResponseUtil;
use App\Utils\ValidationUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function index(Request $request)
    {
        $path = resource_path('lang');

        if (! File::exists($path)) {
            throw new LanguageException(LanguageExceptionCode::NOT_FOUND);
        }

        $locales = collect(File::directories($path))
            ->map(fn ($p) => basename($p))
            ->values();

        return response()->json([
            'items' => $locales,
        ]);
    }

    public function get(Request $request, $locale)
    {
        $path = resource_path("lang/{$locale}");

        if (! File::exists($path)) {
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

    public function setLocale(Request $request)
    {
        $validated = $request->validate(
            ValidationUtil::mergeRules(
                ArrayUtil::filterArray(
                    User::rules(), ['locale']
                ), [
                    'locale' => 'required',
                ]
            )
        );
        $locale = $request->input('locale');
        Session::put('locale', $locale);
        $user = $request->user();
        if ($user) {
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
