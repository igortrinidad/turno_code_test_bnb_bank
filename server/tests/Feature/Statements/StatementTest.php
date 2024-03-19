<?php

namespace Tests\Feature\Statements;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\StatementTrait;
use Shared\Models\Statement;

class StatementTest extends TestCase
{

    use UserTrait, StatementTrait;

    /**
     * It should create a statement succesfully
     */
    public function test_create_statement_and_check(): void
    {
        
        $response = $this->create_statement('Starbucks', -749, 'purchase');

        $response->assertStatus(200);

        $response = $this->create_statement('Freelancer jobs', 25000, 'check', 'https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/12/Check-final-01122021.png');

        $response->assertStatus(200);

    }

    /**
     * It should fail create a statement without token
     */
    public function test_fail_create_statement_without_token(): void
    {
        
        $response = $this->json('POST', '/api/user/statement/store', [
            'description' => 'Starbucks',
            'value' => -749,
            'type' => 'purchase'
        ]);

        $response->assertStatus(401);

    }

    /**
     * It should fail create a statement without token
     */
    public function test_fail_create_statement_using_positive_values(): void
    {
        
        $response = $this->create_statement('Starbucks', 15000, 'purchase');

        $response->assertStatus(422);

    }

    /**
     * It should fail update a statement - just admins can update statements
     */
    public function test_fail_update_statement_from_non_admin_users(): void
    {

        $token = $this->get_user_token();

        $statement_to_update = Statement::where('type', 'check')->first();
        $statement_id = $statement_to_update->id;
        
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->json('POST', "/api/admin/statement/update/$statement_id", [
            'status' => 'approved',
        ]);

        $response->assertStatus(403);

    }

    /**
     * It should allow update a statement using admin user token
     */
    public function test_allow_update_statement_from_admin_users(): void
    {

        $token = $this->get_admin_token();

        $statement_to_update = Statement::where('type', 'check')->first();
        $statement_id = $statement_to_update->id;
        
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->json('POST', "/api/admin/statement/update/$statement_id", [
            'status' => 'approved',
        ]);

        $response->assertStatus(200);

    }

}
