<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use App\Models\Wallet;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Dashboard/Wallet', [
            'wallets' => Wallet::where('is_active', true)
                ->orderBy('currency')
                ->orderBy('network')
                ->get(),
            'deposits' => Deposit::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(8, ['*'], 'deposits_page'),
            'withdrawals' => Withdrawal::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(8, ['*'], 'withdrawals_page'),
            'balance' => (float) $user->balance,
        ]);
    }
}
