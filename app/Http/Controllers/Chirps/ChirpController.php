<?php

namespace App\Http\Controllers\Chirps;

use App\Http\Controllers\Controller;
use App\Models\Chirp;
use App\Utils\ArrayUtil;
use App\Utils\ExportUtil;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function fetch($request = null)
    {
        $chirps = Chirp::query2();

        return $chirps;
    }

    public function index(Request $request)
    {
        if ($request->query('export_type')) {
            return $this->export();
        }
        $chirps = $this->fetch($request);

        return ResponseUtil::jsonInertiaResponse([
            'items' => $chirps['data'],
        ], 'chirps/pages/Index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index2(Request $request)
    {
        if ($request->query('export_type')) {
            return $this->export();
        }
        $chirps = $this->fetch($request);

        return ResponseUtil::jsonInertiaResponse([
            'items' => $chirps,
        ], 'chirps/pages/Index2');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = Chirp::validateRequest($request);

        // user() gets the User object (model)
        // the User model has hasMany relationship to Chirps as chirps function
        $chirp = $request->user()->chirps()->create($validated)->loadEntities();

        // event(new ChirpCreated($chirp));
        // automatically dispatched

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('chirp.created'),
            'chirp' => $chirp,
        ], route('chirps.index'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Chirp $chirp)
    {
        $chirp = $chirp->loadEntities();

        return ResponseUtil::jsonInertiaResponse([
            'chirp' => $chirp,
        ], 'chirps/pages/Chirp');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp)
    {
        Gate::authorize('update', $chirp);

        $validated = Chirp::validateRequest($request, true);

        $chirp->update($validated);
        $chirp->loadEntities();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('chirp.updated'),
            'chirp' => $chirp,
        ], route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Chirp $chirp)
    {
        Gate::authorize('delete', $chirp);

        $chirp->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('chirp.deleted'),
        ], route('chirps.index'));
    }

    public function export($type = 'xlsx')
    {
        return ExportUtil::export(Chirp::class, $type);
    }

    public function bulkDestroy(Request $request)
    {
        $data = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:chirps,id',
        ]);

        Chirp::whereIn('id', $data['ids'])->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __('chirp.deleted'),
        ], route('chirps.index'));
    }
}
