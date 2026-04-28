<?php

namespace App\Console\Commands;

use App\Models\PortfolioSnapshot;
use App\Models\User;
use Illuminate\Console\Command;

class TakePortfolioSnapshots extends Command
{
    protected $signature = 'portfolio:snapshot';
    protected $description = 'Record daily balance snapshot for every user';

    public function handle(): int
    {
        $users = User::where('role', 'user')->cursor();

        foreach ($users as $user) {
            PortfolioSnapshot::create([
                'user_id' => $user->id,
                'balance' => $user->balance,
            ]);
        }

        $this->info('Portfolio snapshots recorded.');

        return self::SUCCESS;
    }
}
