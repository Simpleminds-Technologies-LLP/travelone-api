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
        $verify_main_product_2 = DB::table('to_viator')->select('*')->where('status', 2)->get();
        $verify_tags_product_2 = DB::table('to_viator')->select('*')->where('tag_status', 2)->get();
        $verify_tags_product_3 = DB::table('to_viator')->select('*')->where('tag_status', 3)->get();
        $verify_review_product_2 = DB::table('to_viator')->select('*')->where('review_status', 2)->get();
        $verify_attraction_product_2 = DB::table('to_viator')->select('*')->where('attraction_status', 2)->get();
        $verify_chatgpt_product_2 = DB::table('to_viator')->select('*')->where('chatgpt_status', 2)->get();
        $verify_theme_product_2 = DB::table('to_viator')->select('*')->where('theme_status', 2)->get();
        $verify_review_count_product_2 = DB::table('to_viator')->select('*')->where('review_count_status', 2)->get();

        // Check is valid activity
        if(!empty($verify_main_product_2)) {
            // Fetch tours
            foreach ($verify_main_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'availability_status' => 2,
                    'tag_status' => 2,
                    'review_status' => 2,
                    'attraction_status' => 2,
                    'chatgpt_status' => 2,
                    'theme_status' => 2,
                    'review_count_status' => 2,
                    'languages' => 2,
                    'float_price' => 2,
                    'location' => 2,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_review_product_2)) {
            // Fetch tours
            foreach ($verify_review_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_review_count_product_2)) {
            // Fetch tours
            foreach ($verify_review_count_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_theme_product_2)) {
            // Fetch tours
            foreach ($verify_theme_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_chatgpt_product_2)) {
            // Fetch tours
            foreach ($verify_chatgpt_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_attraction_product_2)) {
            // Fetch tours
            foreach ($verify_attraction_product_2 as $product) {
                // Deactive product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
                ]);
            }
        }

        // Check is valid activity
        if(!empty($verify_tags_product_2)) {
            // Fetch tours
            foreach ($verify_tags_product_2 as $product) {
                // Re-sync product
                DB::table('to_viator')->where('id', $product->id)->update([
                    'status' => 0,
                    'availability_status' => 0,
                    'tag_status' => 0,
                    'review_status' => 0,
                    'attraction_status' => 0,
                    'chatgpt_status' => 0,
                    'theme_status' => 0,
                    'review_count_status' => 0,
                    'languages' => 0,
                    'float_price' => 0,
                    'location' => 0,
                    'updated_at' => NULL,
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
                            'status' => 0,
                            'availability_status' => 0,
                            'tag_status' => 0,
                            'review_status' => 0,
                            'attraction_status' => 0,
                            'chatgpt_status' => 0,
                            'theme_status' => 0,
                            'review_count_status' => 0,
                            'languages' => 0,
                            'float_price' => 0,
                            'location' => 0,
                            'updated_at' => NULL,
                        ]);
                    }
                } else {
                    // Re-sync product
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'status' => 0,
                        'availability_status' => 0,
                        'tag_status' => 0,
                        'review_status' => 0,
                        'attraction_status' => 0,
                        'chatgpt_status' => 0,
                        'theme_status' => 0,
                        'review_count_status' => 0,
                        'languages' => 0,
                        'float_price' => 0,
                        'location' => 0,
                        'updated_at' => NULL,
                    ]);
                }
            }
        }

        echo true;
    }

    // Sync single viator activity
    public function sync_viator_product_list(Request $request)
    {
        // Get requested data
        $viator_country_id = $request->viator_country_id;
        $to_destination_id = $request->to_destination_id;
        $to_country_id = $request->to_country_id;
        $req_start_position = $request->start;
        $req_end_position = $request->end;
        $default_limit = $request->limit ?? 50;
        $waiting_time = $request->waiting_time ?? 5; // In seconds

        // Initialize position for loop
        $position = $req_start_position;

        // Loop positions
        while ($position <= $req_end_position) {
            // Define API request payload
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

            // Fetch product list from API
            $product_list = ViatorHelper::fetch_product_list($filter_data);

            // Check if products are valid
            if (!empty($product_list['products'])) {
                // Fetch products
                foreach ($product_list['products'] as $product) {
                    // Prepare insert row
                    $insert_data = [
                        'viator_country_id' => $viator_country_id,
                        'to_destination_id' => $to_destination_id,
                        'to_country_id' => $to_country_id,
                        'product_code' => $product['productCode'],
                        'extra_json' => json_encode([
                            'productflags' => $product['flags'] ?? null,
                            'duration' => $product['duration'] ?? null,
                            'pricingSummary' => $product['pricing'] ?? null,
                            'productOptions' => $product['productOptions'] ?? [],
                        ])
                    ];

                    // Insert record
                    DB::table('to_viator')->insert($insert_data);
                }
            }

            // Update position for next loop
            $position += $default_limit;

            // Optional: Add a delay between API calls to avoid rate-limiting issues
            if ($waiting_time > 0) {
                sleep($waiting_time);
            }
        }

        echo "success";
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
        $viator_product = DB::table('to_viator')->select('*')->where('status', 0)->orderBy('id', 'DESC')->limit(10)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $row) {
                // get product data
                $productCode = $row->product_code;
                $to_destination_id = $row->to_destination_id;
                $to_country_id = $row->to_country_id;

                // Convert extra json
                $json_data = json_decode($row->extra_json, true);

                // Get activity meta
                $productflags = $json_data['productflags'] ?? null;
                $duration = $json_data['duration'] ?? null;
                $pricingSummary = $json_data['pricingSummary'] ?? null;
                $productOptions = $json_data['productOptions'] ?? [];

                // fetch single product
                $single_product = ViatorHelper::fetch_single_product($productCode);

                // check is valid response
                if(is_array($single_product) && !empty($single_product) && $single_product['status'] == 'ACTIVE') {
                    // define combile tour ID
                    $is_common_tour_id = '';

                    // get single product data
                    $title = trim($single_product['title'] ?? '');
                    $description = $single_product['description'] ?? null;
                    $productUrl = $single_product['productUrl'] ?? null;
                    $ticketInfo = $single_product['ticketInfo'] ?? null;
                    $pricingInfo = $single_product['pricingInfo'] ?? null;
                    $logistics = $single_product['logistics'] ?? null;
                    $timeZone = $single_product['timeZone'] ?? null;
                    $inclusions = $single_product['inclusions'] ?? null;
                    $exclusions = $single_product['exclusions'] ?? null;
                    $additionalInfo = $single_product['additionalInfo'] ?? null;
                    $cancellationPolicy = $single_product['cancellationPolicy'] ?? null;
                    $bookingConfirmationSettings = $single_product['bookingConfirmationSettings'] ?? null;
                    $bookingRequirements = $single_product['bookingRequirements'] ?? null;
                    $languageGuides = $single_product['languageGuides'] ?? null;
                    $bookingQuestions = $single_product['bookingQuestions'] ?? null;
                    $tags = $single_product['tags'] ?? null;
                    $destinations = $single_product['destinations'] ?? null;
                    $itinerary = $single_product['itinerary'] ?? null;
                    $productOptions = $single_product['productOptions'] ?? null;
                    $supplier = $single_product['supplier'] ?? null;
                    $images = $single_product['images'] ?? null;
                    $reviews = $single_product['reviews'] ?? null;
                    $status = $single_product['status'] ?? null;
                    $createdAt = $single_product['createdAt'] ?? null;
                    $lastUpdatedAt = $single_product['lastUpdatedAt'] ?? null;

                    // Filter data
                    $filter_destination = ViatorHelper::find_destination_details($json_destination_list, $destinations);
                    // $filter_logistics = ViatorHelper::filter_product_logistics($logistics); // API
                    $filter_speical_badge = ViatorHelper::filter_activity_special_badge($productflags);
                    $filter_duration = ViatorHelper::filter_activity_duration($duration);
                    $booking_questions = ViatorHelper::filter_booking_questions($json_booking_questions, $bookingQuestions);
                    $filter_product_images = ViatorHelper::filter_product_images($images);
                    $product_tags = ViatorHelper::filter_product_tags($json_tags, $tags);
                    $filter_inclusions = ViatorHelper::filter_product_inclusions($inclusions);
                    $filter_exclusions = ViatorHelper::filter_product_exclusions($exclusions);
                    $filter_additional_info = ViatorHelper::filter_product_additional_info($additionalInfo);
                    // $filter_itinerary = ViatorHelper::filter_product_itinerary($itinerary); // API

                    // push other json data
                    $extra_json_data = [
                        'productCode' => $productCode,
                        'status' => $status,
                        'durationActivityTime' => $duration,
                        'filter_destination' => $filter_destination,
                        'ticketInfo' => $ticketInfo,
                        'pricingSummary' => $pricingSummary,
                        'pricingInfo' => $pricingInfo,
                        'logistics' => [],
                        'itinerary' => [],
                        'timeZone' => $timeZone,
                        'inclusions' => $inclusions,
                        'exclusions' => $exclusions,
                        'additionalInfo' => $additionalInfo,
                        'cancellationPolicy' => $cancellationPolicy,
                        'bookingQuestions' => $booking_questions,
                        'bookingConfirmationSettings' => $bookingConfirmationSettings,
                        'bookingRequirements' => $bookingRequirements,
                        'product_tags' => $product_tags,
                        'languageGuides' => $languageGuides,
                        'productOptions' => $productOptions,
                        'productflags' => $productflags,
                        'supplier' => $supplier,
                        'reviews' => $reviews,
                        'createdAt' => $createdAt,
                        'lastUpdatedAt' => $lastUpdatedAt,
                    ];

                    // define combile tour ID
                    $is_common_tour_id = '';

                    // Check if sightseeing exists
                    $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

                    // check item is exist
                    if(!count($is_exist)) {
                        // Prepare data for insertion
                        $insertData = [
                            'user_id' => 1,
                            'slug' => ViatorHelper::str_slug($title),
                            'sku' => 'viator_api',
                            'tour_name' => $title,
                            'listing_type' => 'Instant Booking',
                            'media_type' => 'reference',
                            'description' => $description,
                            'featured_image' => $filter_product_images['cover_image'],
                            'media_gallery' => json_encode($filter_product_images['related_images']),
                            'seo_title' => $title,
                            'tour_sync_type' => 'viator',
                            'extra_json_data' => json_encode($extra_json_data),
                            'status' => 0,
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
                                'tour_name' => $title,
                                'description' => $description,
                                'featured_image' => $filter_product_images['cover_image'],
                                'media_gallery' => json_encode($filter_product_images['related_images']),
                                'seo_title' => $title,
                                'extra_json_data' => json_encode($extra_json_data),
                                'status' => 1,
                                'updated_at' => date('Y-m-d h:i:s'),
                            ]
                        );
                    }

                    // check common tour ID is valid
                    if(!empty($is_common_tour_id)) {
                        // Update sync status
                        DB::table('to_viator')->where('id', $row->id)->update([
                            'status' => 1,
                            'updated_at' => date('Y-m-d h:i:s')
                        ]);

                        // insert viator tags
                        if(count($product_tags)) {
                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id' => $is_common_tour_id,
                                    'tag_name' => trim($tag['tag_name'])
                                ]);
                            }
                        }

                        // count badge data
                        if(count($filter_speical_badge)) {
                            // fetch special badge
                            foreach ($filter_speical_badge as $badge_name) {
                                // insert badge data
                                DB::table('to_tour_viator_special_badge')->insert([
                                    'tour_id' => $is_common_tour_id,
                                    'badge_name' => $badge_name,
                                ]);
                            }
                        }

                        // insert terms data
                        DB::table('to_tour_terms')->insert([
                            'tour_id' => $is_common_tour_id,
                            'what_is_included' => json_encode($filter_inclusions),
                            'what_is_not_included' => json_encode($filter_exclusions),
                            'important_notes' => json_encode($filter_additional_info),
                        ]);

                        // insert viator extra data
                        DB::table('to_tour_viator_extra_data')->insert([
                            'tour_id' => $is_common_tour_id,
                            'product_code' => $productCode,
                            'selling_price' => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                            'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                            'time_duration' => (!empty($filter_duration)) ? $filter_duration : 0,
                            'reviews' => $reviews['combinedAverageRating'] ?? 0,
                        ]);

                        // Publish created tour
                        DB::table('to_tour_product')->where('id', $is_common_tour_id)->update(['status' => 1]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $row->id)->update([
                        'status' => 2,
                        'updated_at' => date('Y-m-d h:i:s')
                    ]);
                }

                // Sleep for 4 seconds
                sleep(4);
            }
        }

        // Return response
        echo json_encode($viator_product);
    }

    // Fetch single product availability schedules
    public function sync_viator_availability_schedules(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('availability_status', 0)->limit(100)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // Define array
                $blocked_dates = $package_seasons_dates = $days_of_week = [];

                // Get product data
                $product_id = $product->id;
                $product_code = $product->product_code;

                // Fetch availability schedule
                $availability_data = ViatorHelper::single_product_availability_schedule($product_code);

                // Check is valid array
                if(!empty($availability_data['bookableItems']) && count($availability_data['bookableItems'])) {
                    // Fetch bookable items
                    foreach ($availability_data['bookableItems'] as $items) {
                        // Fetch seasons
                        foreach ($items['seasons'] as $seasons) {
                            // Get season data
                            $start_date = (!empty($seasons['startDate'])) ? $seasons['startDate'] : '';
                            $end_date = (!empty($seasons['endDate'])) ? $seasons['endDate'] : '';
                            $pricing_records = (!empty($seasons['pricingRecords'])) ? $seasons['pricingRecords'] : [];

                            // Update start and end date
                            if(!empty($start_date)) {
                                $package_seasons_dates['start'][] = $start_date;
                            }
                            if(!empty($end_date)) {
                                $package_seasons_dates['end'][] = $end_date;
                            }

                            // Check record is valid
                            if(count($pricing_records)) {
                                // Fetch pricing
                                foreach ($pricing_records as $record) {
                                    // Get pricing data
                                    $record_days_of_week = (!empty($record['daysOfWeek'])) ? $record['daysOfWeek'] : [];
                                    $timed_entries = (!empty($record['timedEntries'])) ? $record['timedEntries'] : [];

                                    // Get common unavailable dates
                                    $unavailable_dates = $this->get_common_unavailable_dates($timed_entries);

                                    // Merge array
                                    $blocked_dates = array_merge($unavailable_dates, $blocked_dates);
                                    $days_of_week = array_merge($record_days_of_week, $days_of_week);
                                }
                            }
                        }
                    }
                }

                // Filter season start and end dates
                $package_seasons_dates = ViatorHelper::filter_season_dates($package_seasons_dates);

                // Remove duplicate values
                $blocked_dates = array_unique($blocked_dates);
                $days_of_week = array_unique($days_of_week);

                // Sort items
                sort($blocked_dates);

                // generate dates
                $unavailable_date = ViatorHelper::getUnavailableDates($package_seasons_dates, $blocked_dates, $days_of_week);

                // Sort array
                array_unique($unavailable_date);
                sort($unavailable_date);

                // Update activity values
                if(count($unavailable_date)) {
                    DB::table('to_tour_viator_extra_data')
                        ->where('product_code', $product_code)
                        ->update(['unavailable_dates' => implode(', ', $unavailable_date)]
                    );
                }

                // Update sync status
                DB::table('to_viator')->where('id', $product_id)->update(['availability_status' => 1]);
            }
        }
    }

    // Get common unavailable dates
    private function get_common_unavailable_dates($timedEntries)
    {
        // Define array
        $commonDates = [];

        // Check if there are any timed entries
        if (!is_array($timedEntries) || empty($timedEntries)) {
            return $commonDates; // Return empty if no timed entries
        }

        // Initialize with dates from the first valid time slot
        $initialDates = null;

        foreach ($timedEntries as $entry) {
            // Ensure 'unavailableDates' key exists and is an array
            if (!isset($entry['unavailableDates']) || !is_array($entry['unavailableDates'])) {
                continue; // Skip this entry if 'unavailableDates' is missing or invalid
            }

            // Extract dates for the current time slot
            $currentDates = array_column($entry['unavailableDates'], 'date');

            if ($initialDates === null) {
                // Initialize with the first valid time slot's dates
                $initialDates = $currentDates;
            } else {
                // Find intersection with existing common dates
                $initialDates = array_intersect($initialDates, $currentDates);
            }

            // If no common dates remain, break early
            if (empty($initialDates)) {
                break;
            }
        }

        // Return the common dates
        return $initialDates !== null ? array_values($initialDates) : [];
    }

    // Fetch viator categories tag
    public function sync_viator_categories_tag(Request $request)
    {
        // Get tags data
        $json_tags = file_get_contents('http://sync.travelone.io/tags.json');
        $json_tags = json_decode($json_tags, true);

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('tag_status', 0)->orderBy('id', 'ASC')->limit(500)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_id = $product->id;
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check tour is valid
                if(!empty($to_tour_data->tour_id)) {
                    // Fetch single tour
                    $single_product = DB::table('to_tour_product')->select('extra_json_data')->where('id', $to_tour_data->tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Decode json data
                        $json_data = json_decode($single_product->extra_json_data, true);
                        $product_tags = $json_data['product_tags'] ?? [];

                        // Check tags array
                        if(!empty($product_tags)) {
                            // Remove previous data
                            // DB::table('to_tour_viator_tag')->where('tour_id', $to_tour_data->tour_id)->delete();

                            // Check is valid tags array
                            if(is_array($product_tags) && count($product_tags)) {
                                foreach ($product_tags as $tag_key => $tags) {
                                    if(count($tags['parent_tag_id'])) {
                                        $product_tags[$tag_key]['parent_tag_id'] = ViatorHelper::filter_product_tags($json_tags, $tags['parent_tag_id']);
                                    }
                                }
                            }

                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                // Insert record
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id' => $to_tour_data->tour_id,
                                    'parent_tag_id' => (count($tag['parent_tag_id'])) ? end($tag['parent_tag_id'])['tag_id'] : null,
                                    'parent_tag_name' => (count($tag['parent_tag_id'])) ? end($tag['parent_tag_id'])['tag_name'] : null,
                                    'tag_id' => $tag['tag_id'],
                                    'tag_name' => trim($tag['tag_name'])
                                ]);
                            }
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['tag_status' => 1]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['tag_status' => 2]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update(['tag_status' => 3]);
                }
            }
        }

        // Return response
        echo true;
    }

    // Fetch viator reviews
    public function sync_viator_reviews(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('review_status', 0)->orderBy('id', 'ASC')->limit(10)->get();

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
                    $is_common_tour_id = $to_tour_data->tour_id;

                    // Fetch product reviews
                    $product_reviews = ViatorHelper::fetch_single_product_reviews($product_code, 500);

                    // Check reviews is valid
                    if($is_common_tour_id && !empty($product_reviews['reviews']) && count($product_reviews['reviews'])) {
                        // fetch reviews
                        foreach ($product_reviews['reviews'] as $review) {
                            // get single review data
                            $review_reference = $review['reviewReference'];
                            $language = $review['language'];
                            $user_name = $review['userName'] ?? 'Unknow';
                            $rating = $review['rating'];
                            $text = $review['text'];
                            $title = $review['title'];
                            $provider = $review['provider'] ?? 'VIATOR';
                            $helpful_votes = $review['helpfulVotes'] ?? false;
                            $traveler_photos = $review['photosInfo'] ?? [];
                            $published_date = $review['publishedDate'];

                            // Check is review in english only
                            if($language === 'en' && !empty($product_code) && !empty($review_reference)) {
                                // check emoji is exist in review
                                $is_emoji_title = ViatorHelper::is_emoji_exist($title);
                                $is_emoji_text  = ViatorHelper::is_emoji_exist($text);

                                // check is exist
                                if(!$is_emoji_title && !$is_emoji_text) {
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
                    DB::table('to_viator')->where('id', $product->id)->update([ 'review_status' => 1 ]);
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([ 'review_status' => 2 ]);
                }

                // Hold for 5 seconds
                sleep(5);
            }
        }

        // Return response
        echo true;
    }

    // Sync viator attraction
    public function sync_viator_attraction(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('attraction_status', 0)->orderBy('id', 'ASC')->limit(15)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product) && count($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check if tour is created
                if(!empty($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data->tour_id;

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
                        foreach ($filter_attraction as $attraction) {
                            // insert attraction data
                            DB::table('to_tour_viator_attraction')->insert([
                                'tour_id' => $is_common_tour_id,
                                'attraction_name' => $attraction['title'],
                                'attraction_slug' => ViatorHelper::str_slug($attraction['title']),
                                'featured_image' => $attraction['image'] ?? null,
                                'viator_attraction_id' => $attraction['id'],
                            ]);
                        }
                    }

                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([ 'attraction_status' => 1 ]);
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([ 'attraction_status' => 2 ]);
                }

                // Hold for 3 seconds
                sleep(3);
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
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check if tour is created
                if(!empty($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data->tour_id;

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

    // Sync local languages tour
    public function sync_local_languages_tour(Request $request)
    {
        // Get destination data
        $json_languages_list = file_get_contents('http://sync.travelone.io/languages.json');
        $json_languages_list = json_decode($json_languages_list, true);

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 1)->where('languages', 0)->orderBy('id', 'ASC')->limit(50)->get();

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

                        // Check language guides
                        if(!empty($viator_json['languageGuides'])) {
                            // Fetch languages
                            foreach ($viator_json['languageGuides'] as $language) {
                                // insert destination data
                                if(!empty($json_languages_list[$language['language']])) {
                                    DB::table('to_tour_viator_languages')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'language_code' => $language['language'],
                                        'language_name' => $json_languages_list[$language['language']],
                                    ]);
                                }
                            }
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'languages' => 1,
                        ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product->id)->update([
                            'languages' => 3,
                        ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product->id)->update([
                        'languages' => 2,
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
                    $title = trim($single_product['title'] ?? '');
                    $description = $single_product['description'] ?? null;
                    $productUrl = $single_product['productUrl'] ?? null;
                    $ticketInfo = $single_product['ticketInfo'] ?? null;
                    $pricingInfo = $single_product['pricingInfo'] ?? null;
                    $logistics = $single_product['logistics'] ?? null;
                    $timeZone = $single_product['timeZone'] ?? null;
                    $inclusions = $single_product['inclusions'] ?? null;
                    $exclusions = $single_product['exclusions'] ?? null;
                    $additionalInfo = $single_product['additionalInfo'] ?? null;
                    $cancellationPolicy = $single_product['cancellationPolicy'] ?? null;
                    $bookingConfirmationSettings = $single_product['bookingConfirmationSettings'] ?? null;
                    $bookingRequirements = $single_product['bookingRequirements'] ?? null;
                    $languageGuides = $single_product['languageGuides'] ?? null;
                    $bookingQuestions = $single_product['bookingQuestions'] ?? null;
                    $tags = $single_product['tags'] ?? null;
                    $destinations = $single_product['destinations'] ?? null;
                    $itinerary = $single_product['itinerary'] ?? null;
                    $productOptions = $single_product['productOptions'] ?? null;
                    $supplier = $single_product['supplier'] ?? null;
                    $images = $single_product['images'] ?? null;
                    $reviews = $single_product['reviews'] ?? null;
                    $status = $single_product['status'] ?? null;
                    $createdAt = $single_product['createdAt'] ?? null;
                    $lastUpdatedAt = $single_product['lastUpdatedAt'] ?? null;

                    // Filter data
                    $filter_destination = ViatorHelper::find_destination_details($json_destination_list, $destinations);
                    // $filter_logistics = ViatorHelper::filter_product_logistics($logistics); // API
                    $filter_speical_badge = ViatorHelper::filter_activity_special_badge($productflags);
                    $filter_duration = ViatorHelper::filter_activity_duration($duration);
                    $booking_questions = ViatorHelper::filter_booking_questions($json_booking_questions, $bookingQuestions);
                    $filter_product_images = ViatorHelper::filter_product_images($images);
                    $product_tags = ViatorHelper::filter_product_tags($json_tags, $tags);
                    $filter_inclusions = ViatorHelper::filter_product_inclusions($inclusions);
                    $filter_exclusions = ViatorHelper::filter_product_exclusions($exclusions);
                    $filter_additional_info = ViatorHelper::filter_product_additional_info($additionalInfo);
                    // $filter_itinerary = ViatorHelper::filter_product_itinerary($itinerary); // API

                    // push other json data
                    $extra_json_data = [
                        'productCode' => $productCode,
                        'status' => $status,
                        'durationActivityTime' => $duration,
                        'filter_destination' => $filter_destination,
                        'ticketInfo' => $ticketInfo,
                        'pricingSummary' => $pricingSummary,
                        'pricingInfo' => $pricingInfo,
                        'logistics' => [],
                        'itinerary' => [],
                        'timeZone' => $timeZone,
                        'inclusions' => $inclusions,
                        'exclusions' => $exclusions,
                        'additionalInfo' => $additionalInfo,
                        'cancellationPolicy' => $cancellationPolicy,
                        'bookingQuestions' => $booking_questions,
                        'bookingConfirmationSettings' => $bookingConfirmationSettings,
                        'bookingRequirements' => $bookingRequirements,
                        'product_tags' => $product_tags,
                        'languageGuides' => $languageGuides,
                        'productOptions' => $productOptions,
                        'productflags' => $productflags,
                        'supplier' => $supplier,
                        'reviews' => $reviews,
                        'createdAt' => $createdAt,
                        'lastUpdatedAt' => $lastUpdatedAt,
                    ];

                    // define combile tour ID
                    $is_common_tour_id = '';

                    // Check if sightseeing exists
                    $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

                    // check item is exist
                    if(!count($is_exist)) {
                        // Prepare data for insertion
                        $insertData = [
                            'user_id' => 1,
                            'slug' => ViatorHelper::str_slug($title),
                            'sku' => 'viator_api',
                            'tour_name' => $title,
                            'listing_type' => 'Instant Booking',
                            'media_type' => 'reference',
                            'description' => $description,
                            'featured_image' => $filter_product_images['cover_image'],
                            'media_gallery' => json_encode($filter_product_images['related_images']),
                            'seo_title' => $title,
                            'tour_sync_type' => 'viator',
                            'extra_json_data' => json_encode($extra_json_data),
                            'status' => 0,
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
                                'tour_name' => $title,
                                'description' => $description,
                                'featured_image' => $filter_product_images['cover_image'],
                                'media_gallery' => json_encode($filter_product_images['related_images']),
                                'seo_title' => $title,
                                'extra_json_data' => json_encode($extra_json_data),
                                'status' => 1,
                                'updated_at' => date('Y-m-d h:i:s'),
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
                                    $city_nights = $city_data->nights;
                                    $city_id = $city_data->id;
                                    $destination_id = $city_data->destination_id;
                                    $country_id = $city_data->country_id;
                                    $state_id = $city_data->state_id;

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id' => $to_country_id,
                                        'state_id' => $state_id,
                                        'city_id' => $city_id,
                                    ]);
                                } else {
                                    // Create new city
                                    $created_city = DB::table('location_cities')->insert([
                                        'name' => $destination_name,
                                        'slug' => str_replace(" ", "_", strtolower($destination_name)),
                                        'destination_id' => $to_destination_id,
                                        'country_id' => $to_country_id,
                                        'state_id' => 0,
                                    ]);

                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'destination_id' => $to_destination_id,
                                        'country_id' => $to_country_id,
                                        'state_id' => 0,
                                        'city_id' => (!empty($created_city->id)) ? $created_city->id : null,
                                    ]);
                                }
                            }
                        }

                        // insert viator tags
                        if(count($product_tags)) {
                            // fetch product tags
                            foreach ($product_tags as $tag) {
                                DB::table('to_tour_viator_tag')->insert([
                                    'tour_id' => $is_common_tour_id,
                                    'tag_name' => trim($tag['tag_name'])
                                ]);
                            }
                        }

                        // count badge data
                        if(count($filter_speical_badge)) {
                            // fetch special badge
                            foreach ($filter_speical_badge as $badge_name) {
                                // insert badge data
                                DB::table('to_tour_viator_special_badge')->insert([
                                    'tour_id' => $is_common_tour_id,
                                    'badge_name' => $badge_name,
                                ]);
                            }
                        }

                        // insert terms data
                        DB::table('to_tour_terms')->insert([
                            'tour_id' => $is_common_tour_id,
                            'what_is_included' => json_encode($filter_inclusions),
                            'what_is_not_included' => json_encode($filter_exclusions),
                            'important_notes' => json_encode($filter_additional_info),
                        ]);

                        // insert viator extra data
                        DB::table('to_tour_viator_extra_data')->insert([
                            'tour_id' => $is_common_tour_id,
                            'product_code' => $productCode,
                            'selling_price' => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                            'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                            'time_duration' => (!empty($filter_duration)) ? $filter_duration : 0,
                            'reviews' => $reviews['combinedAverageRating'] ?? 0,
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

    // Update city slug
    public function update_city_slug(Request $request)
    {
        // Check if activity exists
        $city_list = DB::table('location_cities')
            ->select('*')
            ->where('status', 1)
            ->where('destination_id', '>', 0)
            ->where('country_id', '>', 0)
            ->get();

        // Fetch city
        foreach ($city_list as $city) {
            DB::table('location_cities')->where('id', $city->id)->update([
                'seo_title' => $city->name,
                'seo_description' => $city->name,
                'seo_keyword' => $city->name,
                'slug' => ViatorHelper::str_slug($city->name),
            ]);
        }

        echo 'success';
    }

    // Update country slug
    public function update_country_slug(Request $request)
    {
        // Check if activity exists
        $country_list = DB::table('location_countries')
            ->select('*')
            ->get();

        // Fetch city
        foreach ($country_list as $country) {
            DB::table('location_countries')->where('id', $country->id)->update([
                'seo_title' => $country->name,
                'seo_description' => $country->name,
                'seo_keyword' => $country->name,
                'slug' => ViatorHelper::str_slug($country->name),
                'description' => NULL,
                'video_title' => NULL,
                'video_desc' => NULL,
                'video_url' => NULL,
                'flag' => (!empty($country->flag)) ? $country->flag : NULL,
            ]);
        }

        echo 'success';
    }

    // Update states slug
    public function update_states_slug(Request $request)
    {
        // Check if activity exists
        $states_list = DB::table('location_states')
            ->select('*')
            ->get();

        // Fetch city
        foreach ($states_list as $state) {
            DB::table('location_states')->where('id', $state->id)->update([
                'slug' => ViatorHelper::str_slug($state->name)
            ]);
        }

        echo 'success';
    }

    // Viator arrange location
    public function viator_arrange_location(Request $request)
    {
        // Define array
        $to_location = [];

        // Get destination data
        $json_destination_list = file_get_contents('http://sync.travelone.io/destination.json');
        $json_destination_list = json_decode($json_destination_list, true);

        // Fetch destinations for country
        foreach ($json_destination_list['data'] as $row) {
            // Check destination type
            if($row['destinationType'] === 'COUNTRY') {
                // Push country in array
                $to_location[$row['destinationId']] = [
                    'destinationId' => $row['destinationId'],
                    'destinationName' => $row['destinationName'],
                    'timeZone' => $row['timeZone'],
                    'defaultCurrencyCode' => $row['defaultCurrencyCode'],
                    'destinationUrlName' => $row['destinationUrlName'],
                    'destinationType' => $row['destinationType'],
                ];
            }
        }

        // Fetch destinations for region
        foreach ($json_destination_list['data'] as $row) {
            // Check destination type
            if($row['destinationType'] === 'REGION') {
                // Push country in array
                $to_location[$row['parentId']]['region'][] = [
                    'destinationId' => $row['destinationId'],
                    'destinationName' => $row['destinationName'],
                    'timeZone' => $row['timeZone'],
                    'defaultCurrencyCode' => $row['defaultCurrencyCode'],
                    'destinationUrlName' => $row['destinationUrlName'],
                    'destinationType' => $row['destinationType'],
                ];
            }
        }

        // Fetch destinations for city
        foreach ($json_destination_list['data'] as $row) {
            // Check destination type
            if($row['destinationType'] === 'CITY') {
                // Push country in array
                $to_location[$row['parentId']]['city'][] = [
                    'destinationId' => $row['destinationId'],
                    'destinationName' => $row['destinationName'],
                    'timeZone' => $row['timeZone'],
                    'defaultCurrencyCode' => $row['defaultCurrencyCode'],
                    'destinationUrlName' => $row['destinationUrlName'],
                    'destinationType' => $row['destinationType'],
                ];
            }
        }

        // Fetch TO location data
        foreach ($to_location as $location) {
            // Check destination ID is valid
            if(!empty($location['destinationId'])) {
                // Fetch country
                $is_to_country = DB::table('location_countries')->select('*')->where('name', $location['destinationName'])->first();

                // Check is country exist
                if(!empty($is_to_country)) {
                    // Update flag
                    DB::table('location_countries')->where('id', $is_to_country->id)->update([
                        'currency_code' => $location['defaultCurrencyCode'],
                        'need_for_viator' => 1,
                    ]);

                    // Fetch cities
                    if(!empty($location['city'])) {
                        foreach ($location['city'] as $city) {
                            // Fetch city
                            $is_to_city = DB::table('location_cities')->select('*')->where('name', $city['destinationName'])->first();

                            // Check is valid city
                            if(!empty($is_to_city)) {
                                // Update flag
                                DB::table('location_cities')->where('id', $is_to_city->id)->update([
                                    'destination_id' => $is_to_country->destination_id,
                                    'country_id' => $is_to_country->id,
                                    'seo_title' => $city['destinationName'],
                                    'seo_description' => $city['destinationName'],
                                    'seo_keyword' => $city['destinationName'],
                                    'slug' => ViatorHelper::str_slug($city['destinationName']),
                                    'need_for_viator' => 1
                                ]);
                            } else {
                                // Create new
                                DB::table('location_cities')->insert([
                                    'name' => $city['destinationName'],
                                    'seo_title' => $city['destinationName'],
                                    'seo_description' => $city['destinationName'],
                                    'seo_keyword' => $city['destinationName'],
                                    'slug' => ViatorHelper::str_slug($city['destinationName']),
                                    'destination_id' => $is_to_country->destination_id,
                                    'country_id' => $is_to_country->id,
                                    'need_for_viator' => 1
                                ]);
                            }
                        }
                    }

                    // Fetch states
                    if(!empty($location['region'])) {
                        foreach ($location['region'] as $region) {
                            // Fetch state
                            $is_to_state = DB::table('location_states')->select('*')->where('name', $region['destinationName'])->first();

                            // Check is valid city
                            if(!empty($is_to_state)) {
                                // Update flag
                                DB::table('location_states')->where('id', $is_to_state->id)->update([
                                    'destination_id' => $is_to_country->destination_id,
                                    'country_id' => $is_to_country->id,
                                    'seo_title' => $region['destinationName'],
                                    'seo_description' => $region['destinationName'],
                                    'seo_keyword' => $region['destinationName'],
                                    'slug' => ViatorHelper::str_slug($region['destinationName']),
                                    'need_for_viator' => 1
                                ]);
                            } else {
                                // Create new
                                DB::table('location_states')->insert([
                                    'name' => $region['destinationName'],
                                    'destination_id' => $is_to_country->destination_id,
                                    'country_id' => $is_to_country->id,
                                    'seo_title' => $region['destinationName'],
                                    'seo_description' => $region['destinationName'],
                                    'seo_keyword' => $region['destinationName'],
                                    'slug' => ViatorHelper::str_slug($region['destinationName']),
                                    'need_for_viator' => 1
                                ]);
                            }
                        }
                    }
                } else {
                    // Create new
                    DB::table('location_countries')->insert([
                        'name' => $location['destinationName'],
                        'seo_title' => $location['destinationName'],
                        'seo_description' => $location['destinationName'],
                        'seo_keyword' => $location['destinationName'],
                        'slug' => ViatorHelper::str_slug($location['destinationName']),
                        'currency_code' => $location['defaultCurrencyCode'],
                        'need_for_viator' => 1
                    ]);
                }
            } else {
                // Fetch cities
                if(!empty($location['city'])) {
                    foreach ($location['city'] as $city) {
                        // Fetch city
                        $is_to_city = DB::table('location_cities')->select('*')->where('name', $city['destinationName'])->first();

                        // Check is valid city
                        if(!empty($is_to_city)) {
                            // Update flag
                            DB::table('location_cities')->where('id', $is_to_city->id)->update([
                                'destination_id' => $is_to_country->destination_id,
                                'country_id' => $is_to_country->id,
                                'seo_title' => $city['destinationName'],
                                'seo_description' => $city['destinationName'],
                                'seo_keyword' => $city['destinationName'],
                                'slug' => ViatorHelper::str_slug($city['destinationName']),
                                'need_for_viator' => 1
                            ]);
                        } else {
                            // Create new
                            DB::table('location_cities')->insert([
                                'name' => $city['destinationName'],
                                'seo_title' => $city['destinationName'],
                                'seo_description' => $city['destinationName'],
                                'seo_keyword' => $city['destinationName'],
                                'slug' => ViatorHelper::str_slug($city['destinationName']),
                                'destination_id' => $is_to_country->destination_id,
                                'country_id' => $is_to_country->id,
                                'need_for_viator' => 1
                            ]);
                        }
                    }
                }

                // Fetch states
                if(!empty($location['region'])) {
                    foreach ($location['region'] as $region) {
                        // Fetch state
                        $is_to_state = DB::table('location_states')->select('*')->where('name', $region['destinationName'])->first();

                        // Check is valid city
                        if(!empty($is_to_state)) {
                            // Update flag
                            DB::table('location_states')->where('id', $is_to_state->id)->update([
                                'destination_id' => $is_to_country->destination_id,
                                'country_id' => $is_to_country->id,
                                'seo_title' => $region['destinationName'],
                                'seo_description' => $region['destinationName'],
                                'seo_keyword' => $region['destinationName'],
                                'slug' => ViatorHelper::str_slug($region['destinationName']),
                                'need_for_viator' => 1
                            ]);
                        } else {
                            // Create new
                            DB::table('location_states')->insert([
                                'name' => $region['destinationName'],
                                'destination_id' => $is_to_country->destination_id,
                                'country_id' => $is_to_country->id,
                                'seo_title' => $region['destinationName'],
                                'seo_description' => $region['destinationName'],
                                'seo_keyword' => $region['destinationName'],
                                'slug' => ViatorHelper::str_slug($region['destinationName']),
                                'need_for_viator' => 1
                            ]);
                        }
                    }
                }
            }
        }
    }

    // Sync local tour location
    public function sync_local_tour_location(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code', 'to_destination_id', 'to_country_id')->where('status', 1)->where('location', 0)->orderBy('id', 'ASC')->limit(600)->get();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_id = $product->id;
                $product_code = $product->product_code;
                $to_destination_id = $product->to_destination_id;
                $to_country_id = $product->to_country_id;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check if tour is created
                if(!empty($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('tour_name', 'slug', 'featured_image', 'extra_json_data')->where('id', $is_common_tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Get viator json data
                        $viator_json = json_decode($single_product->extra_json_data, true);

                        // Fetch destinations
                        if(!empty($viator_json['filter_destination'])) {
                            foreach ($viator_json['filter_destination'] as $location) {
                                // Get location data
                                if(!empty($location['data']['destinationType']) && $location['data']['destinationType'] === 'CITY') {
                                    // Find city data
                                    $is_to_city = DB::table('location_cities')->select('*')->where('name', $location['data']['destinationName'])->first();

                                    // Insert location
                                    if(!empty($is_to_city)) {
                                        DB::table('to_tour_location')->insert([
                                            'tour_id' => $is_common_tour_id,
                                            'destination_id' => $to_destination_id,
                                            'country_id' => $to_country_id,
                                            'state_id' => $is_to_city->state_id,
                                            'city_id' => $is_to_city->id,
                                            'is_primary' => $location['primary'] ?? 0,
                                        ]);
                                    }
                                } else if(!empty($location['data']['destinationType']) && $location['data']['destinationType'] === 'REGION') {
                                    // Find city data
                                    $is_to_state = DB::table('location_states')->select('*')->where('name', $location['data']['destinationName'])->first();

                                    // Insert location
                                    if(!empty($is_to_state)) {
                                        DB::table('to_tour_location')->insert([
                                            'tour_id' => $is_common_tour_id,
                                            'destination_id' => $to_destination_id,
                                            'country_id' => $to_country_id,
                                            'state_id' => $is_to_state->id,
                                            'city_id' => null,
                                            'is_primary' => $location['primary'] ?? 0,
                                        ]);
                                    }
                                }
                            }
                        }

                        // Insert record in to_search
                        DB::table('to_search')->insert([
                            'search_type' => 'tour',
                            'keyword' => $single_product->tour_name,
                            'slug' => $single_product->slug,
                            'image' => $single_product->featured_image,
                            'reference_id' => $is_common_tour_id,
                            'extra_json' => json_encode([
                                'tour_sync_type' => 'viator',
                                'fixedDurationInMinutes' => (!empty($viator_json['fixedDurationInMinutes'])) ? $viator_json['durationActivityTime']['fixedDurationInMinutes'] : '',
                                'unstructuredDuration' => (!empty($viator_json['durationActivityTime']['unstructuredDuration'])) ? $viator_json['durationActivityTime']['unstructuredDuration'] : '',
                                'variableDurationFromMinutes' => (!empty($viator_json['durationActivityTime']['variableDurationFromMinutes'])) ? $viator_json['durationActivityTime']['variableDurationFromMinutes'] : '',
                                'variableDurationToMinutes' => (!empty($viator_json['durationActivityTime']['variableDurationToMinutes'])) ? $viator_json['durationActivityTime']['variableDurationToMinutes'] : '',
                                'fromPrice' => (!empty($viator_json['pricingSummary']['summary']['fromPrice'])) ? $viator_json['pricingSummary']['summary']['fromPrice'] : '',
                                'price_type' => (!empty($viator_json['pricingInfo']['type'])) ? $viator_json['pricingInfo']['type'] : '',
                            ])
                        ]);

                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update([ 'location' => 1 ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update([ 'location' => 3 ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update([ 'location' => 2 ]);
                }
            }
        }

        echo true;
    }

    // Sync local tour ticket only
    public function sync_local_ticket_only(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code', 'to_destination_id', 'to_country_id')->where('status', 1)->where('ticket_only', 0)->orderBy('id', 'ASC')->limit(1000)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // get product data
                $product_id = $product->id;
                $product_code = $product->product_code;
                $to_destination_id = $product->to_destination_id;
                $to_country_id = $product->to_country_id;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check if tour is created
                if(!empty($to_tour_data)) {
                    // Assign updated tour ID
                    $is_common_tour_id = $to_tour_data->tour_id;

                    // fetch single product
                    $single_product = DB::table('to_tour_product')->select('tour_name', 'slug', 'featured_image', 'extra_json_data')->where('id', $is_common_tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Get viator json data
                        $viator_json = json_decode($single_product->extra_json_data, true);

                        // Check is ticket only
                        if(!empty($viator_json['ticketInfo'])) {
                            // Check array exist
                            if(in_array('MOBILE_ONLY', $viator_json['ticketInfo']['ticketTypes'])) {
                                // Update flag
                                DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->update([
                                    'ticket_only' => 1
                                ]);
                            }
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update([ 'ticket_only' => 1 ]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update([ 'ticket_only' => 3 ]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update([ 'ticket_only' => 2 ]);
                }
            }
        }

        echo true;
    }

    // Viator tour package options
    public function viator_tour_package_options(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('package_options', 0)->limit(50)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // Get product data
                $product_id = $product->id;
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check tour is valid
                if(!empty($to_tour_data->tour_id)) {
                    // Fetch single tour
                    $single_product = DB::table('to_tour_product')->select('extra_json_data')->where('id', $to_tour_data->tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Decode json data
                        $json_data = json_decode($single_product->extra_json_data, true);

                        // Fetch availability date
                        $travel_date = ViatorHelper::single_tour_available_next_date($to_tour_data->tour_id);

                        // Define payload data
                        $filter_data = [
                            'productCode' => $product_code,
                            'travelDate' => $travel_date,
                            'currency' => 'USD',
                            'paxMix' => [
                                [
                                    'numberOfTravelers' => 1,
                                    'ageBand' => 'ADULT',
                                ]
                            ],
                        ];

                        // Find package availability
                        $package_availability = ViatorHelper::availability_check($filter_data);

                        // Check is available items
                        if(!empty($package_availability) && !empty($package_availability['bookableItems'])) {
                            // filter package options
                            $filter_options = ViatorHelper::viator_filter_package_options($json_data, $package_availability['bookableItems']);

                            // Check options is valid
                            if(count($filter_options)) {
                                // Fetch options
                                foreach ($filter_options as $product_key => $option) {
                                    // Insert terms data
                                    DB::table('to_tour_viator_package_options')->insert([
                                        'tour_id' => $to_tour_data->tour_id,
                                        'product_code' => $product_code,
                                        'option_code' => $product_key,
                                        'package_title' => $option['title'],
                                        'package_price' => $option['price'],
                                        'start_time' => (!empty($option['time'])) ? serialize($option['time']) : '',
                                        'description' => $option['description'],
                                    ]);
                                }

                                // Update sync status
                                DB::table('to_viator')->where('id', $product_id)->update(['package_options' => 1]);
                            } else {
                                // Update sync status
                                DB::table('to_viator')->where('id', $product_id)->update(['package_options' => 2]);
                            }
                        } else {
                            // Update sync status
                            DB::table('to_viator')->where('id', $product_id)->update(['package_options' => 3]);
                        }
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['package_options' => 4]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update(['package_options' => 5]);
                }
            }
        }
    }

    // Update tour logistics location
    public function update_tour_logistics_location(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('logistics', 0)->limit(200)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // Get product data
                $product_id = $product->id;
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check tour is valid
                if(!empty($to_tour_data->tour_id)) {
                    // Fetch single tour
                    $single_product = DB::table('to_tour_product')->select('slug', 'extra_json_data')->where('id', $to_tour_data->tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Decode json data
                        $json_data = json_decode($single_product->extra_json_data, true);

                        // fetch single product
                        $single_viator_product = ViatorHelper::fetch_single_product($product_code);

                        // Check logistics array is valid
                        if(!empty($single_viator_product['logistics'])) {
                            // Filter logistics data
                            $filter_logistics = ViatorHelper::filter_product_logistics($single_viator_product['logistics']);

                            // Update logistics data
                            $json_data['logistics'] = $filter_logistics ?? [];

                            // Update tour data
                            DB::table('to_tour_product')->where('id', $to_tour_data->tour_id)->update([
                                'extra_json_data' => json_encode($json_data)
                            ]);
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['logistics' => 1]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['logistics' => 2]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update(['logistics' => 3]);
                }
            }
        }
    }

    // Update tour itinerary location
    public function update_tour_itinerary_location(Request $request)
    {
        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('id', 'product_code')->where('status', 1)->where('itinerary', 0)->limit(200)->get()->toArray();

        // Check is valid activity
        if(!empty($viator_product)) {
            // Fetch tours
            foreach ($viator_product as $product) {
                // Get product data
                $product_id = $product->id;
                $product_code = $product->product_code;

                // Get created tour data
                $to_tour_data = DB::table('to_tour_viator_extra_data')->select('tour_id')->where('product_code', $product_code)->first();

                // Check tour is valid
                if(!empty($to_tour_data->tour_id)) {
                    // Fetch single tour
                    $single_product = DB::table('to_tour_product')->select('slug', 'extra_json_data')->where('id', $to_tour_data->tour_id)->first();

                    // Check json is valid
                    if(!empty($single_product->extra_json_data)) {
                        // Decode json data
                        $json_data = json_decode($single_product->extra_json_data, true);

                        // fetch single product
                        $single_viator_product = ViatorHelper::fetch_single_product($product_code);

                        // Check itinerary array is valid
                        if(!empty($single_viator_product['itinerary'])) {
                            // Filter itinerary data
                            $filter_itinerary = ViatorHelper::filter_product_itinerary($single_viator_product['itinerary']);

                            // Update itinerary data
                            $json_data['itinerary'] = $filter_itinerary ?? [];

                            // Update tour data
                            DB::table('to_tour_product')->where('id', $to_tour_data->tour_id)->update([
                                'extra_json_data' => json_encode($json_data)
                            ]);
                        }

                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['itinerary' => 1]);
                    } else {
                        // Update sync status
                        DB::table('to_viator')->where('id', $product_id)->update(['itinerary' => 2]);
                    }
                } else {
                    // Update sync status
                    DB::table('to_viator')->where('id', $product_id)->update(['itinerary' => 3]);
                }
            }
        }
    }

    // Update viator tag slug
    public function update_viator_tag_slug(Request $request)
    {
        // Fetch unsynced tags
        $tag_list = DB::table('to_tour_viator_tag')
            ->select('id', 'tag_name')
            ->where('is_synced', 0)
            ->limit(3000)
            ->get();

        // Check if there are unsynced tags
        if ($tag_list->isNotEmpty()) {
            // Prepare data for bulk update
            $updateData = [];
            foreach ($tag_list as $tag) {
                $updateData[$tag->id] = [
                    'tag_slug' => ViatorHelper::str_slug($tag->tag_name),
                    'is_synced' => 1,
                ];
            }

            // Generate a CASE statement for bulk update
            $cases = [];
            $ids = [];
            foreach ($updateData as $id => $data) {
                $cases['tag_slug'][] = "WHEN id = $id THEN '" . addslashes($data['tag_slug']) . "'";
                $cases['is_synced'][] = "WHEN id = $id THEN " . $data['is_synced'];
                $ids[] = $id;
            }

            // Build the update query
            $sql = "UPDATE to_tour_viator_tag SET 
                        tag_slug = CASE " . implode(' ', $cases['tag_slug']) . " END,
                        is_synced = CASE " . implode(' ', $cases['is_synced']) . " END
                    WHERE id IN (" . implode(',', $ids) . ")";

            // Execute the bulk update query
            DB::statement($sql);
        }
    }
}