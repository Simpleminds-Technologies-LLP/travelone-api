<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use GptHelper;
use DB;

class ChatgptController extends Controller
{
    // Sync product tag
    public function chatgpt_sync_tour_seometa(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('chatgpt_status', 0)->limit(1)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check if tour is created
                if(!empty($to_tour_data)) {
                    // Assign updated tour ID
                    $tour_id = $to_tour_data->tour_id;

                    // Check is tour is already synced
                    $is_synced = DB::table('to_chatgpt')->select('*')->where('tour_id', $tour_id)->first();

                    // Match tour is valid for sync
                    if(empty($is_synced)) {
                        // Get single tour data
                        $single_tour = DB::table('to_tour_product')->select('*')->where('id', $tour_id)->where('sku', 'viator_api')->limit(1)->first();

                        // Check is valid single tour
                        if(!empty($single_tour)) {
                            // Define array
                            $cities_list = [];

                            // Get single tour data
                            $tour_name = $single_tour->tour_name;

                            // Fetch cities from tour ID
                            $fetch_tour_cities = DB::table('to_tour_location')->select('*')->where('tour_id', $tour_id)->get();

                            // Check is valid array
                            if(!empty($fetch_tour_cities)) {
                                foreach ($fetch_tour_cities as $city) {
                                    // Get single city name
                                    $single_city = DB::table('location_cities')->select('*')->where('id', $city->city_id)->first();

                                    // Push data in array
                                    $cities_list[] = $single_city->name;
                                }
                            }

                            // Check both data is valid
                            if(!empty($tour_name) && count($cities_list)) {
                                // Implode cities
                                $implode_cities = implode(', ', $cities_list);

                                // Generate prompt text
                                $prompt_text = 'Tour Name - ' . $tour_name . '\nCities: ' . $implode_cities . '\n\nI need SEO-related information for the above tour \n\n1. Title with TravelOne brand name at the end with a pipe (50 to 60 Characters) for example - make a proper tile tag for perfect SEO and Google results \n2. Searchable Tags (4 to 5 Tags for website search to find this tour with theme)\n3. SEO Description (155 to 160 Characters)\n4. SEO Keywords (8 to 10 keywords)';

                                // fetch product list
                                $gpt_response = ''; // GptHelper::run_prompt($prompt_text, $gpt_token);

                                // Check response is valid
                                if(!empty($gpt_response['id'])) {
                                    // Get result text
                                    $result_text = (!empty($gpt_response['choices'])) ? $gpt_response['choices'][0]['message']['content'] : [];

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
                                            'seo_keyword'     => (!empty($filter_result[3])) ? implode(', ', $filter_result[3]) : 'travelone',
                                        ]);

                                        // Update sync status
                                        DB::table('to_viator')->where('id', $product->id)->update([
                                            'chatgpt_status' => 1
                                        ]);
                                    }
                                }
                            } else {
                                // Update sync status
                                DB::table('to_viator')->where('id', $product->id)->update([
                                    'chatgpt_status' => 2
                                ]);
                            }

                            // Create record
                            DB::table('to_chatgpt')->insert([
                                'tour_id'       => $tour_id,
                                'request_json'  => $prompt_text ?? null,
                                'response_json' => (!empty($gpt_response)) ? json_encode($gpt_response) : null,
                                'status'        => 1,
                                'created_at'    => date('Y-m-d h:i:s'),
                            ]);
                        } else {
                            // Update sync status
                            DB::table('to_viator')->where('id', $product->id)->update([
                                'chatgpt_status' => 2
                            ]);
                        }
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'chatgpt_status' => 2
                        ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'chatgpt_status' => 2
                    ]);
                }
            }
        }

        echo true;
    }
}