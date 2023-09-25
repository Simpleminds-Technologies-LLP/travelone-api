<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// product search
Route::post('/viator/product_search', 'App\Http\Controllers\ViatorController@product_list')->name('viator_product_list');