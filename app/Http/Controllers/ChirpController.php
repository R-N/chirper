<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response; 
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseUtil;

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|JsonResponse
    {
        //return response('Hello, World!');
        // Chirps has belongsTo relationship with User as user
        $chirps = Chirp::withEntities()->latest()->get();
        return ResponseUtil::jsonInertiaResponse([
            'chirps' => $chirps,
        ], 'chirps/pages/Index');
    }
    /**
     * Display a listing of the resource.
     */
    public function index2(Request $request): Response|JsonResponse
    {
        $chirps = Chirp::withEntities()->latest()->get();
        return ResponseUtil::jsonInertiaResponse([
            'chirps' => $chirps,
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
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        //
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        //user() gets the User object (model)
        //the User model has hasMany relationship to Chirps as chirps function
        $chirp = $request->user()->chirps()->create($validated)->loadEntities();
 
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Chirp created.',
            'chirp' => $chirp,
        ], route('chirps.index'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Chirp $chirp): Response|JsonResponse
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
    public function update(Request $request, Chirp $chirp) : RedirectResponse|JsonResponse
    {
        Gate::authorize('update', $chirp);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $chirp->update($validated);
        $chirp->loadEntities();
 
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Chirp updated.',
            'chirp' => $chirp,
        ], route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Chirp $chirp): RedirectResponse|JsonResponse
    {
        Gate::authorize('delete', $chirp);
 
        $chirp->delete();
 
        return ResponseUtil::jsonRedirectResponse([
            'message' => 'Chirp deleted.',
        ], route('chirps.index'));
    }
}
