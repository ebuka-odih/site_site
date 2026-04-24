<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TradeRequestController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Route;

// ─── Public / Marketing ────────────────────────────────────────────────────
Route::inertia('/', 'Home')->name('home');
Route::inertia('/company', 'Company')->name('company');
Route::post('/trade-request', [TradeRequestController::class, 'store'])->name('trade-requests.store');

// ─── Authentication ────────────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])->name('logout')->middleware('auth');

// ─── User Dashboard ────────────────────────────────────────────────────────
Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/deposits', [DepositController::class, 'index'])->name('deposits.index');
    Route::post('/deposits', [DepositController::class, 'store'])->name('deposits.store');

    Route::get('/withdrawals', [WithdrawalController::class, 'index'])->name('withdrawals.index');
    Route::post('/withdrawals', [WithdrawalController::class, 'store'])->name('withdrawals.store');

    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
});

// ─── Admin Dashboard ───────────────────────────────────────────────────────
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/users', [Admin\UserController::class, 'index'])->name('admin.users');
    Route::post('/users', [Admin\UserController::class, 'store'])->name('admin.users.store');
    Route::get('/users/{user}', [Admin\UserController::class, 'show'])->name('admin.users.show');
    Route::put('/users/{user}', [Admin\UserController::class, 'update'])->name('admin.users.update');
    Route::post('/users/{user}/add-funds', [Admin\UserController::class, 'addFunds'])->name('admin.users.add-funds');

    Route::get('/deposits', [Admin\DepositController::class, 'index'])->name('admin.deposits');
    Route::post('/deposits/{deposit}/approve', [Admin\DepositController::class, 'approve'])->name('admin.deposits.approve');
    Route::post('/deposits/{deposit}/reject', [Admin\DepositController::class, 'reject'])->name('admin.deposits.reject');

    Route::get('/withdrawals', [Admin\WithdrawalController::class, 'index'])->name('admin.withdrawals');
    Route::post('/withdrawals/{withdrawal}/approve', [Admin\WithdrawalController::class, 'approve'])->name('admin.withdrawals.approve');
    Route::post('/withdrawals/{withdrawal}/reject', [Admin\WithdrawalController::class, 'reject'])->name('admin.withdrawals.reject');
});
