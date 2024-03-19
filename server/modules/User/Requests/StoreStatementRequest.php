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
        // Default rules
        $rules = [
            'description' => 'required',
            'type' => 'required',
        ];

        if ($this->input('type') === 'purchase') {
            $rules['value'] = 'required|numeric|max:0';
        } else {
            $rules['value'] = 'required|numeric';
        }

        return $rules;
    }

    
}
