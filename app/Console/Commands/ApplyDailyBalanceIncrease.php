<?php

namespace App\Console\Commands;

use App\Models\PortfolioSnapshot;
use App\Models\User;
use Illuminate\Console\Command;

class ApplyDailyBalanceIncrease extends Command
{
    protected $signature = 'balance:daily-increase';
    protected $description = 'Apply 2% daily balance increase to all users';

    public function handle(): void
    {
        $users = User::where('role', 'user')->where('balance', '>', 0)->get();

        foreach ($users as $user) {
            $increase = $user->balance * 0.02;
            $user->increment('balance', $increase);

            PortfolioSnapshot::create([
                'user_id' => $user->id,
                'balance' => $user->fresh()->balance,
            ]);
        }

        $this->info("Daily 2% balance increase applied to {$users->count()} users.");
    }
}
