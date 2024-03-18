<?php

namespace User\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPresignedUrlRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file_path' => 'required'
        ];
    }
    
}
