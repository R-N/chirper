<?php

namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('general/pages/Dashboard');
    }
}
