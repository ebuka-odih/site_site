<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Dashboard/Profile', [
            'profileUser' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'phone'             => ['nullable', 'string', 'max:30'],
            'address'           => ['nullable', 'string', 'max:500'],
            'date_of_birth'     => ['nullable', 'date', 'before:today'],
            'employment_status' => ['nullable', 'string', 'max:100'],
            'occupation'        => ['nullable', 'string', 'max:100'],
            'source_of_funds'   => ['nullable', 'string', 'max:100'],
        ]);

        Auth::user()->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => ['required', 'min:8', 'confirmed'],
        ]);

        Auth::user()->update(['password' => $request->input('password')]);

        return back()->with('success', 'Password updated successfully.');
    }
}
