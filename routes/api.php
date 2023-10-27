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

// product availability check
Route::post('/viator/availability/check', 'App\Http\Controllers\ViatorController@availability_check')->name('availability_check');

// bookings cart hold
Route::post('/viator/bookings/cart_hold', 'App\Http\Controllers\ViatorController@bookings_cart_hold')->name('bookings_cart_hold');