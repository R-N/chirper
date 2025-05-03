<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('general/pages/Dashboard');
    }
}
