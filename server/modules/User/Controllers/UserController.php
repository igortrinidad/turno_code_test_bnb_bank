<?php

namespace User\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Shared\Models\User;
use User\Requests\StoreUserRequest;
use User\Requests\LoginUserRequest;

class UserController extends Controller
{

    public function store(StoreUserRequest $request) 
    {

        User::create([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password'))
        ]);
     
        return response()->json(['message' => 'User created succesfully.'], 200);
    }

    public function login(LoginUserRequest $request) 
    {
        
        $user = User::where('username', $request->input('username'))->first();
        
        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;
        
        // \Log::debug('login ' . $request->get('username') . ' - ' . $user->username . ' | token: ' . $token);

        return response()->json(['token' => $token, 'message' => "We're glad to see you."], 200);
    }


    public function get(Request $request) 
    {

        $user = User::find($request->user()->id);
        
        if ($request->user()->cannot('view', $user)) {
            abort(403);
        }

        // \Log::debug('getgetget ' . $request->user()->username . ' -> ' . $user['username']);

        return response()->json(['user' => $user], 200);
    }


    public function update(Request $request, User $user) 
    {

        if ($request->user()->cannot('update', $user)) {
            abort(403);
        }

        // \Log::debug('update ' . $user->username . ' - ' . $request->user()->username);

        $user->fill($request->all())->save();

        return response()->json(['message' => 'User updated succesfully.'], 200);
        
    }

}
