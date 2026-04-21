<?php

namespace App\Http\Controllers;

use App\Mail\TradeRequestReceived;
use App\Models\TradeRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class TradeRequestController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'jurisdiction' => ['nullable', 'string', 'max:255'],
            'estimated_btc_volume' => ['required', 'string', 'max:255'],
            'transaction_context' => ['nullable', 'string', 'max:5000'],
            'consent' => ['accepted'],
        ]);

        TradeRequest::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'jurisdiction' => $validated['jurisdiction'] ?? null,
            'estimated_btc_volume' => $validated['estimated_btc_volume'],
            'transaction_context' => $validated['transaction_context'] ?? null,
            'consent' => true,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        Mail::to('trade@northshoreunlimited.com')->send(new TradeRequestReceived($validated));

        return back()->with('success', 'Request transmitted. Our desk operations will process your inquiry shortly.');
    }
}
