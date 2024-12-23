<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class SyncController extends Controller
{
    // Verify sync process
    public function verify_sync_process(Request $request)
    {
        // Check if activity exists
        $verify_main_product_2         = DB::table('to_viator')->select('*')->where('status', 2)->get();
        $verify_tags_product_2         = DB::table('to_viator')->select('*')->where('tag_status', 2)->get();
        $verify_tags_product_3         = DB::table('to_viator')->select('*')->where('tag_status', 3)->get();
        $verify_review_product_2       = DB::table('to_viator')->select('*')->where('review_status', 2)->get();
        $verify_attraction_product_2   = DB::table('to_viator')->select('*')->where('attraction_status', 2)->get();
        $verify_chatgpt_product_2      = DB::table('to_viator')->select('*')->where('chatgpt_status', 2)->get();
        $verify_theme_product_2        = DB::table('to_viator')->select('*')->where('theme_status', 2)->get();
        $verify_review_count_product_2 = DB::table('to_viator')->select('*')->where('review_count_status', 2)->get();

        // Check is valid activity
        if(!empty($verify_main_product_2)) {
            // Fetch tours
            foreach ($verify_main_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'availability_status' => 2,
                    'tag_status'          => 2,
                    'review_status'       => 2,
                    'attraction_status'   => 2,
                    'chatgpt_status'      => 2,
                    'theme_status'        => 2,
                    'review_count_status' => 2,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_review_product_2)) {
            // Fetch tours
            foreach ($verify_review_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_review_count_product_2)) {
            // Fetch tours
            foreach ($verify_review_count_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_theme_product_2)) {
            // Fetch tours
            foreach ($verify_theme_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_chatgpt_product_2)) {
            // Fetch tours
            foreach ($verify_chatgpt_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_attraction_product_2)) {
            // Fetch tours
            foreach ($verify_attraction_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_tags_product_2)) {
            // Fetch tours
            foreach ($verify_tags_product_2 as $product) {
                // Re-sync product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status'              => 0,
                    'availability_status' => 0,
                    'tag_status'          => 0,
                    'review_status'       => 0,
                    'attraction_status'   => 0,
                    'chatgpt_status'      => 0,
                    'theme_status'        => 0,
                    'review_count_status' => 0,
                    'updated_at'          => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_tags_product_3)) {
            // Fetch tours
            foreach ($verify_tags_product_3 as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('*')->where('id', $is_common_tour_id)->first();

                    // Check is tour exist
                    if(!empty($single_product->id)) {
                        // Re-sync tags
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'tag_status' => 0
                        ]);
                    } else {
                        // Delete viator extra table data
                        DB::table('to_tour_viator_extra_data')->where('product_code', $product_code)->delete();

                        // Re-sync product
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'status'              => 0,
                            'availability_status' => 0,
                            'tag_status'          => 0,
                            'review_status'       => 0,
                            'attraction_status'   => 0,
                            'chatgpt_status'      => 0,
                            'theme_status'        => 0,
                            'review_count_status' => 0,
                            'updated_at'          => NULL,
                        ]);
                    }
                } else {
                    // Re-sync product
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'status'              => 0,
                        'availability_status' => 0,
                        'tag_status'          => 0,
                        'review_status'       => 0,
                        'attraction_status'   => 0,
                        'chatgpt_status'      => 0,
                        'theme_status'        => 0,
                        'review_count_status' => 0,
                        'updated_at'          => NULL,
                    ]);
                }
            }
        }

        echo true;
    }

    // Sync single viator activity
    public function sync_viator_product_list(Request $request)
    {
        // Define array
        $return = [];

        // Get requested data
        $viator_country_id  = $request->viator_country_id;
        $to_destination_id  = $request->to_destination_id;
        $to_country_id      = $request->to_country_id;
        $req_start_position = $request->start;
        $req_end_position   = $request->end;
        $default_limit      = $request->limit ?? 40;
        $waiting_time       = $request->waiting_time ?? 10; // In seconds

        // Init loop
        for ($position = $req_start_position; $position <= $req_end_position; $position+=$default_limit) { 
            // Define static body
            $filter_data = [
                "filtering" => [
                    "destination" => $viator_country_id
                ],
                "pagination" => [
                    "start" => $position,
                    "count" => $default_limit
                ],
                "currency" => "USD"
            ];

            // fetch product list
            $product_list = ViatorHelper::fetch_product_list($filter_data);

            // check product is valid
            if (is_array($product_list) && !empty($product_list['products']) && is_array($product_list['products'])) {
                // fetch products
                foreach ($product_list['products'] as $product) {
                    // get product data
                    $productCode    = $product['productCode'] ?? null;
                    $productflags   = $product['flags'] ?? null;
                    $duration       = $product['duration'] ?? null;
                    $pricingSummary = $product['pricing'] ?? null;
                    $productOptions = $product['productOptions'] ?? [];

                    // Check if activity exists
                    $isActivityExist = DB::table('to_viator')->select('id')->where('product_code', $productCode)->get()->toArray();

                    // check item is exist
                    if(!count($isActivityExist)) {
                        // insert terms data
                        DB::table('to_viator')->insert([
                            'viator_country_id' => $viator_country_id,
                            'to_destination_id' => $to_destination_id,
                            'to_country_id'     => $to_country_id,
                            'product_code'      => $productCode,
                            'extra_json'        => json_encode([
                                'productflags'   => $productflags,
                                'duration'       => $duration,
                                'pricingSummary' => $pricingSummary,
                                'productOptions' => $productOptions,
                            ])
                        ]);
                    }
                }

                // Push item in array
                $return[] = [
                    'count' => count($product_list['products']) ?? 0,
                    'limit' => $product_list['totalCount'],
                ];

                // Sleep for
                sleep($waiting_time);
            }
        }

        echo "<pre>"; print_r($return); echo "</pre>"; die;
    }

    // Fetch and sync product list
    public function sync_viator_single_product(Request $request)
    {
        // Get destination data
        $json_destination_list = file_get_contents('http://sync.travelone.io/destination.json');
        $json_destination_list = json_decode($json_destination_list, true);

        // Get booking questions data
        $json_booking_questions = file_get_contents('http://sync.travelone.io/booking_questions.json');
        $json_booking_questions = json_decode($json_booking_questions, true);

        // Get tags data
        $json_tags = file_get_contents('http://sync.travelone.io/tags.json');
        $json_tags = json_decode($json_tags, true);

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 0)->orderBy('id', 'DESC')->limit(6)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $row) {
                // get product data
                $productCode       = $row->product_code;
                $to_destination_id = $row->to_destination_id;
                $to_country_id     = $row->to_country_id;

                // Convert extra json
                $json_data = json_decode($row->extra_json, true);

                // Get activity meta
                $productflags   = $json_data['productflags'] ?? null;
                $duration       = $json_data['duration'] ?? null;
                $pricingSummary = $json_data['pricingSummary'] ?? null;
                $productOptions = $json_data['productOptions'] ?? [];

                // fetch single product
                $single_product = ViatorHelper::fetch_single_product($productCode);

                // check is valid response
                if(is_array($single_product) && !empty($single_product) && $single_product['status'] == 'ACTIVE') {
                    // define combile tour ID
                    $is_common_tour_id = '';

                    // get single product data
                    $title                       = trim($single_product['title'] ?? '');
                    $description                 = $single_product['description'] ?? null;
                    $productUrl                  = $single_product['productUrl'] ?? null;
                    $ticketInfo                  = $single_product['ticketInfo'] ?? null;
                    $pricingInfo                 = $single_product['pricingInfo'] ?? null;
                    $logistics                   = $single_product['logistics'] ?? null;
                    $timeZone                    = $single_product['timeZone'] ?? null;
                    $inclusions                  = $single_product['inclusions'] ?? null;
                    $exclusions                  = $single_product['exclusions'] ?? null;
                    $additionalInfo              = $single_product['additionalInfo'] ?? null;
                    $cancellationPolicy          = $single_product['cancellationPolicy'] ?? null;
                    $bookingConfirmationSettings = $single_product['bookingConfirmationSettings'] ?? null;
                    $bookingRequirements         = $single_product['bookingRequirements'] ?? null;
                    $languageGuides              = $single_product['languageGuides'] ?? null;
                    $bookingQuestions            = $single_product['bookingQuestions'] ?? null;
                    $tags                        = $single_product['tags'] ?? null;
                    $destinations                = $single_product['destinations'] ?? null;
                    $itinerary                   = $single_product['itinerary'] ?? null;
                    $productOptions              = $single_product['productOptions'] ?? null;
                    $supplier                    = $single_product['supplier'] ?? null;
                    $images                      = $single_product['images'] ?? null;
                    $reviews                     = $single_product['reviews'] ?? null;
                    $status                      = $single_product['status'] ?? null;
                    $createdAt                   = $single_product['createdAt'] ?? null;
                    $lastUpdatedAt               = $single_product['lastUpdatedAt'] ?? null;

                    // Filter data
                    $filter_destination      = ViatorHelper::find_destination_details($json_destination_list, $destinations);
                    $filter_logistics        = ViatorHelper::filter_product_logistics($logistics); // API
                    $filter_speical_badge    = ViatorHelper::filter_activity_special_badge($productflags);
                    $filter_duration         = ViatorHelper::filter_activity_duration($duration);
                    $booking_questions       = ViatorHelper::filter_booking_questions($json_booking_questions, $bookingQuestions);
                    $filter_product_images   = ViatorHelper::filter_product_images($images);
                    $product_tags            = ViatorHelper::filter_product_tags($json_tags, $tags);
                    $filter_inclusions       = ViatorHelper::filter_product_inclusions($inclusions);
                    $filter_exclusions       = ViatorHelper::filter_product_exclusions($exclusions);
                    $filter_additional_info  = ViatorHelper::filter_product_additional_info($additionalInfo);
                    $filter_itinerary        = ViatorHelper::filter_product_itinerary($itinerary); // API

                    // push other json data
                    $extra_json_data = [
                        'productCode'                 => $productCode,
                        'status'                      => $status,
                        'durationActivityTime'        => $duration,
                        'filter_destination'          => $filter_destination,
                        'ticketInfo'                  => $ticketInfo,
                        'pricingSummary'              => $pricingSummary,
                        'pricingInfo'                 => $pricingInfo,
                        'logistics'                   => $filter_logistics,
                        'itinerary'                   => $filter_itinerary,
                        'timeZone'                    => $timeZone,
                        'inclusions'                  => $inclusions,
                        'exclusions'                  => $exclusions,
                        'additionalInfo'              => $additionalInfo,
                        'cancellationPolicy'          => $cancellationPolicy,
                        'bookingQuestions'            => $booking_questions,
                        'bookingConfirmationSettings' => $bookingConfirmationSettings,
                        'bookingRequirements'         => $bookingRequirements,
                        'product_tags'                => $product_tags,
                        'languageGuides'              => $languageGuides,
                        'productOptions'              => $productOptions,
                        'productflags'                => $productflags,
                        'supplier'                    => $supplier,
                        'reviews'                     => $reviews,
                        'createdAt'                   => $createdAt,
                        'lastUpdatedAt'               => $lastUpdatedAt,
                    ];

                    // define combile tour ID
                    $is_common_tour_id = '';

                    // Check if sightseeing exists
                    $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

                    // check item is exist
                    if(!count($is_exist)) {
                        // Prepare data for insertion
                        $insertData = [
                            'user_id'         => 1,
                            'slug'            => ViatorHelper::str_slug($title),
                            'sku'             => 'viator_api',
                            'tour_name'       => $title,
                            'listing_type'    => 'Instant Booking',
                            'media_type'      => 'reference',
                            'description'     => $description,
                            'featured_image'  => $filter_product_images['cover_image'],
                            'media_gallery'   => json_encode($filter_product_images['related_images']),
                            'seo_title'       => $title,
                            'tour_sync_type'  => 'viator',
                            'extra_json_data' => json_encode($extra_json_data),
                            'status'          => 0,
                        ];

                        // Insert data into the table and get the last inserted ID
                        $is_common_tour_id = DB::table('to_tour_product')->insertGetId($insertData);
                    } else {
                        // Assign updated tour ID
                        $is_common_tour_id = $is_exist[0]->id;

                        // Remove previous activity meta data
                        DB::table('to_tour_viator_tag')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_destination')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_location')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_city_night')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_terms')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_viator_special_badge')->where('tour_id', $is_common_tour_id)->delete();

                        // push data in table
                        $is_updated_tour = DB::table('to_tour_product')
                            ->where('id', $is_common_tour_id)
                            ->update([
                                'tour_name'       => $title,
                                'description'     => $description,
                                'featured_image'  => $filter_product_images['cover_image'],
                                'media_gallery'   => json_encode($filter_product_images['related_images']),
                                'seo_title'       => $title,
                                'extra_json_data' => json_encode($extra_json_data),
                                'status'          => 1,
                                'updated_at'      => date('Y-m-d h:i:s'),
                            ]
                        );
                    }

                    // check common tour ID is valid
                    if(!empty($is_common_tour_id)) {
                        // Update sync status
                        DB::table('to_viator')->where('id', $row->id)->update([
                            'status'     => 1,
                            'updated_at' => date('Y-m-d h:i:s')
                        ]);

                        // check and insert destination
                        if(!empty($filter_destination)) {
                            foreach ($filter_destination as $tour_dest) {
                                // filter destination name
                                $destination_name = trim(str_replace(['city'], '', $tour_dest['data']['destinationName']));

                                // find city data
                                $city_data = DB::table('location_cities')->select('*')->where('name', 'like', '%' . $destination_name . '%')->get()->first();

                                // check city data is valid
                                if(!empty($city_data)) {
                                    // get first data
                                    $city_nights    = $city_data->nights;
                                    $city_id        = $city_data->id;
                                    $destination_id = $city_data->destination_id;
                                    $country_id     = $city_data->country_id;
                                    $state_id       = $city_data->state_id;

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => $state_id,
                                        'city_id'        => $city_id,
                                    ]);
                                } else {
                                    // Create new city
                                    $created_city = DB::table('location_cities')->insert([
                                        'name'           => $destination_name,
                                        'slug'           => str_replace(" ", "_", strtolower($destination_name)),
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => 0,
                                    ]);

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => 0,
                                        'city_id'        => (!empty($created_city->id)) ? $created_city->id : null,
                                    ]);
                                }
                            }
                        }

                        // insert viator tags
                        if(count($product_tags)) {
                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id'  => $is_common_tour_id,
                                    'tag_name' => $tag['tag_name'],
                                ]);
                            }
                        }

                        // count badge data
                        if(count($filter_speical_badge)) {
                            // fetch special badge
                            foreach ($filter_speical_badge as $badge_name) {
                                // insert badge data
                                DB::table('to_tour_viator_special_badge')->insert([
                                    'tour_id'    => $is_common_tour_id,
                                    'badge_name' => $badge_name,
                                ]);
                            }
                        }

                        // insert terms data
                        DB::table('to_tour_terms')->insert([
                            'tour_id'              => $is_common_tour_id,
                            'what_is_included'     => json_encode($filter_inclusions),
                            'what_is_not_included' => json_encode($filter_exclusions),
                            'important_notes'      => json_encode($filter_additional_info),
                        ]);

                        // insert viator extra data
                        DB::table('to_tour_viator_extra_data')->insert([
                            'tour_id'        => $is_common_tour_id,
                            'product_code'   => $productCode,
                            'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                            'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                            'time_duration'  => (!empty($filter_duration)) ? $filter_duration : 0,
                            'reviews'        => $reviews['combinedAverageRating'] ?? 0,
                        ]);

                        // Publish created tour
                        DB::table('to_tour_product')->where('id', $is_common_tour_id)->update(['status' => 1]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $row->id)->update([
                        'status'     => 2,
                        'updated_at' => date('Y-m-d h:i:s')
                    ]);
                }

                // Sleep for 10 seconds
                sleep(10);
            }
        }

        // Return response
        echo json_encode($viator_product);
    }

    // Fetch single product availability schedules
    public function sync_viator_availability_schedules(Request $request)
    {
        // define array
        $return_arr = $unavailable_dates = $package_seasons_dates = [];

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('availability_status', 0)->limit(5)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // fetch availability schedule
                $availability_data = ViatorHelper::single_product_availability_schedule($product_code);

                // check is valid array
                if(!empty($availability_data['bookableItems']) && count($availability_data['bookableItems'])) {
                    // fetch bookable items
                    foreach ($availability_data['bookableItems'] as $item) {
                        // define array
                        $pricing_details = $timed_entries = [];

                        // get start and end date
                        $package_start_date = (!empty($item['seasons'][0]['startDate'])) ? $item['seasons'][0]['startDate'] : '';
                        $package_end_date   = (!empty($item['seasons'][0]['endDate'])) ? $item['seasons'][0]['endDate'] : '';

                        // check date is exist in array
                        if(!empty($package_start_date) && !empty($package_end_date) && !in_array($package_start_date . '@' . $package_end_date, $package_seasons_dates)) {
                            $package_seasons_dates[] = $package_start_date . '@' . $package_end_date;
                        }

                        // fetch pricing details
                        if(!empty($item['seasons'][0]['pricingRecords'][0]['pricingDetails']) && count($item['seasons'][0]['pricingRecords'][0]['pricingDetails'])) {
                            foreach ($item['seasons'][0]['pricingRecords'][0]['pricingDetails'] as $row) {
                                // push data in array
                                if(count($row)) {
                                    $pricing_details[$row['ageBand']] = $row['price']['original']['recommendedRetailPrice'];
                                }
                            }
                        }

                        // fetch pricing details
                        if(!empty($item['seasons'][0]['pricingRecords'][0]['timedEntries']) && count($item['seasons'][0]['pricingRecords'][0]['timedEntries'])) {
                            foreach ($item['seasons'][0]['pricingRecords'][0]['timedEntries'] as $row) {
                                // push data in array
                                if(count($row)) {
                                    $timed_entries[] = $row['startTime'];
                                }
                            }
                        }

                        // fetch unavailable dates
                        if(!empty($item['seasons'][0]['pricingRecords'][0]['timedEntries'][0]['unavailableDates']) && count($item['seasons'][0]['pricingRecords'][0]['timedEntries'][0]['unavailableDates'])) {
                            foreach ($item['seasons'][0]['pricingRecords'][0]['timedEntries'][0]['unavailableDates'] as $row) {
                                // push data in array
                                $unavailable_dates[] = $row['date'];
                            }
                        }
                    }
                }

                // check start date is exist
                if(count($package_seasons_dates)) {
                    // define start and end date
                    $year_start_date = date('Y-m-d', time());
                    $year_end_date   = date('Y-m-d', strtotime('+1 year'));

                    // fetch dates
                    foreach ($package_seasons_dates as $row) {
                        // explode dates
                        $explode_dates = explode('@', $row);

                        // set start and end date
                        $start_date = $explode_dates[0];
                        $end_date   = $explode_dates[1];

                        // generate dates
                        $start_generated_dates = ViatorHelper::generate_dates($year_start_date, $start_date);
                        $end_generated_dates   = ViatorHelper::generate_dates($end_date, $year_end_date);

                        // marge array
                        $unavailable_dates = array_merge($unavailable_dates, $start_generated_dates);
                        $unavailable_dates = array_merge($unavailable_dates, $end_generated_dates);
                    }
                }

                // sort array
                sort($unavailable_dates);
                array_unique($unavailable_dates);

                // update activity values
                DB::table('to_tour_viator_extra_data')
                    ->where('product_code', $product_code)
                    ->update([
                        'unavailable_dates' => (count($unavailable_dates)) ? implode(', ', $unavailable_dates) : null
                    ]
                );

                // Update sync status
                DB::table('to_viator')->where('id', $product->id)->update([
                    'availability_status' => 1
                ]);

                // set response
                $return_arr[] = [
                    'product_code' => $product_code,
                    'unavailable_dates' => $unavailable_dates
                ];

                sleep(5);
            }
        }

        // Return response
        echo json_encode($return_arr);
    }

    // Fetch viator categories tag
    public function sync_viator_categories_tag(Request $request)
    {
        // Define array
        $return_arr = [];

        // Get tags data
        $json_tags = file_get_contents('http://sync.travelone.io/tags.json');
        $json_tags = json_decode($json_tags, true);

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('tag_status', 0)->orderBy('id', 'DESC')->limit(5)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // fetch single product
                $single_product = ViatorHelper::fetch_single_product($product_code);

                // check is valid response
                if(is_array($single_product) && !empty($single_product)) {
                    // Fetch single product data
                    $tags = $single_product['tags'] ?? null;

                    // Filter tags data
                    $product_tags = ViatorHelper::filter_product_tags($json_tags, $tags);

                    // Check is valid tags array
                    if(is_array($product_tags) && count($product_tags)) {
                        foreach ($product_tags as $tag_key => $tags) {
                            if(count($tags['parent_tag_id'])) {
                                $product_tags[$tag_key]['parent_tag_id'] = ViatorHelper::filter_product_tags($json_tags, $tags['parent_tag_id']);
                            }
                        }
                    }

                    // Check if sightseeing exists
                    $tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                    // Check tour data is valid
                    if(is_array($tour_data) && count($tour_data)) {
                        // Assign updated tour ID
                        $is_common_tour_id = $tour_data[0]->tour_id;

                        // Check tags is valid
                        if($is_common_tour_id && count($product_tags)) {
                            // remove previous activity meta data
                            DB::table('to_tour_viator_tag')->where('tour_id', $is_common_tour_id)->delete();

                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id'         => $is_common_tour_id,
                                    'parent_tag_id'   => (count($tag['parent_tag_id'])) ? end($tag['parent_tag_id'])['tag_id'] : null,
                                    'parent_tag_name' => (count($tag['parent_tag_id'])) ? end($tag['parent_tag_id'])['tag_name'] : null,
                                    'tag_id'          => $tag['tag_id'],
                                    'tag_name'        => $tag['tag_name'],
                                ]);
                            }
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'tag_status' => 1
                        ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'tag_status' => 2,
                        ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'tag_status' => 3,
                    ]);
                }

                // Hold for 10 seconds
                sleep(10);
            }
        }

        // Return response
        echo json_encode($return_arr);
    }

    // Fetch viator reviews
    public function sync_viator_reviews(Request $request)
    {
        $return_arr = [];

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('review_status', 0)->orderBy('id', 'ASC')->limit(4)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // Fetch product reviews
                    $product_reviews = ViatorHelper::fetch_single_product_reviews($product_code, 500);

                    // Check reviews is valid
                    if($is_common_tour_id && !empty($product_reviews['reviews']) && count($product_reviews['reviews'])) {
                        // fetch reviews
                        foreach ($product_reviews['reviews'] as $review) {
                            // get single review data
                            $review_reference = $review['reviewReference'];
                            $language         = $review['language'];
                            $user_name        = $review['userName'] ?? 'Unknow';
                            $rating           = $review['rating'];
                            $text             = $review['text'];
                            $title            = $review['title'];
                            $provider         = $review['provider'] ?? 'VIATOR';
                            $helpful_votes    = $review['helpfulVotes'] ?? false;
                            $traveler_photos  = $review['photosInfo'] ?? [];
                            $published_date   = $review['publishedDate'];

                            // Check is review in english only
                            if($language === 'en') {
                                // check sightseeing is exist
                                $is_exist_review = DB::table('to_tour_viator_reviews')->select('id')->where('tour_id', $is_common_tour_id)->where('product_code', $product_code)->where('review_reference', $review_reference)->get()->toArray();

                                // check emoji is exist in review
                                $is_emoji_title = ViatorHelper::is_emoji_exist($title);
                                $is_emoji_text  = ViatorHelper::is_emoji_exist($text);

                                // check is exist
                                if(!count($is_exist_review) && !$is_emoji_title && !$is_emoji_text) {
                                    // insert terms data
                                    DB::table('to_tour_viator_reviews')->insert([
                                        'tour_id'          => $is_common_tour_id,
                                        'product_code'     => $product_code,
                                        'review_reference' => $review_reference,
                                        'username'         => $user_name,
                                        'title'            => $title,
                                        'rating'           => (int) $rating,
                                        'review_text'      => $text,
                                        'provider'         => $provider,
                                        'helpful_votes'    => $helpful_votes,
                                        'published_date'   => date('Y-m-d h:i:s', strtotime($published_date)),
                                        'synced_date'      => date('Y-m-d h:i:s', strtotime($published_date)),
                                    ]);

                                    // Check traveler photos is valid
                                    if(!empty($traveler_photos) && count($traveler_photos)) {
                                        // Fetch photos
                                        foreach ($traveler_photos as $row) {
                                            // Check photo versions
                                            if(!empty($row['photoVersions']) && count($row['photoVersions'])) {
                                                // Fetch sizes of photo
                                                foreach ($row['photoVersions'] as $photo) {
                                                    // Check required image size ()
                                                    if(600 <= $photo['height'] && $photo['height'] <= 1000) {
                                                        // Insert record
                                                        DB::table('to_tour_viator_traveler_photo')->insert([
                                                            'tour_id'      => $is_common_tour_id,
                                                            'product_code' => $product_code,
                                                            'provider'     => $provider,
                                                            'image_path'   => $photo['url'],
                                                            'image_alt'    => $user_name,
                                                        ]);
                                                        continue;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'review_status' => 1,
                    ]);
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'review_status' => 2,
                    ]);
                }

                // Hold for 10 seconds
                sleep(10);
            }
        }

        // Return response
        echo true;
    }

    // Sync viator attraction
    public function sync_viator_attraction(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('attraction_status', 0)->orderBy('id', 'ASC')->limit(3)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // fetch single product
                    $single_product = ViatorHelper::fetch_single_product($product_code);

                    // Get single itinerary
                    $itinerary = $single_product['itinerary'] ?? null;

                    // Filter attraction
                    $filter_attraction = ViatorHelper::filter_activity_attraction($itinerary);

                    // Check filter attraction is valid
                    if(count($filter_attraction)) {
                        // Remove previous data
                        DB::table('to_tour_viator_attraction')->where('tour_id', $is_common_tour_id)->delete();

                        // fetch attractions
                        foreach ($filter_attraction as $attraction_name) {
                            // insert attraction data
                            DB::table('to_tour_viator_attraction')->insert([
                                'tour_id'         => $is_common_tour_id,
                                'attraction_name' => $attraction_name,
                                'attraction_slug' => ViatorHelper::str_slug($attraction_name),
                            ]);
                        }
                    }

                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'attraction_status' => 1,
                    ]);
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'attraction_status' => 2,
                    ]);
                }

                // Hold for 10 seconds
                sleep(10);
            }
        }

        echo true;
    }

    // Sync local theme from tags
    public function sync_local_theme_from_tags(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('theme_status', 0)->orderBy('id', 'ASC')->limit(50)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('*')->where('id', $is_common_tour_id)->first();

                    // Get tour tags
                    $tour_tags = (!empty($single_product->tags)) ? json_decode($single_product->tags, true) : [];

                    // Check tags is valid
                    if(!empty($tour_tags)) {
                        // Fetch tags
                        foreach ($tour_tags as $tag_key => $tag) {
                            // Check theme is exist
                            $single_theme = DB::table('to_theme')->select('*')->where('name', $tag)->first();

                            // Check if theme is empty
                            if(empty($single_theme)) {
                                // Create new theme record
                                $is_theme_created = DB::table('to_theme')->insert([
                                    'slug'            => strtolower(str_replace(' ', '-', $tag)),
                                    'name'            => $tag,
                                    'seo_title'       => $tag,
                                    'seo_description' => $tag,
                                    'seo_keyword'     => $tag,
                                    'status'          => 1
                                ]);

                                // Push original data in array
                                $tour_tags[$tag_key] = DB::getPdo()->lastInsertId();
                            } else {
                                // Push original data in array
                                $tour_tags[$tag_key] = $single_theme->id;
                            }
                        }
                    }

                    // Check tags is valid
                    if(count($tour_tags)) {
                        // Remove exist tags
                        DB::table('to_tour_theme')->where('tour_id', $is_common_tour_id)->delete();

                        // Assign theme to tour
                        foreach ($tour_tags as $theme_id) {
                            DB::table('to_tour_theme')->insert([
                                'tour_id'  => $is_common_tour_id,
                                'theme_id' => $theme_id,
                            ]);
                        }
                    }

                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'theme_status' => 1,
                    ]);
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'theme_status' => 2,
                    ]);
                }
            }
        }

        echo true;
    }

    // Sync local tours reviews
    public function sync_local_tours_reviews(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('review_count_status', 0)->orderBy('id', 'ASC')->limit(50)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('*')->where('id', $is_common_tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Get viator json data
                        $viator_json = json_decode($single_product->extra_json_data, true);

                        // Get total reviews count
                        $total_reviews = (!empty($viator_json['reviews']['totalReviews'])) ? $viator_json['reviews']['totalReviews'] : 0;

                        // Update query
                        DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->update([
                            'total_reviews' => $total_reviews
                        ]);

                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'review_count_status' => 1,
                        ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'review_count_status' => 3,
                        ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'review_count_status' => 2,
                    ]);
                }
            }
        }

        echo true;
    }

    // Sync local tours price
    public function sync_local_tours_price(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('float_price', 0)->orderBy('id', 'ASC')->limit(50)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->get()->toArray();

                // Check if tour is created
                if(is_array($to_tour_data) && count($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data[0]->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('*')->where('id', $is_common_tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Get viator json data
                        $viator_json = json_decode($single_product->extra_json_data, true);

                        // Get price
                        $selling_price = (!empty($viator_json['pricingSummary']['summary']['fromPriceBeforeDiscount'])) ? $viator_json['pricingSummary']['summary']['fromPriceBeforeDiscount'] : 0;
                        $discount_price = (!empty($viator_json['pricingSummary']['summary']['fromPrice'])) ? $viator_json['pricingSummary']['summary']['fromPrice'] : 0;

                        // Update query
                        DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->update([
                            'selling_price' => $selling_price,
                            'discount_price' => $discount_price,
                        ]);

                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'float_price' => 1,
                        ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'float_price' => 3,
                        ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'float_price' => 2,
                    ]);
                }
            }
        }

        echo true;
    }

    // Sync local need modified tour
    public function sync_local_need_modified_tour(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('need_resync', 1)->limit(6)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $row) {
                // get product data
                $productCode       = $row->product_code;
                $to_destination_id = $row->to_destination_id;
                $to_country_id     = $row->to_country_id;

                // Convert extra json
                $json_data = json_decode($row->extra_json, true);

                // Get activity meta
                $productflags   = $json_data['productflags'] ?? null;
                $duration       = $json_data['duration'] ?? null;
                $pricingSummary = $json_data['pricingSummary'] ?? null;
                $productOptions = $json_data['productOptions'] ?? [];

                // fetch single product
                $single_product = ViatorHelper::fetch_single_product($productCode);

                // check is valid response
                if(is_array($single_product) && !empty($single_product) && $single_product['status'] == 'ACTIVE') {
                    // define combile tour ID
                    $is_common_tour_id = '';

                    // get single product data
                    $title                       = trim($single_product['title'] ?? '');
                    $description                 = $single_product['description'] ?? null;
                    $productUrl                  = $single_product['productUrl'] ?? null;
                    $ticketInfo                  = $single_product['ticketInfo'] ?? null;
                    $pricingInfo                 = $single_product['pricingInfo'] ?? null;
                    $logistics                   = $single_product['logistics'] ?? null;
                    $timeZone                    = $single_product['timeZone'] ?? null;
                    $inclusions                  = $single_product['inclusions'] ?? null;
                    $exclusions                  = $single_product['exclusions'] ?? null;
                    $additionalInfo              = $single_product['additionalInfo'] ?? null;
                    $cancellationPolicy          = $single_product['cancellationPolicy'] ?? null;
                    $bookingConfirmationSettings = $single_product['bookingConfirmationSettings'] ?? null;
                    $bookingRequirements         = $single_product['bookingRequirements'] ?? null;
                    $languageGuides              = $single_product['languageGuides'] ?? null;
                    $bookingQuestions            = $single_product['bookingQuestions'] ?? null;
                    $tags                        = $single_product['tags'] ?? null;
                    $destinations                = $single_product['destinations'] ?? null;
                    $itinerary                   = $single_product['itinerary'] ?? null;
                    $productOptions              = $single_product['productOptions'] ?? null;
                    $supplier                    = $single_product['supplier'] ?? null;
                    $images                      = $single_product['images'] ?? null;
                    $reviews                     = $single_product['reviews'] ?? null;
                    $status                      = $single_product['status'] ?? null;
                    $createdAt                   = $single_product['createdAt'] ?? null;
                    $lastUpdatedAt               = $single_product['lastUpdatedAt'] ?? null;

                    // Filter data
                    $filter_destination      = ViatorHelper::find_destination_details($json_destination_list, $destinations);
                    $filter_logistics        = ViatorHelper::filter_product_logistics($logistics); // API
                    $filter_speical_badge    = ViatorHelper::filter_activity_special_badge($productflags);
                    $filter_duration         = ViatorHelper::filter_activity_duration($duration);
                    $booking_questions       = ViatorHelper::filter_booking_questions($json_booking_questions, $bookingQuestions);
                    $filter_product_images   = ViatorHelper::filter_product_images($images);
                    $product_tags            = ViatorHelper::filter_product_tags($json_tags, $tags);
                    $filter_inclusions       = ViatorHelper::filter_product_inclusions($inclusions);
                    $filter_exclusions       = ViatorHelper::filter_product_exclusions($exclusions);
                    $filter_additional_info  = ViatorHelper::filter_product_additional_info($additionalInfo);
                    $filter_itinerary        = ViatorHelper::filter_product_itinerary($itinerary); // API

                    // push other json data
                    $extra_json_data = [
                        'productCode'                 => $productCode,
                        'status'                      => $status,
                        'durationActivityTime'        => $duration,
                        'filter_destination'          => $filter_destination,
                        'ticketInfo'                  => $ticketInfo,
                        'pricingSummary'              => $pricingSummary,
                        'pricingInfo'                 => $pricingInfo,
                        'logistics'                   => $filter_logistics,
                        'itinerary'                   => $filter_itinerary,
                        'timeZone'                    => $timeZone,
                        'inclusions'                  => $inclusions,
                        'exclusions'                  => $exclusions,
                        'additionalInfo'              => $additionalInfo,
                        'cancellationPolicy'          => $cancellationPolicy,
                        'bookingQuestions'            => $booking_questions,
                        'bookingConfirmationSettings' => $bookingConfirmationSettings,
                        'bookingRequirements'         => $bookingRequirements,
                        'product_tags'                => $product_tags,
                        'languageGuides'              => $languageGuides,
                        'productOptions'              => $productOptions,
                        'productflags'                => $productflags,
                        'supplier'                    => $supplier,
                        'reviews'                     => $reviews,
                        'createdAt'                   => $createdAt,
                        'lastUpdatedAt'               => $lastUpdatedAt,
                    ];

                    // define combile tour ID
                    $is_common_tour_id = '';

                    // Check if sightseeing exists
                    $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

                    // check item is exist
                    if(!count($is_exist)) {
                        // Prepare data for insertion
                        $insertData = [
                            'user_id'         => 1,
                            'slug'            => ViatorHelper::str_slug($title),
                            'sku'             => 'viator_api',
                            'tour_name'       => $title,
                            'listing_type'    => 'Instant Booking',
                            'media_type'      => 'reference',
                            'description'     => $description,
                            'featured_image'  => $filter_product_images['cover_image'],
                            'media_gallery'   => json_encode($filter_product_images['related_images']),
                            'seo_title'       => $title,
                            'tour_sync_type'  => 'viator',
                            'extra_json_data' => json_encode($extra_json_data),
                            'status'          => 0,
                        ];

                        // Insert data into the table and get the last inserted ID
                        $is_common_tour_id = DB::table('to_tour_product')->insertGetId($insertData);
                    } else {
                        // Assign updated tour ID
                        $is_common_tour_id = $is_exist[0]->id;

                        // Remove previous activity meta data
                        DB::table('to_tour_viator_tag')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_destination')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_location')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_city_night')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_terms')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->delete();
                        DB::table('to_tour_viator_special_badge')->where('tour_id', $is_common_tour_id)->delete();

                        // push data in table
                        $is_updated_tour = DB::table('to_tour_product')
                            ->where('id', $is_common_tour_id)
                            ->update([
                                'tour_name'       => $title,
                                'description'     => $description,
                                'featured_image'  => $filter_product_images['cover_image'],
                                'media_gallery'   => json_encode($filter_product_images['related_images']),
                                'seo_title'       => $title,
                                'extra_json_data' => json_encode($extra_json_data),
                                'status'          => 1,
                                'updated_at'      => date('Y-m-d h:i:s'),
                            ]
                        );
                    }

                    // check common tour ID is valid
                    if(!empty($is_common_tour_id)) {
                        // Update sync status
                        DB::table('to_viator')->where('id', $row->id)->update([
                            'need_resync' => 0,
                            'updated_at' => date('Y-m-d h:i:s')
                        ]);

                        // check and insert destination
                        if(!empty($filter_destination)) {
                            foreach ($filter_destination as $tour_dest) {
                                // filter destination name
                                $destination_name = trim(str_replace(['city'], '', $tour_dest['data']['destinationName']));

                                // find city data
                                $city_data = DB::table('location_cities')->select('*')->where('name', 'like', '%' . $destination_name . '%')->get()->first();

                                // check city data is valid
                                if(!empty($city_data)) {
                                    // get first data
                                    $city_nights    = $city_data->nights;
                                    $city_id        = $city_data->id;
                                    $destination_id = $city_data->destination_id;
                                    $country_id     = $city_data->country_id;
                                    $state_id       = $city_data->state_id;

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => $state_id,
                                        'city_id'        => $city_id,
                                    ]);
                                } else {
                                    // Create new city
                                    $created_city = DB::table('location_cities')->insert([
                                        'name'           => $destination_name,
                                        'slug'           => str_replace(" ", "_", strtolower($destination_name)),
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => 0,
                                    ]);

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id'     => $to_country_id,
                                        'state_id'       => 0,
                                        'city_id'        => (!empty($created_city->id)) ? $created_city->id : null,
                                    ]);
                                }
                            }
                        }

                        // insert viator tags
                        if(count($product_tags)) {
                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id'  => $is_common_tour_id,
                                    'tag_name' => $tag['tag_name'],
                                ]);
                            }
                        }

                        // count badge data
                        if(count($filter_speical_badge)) {
                            // fetch special badge
                            foreach ($filter_speical_badge as $badge_name) {
                                // insert badge data
                                DB::table('to_tour_viator_special_badge')->insert([
                                    'tour_id'    => $is_common_tour_id,
                                    'badge_name' => $badge_name,
                                ]);
                            }
                        }

                        // insert terms data
                        DB::table('to_tour_terms')->insert([
                            'tour_id'              => $is_common_tour_id,
                            'what_is_included'     => json_encode($filter_inclusions),
                            'what_is_not_included' => json_encode($filter_exclusions),
                            'important_notes'      => json_encode($filter_additional_info),
                        ]);

                        // insert viator extra data
                        DB::table('to_tour_viator_extra_data')->insert([
                            'tour_id'        => $is_common_tour_id,
                            'product_code'   => $productCode,
                            'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                            'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                            'time_duration'  => (!empty($filter_duration)) ? $filter_duration : 0,
                            'reviews'        => $reviews['combinedAverageRating'] ?? 0,
                        ]);

                        // Publish created tour
                        DB::table('to_tour_product')->where('id', $is_common_tour_id)->update(['status' => 1]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $row->id)->update([
                        'need_resync' => 0,
                        'status' => 2,
                        'updated_at' => date('Y-m-d h:i:s')
                    ]);
                }

                // Sleep for 10 seconds
                sleep(10);
            }
        }
    }

    // Deactive tour missing extra data
    public function deactive_tour_missing_extra_data(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_tour_product')->select('*')->where('re_verify', 0)->where('tour_sync_type', 'viator')->where('status', 1)->limit(20)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $tour) {
                // get product data
                $tour_id = $tour->id;

                // Get created tour data
                $extra_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('tour_id', $tour_id)->get()->toArray();

                // Count total meta exist
                $total_meta = (is_array($extra_data)) ? count($extra_data) : 0;

                // Check if no meta exist
                if($total_meta == 0) {
                    DB::table('to_tour_product')->where('id', $tour_id)->update([
                        're_verify' => 2,
                        'status' => 0,
                    ]);
                } else if($total_meta == 1) {
                    DB::table('to_tour_product')->where('id', $tour_id)->update([
                        're_verify' => 1
                    ]);
                } else if($total_meta > 1) {
                    DB::table('to_tour_product')->where('id', $tour_id)->update([
                        're_verify' => 3,
                        'status' => 0
                    ]);
                }
            }
        }

        echo 'success';
    }

    // Viator tour modified since given date to current date
    public function viator_tour_modified_since(Request $request)
    {
        // Get today's date
        $today = new \DateTime();

        // Subtract 30 days from today's date
        $thirtyDaysAgo = $today->sub(new \DateInterval('P1D'));

        // get requested data
        $modified_since = $thirtyDaysAgo->format('Y-m-d') . "T12:00:00.000000Z";

        // fetch product list
        $modified_products = ViatorHelper::last_modified_since_product([
            'modified_since' => $modified_since,
            'count'          => 10,
        ]);

        // check api response is valid
        if(is_array($modified_products['products']) && count($modified_products['products'])) {
            // define next cursor
            $next_cursor = (!empty($modified_products['nextCursor'])) ? $modified_products['nextCursor'] : null;

            // fetch api data
            foreach ($modified_products['products'] as $product) {
                // Update status for re-sync
                DB::table('to_viator')->where('status', 1)->where('product_code', $product['productCode'])->update([
                    'need_resync' => 1
                ]);
            }

            // fetch pagination callback
            while ($next_cursor != null) {
                // fetch product list
                $last_modified_call = ViatorHelper::last_modified_since_product([
                    'modified_since' => $modified_since,
                    'cursor'         => $next_cursor,
                    'count'          => 10,
                ]);

                // fetch api data
                foreach ($last_modified_call['products'] as $product) {
                    // Update status for re-sync
                    DB::table('to_viator')->where('status', 1)->where('product_code', $product['productCode'])->update([
                        'need_resync' => 1
                    ]);
                }

                // define next cursor
                $next_cursor = (!empty($last_modified_call['nextCursor'])) ? $last_modified_call['nextCursor'] : null;
            }
        }
    }
}