<?php

namespace User\Controllers;

use Illuminate\Http\Request;
use Shared\Models\Statement;
use User\Requests\StoreStatementRequest;

class StatementController extends Controller
{
    
    public function get(Request $request) 
    {

        $start_at = $request->input('start_at');
        $end_at = $request->input('end_at');
        $type = $request->input('type');
        $status = $request->input('status');

        $statements = Statement::where('user_id', $request->user()->id)
            ->where(function($query) use ($start_at, $end_at, $type, $status) {
                if ($start_at) {
                    $query->where('created_at', '>=', $start_at);
                }
                if ($end_at) {
                    $query->where('created_at', '<=', $end_at);
                }
                if($type) {
                    $query->where('type', $type);
                }
                if($status) {
                    $query->where('status', $status);
                }
            })
            ->get();

        return response()->json($statements, 200);
    }


    public function store(StoreStatementRequest $request) 
    {

        $statement = new Statement();
        
        $statement->fill([
            'user_id' => $request->user()->id,
            'value' => $request->value,
            'description' => $request->description,
            'type' => $request->type,
            'file_path' => $request->file_path,
        ]);

        if ($request->user()->cannot('create', $statement)) {
            abort(403);
        }

        $statement->save();
     
        return response()->json(['message' => 'Statement succesfully created.'], 200);

    }


}
