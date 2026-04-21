<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeRequest extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'jurisdiction',
        'estimated_btc_volume',
        'transaction_context',
        'consent',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'consent' => 'boolean',
    ];
}
