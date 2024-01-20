<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// last updated products
Route::post('/viator/last_updated_products', 'App\Http\Controllers\ViatorController@last_modified_since_product');

// last updated availability schedules
Route::post('/viator/last_updated_availability_schedules', 'App\Http\Controllers\ViatorController@last_modified_availability_schedules');

// single product availability schedules
Route::post('/viator/single_availability_schedules', 'App\Http\Controllers\ViatorController@single_product_availability_schedules');

// product search
Route::post('/viator/product_search', 'App\Http\Controllers\ViatorController@fetch_product_list');

// product availability check
Route::post('/viator/availability/check', 'App\Http\Controllers\ViatorController@availability_check');

// bookings cart hold
Route::post('/viator/bookings/cart_hold', 'App\Http\Controllers\ViatorController@bookings_cart_hold');

// viator destinations
Route::post('/viator/destinations', 'App\Http\Controllers\ViatorController@viator_destinations');

// set daily cron job
Route::get('/cron/update_activity_availability_schedules', 'App\Http\Controllers\ViatorController@update_activity_availability_schedules');