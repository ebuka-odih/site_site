<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TradeRequestController;

Route::inertia('/', 'Home')->name('home');
Route::inertia('/company', 'Company')->name('company');
Route::inertia('/portal', 'Portal')->name('portal');

Route::post('/trade-request', [TradeRequestController::class, 'store'])->name('trade-requests.store');
