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

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        //return response('Hello, World!');
        // Chirps has belongsTo relationship with User as user
        $chirps = Chirp::with('user:id,name')->latest()->get();
        if (!$request->wantsJson()) {
            return Inertia::render('chirps/pages/Index', [
                'chirps' => $chirps,
            ]);
        }
        return response()->json([
            'chirps' => $chirps,
        ]);
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
        $chirp = $request->user()->chirps()->create($validated)->load('user:id,name');
 
        if (!$request->wantsJson()) {
            return redirect(route('chirps.index'));
        }

        return response()->json([
            'message' => 'Chirp created successfully!',
            'chirp' => $chirp,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp): Response|JsonResponse
    {
        $chirp = $chirp->load('user:id,name');
        if (!$request->wantsJson()) {
            return Inertia::render('chirps/pages/Chirp', [
                'chirp' => $chirp,
            ]);
        }
        return response()->json([
            'chirp' => $chirp,
        ]);
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
        $chirp->load('user:id,name');
 
        if (!$request->wantsJson()) {
            return redirect(route('chirps.index'));
        }

        return response()->json([
            'message' => 'Chirp updated successfully!',
            'chirp' => $chirp,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Chirp $chirp): RedirectResponse|JsonResponse
    {
        Gate::authorize('delete', $chirp);
 
        $chirp->delete();
 
        if (!$request->wantsJson()) {
            return redirect(route('chirps.index'));
        }

        return response()->json([
            'message' => 'Chirp deleted successfully!',
        ]);
    }
}
