<?php

namespace Tests\Feature\FileUpload;

use Tests\TestCase;
use Tests\Traits\UserTrait;

class FileUploadTest extends TestCase
{

    use UserTrait;

    /**
     * It should create a presigned url to upload directly it from frontend to AWS S3 succesfully
     */
    public function test_create_file_upload_presigned_url(): void
    {
        
        $token = $this->get_user_token();

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->json('POST', '/api/user/file_upload/get_presigned_url', [
            'file_path' => 'turno_code_test/checks/Check-final-01122021.png',
        ]);

        $response->assertStatus(200)->assertJsonStructure([
            'presigned_url',
        ]);

    }
    
    /**
     * It should create a presigned url to upload directly it from frontend to AWS S3 succesfully
     */
    public function test_fail_create_file_upload_presigned_url_without_token(): void
    {
        
        $response = $this->json('POST', '/api/user/file_upload/get_presigned_url', [
            'file_path' => 'turno_code_test/checks/Check-final-01122021.png',
        ]);

        $response->assertStatus(401);

    }

}
