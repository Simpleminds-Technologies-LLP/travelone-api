<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Last updated products
Route::post('/viator/last_updated_products', 'App\Http\Controllers\ViatorController@last_modified_since_product');

// Last updated availability schedules
Route::post('/viator/last_updated_availability_schedules', 'App\Http\Controllers\ViatorController@last_modified_availability_schedules');

// Single product availability schedules
Route::post('/viator/single_availability_schedules', 'App\Http\Controllers\ViatorController@single_product_availability_schedules');

// Single product sync
Route::post('/viator/single_product_search', 'App\Http\Controllers\ViatorController@single_fetch_product');

// Product availability check
Route::post('/viator/availability/check', 'App\Http\Controllers\ViatorController@availability_check');

// Bookings cart hold
Route::post('/viator/bookings/cart_hold', 'App\Http\Controllers\ViatorController@bookings_cart_hold');

// Viator destinations
Route::post('/viator/destinations', 'App\Http\Controllers\ViatorController@viator_destinations');

// Set daily cron job
Route::get('/cron/update_activity_availability_schedules', 'App\Http\Controllers\ViatorController@update_activity_availability_schedules');

// Sync viator products in TravelOne
Route::get('/viator/sync/{country_id}/{start}', 'App\Http\Controllers\SyncController@sync_viator_product_list');



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