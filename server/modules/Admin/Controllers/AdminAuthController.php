<?php

namespace Admin\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Shared\Models\User;

class AdminAuthController extends Controller
{

    public function login(Request $request) 
    {
        
        $request->validate([
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }
     
        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json(['token' => $token, 'message' => "We're glad to see you."], 200);
    }

    public function get(Request $request) 
    {

        $user = User::find($request->user()->id);
        
        if ($request->user()->cannot('view', $user)) {
            abort(403);
        }

        return response()->json(['user' => $user], 200);
    }

}
