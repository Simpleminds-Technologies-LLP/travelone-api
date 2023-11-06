<?php

namespace App\Helpers;
use DB;

class ViatorHelper
{
    /**
     * convert string to slug
     */
    public static function str_slug($string)
    {
        // Convert to lowercase
        $string = strtolower($string);

        // Remove non-alphanumeric characters (except hyphens and spaces)
        $string = preg_replace('/[^a-z0-9- ]/', '', $string);

        // Replace spaces with hyphens
        $string = str_replace(' ', '-', $string);

        // Remove leading and trailing hyphens
        $string = trim($string, '-');

        // return response
        return $string;
    }

    /**
     * fetch product list
     */
    public static function fetch_product_list($filter_data)
    {
        // fetch product search
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.viator.com/partner/products/search',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => json_encode($filter_data),
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: 4f200fc4-6128-45d0-b6e8-379284900a52',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json'
            ),
        ));
        $product_response = curl_exec($curl);
        curl_close($curl);
        return json_decode($product_response, true);
    }

    /**
     * fetch single product
     */
    public static function fetch_single_product($productCode)
    {
        // fetch product search
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.viator.com/partner/products/' . $productCode,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: 4f200fc4-6128-45d0-b6e8-379284900a52',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0'
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch destination list
     */
    public static function fetch_destination_list()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.viator.com/partner/v1/taxonomy/destinations',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: 4f200fc4-6128-45d0-b6e8-379284900a52',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0'
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch tags list
     */
    public static function fetch_tags_list()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.viator.com/partner/products/tags',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: 4f200fc4-6128-45d0-b6e8-379284900a52',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0'
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch booking questions
     */
    public static function fetch_product_booking_questions()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/products/booking-questions',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => [
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0'
            ]
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch product tags
     */
    public static function fetch_product_tags()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/products/tags',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => [
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0'
            ]
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * availability check
     */
    public static function availability_check($filter_data)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/availability/check',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => json_encode($filter_data),
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json'
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * bookings cart hold
     */
    public static function bookings_cart_hold($body_request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/bookings/cart/hold',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => json_encode($body_request),
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json'
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch single location data
     */
    public static function viator_single_location_data($location_data)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/locations/bulk',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{"locations": ["' . $location_data . '"]}',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch single product reviews
     */
    public static function viator_single_product_reviews($product_code)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/reviews/product',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{
                "productCode": "' . $product_code . '",
                "provider": "ALL",
                "count": 500,
                "start": 1,
                "showMachineTranslated": true,
                "reviewsForNonPrimaryLocale": true,
                "ratings": [1,2,3,4,5],
                "sortBy": "MOST_RECENT_PER_LOCALE"
            }',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json'
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch google map location data
     */
    public static function find_google_map_location_data($place_id)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' . $place_id . '&key=AIzaSyA8BejM71PdF4k_7uSk585MW0MDtHHCW1c',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * fetch single product reviews
     */
    public static function fetch_single_product_reviews($product_code)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/reviews/product',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{
                "productCode": "' . $product_code . '",
                "provider": "ALL",
                "count": 500,
                "start": 1,
                "showMachineTranslated": true,
                "reviewsForNonPrimaryLocale": true,
                "ratings": [1, 2, 3, 4, 5],
                "sortBy": "MOST_RECENT_PER_LOCALE"
            }',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json'
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    /**
     * find destination details by ID
     */
    public static function find_destination_details($destination_ids = [])
    {
        // fetch destination list
        $destination_list = ViatorHelper::fetch_destination_list();

        // fetch ids
        foreach ($destination_ids as $row_key => $row) {
            // get dest ID
            $destination_id = $row['ref'];

            // find destination details
            $destination_key = array_search($destination_id, array_column($destination_list['data'], 'destinationId'));

            // push data in array
            $destination_ids[$row_key]['data'] = (!empty($destination_list['data'][$destination_key])) ? $destination_list['data'][$destination_key] : [];
        }

        // return response
        return $destination_ids;
    }

    /**
     * filter activity duration
     */
    public static function filter_activity_duration($duration = [])
    {
        // define array
        $return_duration = 0;

        // check duration
        if(!empty($duration['fixedDurationInMinutes'])) {
            $return_duration = $duration['fixedDurationInMinutes'];
        } else if(!empty($duration['unstructuredDuration'])) {
            $return_duration = $duration['unstructuredDuration'];
        } else if(!empty($duration['variableDurationFromMinutes'])) {
            $return_duration = $duration['variableDurationFromMinutes'];
        }

        // return response
        return $return_duration;
    }

    /**
     * filter product images
     */
    public static function filter_product_images($product_images = [])
    {
        // define array
        $is_related_image = [];
        $is_cover_image   = [];

        // check is valid count
        if(count($product_images)) {
            // fetch source images
            foreach ($product_images as $row) {
                // get image data
                $is_cover = $row['isCover'];

                // check image variants is valid
                if(is_array($row['variants']) && count($row['variants'])) {
                    // fetch image variants
                    foreach ($row['variants'] as $row_img) {
                        // check image size
                        if($row_img['height'] == 480 && $row_img['width'] == 720) {
                            // check is cover image
                            if($is_cover) {
                                $is_cover_image[] = $row_img['url'];
                            } else {
                                $is_related_image[] = $row_img['url'];
                            }
                        }
                    }
                }
            }
        }

        // merge both array
        $final_images = array_merge($is_cover_image, $is_related_image);

        // return response
        return [
            'cover_image'    => (count($is_cover_image)) ? $is_cover_image[0] : null,
            'related_images' => $final_images,
        ];
    }

    /**
     * filter product inclusions
     */
    public static function filter_product_inclusions($inclusions = [])
    {
        // define array
        $return_arr = [];

        // check is valid count
        if(!empty($inclusions) && count($inclusions)) {
            // fetch source images
            foreach ($inclusions as $row) {
                // push data in array
                if(!empty($row['otherDescription'])) {
                    $return_arr[] = $row['otherDescription'];
                }
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter product exclusions
     */
    public static function filter_product_exclusions($exclusions = [])
    {
        // define array
        $return_arr = [];

        // check is valid count
        if(!empty($exclusions) && count($exclusions)) {
            // fetch source images
            foreach ($exclusions as $row) {
                // push data in array
                if(!empty($row['otherDescription'])) {
                    $return_arr[] = $row['otherDescription'];
                }
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter product additional info
     */
    public static function filter_product_additional_info($additional_info = [])
    {
        // define array
        $return_arr = [];

        // check is valid count
        if(!empty($additional_info) && count($additional_info)) {
            // fetch source images
            foreach ($additional_info as $row) {
                // push data in array
                if(!empty($row['description'])) {
                    $return_arr[] = $row['description'];
                }
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter booking questions
     */
    public static function filter_booking_questions($find_questions = [])
    {
        // define array
        $return_arr = [];

        // fetch product question list
        $original_list = ViatorHelper::fetch_product_booking_questions();

        // check is valid count
        if(!empty($find_questions) && count($find_questions) && !empty($original_list['bookingQuestions']) && count($original_list['bookingQuestions'])) {
            // fetch original question list
            foreach ($original_list['bookingQuestions'] as $row_question) {
                // match with original question
                if(in_array($row_question['id'], $find_questions)) {
                    // push data in array
                    $return_arr[] = $row_question;
                }
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter product tags
     */
    public static function filter_product_tags($find_tags = [])
    {
        // define array
        $return_arr = [];

        // fetch product product tags
        $original_list = ViatorHelper::fetch_product_tags();

        // check is valid count
        if(!empty($find_tags) && count($find_tags) && count($original_list['tags'])) {
            // fetch original question list
            foreach ($original_list['tags'] as $row_tag) {
                // match with original question
                if(in_array($row_tag['tagId'], $find_tags)) {
                    // push data in array
                    $return_arr[] = [
                        'tag_id'   => $row_tag['tagId'],
                        'tag_name' => $row_tag['allNamesByLocale']['en'],
                        'tag_slug' => ViatorHelper::str_slug($row_tag['allNamesByLocale']['en']),
                    ];
                }
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter product logistics
     */
    public static function filter_product_logistics($logistics = [])
    {
        // fetch start location
        if(!empty($logistics['start']) && count($logistics['start'])) {
            // fetch logistics start data
            foreach ($logistics['start'] as $start_row_key => $start_row) {
                // check ref location is set
                if(!empty($start_row['location']['ref'])) {
                    // find location data
                    $location_list = ViatorHelper::viator_single_location_data($start_row['location']['ref']);
                    $location_list = (count($location_list['locations'])) ? $location_list['locations'][0] : [];

                    // check provider name
                    if($location_list['provider'] == 'GOOGLE') {
                        // get place ID
                        $google_place_id = $location_list['providerReference'];

                        // fetch google api data
                        $google_location = self::find_google_map_location_data($google_place_id);
                        $google_location = ($google_location['status'] == 'OK') ? $google_location['result'] : [];

                        // filter google location
                        $filter_google_location = self::filter_google_location_data($google_location);

                        // push data in array
                        $logistics['start'][$start_row_key]['location'] = $filter_google_location;
                    } else {
                        // push data in array
                        $logistics['start'][$start_row_key]['location'] = $location_list;
                    }
                }
            }
        }

        // fetch end location
        if(!empty($logistics['end']) && count($logistics['end'])) {
            // fetch logistics end data
            foreach ($logistics['end'] as $end_row_key => $end_row) {
                // check ref location is set
                if(!empty($end_row['location']['ref'])) {
                    // find location data
                    $location_list = ViatorHelper::viator_single_location_data($end_row['location']['ref']);
                    $location_list = (!empty($location_list['locations']) && count($location_list['locations'])) ? $location_list['locations'][0] : [];

                    // check provider name
                    if($location_list['provider'] == 'GOOGLE') {
                        // get place ID
                        $google_place_id = $location_list['providerReference'];

                        // fetch google api data
                        $google_location = self::find_google_map_location_data($google_place_id);
                        $google_location = ($google_location['status'] == 'OK') ? $google_location['result'] : [];

                        // filter google location
                        $filter_google_location = self::filter_google_location_data($google_location);

                        // push data in array
                        $logistics['end'][$end_row_key]['location'] = $filter_google_location;
                    } else {
                        // push data in array
                        $logistics['end'][$end_row_key]['location'] = $location_list;
                    }
                }
            }
        }

        // return response
        return $logistics;
    }

    /**
     * filter product itinerary
     */
    public static function filter_product_itinerary($itinerary_arr = [])
    {
        // fetch itinerary
        if(!empty($itinerary_arr['itineraryItems']) && count($itinerary_arr['itineraryItems'])) {
            // fetch logistics start data
            foreach ($itinerary_arr['itineraryItems'] as $itinerary_key => $itinerary_row) {
                // check ref location is set
                if(!empty($itinerary_row['pointOfInterestLocation']['location']['ref'])) {
                    // find location data
                    $location_list = ViatorHelper::viator_single_location_data($itinerary_row['pointOfInterestLocation']['location']['ref']);
                    $location_list = (count($location_list['locations'])) ? $location_list['locations'][0] : [];

                    // check provider name
                    if(!empty($location_list['provider']) && $location_list['provider'] == 'GOOGLE') {
                        // get place ID
                        $google_place_id = $location_list['providerReference'];

                        // fetch google api data
                        $google_location = self::find_google_map_location_data($google_place_id);
                        $google_location = ($google_location['status'] == 'OK') ? $google_location['result'] : [];

                        // filter google location
                        $filter_google_location = self::filter_google_location_data($google_location);

                        // push data in array
                        $itinerary_arr['itineraryItems'][$itinerary_key]['pointOfInterestLocation'] = $filter_google_location;
                    } else {
                        // push data in array
                        $itinerary_arr['itineraryItems'][$itinerary_key]['pointOfInterestLocation'] = $location_list;
                    }
                }
            }
        }

        // return response
        return $itinerary_arr;
    }

    /**
     * filter product itinerary
     */
    public static function filter_product_reviews($productCode)
    {
        // define array
        $return_arr = [];

        // fetch product reviews
        $product_reviews = self::viator_single_product_reviews($productCode);

        // count reviews
        if(!empty($product_reviews['reviews']) && count($product_reviews['reviews'])) {
            // fetch reviews
            foreach ($product_reviews['reviews'] as $row) {
                // push data in array
                $return_arr[] = [
                    'userName'      => $row['userName'],
                    'title'         => $row['title'],
                    'rating'        => $row['rating'],
                    'text'          => $row['text'],
                    'publishedDate' => $row['publishedDate'],
                ];
            }
        }

        // return response
        return $return_arr;
    }

    /**
     * filter product travelers photos
     */
    public static function filter_product_travelers_photos($filter_reiews = [])
    {
        // define array
        $travelers_photos = [];

        // count reviews
        if(!empty($filter_reiews['reviews']) && count($filter_reiews['reviews'])) {
            // fetch reviews
            foreach ($filter_reiews['reviews'] as $row) {
                // check photos info
                if(!empty($row['photosInfo']) && count($row['photosInfo'])) {
                    // fetch photos
                    foreach ($row['photosInfo'] as $photo) {
                        // count photo versions
                        if(!empty($photo['photoVersions']) && count($photo['photoVersions'])) {
                            // fetch photo versions
                            foreach ($photo['photoVersions'] as $row_version) {
                                // check photo size
                                if($row_version['height'] == '733' && $row_version['width'] == '550') {
                                    // push data in array
                                    $travelers_photos[] = $row_version['url'];
                                }
                            }
                        }
                    }
                }
            }
        }

        // return response
        return $travelers_photos;
    }

    /**
     * filter google location data
     */
    public static function filter_google_location_data($google_location = [])
    {
        // define array
        $return_location = [];

        // count reviews
        if(count($google_location)) {
            $return_location['provider'] = 'GOOGLE';
            $return_location['name']     = (!empty($google_location['name'])) ? $google_location['name'] : 'N/A';
            $return_location['address']  = explode(', ', $google_location['formatted_address']);
            $return_location['center']   = [
                'latitude'  => $google_location['geometry']['location']['lat'],
                'longitude' => $google_location['geometry']['location']['lng'],
            ];
        }

        // return response
        return $return_location;
    }

    /**
     * filter activity special badge
     */
    public static function filter_activity_special_badge($product_flags = [])
    {
        // define array
        $filter_badge = [];

        // fetch loop
        foreach ($product_flags as $badge_name) {
            // check condition
            if($badge_name == 'NEW_ON_VIATOR') {
                // set flag name
                $filter_flag_name = 'New On TravelOne';
            } else {
                // filter flag name
                $filter_flag_name = ucwords(strtolower(str_replace('_', ' ', $badge_name)));
            }

            // push data in array
            $filter_badge[] = $filter_flag_name;
        }

        // return response
        return $filter_badge;
    }
}