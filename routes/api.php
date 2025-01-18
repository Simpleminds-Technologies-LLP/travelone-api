<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Viator API
Route::post('/viator/last_updated_products', 'App\Http\Controllers\ViatorController@last_modified_since_product');
Route::post('/viator/last_updated_availability_schedules', 'App\Http\Controllers\ViatorController@last_modified_availability_schedules');
Route::post('/viator/single_availability_schedules', 'App\Http\Controllers\ViatorController@single_product_availability_schedules');
Route::post('/viator/single_product_search', 'App\Http\Controllers\ViatorController@single_fetch_product');
Route::post('/viator/availability/check', 'App\Http\Controllers\ViatorController@availability_check');
Route::post('/viator/bookings/cart_hold', 'App\Http\Controllers\ViatorController@bookings_cart_hold');
Route::post('/viator/destinations', 'App\Http\Controllers\ViatorController@viator_destinations');
Route::get('/cron/update_activity_availability_schedules', 'App\Http\Controllers\ViatorController@update_activity_availability_schedules');

// Sync viator products in TravelOne
Route::post('/viator/sync/country_list', 'App\Http\Controllers\SyncController@sync_viator_product_list');
Route::get('/viator/sync/single_tour', 'App\Http\Controllers\SyncController@sync_viator_single_product');
Route::get('/viator/sync/categories_tag', 'App\Http\Controllers\SyncController@sync_viator_categories_tag');
Route::get('/viator/sync/reviews', 'App\Http\Controllers\SyncController@sync_viator_reviews');
Route::get('/viator/sync/attraction', 'App\Http\Controllers\SyncController@sync_viator_attraction');
Route::get('/viator/sync/availability_schedules', 'App\Http\Controllers\SyncController@sync_viator_availability_schedules');
Route::get('/viator/sync/tour_options', 'App\Http\Controllers\SyncController@viator_tour_package_options');
Route::get('/viator/sync/modified_since', 'App\Http\Controllers\SyncController@viator_tour_modified_since');

// Sync using chatgpt
Route::get('/chatgpt/sync/seometa/{token}', 'App\Http\Controllers\ChatgptController@chatgpt_sync_tour_seometa');

// Local sync
// Route::get('/local/sync/themes', 'App\Http\Controllers\SyncController@sync_local_theme_from_tags');
Route::get('/local/sync/total_reviews', 'App\Http\Controllers\SyncController@sync_local_tours_reviews');
Route::get('/local/sync/tour_price', 'App\Http\Controllers\SyncController@sync_local_tours_price');
Route::get('/local/sync/need_modified_tour', 'App\Http\Controllers\SyncController@sync_local_need_modified_tour');
Route::get('/local/sync/languages', 'App\Http\Controllers\SyncController@sync_local_languages_tour');
Route::get('/local/sync/tour_location', 'App\Http\Controllers\SyncController@sync_local_tour_location');
Route::get('/local/sync/ticket_only', 'App\Http\Controllers\SyncController@sync_local_ticket_only');

// Verify sync process
Route::get('/local/deactive_tour', 'App\Http\Controllers\SyncController@deactive_tour_missing_extra_data');
Route::get('/local/verify_sync', 'App\Http\Controllers\SyncController@verify_sync_process');
Route::get('/local/update_logistics', 'App\Http\Controllers\SyncController@update_tour_logistics_location');
Route::get('/local/update_itinerary', 'App\Http\Controllers\SyncController@update_tour_itinerary_location');
Route::get('/local/tag_slug', 'App\Http\Controllers\SyncController@update_viator_tag_slug');

// Search keyword
Route::get('/search/destination', 'App\Http\Controllers\SearchController@destination_table');
Route::get('/search/country', 'App\Http\Controllers\SearchController@country_table');
Route::get('/search/state', 'App\Http\Controllers\SearchController@state_table');
Route::get('/search/city', 'App\Http\Controllers\SearchController@city_table');
Route::get('/search/attraction', 'App\Http\Controllers\SearchController@attraction_table');
// Route::get('/search/theme', 'App\Http\Controllers\SearchController@theme_table');
// Route::get('/search/tour', 'App\Http\Controllers\SearchController@tour_table');
// Route::get('/search/update_image', 'App\Http\Controllers\SearchController@update_image_in_location');
Route::get('/search/remove_duplicate', 'App\Http\Controllers\SearchController@remove_duplicate_search');

// Update Images Media
Route::get('/image/country', 'App\Http\Controllers\ImageController@country_table');
Route::get('/image/city', 'App\Http\Controllers\ImageController@city_table');
Route::get('/image/state', 'App\Http\Controllers\ImageController@state_table');
Route::get('/image/attraction', 'App\Http\Controllers\ImageController@attraction_table');

// Duffel API
// Route::get('/temp/update_city_slug', 'App\Http\Controllers\SyncController@update_city_slug');
// Route::get('/temp/update_country_slug', 'App\Http\Controllers\SyncController@update_country_slug');
// Route::get('/temp/update_states_slug', 'App\Http\Controllers\SyncController@update_states_slug');
// Route::get('/temp/arrange_location', 'App\Http\Controllers\SyncController@viator_arrange_location');

// VIATOR COUNTRY SYNCED DATA
// Japan					=> 16 => Done
// Indonesia				=> 15 => Done
// Antigua and Barbuda 		=> 27 => Done
// St Lucia					=> 38 => Done
// Bahamas					=> 29 => Done
// Dominican Republic		=> 32 => 40 => 59 => Done
// Puerto Rico				=> 36 => 40 => 177 => Done
// Jamaica					=> 34 => 40 => 108 => Done
// Mexico					=> 76 => 41 => 140 => Done
// Portugal					=> 63 => 35 => 176 => Done
// France					=> 51 => 35 => 72 => Done
// Greece 					=> 53 => 35 => 83 => Done
// Spain					=> 67 => 35 => 202 => Done
// Italy					=> 57 => 35 => 106 => Done
// Thailand					=> 20 => 42 => 216 => Done
// Maldives					=> 4672 => 42 => 132 => Done
// Switzerland				=> 69 => 35 => 211 => Done
// United Arab Emirates		=> 743 => 44 => 228 => Done
// United States of America => 77 => 40 => 284 => Done
// Vietnam 					=> 21 => 42 => 237 => Done
// Taiwan 					=> 778 => 42 => 213 => Done
// Turkey					=> 70 => 35 => 222 => Done
// Costa Rica 				=> 747 => 40 => 51 => Done
// United Kingdom			=> 60457 => 35 => 229 => Done
// Canada					=> 75 => 38 => 38 => Done
// Mauritius				=> 4463 => 46 => 138 => Done
// Hungary 					=> 54 => 35 => 97 => Done
// Sweden					=> 68 => 35 => 210 => Done
// Cyprus					=> 47 => 35 => 54 => Working
// Iceland 
// Germany 
// Denmark 
// Turkey 
// Norway 
// Greenland 
// Finland 
// Czech Republic
// Singapore				=> 18 => 42 => 194 => 
// Malaysia 
// Australia				=> 22 => 43 => 13 => 
// New Zealand 
// Fiji 
// Netherland 
// Egypt					=> 722 => 44 => 62 => 
// Kenya 
// South Africa 
// Morocco 
// Vietnam 
// South Korea
// China 
// Brazil 
// Colombia 
// Peru 
// Ireland
// Scotland 
// Austria 
// India 


// */2 * * * * wget -q -O /dev/null "http://sync.travelone.io/api/local/tag_slug"