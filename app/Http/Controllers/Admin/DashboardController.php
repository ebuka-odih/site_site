<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\User;
use App\Models\Withdrawal;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users'         => User::where('role', 'user')->count(),
            'total_balance'       => (float) User::where('role', 'user')->sum('balance'),
            'pending_deposits'    => Deposit::where('status', 'pending')->count(),
            'pending_withdrawals' => Withdrawal::where('status', 'pending')->count(),
            'total_deposited'     => (float) Deposit::where('status', 'approved')->sum('amount'),
            'total_withdrawn'     => (float) Withdrawal::whereIn('status', ['approved', 'completed'])->sum('amount'),
        ];

        $pendingDeposits = Deposit::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $pendingWithdrawals = Withdrawal::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recentUsers = User::where('role', 'user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Index', [
            'stats'              => $stats,
            'pendingDeposits'    => $pendingDeposits,
            'pendingWithdrawals' => $pendingWithdrawals,
            'recentUsers'        => $recentUsers,
        ]);
    }
}
