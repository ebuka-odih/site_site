<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Wallets', [
            'wallets' => Wallet::orderBy('currency')
                ->orderBy('network')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:100'],
            'currency'  => ['required', 'string', 'max:10'],
            'network'   => ['nullable', 'string', 'max:50'],
            'address'   => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        Wallet::create($validated);

        return back()->with('success', 'Wallet added successfully.');
    }

    public function update(Request $request, Wallet $wallet)
    {
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:100'],
            'currency'  => ['required', 'string', 'max:10'],
            'network'   => ['nullable', 'string', 'max:50'],
            'address'   => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $wallet->update($validated);

        return back()->with('success', 'Wallet updated successfully.');
    }
}
