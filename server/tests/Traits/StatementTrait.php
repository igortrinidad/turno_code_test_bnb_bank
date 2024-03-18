<?php
namespace Tests\Traits;

use Illuminate\Testing\TestResponse;

trait StatementTrait
{
  protected function create_statement($description = 'Starbucks', $value = -749, $type = 'purchase', $file_path = null): TestResponse
  {
    
    $token = $this->get_user_token();

    $response = $this->withHeaders([
        'Authorization' => "Bearer $token",
    ])->json('POST', '/api/user/statement/store', [
        'description' => $description,
        'value' => $value,
        'type' => $type,
        'file_path' => $file_path
    ]);

    return $response;

  }
  
}