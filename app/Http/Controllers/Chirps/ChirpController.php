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

    public function store(Request $request)
    {
        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|max:2048']);
        }
        $validated = $this->modelClass::validateRequest($request);
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('chirps', 'public');
        }
        if ($this->userOwned) {
            $item = $request->user()->{$this->pluralName()}()->create($validated);
        } else {
            $item = $this->modelClass::create($validated);
        }
        if ($this->hasRelationshipEntities) {
            $item->loadEntities();
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey . '.created'),
            'item' => $item,
        ], route($this->routeBase . '.index'), 201, true);
    }

    public function update(Request $request, $id)
    {
        $item = $this->modelClass::findOrFail($id);
        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|max:2048']);
        }
        $validated = $this->modelClass::validateRequest($request, true, $id);
        if ($request->hasFile('photo')) {
            if ($item->photo) {
                Storage::disk('public')->delete($item->photo);
            }
            $validated['photo'] = $request->file('photo')->store('chirps', 'public');
        }
        $item->update($validated);
        if ($this->hasRelationshipEntities) {
            $item->loadEntities();
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey . '.updated'),
            'item' => $item,
        ], route($this->routeBase . '.index'));
    }
}
