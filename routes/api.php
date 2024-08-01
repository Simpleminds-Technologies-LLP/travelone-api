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
Route::post('/viator/sync/country_list', 'App\Http\Controllers\SyncController@sync_viator_product_list');
Route::get('/viator/sync/single_tour', 'App\Http\Controllers\SyncController@sync_viator_single_product');
Route::get('/viator/sync/availability_schedules', 'App\Http\Controllers\SyncController@sync_viator_availability_schedules');
Route::get('/viator/sync/categories_tag', 'App\Http\Controllers\SyncController@sync_viator_categories_tag');
Route::get('/viator/sync/reviews', 'App\Http\Controllers\SyncController@sync_viator_reviews');
Route::get('/viator/sync/attraction', 'App\Http\Controllers\SyncController@sync_viator_attraction');

// Sync using chatgpt
Route::get('/chatgpt/sync/seometa/{token}', 'App\Http\Controllers\ChatgptController@chatgpt_sync_tour_seometa');

// Local sync
Route::get('/local/sync/themes', 'App\Http\Controllers\SyncController@sync_local_theme_from_tags');
Route::get('/local/sync/total_reviews', 'App\Http\Controllers\SyncController@sync_local_tours_reviews');

// Verify sync process
Route::get('/local/verify_sync', 'App\Http\Controllers\SyncController@verify_sync_process');

// Deactive product if extra data is missing
Route::get('/local/deactive_tour', 'App\Http\Controllers\SyncController@deactive_tour_missing_extra_data');

// VIATOR COUNTRY SYNCED DATA
// Japan					=> 16 => Done
// Indonesia				=> 15 => Done
// Antigua					=> 27 => Done
// St Lucia					=> 38 => Done
// Cuba						=> Not in Viator
// The Bahamas				=> 29 => Done
// Dominican Republic		=> 32 => 40 => 59 => Done
// Puerto Rico				=> 36 => 40 => 177 => Done
// Jamaica					=> 34 => 40 => 108 => Done
// Mexico					=> 76 => 41 => 140 => Done
// Portugal					=> 63 => 35 => 176 => Done
// France					=> 51 => 35 => 72 => Done
// Greece 					=> 53 => 35 => 83 => Done
// Spain					=> 67 => 35 => 202 => Done
// Italy					=> 57 => 35 => 106 => Working
// Thailand					=> 20 => 42 => 216 => Pending
// Turkey					=> 70 => 35 => 222 => Pending
// United Arab Emirates 	=> 743 => 
// Germany 					=> 52 => 
// United Kingdom 			=> 60457 => 
// United States of America	=>