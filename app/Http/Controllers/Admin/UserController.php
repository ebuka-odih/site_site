<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\PortfolioSnapshot;
use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::where('role', 'user')
            ->when($search, fn ($q) => $q->where(fn ($q2) => $q2
                ->where('name', 'like', "%{$search}%")
                ->orWhere('username', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
            ))
            ->withCount(['deposits', 'withdrawals'])
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Users', [
            'users'   => $users,
            'filters' => ['search' => $search],
        ]);
    }

    public function show(User $user)
    {
        abort_if($user->role === 'admin', 403);

        $deposits = Deposit::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(15)
            ->get();

        $withdrawals = Withdrawal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(15)
            ->get();

        $stats = [
            'total_deposited'     => (float) Deposit::where('user_id', $user->id)->where('status', 'approved')->sum('amount'),
            'total_withdrawn'     => (float) Withdrawal::where('user_id', $user->id)->whereIn('status', ['approved', 'completed'])->sum('amount'),
            'pending_deposits'    => Deposit::where('user_id', $user->id)->where('status', 'pending')->count(),
            'pending_withdrawals' => Withdrawal::where('user_id', $user->id)->where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/UserDetail', [
            'profileUser' => $user,
            'deposits'    => $deposits,
            'withdrawals' => $withdrawals,
            'stats'       => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:users,username'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', Password::min(8)],
        ]);

        $memberId = 'GCC-' . strtoupper(Str::random(8));
        while (User::where('member_id', $memberId)->exists()) {
            $memberId = 'GCC-' . strtoupper(Str::random(8));
        }

        User::create([
            'name'      => $validated['name'],
            'username'  => $validated['username'],
            'email'     => $validated['email'],
            'password'  => $validated['password'],
            'role'      => 'user',
            'member_id' => $memberId,
        ]);

        return back()->with('success', "Account created for {$validated['name']}.");
    }

    public function update(Request $request, User $user)
    {
        abort_if($user->role === 'admin', 403);

        $validated = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'phone'             => ['nullable', 'string', 'max:30'],
            'address'           => ['nullable', 'string', 'max:500'],
            'employment_status' => ['nullable', 'string', 'max:100'],
            'occupation'        => ['nullable', 'string', 'max:100'],
            'source_of_funds'   => ['nullable', 'string', 'max:100'],
            'pep_status'        => ['boolean'],
            'is_verified'       => ['boolean'],
        ]);

        $user->update($validated);

        return back()->with('success', 'User updated successfully.');
    }

    public function addFunds(Request $request, User $user)
    {
        abort_if($user->role === 'admin', 403);

        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01', 'max:9999999'],
            'notes'  => ['nullable', 'string', 'max:255'],
        ]);

        $user->increment('balance', $validated['amount']);

        Deposit::create([
            'user_id'        => $user->id,
            'amount'         => $validated['amount'],
            'currency'       => 'USD',
            'status'         => 'approved',
            'admin_notes'    => 'Manual credit by admin: ' . ($validated['notes'] ?? 'No notes'),
            'approved_by'    => Auth::id(),
            'approved_at'    => now(),
        ]);

        PortfolioSnapshot::create([
            'user_id' => $user->id,
            'balance' => $user->fresh()->balance,
        ]);

        return back()->with('success', '$' . number_format($validated['amount'], 2) . " added to {$user->name}'s account.");
    }
}
