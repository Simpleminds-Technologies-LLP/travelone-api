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
Route::get('/viator/sync/modified_since', 'App\Http\Controllers\SyncController@viator_tour_modified_since');

// Sync using chatgpt
Route::get('/chatgpt/sync/seometa/{token}', 'App\Http\Controllers\ChatgptController@chatgpt_sync_tour_seometa');

// Local sync
Route::get('/local/sync/themes', 'App\Http\Controllers\SyncController@sync_local_theme_from_tags');
Route::get('/local/sync/total_reviews', 'App\Http\Controllers\SyncController@sync_local_tours_reviews');
Route::get('/local/sync/tour_price', 'App\Http\Controllers\SyncController@sync_local_tours_price');
Route::get('/local/sync/need_modified_tour', 'App\Http\Controllers\SyncController@sync_local_need_modified_tour');

// Verify sync process
Route::get('/local/verify_sync', 'App\Http\Controllers\SyncController@verify_sync_process');

// Deactive product if extra data is missing
Route::get('/local/deactive_tour', 'App\Http\Controllers\SyncController@deactive_tour_missing_extra_data');

// Search keyword
Route::get('/search/destination', 'App\Http\Controllers\SearchController@destination_table');
Route::get('/search/country', 'App\Http\Controllers\SearchController@country_table');
Route::get('/search/city', 'App\Http\Controllers\SearchController@city_table');
Route::get('/search/theme', 'App\Http\Controllers\SearchController@theme_table');
Route::get('/search/attraction', 'App\Http\Controllers\SearchController@attraction_table');
Route::get('/search/tour', 'App\Http\Controllers\SearchController@tour_table');
Route::get('/search/remove_duplicate', 'App\Http\Controllers\SearchController@remove_duplicate_search');

// For temp
Route::get('/temp/update_attraction_slug', 'App\Http\Controllers\SearchController@update_attraction_slug');

// VIATOR COUNTRY SYNCED DATA
// Japan					=> 16 => Done
// Indonesia				=> 15 => Done
// Antigua					=> 27 => Done
// St Lucia					=> 38 => Done
// Cuba						=> 
// The Bahamas				=> 29 => Done
// Dominican Republic		=> 32 => 40 => 59 => Done
// Puerto Rico				=> 36 => 40 => 177 => Done
// Jamaica					=> 34 => 40 => 108 => Done
// Mexico					=> 76 => 41 => 140 => Working On
// Portugal					=> 63 => 35 => 176 => 
// France					=> 51 => 35 => 72 => 
// Greece 					=> 53 => 35 => 83 => 
// Spain					=> 67 => 35 => 202 => 
// Italy					=> 57 => 35 => 106
// Thailand					=> 20 => 42 => 216 => 
// Maldives					=> 4673 => 42 => 132 => 
// Costa Rica 				=> 747 => 40 => 51 => 
// Vietnam 					=> 21 => 42 => 237 =>
// Taiwan 					=> 778 => 42 => 213 => 
// United Arab Emirates		=> 743 => 44 => 228 => 
// Turkey					=> 70 => 35 => 222 => 
// United States of America => 
// United Kingdom			=> 60457 => 35 => 229 =>


// 0 * * * * wget -q -O /dev/null "http://sync.travelone.io/api/search/tour"