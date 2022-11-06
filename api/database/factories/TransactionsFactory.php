<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\Models\Transactions;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
 */
class TransactionsFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transactions::class;


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'transaction_number' => $this->faker->numberBetween(11111, 99999),
            'transaction_date' => $this->faker->date('Y-m-d', 'now'),
            'amount' => $this->faker->numberBetween(1, 999)
        ];
    }
}
