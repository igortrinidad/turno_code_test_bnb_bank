<?php

namespace Database\Seeders;

use Shared\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Admin User',
            'username' => 'admin@test.com',
            'password' => 'password',
            'role' => 'admin'
        ]);

    }
}
