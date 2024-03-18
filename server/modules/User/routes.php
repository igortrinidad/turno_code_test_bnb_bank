<?php

use Illuminate\Support\Facades\Route;
use User\Controllers\UserController;
use User\Controllers\StatementController;
use User\Controllers\FileUploadController;
use User\Controllers\BalanceController;

Route::group(['prefix' => 'user'], function() {
    
    Route::group(['prefix' => 'auth'], function() {
        Route::post('/store', [UserController::class, 'store']);
        Route::post('/login', [UserController::class, 'login']);
        Route::get('/get', [UserController::class, 'get'])->middleware('auth:sanctum');
        Route::post('/update/{user}', [UserController::class, 'update'])->middleware('auth:sanctum');
    });
    
    Route::group(['prefix' => 'statement', 'middleware' => 'auth:sanctum'], function() {
        Route::post('/store', [StatementController::class, 'store']);
        Route::get('/get', [StatementController::class, 'get']);
    });
    
    Route::group(['prefix' => 'file_upload', 'middleware' => 'auth:sanctum'], function() {
        Route::post('/get_presigned_url', [FileUploadController::class, 'get_presigned_url']);
    });
    
    Route::group(['prefix' => 'balance', 'middleware' => 'auth:sanctum'], function() {
        Route::get('/get', [BalanceController::class, 'get']);
    });

});

