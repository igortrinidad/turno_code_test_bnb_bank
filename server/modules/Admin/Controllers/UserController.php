<?php

namespace Admin\Controllers;

use Illuminate\Http\Request;
use Shared\Models\User;
use Admin\Requests\UpdateUserRequest;

class UserController extends Controller
{

    public function update(Request $request, User $user) 
    {

        if ($request->user()->cannot('update', $user)) {
            abort(403);
        }

        $user->fill($request->all())->save();

        return response()->json(['message' => 'User updated succesfully.'], 200);
        
    }

}
