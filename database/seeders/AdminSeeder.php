<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@northshoreunlimited.com'],
            [
                'name'        => 'Admin',
                'username'    => 'admin',
                'password'    => Hash::make('Admin@2026!'),
                'role'        => 'admin',
                'is_verified' => true,
                'member_id'   => 'ADMIN-001',
            ]
        );

        User::updateOrCreate(
            ['email' => 'dmf24254@gmail.com'],
            [
                'name'              => 'David Martini Fauteux',
                'username'          => 'dmf24254',
                'password'          => Hash::make('Demo@2026!'),
                'role'              => 'user',
                'balance'           => 125000.00,
                'phone'             => '5087637545',
                'address'           => '174 Union Street, New Bedford, MA 02740, United States',
                'employment_status' => 'Self-Employed',
                'occupation'        => 'IT Consultant',
                'source_of_funds'   => 'Employment Income',
                'pep_status'        => false,
                'tax_id'            => '****8554',
                'is_verified'       => true,
                'member_id'         => 'GCC-8CBFDC8A',
            ]
        );
    }
}
