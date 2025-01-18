<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class ViatorController extends Controller
{
    // Last modified since product
    public function last_modified_since_product()
    {
        // define array
        $return_arr = [];

        // Get today's date
        $today = new \DateTime();

        // Subtract 30 days from today's date
        $thirtyDaysAgo = $today->sub(new \DateInterval('P30D'));

        // get requested data
        $modified_since = $thirtyDaysAgo->format('Y-m-d') . "T12:00:00.000000Z";

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

            // Send slack notification
            ViatorHelper::send_slack_notification('TravelOne :: Last modified since product was run successfully.');

            // set response
            $return_arr['status'] = 200;
            $return_arr['data']   = $modified_products;
        } else {
            // set response
            $return_arr['status']  = 404;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    // Last modified availability schedules
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

                // Send slack notification
                ViatorHelper::send_slack_notification('TravelOne :: Last modified availability schedules was run successfully.');

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

    // Single product availability schedules
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
            $unavailable_dates = $package_seasons_dates = [];

            // get requested data
            $product_code = $request->product_code;

            // fetch availability schedule
            $availability_data = ViatorHelper::single_product_availability_schedule($product_code);

            // check is valid array
            if(count($availability_data['bookableItems'])) {
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
            
            // set response
            $return_arr['status'] = 200;
            $return_arr['data']   = $unavailable_dates;
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }

    // Update activity availability schedules
    public function update_activity_availability_schedules()
    {
        // define array
        $return_arr = [];

        // get viator products list
        $product_list = DB::table('to_tour_viator_extra_data')->select('product_code')->orderBy('id', 'DESC')->get()->toArray();

        // fetch products list
        foreach ($product_list as $product) {
            // define arrays
            $allowed_dates = $unavailable_dates = $seasons_dates = $allowed_days = [];

            // Get today's date
            $today = new \DateTime();

            // Get one year later date from today
            $oneYearLater = clone $today;
            $oneYearLater->modify('+1 year');
            $currentDate = clone $today;

            // get requested data
            $product_code = $product->product_code;

            // fetch availability schedule
            $availability_data = ViatorHelper::single_product_availability_schedule($product_code);

            // fetch bookable items
            if(!empty($availability_data['bookableItems']) && count($availability_data['bookableItems'])) {
                foreach ($availability_data['bookableItems'] as $item) {
                    // get allowed days
                    $activity_allowed_days = $item['seasons'][0]['pricingRecords'][0]['daysOfWeek'];

                    // check if it's a valid array
                    if (is_array($activity_allowed_days) && count($activity_allowed_days)) {
                        $allowed_days = array_map(function ($day) {
                            return date('N', strtotime($day));
                        }, $activity_allowed_days);
                    }

                    // collect unique start dates
                    $seasons_dates[] = $item['seasons'][0]['startDate'];

                    // fetch unavailable dates
                    if (!empty($item['seasons'][0]['pricingRecords'][0]['timedEntries'][0]['unavailableDates'])) {
                        $unavailable_dates = array_merge($unavailable_dates, array_column($item['seasons'][0]['pricingRecords'][0]['timedEntries'][0]['unavailableDates'], 'date'));
                    }
                }
            }

            // sort and make the array unique
            $unavailable_dates = array_unique($unavailable_dates);
            sort($unavailable_dates);

            // filter out unavailable dates
            $allowedDates = array_filter(iterator_to_array(new \DatePeriod($currentDate, new \DateInterval('P1D'), $oneYearLater)), function ($date) use ($unavailable_dates, $allowed_days) {
                $currentDateString = $date->format('Y-m-d');
                return !in_array($currentDateString, $unavailable_dates) && !in_array($date->format('N'), $allowed_days);
            });

            // convert allowed dates to strings
            $allowedDates = array_map(function ($date) {
                return $date->format('Y-m-d');
            }, $allowedDates);

            // update activity values
            DB::table('to_tour_viator_extra_data')
                ->where('product_code', $product_code)
                ->update([
                    'unavailable_dates' => implode(', ', $allowedDates),
                ]);
        }

        // return response
        return response()->json(['status' => true]);
    }

    // Fetch single product
    public function single_fetch_product(Request $request)
    {
        // define array
        $return_arr = [];

        // define array
        $productflags = $pricingSummary = [];

        // get requested data
        $productCode = trim($request->product_code);

        // fetch single product
        $single_product = ViatorHelper::fetch_single_product($productCode);

        // check is valid response
        if(is_array($single_product) && !empty($single_product)) {
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
            $reviews                     = $single_product['reviews'] ?? null;
            $status                      = $single_product['status'] ?? null;
            $createdAt                   = $single_product['createdAt'] ?? null;
            $lastUpdatedAt               = $single_product['lastUpdatedAt'] ?? null;

            // Filter data
            $filter_speical_badge    = ViatorHelper::filter_activity_special_badge($productflags);
            $filter_duration         = ViatorHelper::filter_activity_duration($itinerary['duration']);
            $filter_destination      = ViatorHelper::find_destination_details($destinations);
            $filter_product_images   = ViatorHelper::filter_product_images($single_product['images']);
            $filter_inclusions       = ViatorHelper::filter_product_inclusions($inclusions);
            $filter_exclusions       = ViatorHelper::filter_product_exclusions($exclusions);
            $filter_additional_info  = ViatorHelper::filter_product_additional_info($additionalInfo);
            $booking_questions       = ViatorHelper::filter_booking_questions($bookingQuestions);
            $product_tags            = ViatorHelper::filter_product_tags($tags);
            $filter_attraction       = ViatorHelper::filter_activity_attraction($itinerary);
            $filter_logistics        = ViatorHelper::filter_product_logistics($logistics);
            $filter_itinerary        = ViatorHelper::filter_product_itinerary($itinerary);
            $filter_reiews           = ViatorHelper::filter_product_reviews($productCode);
            $filter_travelers_photos = ViatorHelper::filter_product_travelers_photos($filter_reiews);
            $all_product_reviews     = ViatorHelper::fetch_single_product_reviews($productCode);

            // push other json data
            $extra_json_data = [
                'productCode'                 => $productCode,
                'status'                      => $status,
                'durationActivityTime'        => $itinerary['duration'],
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

            // Check if sightseeing exists
            $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

            // define combile tour ID
            $is_common_tour_id = '';

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
                    'status'          => 1,
                ];

                // Insert data into the table and get the last inserted ID
                $is_created_tour = DB::table('to_tour_product')->insertGetId($insertData);

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
                                'tour_id'    => $is_created_tour,
                                'badge_name' => $badge_name,
                            ]);
                        }
                    }

                    // count attraction data
                    if(count($filter_attraction)) {
                        // fetch attractions
                        foreach ($filter_attraction as $attraction_name) {
                            // insert attraction data
                            DB::table('to_tour_viator_attraction')->insert([
                                'tour_id'         => $is_created_tour,
                                'attraction_name' => $attraction_name,
                                'attraction_slug' => ViatorHelper::str_slug($attraction_name),
                            ]);
                        }
                    }

                    // Delete previous data
                    DB::table('to_tour_viator_extra_data')->where('product_code', $productCode)->delete();

                    // insert viator extra data
                    DB::table('to_tour_viator_extra_data')->insert([
                        'tour_id'        => $is_created_tour,
                        'product_code'   => $productCode,
                        'selling_price'  => 0,
                        'discount_price' => 0,
                        'time_duration'  => (!empty($filter_duration)) ? $filter_duration : 0,
                        'reviews'        => $reviews['combinedAverageRating'] ?? 0,
                    ]);

                    // insert terms data
                    DB::table('to_tour_terms')->insert([
                        'tour_id'              => $is_created_tour,
                        'what_is_included'     => json_encode($filter_inclusions),
                        'what_is_not_included' => json_encode($filter_exclusions),
                        'important_notes'      => json_encode($filter_additional_info),
                    ]);

                    // push response in array
                    $return_arr = [
                        'action'       => 'created',
                        'created_id'   => $is_created_tour,
                        'product_code' => $productCode,
                        'is_status'    => 1,
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

                // Delete previous data
                DB::table('to_tour_viator_extra_data')->where('product_code', $productCode)->delete();
                DB::table('to_tour_viator_tag')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_destination')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_location')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_city_night')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_terms')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_viator_special_badge')->where('tour_id', $exist_tour_id)->delete();
                DB::table('to_tour_viator_attraction')->where('tour_id', $exist_tour_id)->delete();

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
                        'status'          => 1,
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
                if(is_array($product_tags) && count($product_tags)) {
                    // fetch product tags
                    foreach ($product_tags as $tag) {
                        DB::table('to_tour_viator_tag')->insert([
                            'tour_id'  => $exist_tour_id,
                            'tag_name' => trim($tag['tag_name'])
                        ]);
                    }
                }

                // count badge data
                if(is_array($filter_speical_badge) && count($filter_speical_badge)) {
                    // fetch special badge
                    foreach ($filter_speical_badge as $badge_name) {
                        // insert badge data
                        DB::table('to_tour_viator_special_badge')->insert([
                            'tour_id'    => $exist_tour_id,
                            'badge_name' => $badge_name,
                        ]);
                    }
                }

                // count attraction data
                if(is_array($filter_attraction) && count($filter_attraction)) {
                    // fetch attractions
                    foreach ($filter_attraction as $attraction_name) {
                        // insert attraction data
                        DB::table('to_tour_viator_attraction')->insert([
                            'tour_id'         => $exist_tour_id,
                            'attraction_name' => $attraction_name,
                            'attraction_slug' => ViatorHelper::str_slug($attraction_name),
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
                    'selling_price'  => 0,
                    'discount_price' => 0,
                    'time_duration'  => (int) $filter_duration,
                    'reviews'        => (int) (!empty($reviews['combinedAverageRating'])) ? $reviews['combinedAverageRating'] : 0,
                ]);

                // push response in array
                $return_arr = [
                    'action'        => 'updated',
                    'exist_tour_id' => $exist_tour_id,
                    'product_code'  => $productCode,
                    'is_status'     => 1,
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
                    $photosInfo      = $review['photosInfo'] ?? [];
                    $publishedDate   = $review['publishedDate'];

                    // check sightseeing is exist
                    $is_exist_review = DB::table('to_tour_viator_reviews')->select('id')->where('tour_id', $is_common_tour_id)->where('product_code', $productCode)->where('review_reference', $reviewReference)->get()->toArray();

                    // check emoji is exist in review
                    $is_emoji_title = ViatorHelper::is_emoji_exist($title);
                    $is_emoji_text  = ViatorHelper::is_emoji_exist($text);

                    // check is exist
                    if(empty($is_exist_review) && !$is_emoji_title && !$is_emoji_text) {
                        // insert terms data
                        DB::table('to_tour_viator_reviews')->insert([
                            'tour_id'          => $is_common_tour_id,
                            'product_code'     => $productCode,
                            'review_reference' => $reviewReference,
                            'username'         => $userName,
                            'title'            => $title,
                            'rating'           => (int) $rating,
                            'review_text'      => $text,
                            'provider'         => $provider,
                            'helpful_votes'    => $helpfulVotes,
                            // 'photos_info'      => json_encode($photosInfo),
                            'published_date'   => date('Y-m-d h:i:s', strtotime($publishedDate)),
                            'synced_date'      => date('Y-m-d h:i:s'),
                        ]);
                    }
                }
            }
        }

        // return response
        return response()->json($return_arr);
    }

    // Availability check
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

    // Bookings cart hold
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

    // Fetch destination list
    public function viator_destinations(Request $request)
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

            // define array
            $return_arr = [];

            // fetch product list
            $destination_list = ViatorHelper::viator_destinations();

            // mapping system cities
            $system_cities = ViatorHelper::mapping_viator_and_system_city();

            // fetch destination
            foreach ($destination_list['data'] as $row_key => $row) {
                // check type
                if($row['destinationType'] == 'CITY' && !empty($row['timeZone'])) {
                    // get city name
                    $viator_city_name = $row['destinationName'];
                    $viator_timezone = explode('/', $row['timeZone']);
                    $viator_timezone = $viator_timezone[0];

                    // match original destination
                    $original_destination_id = (!empty($system_cities[$viator_timezone])) ? $system_cities[$viator_timezone] : null;

                    // check city is exist in our system
                    $is_city_exist = (array) DB::table('location_cities')->select('id AS city_id', 'name AS city_name', 'destination_id', 'country_id', 'state_id')->orWhere('name', 'like', $viator_city_name)->where('status', 1)->get()->first();

                    // check is valid count
                    if(count($is_city_exist)) {
                        // check destination ID is valid
                        if(!$is_city_exist['destination_id'] && $original_destination_id) {
                            // update destination ID
                            DB::table('location_cities')
                                ->where('id', $is_city_exist['city_id'])
                                ->update([
                                    'destination_id' => $original_destination_id
                                ]
                            );
                        }

                        // push data in array
                        $return_arr[] = [
                            'viator' => [
                                'city_id'   => $row['destinationId'],
                                'city_name' => $row['destinationName'],
                                'timezone'  => $viator_timezone,
                            ],
                            'system' => [
                                'city_id'        => $is_city_exist['city_id'],
                                'city_name'      => $is_city_exist['city_name'],
                                'destination_id' => (!empty($is_city_exist['destination_id'])) ? $is_city_exist['destination_id'] : $original_destination_id,
                                'country_id'     => $is_city_exist['country_id'],
                                'state_id'       => $is_city_exist['state_id'],
                            ]
                        ];
                    }
                }
            }

            // set response
            $return_arr = $return_arr;
        } else {
            // set response
            $return_arr['status']  = 500;
            $return_arr['message'] = 'Authorization token is not valid';
        }

        // return response
        return response()->json($return_arr);
    }
}
