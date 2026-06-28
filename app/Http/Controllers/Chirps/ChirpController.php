<?php

namespace App\Http\Controllers\Chirps;

use App\Http\Controllers\CrudController;
use App\Models\Chirp;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChirpController extends CrudController
{
    protected $modelClass = Chirp::class;

    protected $resourcePagePath = 'chirps/pages';

    protected $routeBase = 'chirps';

    protected $translationKey = 'chirp';

    protected $hasRelationshipEntities = true;

    protected $mayExport = true;

    protected $userOwned = true;

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

    protected function beforeCreate(array $validated, Request $request): array
    {
        return $this->handlePhoto($validated, $request);
    }

    protected function beforeUpdate(array $validated, Request $request, $item): array
    {
        if ($request->hasFile('photo') && $item->photo) {
            Storage::disk('public')->delete($item->photo);
        }

        return $this->handlePhoto($validated, $request);
    }

    private function handlePhoto(array $validated, Request $request): array
    {
        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|max:2048']);
            $validated['photo'] = $request->file('photo')->store('chirps', 'public');
        }

        return $validated;
    }
}
