<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
    private array $wallets = [
        'BTC'  => 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        'ETH'  => '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        'USDT' => 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
        'USDC' => '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    ];

    public function index()
    {
        $user = Auth::user();

        $deposits = Deposit::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dashboard/Deposit', [
            'deposits' => $deposits,
            'wallets'  => $this->wallets,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'   => ['required', 'numeric', 'min:10', 'max:9999999'],
            'currency' => ['required', 'in:BTC,ETH,USDT,USDC'],
            'tx_hash'  => ['nullable', 'string', 'max:255'],
            'proof'    => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,webp', 'max:5120'],
        ]);

        $proofPath = null;
        if ($request->hasFile('proof') && $request->file('proof')->isValid()) {
            $proofPath = $request->file('proof')->store('deposits/proofs', 'public');
        }

        Deposit::create([
            'user_id'        => Auth::id(),
            'amount'         => $validated['amount'],
            'currency'       => $validated['currency'],
            'wallet_address' => $this->wallets[$validated['currency']],
            'tx_hash'        => $validated['tx_hash'] ?? null,
            'proof_path'     => $proofPath,
            'status'         => 'pending',
        ]);

        return redirect()->route('deposits.index')
            ->with('success', 'Deposit request submitted successfully. It will be reviewed within 24 hours.');
    }
}
