<?php

namespace User\Controllers;

use Illuminate\Http\Request;
use Shared\Models\Statement;

class BalanceController extends Controller
{
    
    public function get(Request $request) 
    {

        $user_id = $request->user()->id;

        $incomes = Statement::where('status', '!=', 'rejected')
          ->where('user_id', $user_id)
          ->where('type', 'check')
          ->sum('value');
        
        $expenses = Statement::where('user_id', $user_id)
          ->where('type', 'purchase')
          ->sum('value');

        $available = Statement::where('status', 'approved')
          ->where('user_id', $user_id)
          ->sum('value');

        $pending = Statement::where('status', 'pending')
          ->where('user_id', $user_id)
          ->sum('value');
     
        return response()->json([
          'incomes' => $incomes,
          'expenses' => $expenses,
          'available' => $available, 
          'pending' => $pending
        ], 200);

    }

}
