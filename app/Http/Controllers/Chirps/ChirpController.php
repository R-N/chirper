<?php

namespace App\Http\Controllers\Chirps;

use App\Http\Controllers\CrudController;
use App\Models\Chirp;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;

class ChirpController extends CrudController
{
    protected $modelClass = Chirp::class;
    protected $resourcePagePath = 'chirps/pages';
    protected $routeBase = 'chirps';
    protected $translationKey = 'chirp';
    protected $hasRelationshipEntities = true;
    protected $mayExport = true;
    protected $userOwned = true;
    /**
     * Display a listing of the resource.
     */
    public function index2(Request $request)
    {
        if ($request->query('export_type')) {
            return $this->export();
        }
        $chirps = Chirp::query2();

        return ResponseUtil::jsonInertiaResponse([
            'items' => $chirps,
        ], 'chirps/pages/Index2');
    }
}
