<?php

use Illuminate\Support\Facades\Route;
use Admin\Controllers\AdminAuthController;
use Admin\Controllers\StatementController;
use Admin\Controllers\UserController;

Route::group(['prefix' => 'admin'], function() {
  
  Route::group(['prefix' => 'auth'], function() {
      Route::post('/login', [AdminAuthController::class, 'login']);
      Route::get('/get', [AdminAuthController::class, 'get'])->middleware(['auth:sanctum', 'check_admin_access']);
  });
  
  Route::group(['prefix' => 'statement', 'middleware' => ['auth:sanctum', 'check_admin_access']], function() {
      Route::post('/update/{statement}', [StatementController::class, 'update']);
      Route::get('/get', [StatementController::class, 'get']);
      Route::get('/show/{statement}', [StatementController::class, 'show']);
  });
  
  Route::group(['prefix' => 'user', 'middleware' => ['auth:sanctum', 'check_admin_access']], function() {
      Route::post('/update/{user}', [UserController::class, 'update']);
  });
  
});
