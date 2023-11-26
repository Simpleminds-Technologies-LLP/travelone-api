<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class ViatorController extends Controller
{
    /**
     * last modified since product
     */
    public function last_modified_since_product(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // get requested data
            $modified_since = $request->modified_since;
            $count          = $request->count;

            // fetch product list
            $last_modified = ViatorHelper::last_modified_since_product([
                'modified_since' => $modified_since,
                'count'          => 10,
            ]);

            // check api response is valid
            if(is_array($last_modified['products']) && count($last_modified['products'])) {
                // define array
                $modified_products = [];

                // define next cursor
                $next_cursor = (!empty($last_modified['nextCursor'])) ? $last_modified['nextCursor'] : null;

                // fetch api data
                foreach ($last_modified['products'] as $product) {
                    // push data in array
                    $modified_products[] = [
                        'product_code' => $product['productCode'],
                        'status'       => $product['status'],
                    ];
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
                        // push data in array
                        $modified_products[] = [
                            'product_code' => $product['productCode'],
                            'status'       => $product['status'],
                        ];
                    }

                    // define next cursor
                    $next_cursor = (!empty($last_modified_call['nextCursor'])) ? $last_modified_call['nextCursor'] : null;
                }

                // set response
                $return_arr['status'] = 200;
                $return_arr['data']   = $modified_products;
            } else {
                // set response
                $return_arr['status']  = 404;
                $return_arr['message'] = 'Authorization token is not valid';
            }
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    /**
     * last modified availability schedules
     */
    public function last_modified_availability_schedules(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // get requested data
            $modified_since = $request->modified_since;
            $count          = $request->count;

            // fetch product list
            $last_modified = ViatorHelper::last_modified_since_availability([
                'modified_since' => $modified_since,
                'count'          => 5,
            ]);

            // check api response is valid
            if(is_array($last_modified['availabilitySchedules']) && count($last_modified['availabilitySchedules'])) {
                // define array
                $modified_items = [];

                // define next cursor
                $next_cursor = (!empty($last_modified['nextCursor'])) ? $last_modified['nextCursor'] : null;

                // fetch api data
                foreach ($last_modified['availabilitySchedules'] as $product) {
                    // define array
                    $pricing_details = $timed_entries = [];

                    // fetch pricing details
                    if(!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails']) && count($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails'])) {
                        foreach ($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails'] as $row) {
                            // push data in array
                            if(count($row)) {
                                $pricing_details[$row['ageBand']] = $row['price']['original']['recommendedRetailPrice'];
                            }
                        }
                    }

                    // fetch pricing details
                    if(!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries']) && count($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries'])) {
                        foreach ($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries'] as $row) {
                            // push data in array
                            if(count($row)) {
                                $timed_entries[] = $row['startTime'];
                            }
                        }
                    }

                    // sort by array
                    ksort($pricing_details);

                    // push data in array
                    $modified_items[] = [
                        'product_code'    => $product['productCode'],
                        'option_code'     => (!empty($product['bookableItems'][0]['productOptionCode'])) ? $product['bookableItems'][0]['productOptionCode'] : null,
                        'start_date'      => (!empty($product['bookableItems'][0]['seasons'][0]['startDate'])) ? $product['bookableItems'][0]['seasons'][0]['startDate'] : null,
                        'end_date'        => (!empty($product['bookableItems'][0]['seasons'][0]['endDate'])) ? $product['bookableItems'][0]['seasons'][0]['endDate'] : null,
                        'days_of_week'    => (!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['daysOfWeek'])) ? $product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['daysOfWeek'] : [],
                        'pricing_details' => $pricing_details,
                        'timed_entries'   => $timed_entries,
                    ];
                }

                // fetch pagination callback
                while ($next_cursor != null) {
                    // fetch product list
                    $last_modified_call = ViatorHelper::last_modified_since_availability([
                        'modified_since' => $modified_since,
                        'cursor'         => $next_cursor,
                        'count'          => 10,
                    ]);

                    // fetch api data
                    foreach ($last_modified_call['availabilitySchedules'] as $product) {
                        // define array
                        $pricing_details = $timed_entries = [];

                        // fetch pricing details
                        if(!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails']) && count($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails'])) {
                            foreach ($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['pricingDetails'] as $row) {
                                // push data in array
                                if(count($row)) {
                                    $pricing_details[$row['ageBand']] = $row['price']['original']['recommendedRetailPrice'];
                                }
                            }
                        }

                        // fetch pricing details
                        if(!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries']) && count($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries'])) {
                            foreach ($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['timedEntries'] as $row) {
                                // push data in array
                                if(count($row)) {
                                    $timed_entries[] = $row['startTime'];
                                }
                            }
                        }

                        // sort by array
                        ksort($pricing_details);

                        // push data in array
                        $modified_items[] = [
                            'product_code'    => $product['productCode'],
                            'option_code'     => (!empty($product['bookableItems'][0]['productOptionCode'])) ? $product['bookableItems'][0]['productOptionCode'] : null,
                            'start_date'      => (!empty($product['bookableItems'][0]['seasons'][0]['startDate'])) ? $product['bookableItems'][0]['seasons'][0]['startDate'] : null,
                            'end_date'        => (!empty($product['bookableItems'][0]['seasons'][0]['endDate'])) ? $product['bookableItems'][0]['seasons'][0]['endDate'] : null,
                            'days_of_week'    => (!empty($product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['daysOfWeek'])) ? $product['bookableItems'][0]['seasons'][0]['pricingRecords'][0]['daysOfWeek'] : [],
                            'pricing_details' => $pricing_details,
                            'timed_entries'   => $timed_entries,
                        ];
                    }

                    // define next cursor
                    $next_cursor = (!empty($last_modified_call['nextCursor'])) ? $last_modified_call['nextCursor'] : null;
                }

                // set response
                $return_arr['status'] = 200;
                $return_arr['data']   = $modified_items;
            } else {
                // set response
                $return_arr['status']  = 404;
                $return_arr['message'] = 'Oops! Modified products are not found in viator from requested date.';
            }
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is invalid.';
        }

        // return response
        return response()->json($return_arr);
    }

    /**
     * single product availability schedules
     */
    public function single_product_availability_schedules(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // define array
            $schedule_data = [];

            // get requested data
            $product_code = $request->product_code;

            // fetch availability schedule
            $availability_data = ViatorHelper::single_product_availability_schedule($product_code);

            // fetch bookable items
            if(count($availability_data['bookableItems'])) {
                foreach ($availability_data['bookableItems'] as $item) {
                    // define array
                    $pricing_details = $timed_entries = [];

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

                    // sort by array
                    ksort($pricing_details);

                    // get product option code
                    $schedule_data[] = [
                        'option_code'     => (!empty($item['productOptionCode'])) ? $item['productOptionCode'] : null,
                        'start_date'      => (!empty($item['seasons'][0]['startDate'])) ? $item['seasons'][0]['startDate'] : null,
                        'end_date'        => (!empty($item['seasons'][0]['endDate'])) ? $item['seasons'][0]['endDate'] : null,
                        'days_of_week'    => (!empty($item['seasons'][0]['pricingRecords'][0]['daysOfWeek'])) ? $item['seasons'][0]['pricingRecords'][0]['daysOfWeek'] : [],
                        'pricing_details' => $pricing_details,
                        'timed_entries'   => $timed_entries,
                    ];
                }
            }
            
            // set response
            $return_arr['status'] = 200;
            $return_arr['data']   = $schedule_data;
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    /**
     * fetch and sync product list
     */
    public function fetch_product_list(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // get requested data
            $filter_data = $request->filter_data;

            // fetch product list
            $product_list = ViatorHelper::fetch_product_list($filter_data);

            // check product is valid
            if(is_array($product_list) && count($product_list) && !empty($product_list['products']) && is_array($product_list['products'])) {
                // fetch products
                foreach ($product_list['products'] as $product) {
                    // get product data
                    $productCode    = $product['productCode'];
                    $productflags   = $product['flags'];
                    $duration       = $product['duration'];
                    $pricingSummary = $product['pricing'];
                    $productOptions = (!empty($product['productOptions'])) ? $product['productOptions'] : [];

                    // fetch single product
                    $single_product = ViatorHelper::fetch_single_product($productCode);

                    // check is valid response
                    if(is_array($single_product) && !empty($single_product)) {
                        // get single product data
                        $title                       = ucwords(strtolower($single_product['title']));
                        $description                 = (!empty($single_product['description'])) ? $single_product['description'] : null;
                        $productUrl                  = (!empty($single_product['productUrl'])) ? $single_product['productUrl'] : null;
                        $ticketInfo                  = (!empty($single_product['ticketInfo'])) ? $single_product['ticketInfo'] : null;
                        $pricingInfo                 = (!empty($single_product['pricingInfo'])) ? $single_product['pricingInfo'] : null;
                        $logistics                   = (!empty($single_product['logistics'])) ? $single_product['logistics'] : null;
                        $timeZone                    = (!empty($single_product['timeZone'])) ? $single_product['timeZone'] : null;
                        $inclusions                  = (!empty($single_product['inclusions'])) ? $single_product['inclusions'] : null;
                        $exclusions                  = (!empty($single_product['exclusions'])) ? $single_product['exclusions'] : null;
                        $additionalInfo              = (!empty($single_product['additionalInfo'])) ? $single_product['additionalInfo'] : null;
                        $cancellationPolicy          = (!empty($single_product['cancellationPolicy'])) ? $single_product['cancellationPolicy'] : null;
                        $bookingConfirmationSettings = (!empty($single_product['bookingConfirmationSettings'])) ? $single_product['bookingConfirmationSettings'] : null;
                        $bookingRequirements         = (!empty($single_product['bookingRequirements'])) ? $single_product['bookingRequirements'] : null;
                        $languageGuides              = (!empty($single_product['languageGuides'])) ? $single_product['languageGuides'] : null;
                        $bookingQuestions            = (!empty($single_product['bookingQuestions'])) ? $single_product['bookingQuestions'] : null;
                        $tags                        = (!empty($single_product['tags'])) ? $single_product['tags'] : null;
                        $destinations                = (!empty($single_product['destinations'])) ? $single_product['destinations'] : null;
                        $itinerary                   = (!empty($single_product['itinerary'])) ? $single_product['itinerary'] : null;
                        $productOptions              = (!empty($single_product['productOptions'])) ? $single_product['productOptions'] : null;
                        $supplier                    = (!empty($single_product['supplier'])) ? $single_product['supplier'] : null;
                        $reviews                     = (!empty($single_product['reviews'])) ? $single_product['reviews'] : null;
                        $status                      = (!empty($single_product['status'])) ? $single_product['status'] : null;
                        $createdAt                   = (!empty($single_product['createdAt'])) ? $single_product['createdAt'] : null;
                        $lastUpdatedAt               = (!empty($single_product['lastUpdatedAt'])) ? $single_product['lastUpdatedAt'] : null;

                        // filter status
                        $is_status = ($status == 'ACTIVE') ? 1 : 0;

                        // filter special tags
                        $filter_speical_badge = ViatorHelper::filter_activity_special_badge($productflags);

                        // filter time duration
                        $filter_duration = ViatorHelper::filter_activity_duration($duration);

                        // find destination list
                        $filter_destination = ViatorHelper::find_destination_details($destinations);

                        // filter product image
                        $filter_product_images = ViatorHelper::filter_product_images($single_product['images']);

                        // filter inclusions
                        $filter_inclusions = ViatorHelper::filter_product_inclusions($inclusions);

                        // filter exclusions
                        $filter_exclusions = ViatorHelper::filter_product_exclusions($exclusions);

                        // filter additional info
                        $filter_additional_info = ViatorHelper::filter_product_additional_info($additionalInfo);

                        // filter booking question
                        $booking_questions = ViatorHelper::filter_booking_questions($bookingQuestions);

                        // filter product tags
                        $product_tags = ViatorHelper::filter_product_tags($tags);

                        // filter logistics
                        $filter_logistics = ViatorHelper::filter_product_logistics($logistics);

                        // filter itinerary
                        $filter_itinerary = ViatorHelper::filter_product_itinerary($itinerary);

                        // filter product reviews
                        $filter_reiews = ViatorHelper::filter_product_reviews($productCode);

                        // filter travelers photos
                        $filter_travelers_photos = ViatorHelper::filter_product_travelers_photos($filter_reiews);

                        // fetch product reviews
                        $all_product_reviews = ViatorHelper::fetch_single_product_reviews($productCode);

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
                            'filter_travelers_photos'     => $filter_travelers_photos,
                            'createdAt'                   => $createdAt,
                            'lastUpdatedAt'               => $lastUpdatedAt,
                        ];

                        // check sightseeing is exist
                        $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

                        // define combile tour ID
                        $is_common_tour_id = '';

                        // check item is exist
                        if(!count($is_exist)) {
                            // push data in table
                            $is_created_query = DB::table('to_tour_product')->insert([
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
                                'status'          => $is_status,
                            ]);

                            // get last inserted ID
                            $is_created_tour = DB::getPdo()->lastInsertId();

                            // check tour is created
                            if(!empty($is_created_tour)) {
                                // check and insert destination
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
                                        if($destination_id) {
                                            DB::table('to_tour_destination')->insert([
                                                'tour_id'        => $is_created_tour,
                                                'destination_id' => $destination_id,
                                            ]);
                                        }

                                        // insert city night
                                        if($city_id && $city_nights) {
                                            DB::table('to_tour_city_night')->insert([
                                                'tour_id' => $is_created_tour,
                                                'city_id' => $city_id,
                                                'night'   => $city_nights,
                                            ]);
                                        }

                                        // insert location data
                                        DB::table('to_tour_location')->insert([
                                            'tour_id'        => $is_created_tour,
                                            'destination_id' => $destination_id,
                                            'country_id'     => $country_id,
                                            'state_id'       => $state_id,
                                            'city_id'        => $city_id,
                                        ]);
                                    }
                                }

                                // insert viator tags
                                if(count($product_tags)) {
                                    // fetch product tags
                                    foreach ($product_tags as $tag) {
                                        DB::table('to_tour_viator_tag')->insert([
                                            'tour_id'  => $is_created_tour,
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
                                            'tour_id'    => $is_created_tour,
                                            'badge_name' => $badge_name,
                                        ]);
                                    }
                                }

                                // insert viator extra data
                                DB::table('to_tour_viator_extra_data')->insert([
                                    'tour_id'        => $is_created_tour,
                                    'product_code'   => $productCode,
                                    'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                                    'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                                    'time_duration'  => $filter_duration,
                                    'reviews'        => $reviews['combinedAverageRating'],
                                ]);

                                // insert terms data
                                DB::table('to_tour_terms')->insert([
                                    'tour_id'              => $is_created_tour,
                                    'what_is_included'     => json_encode($filter_inclusions),
                                    'what_is_not_included' => json_encode($filter_exclusions),
                                    'important_notes'      => json_encode($filter_additional_info),
                                ]);

                                // push response in array
                                $return_arr['data'][] = [
                                    'action'     => 'created',
                                    'created_id' => $is_created_tour,
                                    'is_status'  => $is_status,
                                ];

                                // update common tour ID
                                $is_common_tour_id = $is_created_tour;
                            }
                        } else {
                            // get exist tour ID
                            $exist_tour_id = $is_exist[0]->id;

                            // update common tour ID
                            $is_common_tour_id = $exist_tour_id;

                            // remove location data
                            DB::table('to_tour_viator_tag')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_destination')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_location')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_city_night')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_terms')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_viator_extra_data')->where('tour_id', $exist_tour_id)->delete();
                            DB::table('to_tour_viator_special_badge')->where('tour_id', $exist_tour_id)->delete();

                            // push data in table
                            $is_updated_tour = DB::table('to_tour_product')
                                ->where('id', $exist_tour_id)
                                ->update([
                                    'tour_name'       => $title,
                                    'description'     => $description,
                                    'featured_image'  => $filter_product_images['cover_image'],
                                    'media_gallery'   => json_encode($filter_product_images['related_images']),
                                    'seo_title'       => $title,
                                    'extra_json_data' => json_encode($extra_json_data),
                                    'status'          => $is_status,
                                    'updated_at'      => date('Y-m-d h:i:s'),
                                ]
                            );

                            // check and insert destination
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
                                    if($destination_id) {
                                        DB::table('to_tour_destination')->insert([
                                            'tour_id'        => $exist_tour_id,
                                            'destination_id' => $destination_id,
                                        ]);
                                    }

                                    // insert city night
                                    if($city_id && $city_nights) {
                                        DB::table('to_tour_city_night')->insert([
                                            'tour_id' => $exist_tour_id,
                                            'city_id' => $city_id,
                                            'night'   => $city_nights,
                                        ]);
                                    }

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $exist_tour_id,
                                        'destination_id' => $destination_id,
                                        'country_id'     => $country_id,
                                        'state_id'       => $state_id,
                                        'city_id'        => $city_id,
                                    ]);
                                }
                            }

                            // insert viator tags
                            if(count($product_tags)) {
                                // fetch product tags
                                foreach ($product_tags as $tag) {
                                    DB::table('to_tour_viator_tag')->insert([
                                        'tour_id'  => $exist_tour_id,
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
                                        'tour_id'    => $exist_tour_id,
                                        'badge_name' => $badge_name,
                                    ]);
                                }
                            }

                            // insert terms data
                            DB::table('to_tour_terms')->insert([
                                'tour_id'              => $exist_tour_id,
                                'what_is_included'     => json_encode($filter_inclusions),
                                'what_is_not_included' => json_encode($filter_exclusions),
                                'important_notes'      => json_encode($filter_additional_info),
                            ]);

                            // insert viator extra data
                            DB::table('to_tour_viator_extra_data')->insert([
                                'tour_id'        => $exist_tour_id,
                                'product_code'   => $productCode,
                                'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                                'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                                'time_duration'  => (int) $filter_duration,
                                'reviews'        => (int) $reviews['combinedAverageRating'],
                            ]);

                            // push response in array
                            $return_arr['data'][] = [
                                'action'        => 'updated',
                                'exist_tour_id' => $exist_tour_id,
                                'is_status'     => $is_status,
                                'is_updated'    => ($is_updated_tour) ? true : false,
                            ];
                        }

                        // check common tour ID is valid
                        if(!empty($is_common_tour_id) && !empty($all_product_reviews['filteredReviewsSummary']['totalReviews'])) {
                            // fetch reviews
                            foreach ($all_product_reviews['reviews'] as $review) {
                                // get single review data
                                $reviewReference = $review['reviewReference'];
                                $userName        = $review['userName'];
                                $rating          = $review['rating'];
                                $text            = $review['text'];
                                $title           = $review['title'];
                                $provider        = $review['provider'];
                                $helpfulVotes    = $review['helpfulVotes'];
                                $photosInfo      = (!empty($review['photosInfo'])) ? $review['photosInfo'] : [];
                                $publishedDate   = $review['publishedDate'];

                                // check sightseeing is exist
                                $is_exist_review = DB::table('to_tour_viator_reviews')->select('id')->where('tour_id', $is_common_tour_id)->where('product_code', $productCode)->where('review_reference', $reviewReference)->get()->toArray();

                                // check is exist
                                if(empty($is_exist_review)) {
                                    try {
                                        // insert terms data
                                        DB::table('to_tour_viator_reviews')->insert([
                                            'tour_id'          => $is_common_tour_id,
                                            'product_code'     => $productCode,
                                            'review_reference' => $reviewReference,
                                            'username'         => $userName,
                                            'title'            => $title,
                                            'rating'           => $rating,
                                            'review_text'      => $text,
                                            'provider'         => $provider,
                                            'helpful_votes'    => $helpfulVotes,
                                            'photos_info'      => json_encode($photosInfo),
                                            'published_date'   => date('Y-m-d h:i:s', strtotime($publishedDate)),
                                            'synced_date'      => date('Y-m-d h:i:s'),
                                        ]);
                                    } catch (Exception $error) {
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // set response
                $return_arr['status']  = 404;
                $return_arr['message'] = 'Product list is not found';
            }
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    /**
     * availability check
     */
    public function availability_check(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // get requested data
            $filter_data = $request->filter_data;

            // fetch product list
            $check_availability = ViatorHelper::availability_check($filter_data);

            // set response
            $return_arr = $check_availability;
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    /**
     * bookings cart hold
     */
    public function bookings_cart_hold(Request $request)
    {
        // define array
        $return_arr = [];

        // get request header
        $headers             = $request->header();
        $authorization_token = (count($headers['authorization'])) ? $headers['authorization'][0] : null;

        // check authorization token is valid
        if($authorization_token === 'lFiNZgpQfdOaCoTFovyo') {
            // get requested data
            $body_payload = $request->body_payload;

            // fetch product list
            $hold_cart_items = ViatorHelper::bookings_cart_hold($body_payload);

            // set response
            $return_arr = $hold_cart_items;
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }
}
