<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\PortfolioSnapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status', 'pending');

        $deposits = Deposit::with('user')
            ->when($status !== 'all', fn ($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Deposits', [
            'deposits' => $deposits,
            'filters'  => ['status' => $status],
        ]);
    }

    public function approve(Request $request, Deposit $deposit)
    {
        if ($deposit->status !== 'pending') {
            return back()->withErrors(['error' => 'This deposit has already been processed.']);
        }

        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:255'],
        ]);

        $deposit->update([
            'status'      => 'approved',
            'admin_notes' => $validated['notes'] ?? null,
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        $deposit->user->increment('balance', $deposit->amount);

        PortfolioSnapshot::create([
            'user_id' => $deposit->user_id,
            'balance' => $deposit->user->fresh()->balance,
        ]);

        return back()->with('success', 'Deposit approved and funds credited to user account.');
    }

    public function reject(Request $request, Deposit $deposit)
    {
        if ($deposit->status !== 'pending') {
            return back()->withErrors(['error' => 'This deposit has already been processed.']);
        }

        $validated = $request->validate([
            'notes' => ['required', 'string', 'max:255'],
        ]);

        $deposit->update([
            'status'      => 'rejected',
            'admin_notes' => $validated['notes'],
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Deposit rejected.');
    }
}
