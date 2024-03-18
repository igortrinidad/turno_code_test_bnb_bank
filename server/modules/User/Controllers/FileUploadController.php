<?php

namespace User\Controllers;

use Illuminate\Support\Facades\Storage;
use User\Requests\GetPresignedUrlRequest;

class FileUploadController extends Controller
{
    
    public function get_presigned_url(GetPresignedUrlRequest $request) 
    {

        $file_path = $request->input('file_path');

        ['url' => $presigned_url] = Storage::temporaryUploadUrl(
          $file_path, now()->addMinutes(5)
        );
     
        return response()->json(['presigned_url' => $presigned_url], 200);

    }

}
