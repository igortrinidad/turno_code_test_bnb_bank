<?php
namespace Tests\Traits;

trait UserTrait
{

  protected function get_user_token($username = 'customer@test.com', $password = 'password', $device_name = 'test'): string|null
  {

    $response = $this->json('POST', '/api/user/auth/login', [
      'username' => $username,
      'password' => $password,
      'device_name' => $device_name
    ]);

    return $response->json('token');
    
  }

  protected function get_user($token): array
  {

    $response = $this->withHeaders([
      'Authorization' => "Bearer $token",
      'Accept' => 'application/json',
      ])->json('GET', '/api/user/auth/get');
    
    $user = $response->json('user');

    // \Log::debug('get_user with token: ' . $token . ' | user: ' . $user['username']);
    
    return $response->json('user');

  }

  protected function create_user($name = 'Customer User', $username = 'customer@test.com', $password = 'password')
  {

    $response = $this->json('POST', '/api/user/auth/store', [
        'name' => $name,
        'username' => $username,
        'password' => $password
    ]);

    return $response;

  }

  protected function get_admin_token($username = 'admin@test.com', $password = 'password', $device_name = 'test'): string|null
  {
    $response = $this->json('POST', '/api/admin/auth/login', [
      'username' => $username,
      'password' => $password,
      'device_name' => $device_name
    ]);

    return $response->json('token');
  }

  protected function get_admin($token): array
  {

    $response = $this->withHeaders([
      'Authorization' => "Bearer $token",
      'Accept' => 'application/json',
    ])->json('GET', '/api/admin/auth/get');

    return $response->json('user');

  }
  
}