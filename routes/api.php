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
Route::get('/viator/product_search/{country_id}/{start}', 'App\Http\Controllers\ViatorController@fetch_product_list');

// single product sync
Route::post('/viator/single_product_search', 'App\Http\Controllers\ViatorController@single_fetch_product');

// product availability check
Route::post('/viator/availability/check', 'App\Http\Controllers\ViatorController@availability_check');

// bookings cart hold
Route::post('/viator/bookings/cart_hold', 'App\Http\Controllers\ViatorController@bookings_cart_hold');

// viator destinations
Route::post('/viator/destinations', 'App\Http\Controllers\ViatorController@viator_destinations');

// set daily cron job
Route::get('/cron/update_activity_availability_schedules', 'App\Http\Controllers\ViatorController@update_activity_availability_schedules');



// VIATOR COUNTRY SYNCED DATA
// Canada       => 75
// USA          => 77
// France       => 51
// Spain        => 67
// Mexico       => 76
// Australia    => 22
// New Zealand  => 24
// Italy        => 57
// Japan        => 16
// Indonesia    => 15
// Singapore    => 18
// Malaysia     => 17
// Thailand     => 20
// UAE          => 743
// Cambodia     => 12
// Vietnam      => 21
// South Africa => 11

// */60 * * * * wget -q -O /dev/null "http://api.travelone.io/api/viator/product_search/75/0"
// */60 * * * * wget -q -O /dev/null "http://api.travelone.io/api/viator/product_search/75/31"
// */60 * * * * wget -q -O /dev/null "http://api.travelone.io/api/viator/product_search/75/61"
// */60 * * * * wget -q -O /dev/null "http://api.travelone.io/api/viator/product_search/75/91"