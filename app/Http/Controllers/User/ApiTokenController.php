<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;
use Inertia\Response;
use Laravel\Jetstream\Jetstream;

class ApiTokenController extends Controller
{
    /**
     * Show the user's API tokens.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $tokens = $user->tokens;

        return ResponseUtil::jsonInertiaResponse([
            'user' => $user,
            'tokens' => $tokens,
            'availablePermissions' => Jetstream::$permissions,
            // 'defaultPermissions' => Jetstream::$defaultPermissions,
        ], 'user/api/pages/Index');
    }
}
