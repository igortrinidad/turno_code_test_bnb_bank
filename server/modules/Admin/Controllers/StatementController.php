<?php

namespace Admin\Controllers;

use Illuminate\Http\Request;
use Shared\Models\Statement;

class StatementController extends Controller
{
    
    public function show(Request $request, Statement $statement) 
    {

        $statement->load('user');
        
        return response()->json($statement, 200);

    }

    public function get(Request $request) 
    {

        $start_at = $request->input('start_at');
        $end_at = $request->input('end_at');
        $status = $request->input('status');

        $statements = Statement::where(function($query) use ($start_at, $end_at) {
                if ($start_at) {
                    $query->where('created_at', '>=', $start_at);
                }
                if ($end_at) {
                    $query->where('created_at', '<=', $end_at);
                }
            })
            ->where('type', 'check')
            ->where('status', $status)
            ->get();

        return response()->json($statements, 200);

    }

    public function update(Request $request, Statement $statement) 
    {

        $request->validate([
            'status' => 'required',
        ]);

        $statement->fill([
            'verified_by_user_id' => $request->user()->id,
            'status' => $request->status,
            'reject_reason' => $request->reject_reason,
        ]);

        if ($request->user()->cannot('update', $statement)) {
            abort(403);
        }

        $statement->save();
     
        return response()->json(['message' => 'Statement succesfully created.'], 200);

    }

}
