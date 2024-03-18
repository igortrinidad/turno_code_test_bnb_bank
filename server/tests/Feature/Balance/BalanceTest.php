<?php

namespace Tests\Feature\Balance;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\StatementTrait;
use Shared\Models\Statement;

class BalanceTest extends TestCase
{

    use UserTrait, StatementTrait;

    /**
     * It should get and verity the user balance
     */
    public function test_match_current_user_balance(): void
    {
        
        $token = $this->get_user_token();
        $user = $this->get_user($token);

        $verified_available = Statement::where('status', 'approved')
          ->where('user_id', $user['id'])
          ->sum('value');
        
        $verified_pending = Statement::where('status', 'pending')
          ->where('user_id', $user['id'])
          ->sum('value');

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->json('GET', '/api/user/balance/get');

        $response_available = $response->json('available');
        $response_pending = $response->json('pending');

        $this->assertEquals($verified_available, $response_available);
        $this->assertEquals($verified_pending, $response_pending);

    }

    /**
     * It should verify the balance updates
     */
    public function test_check_balance_updates(): void
    {
        
        $token = $this->get_user_token();
        $user = $this->get_user($token);

        $verified_available = Statement::where('status', 'approved')
          ->where('user_id', $user['id'])
          ->sum('value');
        
        $verified_pending = Statement::where('status', 'pending')
          ->where('user_id', $user['id'])
          ->sum('value');

        $statements_to_create = [
            [
                'description' => 'Barbershop',
                'value' => -2490,
                'type' => 'purchase',
                'available' => true
            ],
            [
                'description' => 'Groceries',
                'value' => -2945,
                'type' => 'purchase',
                'available' => true
            ],
            [
                'description' => 'Freelancer Jobs 2',
                'value' => 20000,
                'type' => 'check',
                'file_path' => 'https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/12/Check-final-01122021.png',
                'available' => false
            ],
            [
                'description' => 'Freelancer Jobs 3',
                'value' => 12000,
                'type' => 'check',
                'file_path' => 'https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/12/Check-final-01122021.png',
                'available' => false
            ],
            [
                'description' => 'Freelancer Jobs 4',
                'value' => 13500,
                'type' => 'check',
                'file_path' => 'https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/12/Check-final-01122021.png',
                'available' => false
            ],
            [
                'description' => 'Market',
                'value' => -9842,
                'type' => 'purchase',
                'available' => true
            ],
        ];

        foreach($statements_to_create as $statement_to_create) {

            $response = $this->create_statement($statement_to_create['description'], $statement_to_create['value'], $statement_to_create['type'], $statement_to_create['file_path'] ?? null);

            $response->assertStatus(200);

            if($statement_to_create['available']) {
                (float) $verified_available += $statement_to_create['value'];
            } else {
                (float) $verified_pending += $statement_to_create['value'];
            }
            
            $response = $this->withHeaders([
                'Authorization' => "Bearer $token",
            ])->json('GET', '/api/user/balance/get');
    
            $response_available = $response->json('available');
            $response_pending = $response->json('pending');
    
            $this->assertEquals($verified_available, $response_available);
            $this->assertEquals($verified_pending, $response_pending);

        }

    }
    

}
