<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class SyncController extends Controller
{
    // Sync single viator activity
    public function sync_viator_product_list(Request $request)
    {
        // Get requested data
        $req_country_id     = 75;
        $req_start_position = $request->start;
        $default_limit      = 40;

        // Define static body
        $filter_data = [
            "filtering" => [
                "destination" => $req_country_id
            ],
            "pagination" => [
                "start" => $req_start_position,
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
                if(is_array($isActivityExist) && !count($isActivityExist)) {
                    // insert terms data
                    DB::table('to_viator')->insert([
                        'viator_country_id' => $req_country_id,
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
        }

        echo 'Success! Synced up to ' . ($req_start_position + $default_limit) . '. Next will be ' . ($req_start_position + $default_limit + 1) . '.'; die;
    }

    // Fetch and sync product list
    public function viator_single_sync(Request $request)
    {
        // Get destination data
        $json_destination_list = file_get_contents('https://api.travelone.io/destination.json');
        $json_destination_list = json_decode($json_destination_list, true);

        // Get booking questions data
        $json_booking_questions = file_get_contents('https://api.travelone.io/booking_questions.json');
        $json_booking_questions = json_decode($json_booking_questions, true);

        // Get tags data
        $json_tags = file_get_contents('https://api.travelone.io/tags.json');
        $json_tags = json_decode($json_tags, true);

        // Define default data
        $default_destination_id = 38;
        $default_country_id     = 38;
        $default_state_id       = 541;
        $default_city_id        = 20426;

        // Check if activity exists
        $viator_product = DB::table('to_viator')->select('*')->where('status', 0)->limit(1)->get();
        $viator_product = (!empty($viator_product)) ? (array) $viator_product[0] : null;

        // Check is valid activity
        if(!empty($viator_product)) {
            // get product data
            $productCode = $viator_product['product_code'];

            // Convert extra json
            $json_data = json_decode($viator_product['extra_json'], true);

            // Get activity meta
            $productflags   = $json_data['productflags'] ?? null;
            $duration       = $json_data['duration'] ?? null;
            $pricingSummary = $json_data['pricingSummary'] ?? null;
            $productOptions = $json_data['productOptions'] ?? [];

            // Check if activity exists
            $isActivityExist = DB::table('to_viator')->select('*')->where('product_code', $productCode)->where('status', 1)->get()->toArray();

            // Check is already synced
            if(is_array($isActivityExist) && !count($isActivityExist)) {
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
                    $reviews                     = $single_product['reviews'] ?? null;
                    $status                      = $single_product['status'] ?? null;
                    $createdAt                   = $single_product['createdAt'] ?? null;
                    $lastUpdatedAt               = $single_product['lastUpdatedAt'] ?? null;

                    // Filter data
                    $filter_attraction       = ViatorHelper::filter_activity_attraction($itinerary); // API
                    $filter_speical_badge    = ViatorHelper::filter_activity_special_badge($productflags);
                    $filter_duration         = ViatorHelper::filter_activity_duration($duration);
                    $booking_questions       = ViatorHelper::filter_booking_questions($json_booking_questions, $bookingQuestions);
                    $filter_destination      = ViatorHelper::find_destination_details($json_destination_list, $destinations);
                    $filter_product_images   = ViatorHelper::filter_product_images($single_product['images']);
                    $filter_logistics        = ViatorHelper::filter_product_logistics($logistics); // API
                    $product_tags            = ViatorHelper::filter_product_tags($json_tags, $tags);
                    $filter_inclusions       = ViatorHelper::filter_product_inclusions($inclusions);
                    $filter_exclusions       = ViatorHelper::filter_product_exclusions($exclusions);
                    $filter_additional_info  = ViatorHelper::filter_product_additional_info($additionalInfo);
                    $filter_itinerary        = ViatorHelper::filter_product_itinerary($itinerary); // API
                    // $all_product_reviews     = ViatorHelper::fetch_single_product_reviews($productCode);

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

                    // check common tour ID is valid
                    if(!empty($is_common_tour_id)) {
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
                                    if($destination_id) {
                                        DB::table('to_tour_destination')->insert([
                                            'tour_id'        => $is_common_tour_id,
                                            'destination_id' => $destination_id,
                                        ]);
                                    }

                                    // insert city night
                                    if($city_id && $city_nights) {
                                        DB::table('to_tour_city_night')->insert([
                                            'tour_id' => $is_common_tour_id,
                                            'city_id' => $city_id,
                                            'night'   => $city_nights,
                                        ]);
                                    }

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $destination_id,
                                        'country_id'     => $country_id,
                                        'state_id'       => $state_id,
                                        'city_id'        => $city_id,
                                    ]);
                                } else {
                                    // insert destination data
                                    DB::table('to_tour_destination')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $default_destination_id,
                                    ]);

                                    // insert city night
                                    DB::table('to_tour_city_night')->insert([
                                        'tour_id' => $is_common_tour_id,
                                        'city_id' => $default_city_id,
                                        'night'   => 0,
                                    ]);

                                    // insert location data
                                    DB::table('to_tour_location')->insert([
                                        'tour_id'        => $is_common_tour_id,
                                        'destination_id' => $default_destination_id,
                                        'country_id'     => $default_country_id,
                                        'state_id'       => $default_state_id,
                                        'city_id'        => $default_city_id,
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

                        // count attraction data
                        if(count($filter_attraction)) {
                            // fetch attractions
                            foreach ($filter_attraction as $attraction_name) {
                                // insert attraction data
                                DB::table('to_tour_viator_attraction')->insert([
                                    'tour_id'         => $is_common_tour_id,
                                    'attraction_name' => $attraction_name,
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

                        // Update filtered reviews
                        /*if(!empty($all_product_reviews['filteredReviewsSummary']['totalReviews'])) {
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
                                        'published_date'   => date('Y-m-d h:i:s', strtotime($publishedDate)),
                                        'synced_date'      => date('Y-m-d h:i:s'),
                                    ]);
                                }
                            }
                        }*/

                        // Publish created tour
                        DB::table('to_tour_product')->where('id', $is_common_tour_id)->update(['status' => 1]);
                    }

                    // Update sync status
                    DB::table('to_viator')->where('id', $viator_product['id'])->update([
                        'status'     => 1,
                        'updated_at' => date('Y-m-d h:i:s')
                    ]);
                }
            }
        }

        echo true;
    }
}


// get exist tour ID
/*$is_common_tour_id = $is_exist[0]->id;

// remove previous activity meta data
DB::table('to_tour_viator_tag')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_destination')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_location')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_city_night')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_terms')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_viator_extra_data')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_viator_special_badge')->where('tour_id', $is_common_tour_id)->delete();
DB::table('to_tour_viator_attraction')->where('tour_id', $is_common_tour_id)->delete();

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
        'isCronRequest'   => $req_country_id . '/' . $req_start_position . '/' . $default_limit,
        'updated_at'      => date('Y-m-d h:i:s'),
    ]
);*/