<?php

namespace Tests\Feature\Users;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Shared\Models\User;
use Tests\Traits\UserTrait;
use Laravel\Sanctum\Sanctum;

class UserTest extends TestCase
{

    use UserTrait;

    /**
     * It should test the creation of a user.
     */
    public function test_create_user(): void
    {

        $response = $this->create_user();

        $response->assertStatus(200);

    }

    /**
     * It should fail when creating user using the duplicated username.
     */
    public function test_fail_create_user_using_duplicated_username(): void
    {

        $response = $this->create_user('Foo Bar');

        $response->assertStatus(422);
        
    }

    /**
     * It should test the login of a user.
     */
    public function test_login_user(): void
    {

        $token = $this->get_user_token();

        $this->assertNotEmpty($token);

    }

    /**
     * It should fail the login of a user using a wrong password.
     */
    public function test_login_user_fail(): void
    {

        $token = $this->get_user_token('customer@test.com', 'wrong');

        $this->assertNull($token);

    }

    /**
     * It should get the logged user
     */
    public function test_get_logged_user(): void
    {

        $token = $this->get_user_token();

        $user = $this->get_user($token);

        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('name', $user);
        $this->assertArrayHasKey('username', $user);
        $this->assertArrayHasKey('role', $user);
        $this->assertEquals('customer', $user['role']);
        $this->assertEquals('customer@test.com', $user['username']);

    }
    
    /**
     * It should get the logged user
     */
    public function test_fail_get_logged_user(): void
    {

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->json('GET', '/api/user/auth/get');

        $response->assertStatus(401);

    }

    /**
     * It should update logged user using token
     */
    public function test_update_logged_user(): void
    {

        $token = $this->get_user_token();
        $user = $this->get_user($token);

        $user_id = $user['id'];

        $new_name = 'Regular User Updated';

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->json('POST', "/api/user/auth/update/$user_id", [
            'name' => $new_name
        ]);

        $response->assertStatus(200);
        
        $user_refreshed = $this->get_user($token);

        $this->assertEquals($new_name, $user_refreshed['name']);

    }

    /**
     * It should allow update a user instance using a token that belongs to an admin user
     */
    public function test_update_logged_user_using_admin_user_role(): void
    {

        $admin_token = $this->get_admin_token();

        $regular_user = User::where('role', 'customer')->first();
        $regular_user_id = $regular_user->id;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $admin_token",
        ])->json('POST', "/api/admin/user/update/$regular_user_id", [
            'name' => 'Regular User Updated From Admin User',
        ]);

        $response->assertStatus(200);

    }

    /**
     * It should fail if a non admin user tries to access admin routes
     */
    public function test_fail_admin_routes_access(): void
    {

        $regular_token = $this->get_user_token();

        $response = $this->withHeaders([
            'Authorization' => "Bearer $regular_token",
        ])->json('POST', "/api/admin/user/update/1", [
            'name' => 'Regular User Updated From Admin User',
        ]);

        $response->assertStatus(403);

    }

}
