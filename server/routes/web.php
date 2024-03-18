<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('Not Found!', 404);
});
