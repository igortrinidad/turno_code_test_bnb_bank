<?php

namespace User\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStatementRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'value' => 'required',
            'description' => 'required',
            'type' => 'required',
        ];
    }
    
}
