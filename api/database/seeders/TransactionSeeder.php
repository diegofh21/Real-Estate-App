<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transactions;
use App\Models\BankAccount;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* DB::table('transaction_history')->insert([
                'transaction_history' => Str::random(10),
                'transaction_history' => Str::random(10).'@gmail.com',
                'transaction_history' => Hash::make('password'),
            ]);*/
        /*Transactions::factory()
        ->count(10)
        ->create();*/
        /*Transactions::factory()
            ->count(10)
            ->create();*/
    }
}
