<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $withdrawals = Withdrawal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dashboard/Withdraw', [
            'withdrawals' => $withdrawals,
            'balance'     => (float) $user->balance,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'amount'         => ['required', 'numeric', 'min:10', 'max:9999999'],
            'currency'       => ['required', 'in:BTC,ETH,USDT,USDC'],
            'wallet_address' => ['required', 'string', 'max:255'],
            'network'        => ['nullable', 'string', 'max:50'],
        ]);

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
            'currency'       => $validated['currency'],
            'wallet_address' => $validated['wallet_address'],
            'network'        => $validated['network'] ?? null,
            'status'         => 'pending',
        ]);

        return redirect()->route('withdrawals.index')
            ->with('success', 'Withdrawal request submitted. Processing within 24–48 hours.');
    }
}
