<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\CrudController;
use App\Models\Activity;

class ActivityController extends CrudController
{
    protected $modelClass = Activity::class;

    protected $resourcePagePath = 'system/activity/pages';

    protected $routeBase = 'system.activity';

    protected array $permissions = [
        'index' => 'activity.view',
        'show' => 'activity.view',
    ];
}
