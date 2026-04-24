<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function index()
    {
        return redirect()->route('wallet.index');
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'amount'         => ['required', 'numeric', 'min:10', 'max:9999999'],
            'wallet_id'      => ['required', 'exists:wallets,id'],
            'wallet_address' => ['required', 'string', 'max:255'],
        ]);

        $wallet = Wallet::where('is_active', true)->findOrFail($validated['wallet_id']);

        if ((float) $user->balance < (float) $validated['amount']) {
            return back()->withErrors(['amount' => 'Insufficient balance for this withdrawal.']);
        }

        $pendingCount = Withdrawal::where('user_id', $user->id)->where('status', 'pending')->count();
        if ($pendingCount >= 3) {
            return back()->withErrors(['amount' => 'Maximum 3 pending withdrawal requests allowed. Please wait for processing.']);
        }

        Withdrawal::create([
            'user_id'        => $user->id,
            'amount'         => $validated['amount'],
            'currency'       => $wallet->currency,
            'wallet_address' => $validated['wallet_address'],
            'network'        => $wallet->network,
            'status'         => 'pending',
        ]);

        return redirect()->route('wallet.index')
            ->with('success', 'Withdrawal request submitted. Admin has been notified in transaction history.');
    }
}
