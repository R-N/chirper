<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    protected $modelClass = Activity::class;
    protected $resourcePagePath = 'system/activity/pages';
    protected $routeBase = 'system.activity';

    public function index(Request $request)
    {
        $items = Activity::query2();

        return ResponseUtil::jsonInertiaResponse([
            'items' => $items,
        ], $this->resourcePagePath.'/Index');
    }

    public function show(Request $request, Activity $activity)
    {
        return ResponseUtil::jsonInertiaResponse([
            'item' => $activity,
        ], $this->resourcePagePath.'/Show');
    }
}
