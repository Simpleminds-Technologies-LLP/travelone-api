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
     * generate between two dates
     */
    public static function generate_dates($start_date, $end_date)
    {
        // define array
        $dates = [];

        // convert date to string
        $current = strtotime($start_date);
        $last    = strtotime($end_date);

        // generate dates
        while($current <= $last) {
            $dates[] = date('Y-m-d', $current);
            $current = strtotime('+1 day', $current);
        }

        // unset first and end element
        unset($dates[array_search($start_date, $dates)]);
        unset($dates[array_search($end_date, $dates)]);

        // return response
        return $dates;
    }

    /**
     * is emoji exist in string
     */
    public static function is_emoji_exist($string)
    {
        $encstr   = rawurlencode($string);
        $is_emoji = (strpos($encstr,"%F0") !== false) ? true : false;
        return $is_emoji;
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
     * fetch last modified since
     */
    public static function last_modified_since_product($body_payload)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/products/modified-since?modified-since=' . $body_payload['modified_since'] . '&count=' . $body_payload['count'] . '&cursor=' . ((!empty($body_payload['cursor'])) ? $body_payload['cursor'] : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    /**
     * fetch last modified since availability
     */
    public static function last_modified_since_availability($body_payload)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/availability/schedules/modified-since?modified-since=' . $body_payload['modified_since'] . '&count=' . $body_payload['count'] . '&cursor=' . ((!empty($body_payload['cursor'])) ? $body_payload['cursor'] : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    /**
     * fetch single product availability schedule
     */
    public static function single_product_availability_schedule($product_code)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/availability/schedules/' . $product_code,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    /**
     * fetch viator destinations
     */
    public static function viator_destinations()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/v1/taxonomy/destinations',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: e1f06e53-937b-44c7-b392-b141ce1d0b91',
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    /**
     * find destination details by ID
     */
    public static function find_destination_details($destination_ids = [])
    {
        // fetch destination list
        $destination_list = ViatorHelper::fetch_destination_list();

        // map destinations by ID for quick lookup
        $mapped_destinations = [];
        foreach ($destination_list['data'] as $destination) {
            $mapped_destinations[$destination['destinationId']] = $destination;
        }

        // fetch details for provided IDs
        foreach ($destination_ids as &$destination) {
            $destination_id = $destination['ref'];

            // find destination details using the mapped array
            $destination['data'] = $mapped_destinations[$destination_id] ?? [];
        }

        // return response
        return $destination_ids;
    }

    /**
     * filter activity duration
     */
    public static function filter_activity_duration($duration = [])
    {
        // Check duration types in priority order
        $types = ['fixedDurationInMinutes', 'unstructuredDuration', 'variableDurationFromMinutes'];

        foreach ($types as $type) {
            if (!empty($duration[$type])) {
                // Return the first non-empty duration type
                return $duration[$type];
            }
        }

        // Default return value if no valid duration type is found
        return 0;
    }

    /**
     * filter product images
     */
    public static function filter_product_images($product_images = [])
    {
        // Initialize variables
        $is_related_images = [];
        $is_cover_image = null;

        // Check if the product_images array is not empty
        if (!empty($product_images) && is_array($product_images)) {
            // Iterate over each image in the product_images array
            foreach ($product_images as $image) {
                // Extract relevant data with default values
                $is_cover = $image['isCover'] ?? false;
                $variants = $image['variants'] ?? [];

                // Check if variants is a non-empty array
                if (is_array($variants) && !empty($variants)) {
                    // Iterate over each variant
                    foreach ($variants as $variant) {
                        // Check if the variant has the required dimensions
                        if ($variant['height'] == 480 && $variant['width'] == 720) {
                            // Determine whether it's a cover image or a related image
                            if ($is_cover) {
                                $is_cover_image = $variant['url'];
                            } else {
                                $is_related_images[] = $variant['url'];
                            }
                        }
                    }
                }
            }
        }

        // Return the final result
        return [
            'cover_image'    => $is_cover_image,
            'related_images' => $is_related_images,
        ];
    }

    /**
     * filter product inclusions
     */
    public static function filter_product_inclusions($inclusions = [])
    {
        // Use array_column to extract 'otherDescription' values
        if(is_array($inclusions) && count($inclusions)) {
            return array_column(array_filter($inclusions, function ($row) {
                return !empty($row['otherDescription']);
            }), 'otherDescription');
        }
    }

    /**
     * filter product exclusions
     */
    public static function filter_product_exclusions($exclusions = [])
    {
        // Use array_column to extract 'otherDescription' values
        if(is_array($exclusions) && count($exclusions)) {
            return array_column(array_filter($exclusions, function ($row) {
                return !empty($row['otherDescription']);
            }), 'otherDescription');
        }
    }

    /**
     * filter product additional info
     */
    public static function filter_product_additional_info($additional_info = [])
    {
        // use array_filter to remove elements with empty descriptions
        if(is_array($additional_info) && count($additional_info)) {
            return array_map(function ($row) {
                return $row['description'];
            }, array_filter($additional_info, function ($row) {
                return !empty($row['description']);
            }));
        }
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

        // check if $find_questions and $original_list are non-empty arrays
        if (!empty($find_questions) && is_array($find_questions) && !empty($original_list['bookingQuestions']) && is_array($original_list['bookingQuestions'])) {
            // iterate over each item in the original question list
            foreach ($original_list['bookingQuestions'] as $row_question) {
                // check if id is in $find_questions
                if (in_array($row_question['id'], $find_questions)) {
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
        // fetch product product tags
        $original_list = ViatorHelper::fetch_product_tags();

        // use array_filter to keep only the tags with matching tagId
        $filtered_tags = array_filter($original_list['tags'], function ($row_tag) use ($find_tags) {
            return in_array($row_tag['tagId'], $find_tags);
        });

        // use array_map to transform the filtered tags into the desired format
        return array_map(function ($row_tag) {
            return [
                'tag_id'   => $row_tag['tagId'],
                'tag_name' => $row_tag['allNamesByLocale']['en'],
                'tag_slug' => ViatorHelper::str_slug($row_tag['allNamesByLocale']['en']),
            ];
        }, $filtered_tags);
    }

    /**
     * filter product logistics
     */
    public static function filter_product_logistics($logistics = [])
    {
        // Fetch location details
        $fetchLocationDetails = function ($locationRef) {
            $locationList = ViatorHelper::viator_single_location_data($locationRef);
            return (!empty($locationList['locations'])) ? $locationList['locations'][0] : [];
        };

        // Process logistics data (start and end)
        $processLogistics = function ($logisticsData) use ($fetchLocationDetails) {
            foreach ($logisticsData as $rowKey => $rowData) {
                // Check if ref location is set
                if (!empty($rowData['location']['ref'])) {
                    // Fetch location data
                    $locationList = $fetchLocationDetails($rowData['location']['ref']);

                    // Check provider name
                    if (!empty($locationList) && !empty($locationList['provider']) && $locationList['provider'] == 'GOOGLE') {
                        // Get place ID
                        $googlePlaceId = $locationList['providerReference'];

                        // Fetch Google API data
                        $googleLocation = self::find_google_map_location_data($googlePlaceId);
                        $filterGoogleLocation = ($googleLocation['status'] == 'OK') ? self::filter_google_location_data($googleLocation['result']) : [];

                        // Update location in logistics data
                        $logisticsData[$rowKey]['location'] = $filterGoogleLocation;
                    } else {
                        // Update location in logistics data
                        $logisticsData[$rowKey]['location'] = $locationList;
                    }
                }
            }
            return $logisticsData;
        };

        // Process start logistics if not empty
        if (!empty($logistics['start'])) {
            $logistics['start'] = $processLogistics($logistics['start']);
        }

        // Process end logistics if not empty
        if (!empty($logistics['end'])) {
            $logistics['end'] = $processLogistics($logistics['end']);
        }

        // Return the processed logistics data
        return $logistics;
    }

    /**
     * filter product itinerary
     */
    public static function filter_product_itinerary($itineraryArr = [])
    {
        if (!empty($itineraryArr['itineraryItems'])) {
            foreach ($itineraryArr['itineraryItems'] as $itineraryKey => $itineraryRow) {
                if (!empty($itineraryRow['pointOfInterestLocation']['location']['ref'])) {
                    $locationList = ViatorHelper::viator_single_location_data($itineraryRow['pointOfInterestLocation']['location']['ref']);
                    $locationData = (!empty($locationList['locations'])) ? $locationList['locations'][0] : [];

                    if (!empty($locationData['provider']) && $locationData['provider'] == 'GOOGLE') {
                        $googlePlaceId = $locationData['providerReference'];
                        $googleLocation = self::find_google_map_location_data($googlePlaceId);

                        if ($googleLocation['status'] == 'OK') {
                            $filterGoogleLocation = self::filter_google_location_data($googleLocation['result']);
                            $itineraryArr['itineraryItems'][$itineraryKey]['pointOfInterestLocation'] = $filterGoogleLocation;
                        }
                    } else {
                        $itineraryArr['itineraryItems'][$itineraryKey]['pointOfInterestLocation'] = $locationData;
                    }
                }
            }
        }

        return $itineraryArr;
    }

    /**
     * filter product itinerary
     */
    public static function filter_product_reviews($productCode)
    {
        $returnArr = [];

        // Fetch product reviews
        $productReviews = self::viator_single_product_reviews($productCode);

        // Check if reviews exist
        if (!empty($productReviews['reviews'])) {
            // Process reviews using array_map
            $returnArr = array_map(function ($review) {
                return [
                    'userName'      => $review['userName'],
                    'title'         => $review['title'],
                    'rating'        => $review['rating'],
                    'text'          => $review['text'],
                    'publishedDate' => $review['publishedDate'],
                ];
            }, $productReviews['reviews']);
        }

        return $returnArr;
    }

    /**
     * filter product travelers photos
     */
    public static function filter_product_travelers_photos($filterReviews = [])
    {
        $travelersPhotos = [];

        if (!empty($filterReviews['reviews'])) {
            foreach ($filterReviews['reviews'] as $review) {
                if (!empty($review['photosInfo'])) {
                    foreach ($review['photosInfo'] as $photo) {
                        if (!empty($photo['photoVersions'])) {
                            foreach ($photo['photoVersions'] as $version) {
                                if ($version['height'] == '733' && $version['width'] == '550') {
                                    $travelersPhotos[] = $version['url'];
                                }
                            }
                        }
                    }
                }
            }
        }

        return $travelersPhotos;
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
            // check condition and set flag name
            $filter_flag_name = ($badge_name == 'NEW_ON_VIATOR') ? 'New On TravelOne' : ucwords(strtolower(str_replace('_', ' ', $badge_name)));

            // push data in array
            $filter_badge[] = $filter_flag_name;
        }

        // return response
        return $filter_badge;
    }

    /**
     * mapping viator and travelone city
     */
    public static function mapping_viator_and_system_city()
    {
        // define array
        $return_arr = [
            'Europe' => 35, // 'Europe',
            // '' => 37, // 'Polar Regions',
            'America' => 38, // 'US & Canada',
            // '' => 40, // 'Latin America',
            // '' => 41, // 'Mexico & The Caribbean',
            'Asia' => 42, // 'Asia',
            // '' => 43, // 'Australia & Pacific',
            // '' => 44, // 'Egypt & Middle East',
            // '' => 46, // 'Africa',
        ];

        // return response
        return $return_arr;
    }
}