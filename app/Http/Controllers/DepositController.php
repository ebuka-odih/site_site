<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index()
    {
        return redirect()->route('wallet.index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'   => ['required', 'numeric', 'min:10', 'max:9999999'],
            'wallet_id' => ['required', 'exists:wallets,id'],
            'tx_hash'  => ['nullable', 'string', 'max:255'],
            'proof'    => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,webp', 'max:5120'],
        ]);

        $wallet = Wallet::where('is_active', true)->findOrFail($validated['wallet_id']);

        $proofPath = null;
        if ($request->hasFile('proof') && $request->file('proof')->isValid()) {
            $proofPath = $request->file('proof')->store('deposits/proofs', 'public');
        }

        Deposit::create([
            'user_id'        => Auth::id(),
            'amount'         => $validated['amount'],
            'currency'       => $wallet->currency,
            'wallet_address' => $wallet->address,
            'tx_hash'        => $validated['tx_hash'] ?? null,
            'proof_path'     => $proofPath,
            'status'         => 'pending',
        ]);

        return redirect()->route('wallet.index')
            ->with('success', 'Deposit request submitted. Admin will review it from transaction history.');
    }
}
