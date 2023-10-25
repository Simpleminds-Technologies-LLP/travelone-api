<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class ViatorController extends Controller
{
    /**
     * product list
     */
    public function product_list(Request $request)
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
                            // 'all_reviews'                 => $filter_reiews,
                            'filter_travelers_photos'     => $filter_travelers_photos,
                            'createdAt'                   => $createdAt,
                            'lastUpdatedAt'               => $lastUpdatedAt,
                        ];

                        // check sightseeing is exist
                        $is_exist = DB::table('to_tour_product')->select('id')->where('slug', ViatorHelper::str_slug($title))->get()->toArray();

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
                                'media_gallery'   => serialize($filter_product_images['related_images']),
                                'seo_title'       => $title,
                                'tour_sync_type'  => 'viator',
                                'extra_json_data' => serialize($extra_json_data),
                                'status'          => 1,
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
                                    'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                                    'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                                    'time_duration'  => $filter_duration,
                                    'reviews'        => $reviews['combinedAverageRating'],
                                ]);

                                // insert terms data
                                DB::table('to_tour_terms')->insert([
                                    'tour_id'              => $is_created_tour,
                                    'what_is_included'     => serialize($filter_inclusions),
                                    'what_is_not_included' => serialize($filter_exclusions),
                                    'important_notes'      => serialize($filter_additional_info),
                                ]);
                            }

                            // push response in array
                            $return_arr['data'][] = [
                                'action'     => 'created',
                                'created_id' => $is_created_tour
                            ];
                        } else {
                            // get exist tour ID
                            $exist_tour_id = $is_exist[0]->id;

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
                                    'media_gallery'   => serialize($filter_product_images['related_images']),
                                    'seo_title'       => $title,
                                    'extra_json_data' => serialize($extra_json_data),
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
                                'what_is_included'     => serialize($filter_inclusions),
                                'what_is_not_included' => serialize($filter_exclusions),
                                'important_notes'      => serialize($filter_additional_info),
                            ]);

                            // insert viator extra data
                            DB::table('to_tour_viator_extra_data')->insert([
                                'tour_id'        => $exist_tour_id,
                                'selling_price'  => (int) $pricingSummary['summary']['fromPriceBeforeDiscount'],
                                'discount_price' => (int) $pricingSummary['summary']['fromPrice'],
                                'time_duration'  => (int) $filter_duration,
                                'reviews'        => (int) $reviews['combinedAverageRating'],
                            ]);

                            // push response in array
                            $return_arr['data'][] = [
                                'action'        => 'updated',
                                'exist_tour_id' => $exist_tour_id,
                                'is_updated'    => ($is_updated_tour) ? true : false,
                            ];
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
}
