<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use GptHelper;
use DB;

class ChatgptController extends Controller
{
    // Sync product tag
    public function sync_product_tag(Request $request)
    {
        // Get api token
        $gpt_token = (!empty($_GET['token'])) ? $_GET['token'] : '';

        // Modify SQL Mode
        DB::statement("SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''))");

        // fetch product list
        $product_list = DB::table('to_tour_product AS tour')
            ->select('tour.id AS tour_id')
            ->join('to_tour_location AS tour_location', 'tour.id', '=', 'tour_location.tour_id')
            ->where('tour.status', 1)
            ->where('tour.tour_sync_type', 'viator')
            ->where('tour_location.country_id', 109)
            ->groupBy('tour_location.tour_id')
            ->orderBy('tour.id', 'DESC')
            ->limit(30)
            ->get()
            ->toArray();

        // Check is valid list
        if(!empty($product_list)) {
            // Fetch list
            foreach ($product_list as $product) {
                // Get single data
                $tour_id = $product->tour_id;

                // Check is already synced
                $is_synced = DB::table('to_chatgpt')->select('*')->where('tour_id', $tour_id)->where('status', 1)->first();

                // Check is not already sync
                if(empty($is_synced)) {
                    // Get single tour data
                    $single_tour = DB::table('to_tour_product')->select('*')->where('id', $tour_id)->where('sku', 'viator_api')->limit(1)->first();

                    // Check is valid single tour
                    if(!empty($single_tour)) {
                        // Define array
                        $cities = [];

                        // Define sync status
                        $sync_status = 0;

                        // Get single tour data
                        $tour_name = $single_tour->tour_name;

                        // Fetch cities from tour ID
                        $tour_cities = DB::table('to_tour_location')->select('*')->where('tour_id', $tour_id)->get();

                        // Check is valid array
                        if(!empty($tour_cities)) {
                            foreach ($tour_cities as $city) {
                                // Get single city name
                                $single_city = DB::table('location_cities')->select('*')->where('id', $city->city_id)->first();

                                // Push data in array
                                $cities[] = $single_city->name;
                            }
                        }

                        // Check both data is valid
                        if(!empty($tour_name) && count($cities)) {
                            // Implode cities
                            $implode_cities = implode(', ', $cities);

                            // Generate prompt text
                            $prompt_text = 'Tour Name - ' . $tour_name . '\nCities: ' . $implode_cities . '\n\nI need SEO-related information for the above tour \n\n1. Title with TravelOne brand name at the end with a pipe (50 to 60 Characters) for example - make a proper tile tag for perfect SEO and Google results \n2. Searchable Tags (4 to 5 Tags for website search to find this tour with theme)\n3. SEO Description (155 to 160 Characters)\n4. SEO Keywords (8 to 10 keywords)';

                            // fetch product list
                            $gpt_response = GptHelper::run_prompt($prompt_text, $gpt_token);

                            // Check response is valid
                            if(!empty($gpt_response['id'])) {
                                // Define array
                                $result = [];

                                // Get result text
                                $result_text = $gpt_response['choices'][0]['message']['content'];

                                // Filter result text
                                $filter_result = GptHelper::filter_result_text($result_text);

                                // Check is valid result output
                                if(is_array($filter_result)) {
                                    // Update record
                                    DB::table('to_tour_product')
                                    ->where('id', $tour_id)
                                    ->update([
                                        'seo_title'       => (!empty($filter_result[0])) ? $filter_result[0] : null,
                                        'tags'            => (!empty($filter_result[1])) ? json_encode($filter_result[1]) : null,
                                        'seo_description' => (!empty($filter_result[2])) ? $filter_result[2] : null,
                                        'seo_keyword'     => (!empty($filter_result[1])) ? implode(', ', $filter_result[1]) : 'travelone',
                                    ]);

                                    // update status
                                    $sync_status = 1;
                                }
                            }
                        } else {
                            // Define sync status
                            $sync_status = 2;
                        }

                        // Create record
                        DB::table('to_chatgpt')->insert([
                            'tour_id'       => $tour_id,
                            'request_json'  => $prompt_text ?? null,
                            'response_json' => (!empty($gpt_response)) ? json_encode($gpt_response) : null,
                            'status'        => $sync_status,
                        ]);
                    }
                }
            }
        }
    }
}