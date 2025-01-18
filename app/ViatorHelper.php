<?php

namespace App\Helpers;
use DB;
use DateTime;

class ViatorHelper
{
    // Fonvert string to slug
    public static function str_slug($string)
    {
        // Convert to lowercase
        $string = strtolower($string);

        // Remove non-alphanumeric characters (except hyphens and spaces)
        $string = preg_replace('/[^a-z0-9- ]/', '', $string);

        // Replace spaces with hyphens
        $string = str_replace(' ', '-', $string);
        $string = str_replace('--', '-', $string);
        $string = str_replace('---', '-', $string);
        $string = str_replace('----', '-', $string);
        $string = str_replace('-----', '-', $string);

        // Remove leading and trailing hyphens
        $string = trim($string, '-');

        // return response
        return $string;
    }

    // Generate between two dates
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

    // Filter season dates
    public static function filter_season_dates($season_dates)
    {
        // Define dates
        $lowestStartDate = date('Y-m-d');
        $highestEndDate = date('Y-m-d', strtotime('+1 year', time()));

        // Check start dates
        if(!empty($season_dates['start'])) {
            // Filter unique dates
            $season_dates['start'] = array_unique($season_dates['start']);

            // Find the lowest start date
            $lowestStartDate = min($season_dates['start']);
            $lowestStartDate = (time() < strtotime($lowestStartDate)) ? $lowestStartDate : date('Y-m-d');
        }

        // Check end dates
        if(!empty($season_dates['end'])) {
            // Filter unique dates
            $season_dates['end'] = array_unique($season_dates['end']);

            // Find the highest end date
            $highestEndDate = max($season_dates['end']);
            $highestEndDate = (date('Y-m-d', strtotime('+1 year', time())) < strtotime($highestEndDate)) ? $highestEndDate : date('Y-m-d', strtotime('+1 year', time()));
        }

        // Return response
        return [
            'start' => $lowestStartDate,
            'end' => $highestEndDate,
        ];
    }

    // Get unavailable dates
    public static function getUnavailableDates($dateRanges, $blockedDates, $allowedWeekDays)
    {
        // Initialize an array for unavailable dates
        $unavailableDates = [];

        // Get today's date and calculate the "one year later" date
        $today = new DateTime('today');
        $oneYearLater = (clone $today)->modify('+1 year');

        // Get the start and end dates from the range
        $startDate = new DateTime($dateRanges['start']);
        $endDate = new DateTime($dateRanges['end']);

        // Ensure weekdays are in uppercase for consistent comparison
        $allowedWeekDays = array_map('strtoupper', $allowedWeekDays);

        // Clone process date
        $processDate = new DateTime($dateRanges['start']);

        // Iterate over each date in the range
        while ($processDate <= $endDate) {
            // Format date
            $formattedDate = $processDate->format('Y-m-d');
            $currentWeekDay = strtoupper($processDate->format('l'));

            // Check if the current date is within one year from today
            if ($processDate > $oneYearLater) {
                break;
            }

            // Check if the date is NOT allowed based on weekdays or is explicitly blocked
            if (!in_array($currentWeekDay, $allowedWeekDays) || in_array($formattedDate, $blockedDates)) {
                $unavailableDates[] = $formattedDate;
            }

            // Move to the next date
            $processDate->modify('+1 day');
        }

        // Check if calendar end date is within the range
        if ($startDate > $today) {
            $today->modify('+1 day');
            while ($today < $startDate) {
                $unavailableDates[] = $today->format('Y-m-d');
                $today->modify('+1 day');
            }
        }

        // Check if calendar end date is within the range
        if ($endDate <= $oneYearLater) {
            $endDate->modify('+1 day');
            while ($endDate <= $oneYearLater) {
                $unavailableDates[] = $endDate->format('Y-m-d');
                $endDate->modify('+1 day');
            }
        }

        // Return the filtered unavailable dates
        return $unavailableDates;
    }

    // Is emoji exist in string
    public static function is_emoji_exist($string)
    {
        $encstr   = rawurlencode($string);
        $is_emoji = (strpos($encstr,"%F0") !== false) ? true : false;
        return $is_emoji;
    }

    // Fetch product list
    public static function fetch_product_list($filter_data)
    {
        // fetch product search
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => env('VIATOR_API_ENDPOINT') . '/partner/products/search',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($filter_data),
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $product_response = curl_exec($curl);
        curl_close($curl);
        return json_decode($product_response, true);
    }

    // Fetch single product
    public static function fetch_single_product($productCode)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/products/' . $productCode,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch destination list
    public static function fetch_destination_list()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/v1/taxonomy/destinations',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch tags list
    public static function fetch_tags_list()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/products/tags',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch booking questions
    public static function fetch_product_booking_questions()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/products/booking-questions',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => [
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ]
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch product tags
    public static function fetch_product_tags()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/products/tags',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => [
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ]
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fvailability check
    public static function availability_check($filter_data)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/availability/check',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => json_encode($filter_data),
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fookings cart hold
    public static function bookings_cart_hold($body_request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/bookings/cart/hold',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => json_encode($body_request),
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch single location data
    public static function viator_single_location_data($location_data)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/locations/bulk',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{"locations": ["' . $location_data . '"]}',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch single product reviews
    public static function viator_single_product_reviews($product_code)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/reviews/product',
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
                "ratings": [1,2,3,4,5],
                "sortBy": "MOST_RECENT_PER_LOCALE"
            }',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch google map location data
    public static function find_google_map_location_data($place_id)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' . $place_id . '&key=AIzaSyCzxiUknqymFyxooRhNyQbzt2fa_lKXJJg',
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

    // Fetch single product reviews
    public static function fetch_single_product_reviews($product_code, $limit = 500)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/reviews/product',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{
                "productCode": "' . $product_code . '",
                "count": ' . $limit . ',
                "start": 1,
                "provider": "ALL",
                "ratings": [1, 2, 3, 4, 5],
                "sortBy": "MOST_RECENT",
                "showMachineTranslated": "false"
            }',
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en-US',
                'Accept: application/json;version=2.0',
                'Content-Type: application/json',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    // Fetch last modified since
    public static function last_modified_since_product($body_payload)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/products/modified-since?modified-since=' . $body_payload['modified_since'] . '&count=' . $body_payload['count'] . '&cursor=' . ((!empty($body_payload['cursor'])) ? $body_payload['cursor'] : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    // Fetch last modified since availability
    public static function last_modified_since_availability($body_payload)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/availability/schedules/modified-since?modified-since=' . $body_payload['modified_since'] . '&count=' . $body_payload['count'] . '&cursor=' . ((!empty($body_payload['cursor'])) ? $body_payload['cursor'] : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    // Fetch single product availability schedule
    public static function single_product_availability_schedule($product_code)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/availability/schedules/' . $product_code,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    // Fetch viator destinations
    public static function viator_destinations()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/v1/taxonomy/destinations',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'GET',
            CURLOPT_HTTPHEADER     => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            ),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }

    // Find google place id from ref number
    public static function find_google_place_id_from_ref_number($location_ref, $is_single = false)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => env('VIATOR_API_ENDPOINT') . '/partner/locations/bulk',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => ($is_single) ? '{"locations": ["' . $location_ref . '"]}' : json_encode($location_ref),
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response, true);
        if($is_single) {
            return (!empty($response) && !empty($response['locations']) && count($response['locations'])) ? $response['locations'][0] : [];
        } else {
            return (!empty($response) && !empty($response['locations']) && count($response['locations'])) ? $response['locations'] : [];
        }
    }

    // Batch find google place ids
    public static function batch_find_google_place_ids($locations)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => env('VIATOR_API_ENDPOINT') . '/partner/locations/bulk',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode([
                "locations" => $locations
            ]),
            CURLOPT_HTTPHEADER => array(
                'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                'Accept-Language: en',
                'Content-Type: application/json',
                'Accept: application/json;version=2.0',
                'RateLimit-Limit: ',
                'RateLimit-Remaining: ',
                'RateLimit-Reset: ',
            )
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response, true);

        // Define array
        $transformedData = [];

        // Fetch locations
        foreach ($response['locations'] as $item) {
            $transformedData[$item['reference']] = $item;
        }

        // Return response
        return $transformedData;
    }

    // Find destination details by ID
    public static function find_destination_details($destination_list, $destination_ids = [])
    {
        // Define array
        $mapped_destinations = [];

        // Map destinations by ID for quick lookup
        foreach ($destination_list['data'] as $destination) {
            $mapped_destinations[$destination['destinationId']] = $destination;
        }

        // Fetch details for provided IDs
        if (is_array($destination_ids) && !empty($destination_ids)) {
            foreach ($destination_ids as &$destination) {
                $destination_id = $destination['ref'];

                // Find destination details using the mapped array
                $destination['data'] = $mapped_destinations[$destination_id] ?? [];
            }
        }

        // Return response
        return $destination_ids;
    }

    // Filter activity duration
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

    // Filter product images
    public static function filter_product_images($product_images = [])
    {
        $is_related_images = [];
        $is_cover_image = null;

        // Check if the product_images array is not empty and is an array
        if (!empty($product_images) && is_array($product_images)) {
            foreach ($product_images as $image) {
                // Extract relevant data with default values
                $is_cover = $image['isCover'] ?? false;
                $variants = $image['variants'] ?? [];

                // Check if variants is a non-empty array
                if (!empty($variants) && is_array($variants)) {
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

        return [
            'cover_image' => $is_cover_image,
            'related_images' => $is_related_images,
        ];
    }

    // Filter product inclusions
    public static function filter_product_inclusions($inclusions = [])
    {
        // Use array_column to extract 'otherDescription' values
        if(is_array($inclusions) && count($inclusions)) {
            return array_column(array_filter($inclusions, function ($row) {
                return !empty($row['otherDescription']);
            }), 'otherDescription');
        }
    }

    // Filter product exclusions
    public static function filter_product_exclusions($exclusions = [])
    {
        // Use array_column to extract 'otherDescription' values
        if(is_array($exclusions) && count($exclusions)) {
            return array_column(array_filter($exclusions, function ($row) {
                return !empty($row['otherDescription']);
            }), 'otherDescription');
        }
    }

    // Filter product additional info
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

    // Filter booking questions
    public static function filter_booking_questions($original_list, $find_questions = [])
    {
        $return_arr = [];

        // Fetch the original list of booking questions
        // $original_list = ViatorHelper::fetch_product_booking_questions();

        // Check if both $find_questions and $original_list are non-empty arrays
        if (!empty($find_questions) && is_array($find_questions) && 
            !empty($original_list['bookingQuestions']) && is_array($original_list['bookingQuestions'])) {
            
            // Filter questions based on IDs
            foreach ($original_list['bookingQuestions'] as $row_question) {
                if (in_array($row_question['id'], $find_questions)) {
                    $return_arr[] = $row_question;
                }
            }
        }

        return $return_arr;
    }

    // Filter product tags
    public static function filter_product_tags($original_list, $find_tags = [])
    {
        // check array length
        if(!empty($original_list['tags']) && !count($original_list['tags'])) {
            return [];
        }

        // use array_filter to keep only the tags with matching tagId
        $filtered_tags = array_filter($original_list['tags'], function ($row_tag) use ($find_tags) {
            return in_array($row_tag['tagId'], $find_tags);
        });

        // use array_map to transform the filtered tags into the desired format
        return array_map(function ($row_tag) {
            return [
                'tag_id' => $row_tag['tagId'],
                'parent_tag_id' => (!empty($row_tag['parentTagIds'])) ? $row_tag['parentTagIds'] : [],
                'tag_name' => $row_tag['allNamesByLocale']['en'],
                'tag_slug' => ViatorHelper::str_slug($row_tag['allNamesByLocale']['en']),
            ];
        }, $filtered_tags);
    }

    // Filter product logistics
    public static function filter_product_logistics($logistics = [])
    {
        // Define flag
        $start_point = '';
        $end_point = '';

        // Fetch start and end location
        foreach (['start', 'end'] as $locationType) {
            // Fetch location type
            if(!empty($logistics[$locationType]) && count($logistics[$locationType])) {
                // Fetch start and end points
                foreach ($logistics[$locationType] as $row_key => $row) {
                    // Get row data
                    $location_ref = $row['location']['ref'];
                    $description = (!empty($row['description'])) ? $row['description'] : '';

                    // Check if same point
                    if($locationType == 'start' && $row_key == 0) {
                        $start_point = $location_ref;
                    } else if($locationType == 'end' && $row_key == 0) {
                        $end_point = $location_ref;
                    }

                    // Get location data
                    $place_data = ViatorHelper::find_google_place_id_from_ref_number($location_ref, true);

                    // Check if provider is Google
                    if (!empty($place_data) && $place_data['provider'] == 'GOOGLE') {
                        // Get google palce data
                        $googleLocation = self::find_google_map_location_data($place_data['providerReference']);

                        // Unset key from array
                        unset($logistics[$locationType][$row_key]['location']);

                        // Check result is not empty
                        if(!empty($googleLocation['result'])) {
                            // Push location in array
                            $logistics[$locationType][$row_key] = [
                                'ref' => $location_ref,
                                'name' => $googleLocation['result']['name'],
                                'address' => $googleLocation['result']['formatted_address'],
                                'url' => $googleLocation['result']['url'],
                                'description' => $description ?? '',
                            ];
                        }
                    } else if (!empty($place_data) && $place_data['provider'] == 'TRIPADVISOR') {
                        // Push location in array
                        $logistics[$locationType][$row_key] = [
                            'ref' => $place_data['reference'] ?? '',
                            'name' => $place_data['name'] ?? '',
                            'address' => (!empty($place_data['address'])) ? implode(', ', array_filter($place_data['address'])) : '',
                            'url' => null,
                            'center' => $place_data['center'] ?? [],
                            'description' => $description ?? '',
                        ];
                    }
                }
            }
        }

        // Update flag
        $logistics['is_meeting_point'] = ($start_point && $end_point) ?? false;
        $logistics['is_pickup_point'] = false;
        $logistics['is_start_end_same_point'] = ($start_point === $end_point) ?? false;

        // Fetch if different location
        if (!empty($logistics['redemption']['locations'])) {
            // define array
            $different_location = [];

            // Fetch redemption locations
            foreach ($logistics['redemption']['locations'] as $row) {
                // Fetch place data
                $place_data = ViatorHelper::find_google_place_id_from_ref_number($row['ref'], true);

                // Check if provider is Google
                if (!empty($place_data) && $place_data['provider'] == 'GOOGLE') {
                    // Fetch google place data
                    $google_place_data = self::find_google_map_location_data($place_data['providerReference']);

                    // Check result is not empty
                    if(!empty($google_place_data['result'])) {
                        // Push location in array
                        $different_location[] = [
                            'ref' => $place_data['reference'],
                            'name' => $google_place_data['result']['name'],
                            'address' => $google_place_data['result']['formatted_address'],
                            'url' => $google_place_data['result']['url'],
                        ];
                    }
                } else if (!empty($place_data) && $place_data['provider'] == 'TRIPADVISOR') {
                    // Push location in array
                    $different_location[] = [
                        'ref' => $place_data['reference'] ?? '',
                        'name' => $place_data['name'] ?? '',
                        'address' => (!empty($place_data['address'])) ? implode(', ', array_filter($place_data['address'])) : '',
                        'url' => null,
                        'center' => $place_data['center'] ?? [],
                    ];
                }
            }

            // Append location
            $logistics['redemption']['locations'] = $different_location;
        }

        // fetch pickup locations
        if (!empty($logistics['travelerPickup']['locations']) && count($logistics['travelerPickup']['locations'])) {
            // define array
            $viator_pickup_location = [];

            // Update flag
            $logistics['is_pickup_point'] = true;

            // fetch hotel location ids
            $others_location_ids = array_map(function ($location) {
                if (!empty($location['location']['ref']) && $location['pickupType'] === 'OTHER') {
                    return $location['location']['ref'];
                }
            }, $logistics['travelerPickup']['locations']);

            // fetch hotel location ids
            $hotel_location_ids = array_map(function ($location) {
                if (!empty($location['location']['ref']) && $location['pickupType'] === 'HOTEL') {
                    return $location['location']['ref'];
                }
            }, $logistics['travelerPickup']['locations']);

            // fetch airport location ids
            $airport_location_ids = array_map(function ($location) {
                if (!empty($location['location']['ref']) && $location['pickupType'] === 'AIRPORT') {
                    return $location['location']['ref'];
                }
            }, $logistics['travelerPickup']['locations']);

            // fetch port location ids
            $port_location_ids = array_map(function ($location) {
                if (!empty($location['location']['ref']) && $location['pickupType'] === 'PORT') {
                    return $location['location']['ref'];
                }
            }, $logistics['travelerPickup']['locations']);

            // chunk array
            $chunk_hotel_location = array_chunk(array_filter($hotel_location_ids), 500);
            $chunk_airport_location = array_chunk(array_filter($airport_location_ids), 500);
            $chunk_port_location = array_chunk(array_filter($port_location_ids), 500);

            // Fetch hotel locations
            if(count($chunk_hotel_location)) {
                foreach ($chunk_hotel_location as $bulk_location) {
                    // fetch viator place data
                    $viator_place_data = ViatorHelper::find_google_place_id_from_ref_number(['locations' => $bulk_location]);

                    // fetch chunk locations
                    if(count($viator_place_data)) {
                        foreach ($viator_place_data as $row) {
                            $viator_pickup_location[] = [
                                'location_type' => 'hotel',
                                'provider' => $row['provider'],
                                'ref' => $row['reference'] ?? null,
                                'name' => $row['name'] ?? null,
                                'address' => (!empty($row['address'])) ? implode(', ', array_filter($row['address'])) : '',
                            ];
                        }
                    }
                }
            }

            // Fetch airport locations
            if(count($chunk_airport_location)) {
                foreach ($chunk_airport_location as $bulk_location) {
                    // fetch viator place data
                    $viator_place_data = ViatorHelper::find_google_place_id_from_ref_number(['locations' => $bulk_location]);

                    // fetch chunk locations
                    if(count($viator_place_data)) {
                        foreach ($viator_place_data as $row) {
                            $viator_pickup_location[] = [
                                'location_type' => 'airport',
                                'provider' => $row['provider'],
                                'ref' => $row['reference'] ?? null,
                                'name' => $row['name'] ?? null,
                                'address' => (!empty($row['address'])) ? implode(', ', array_filter($row['address'])) : '',
                            ];
                        }
                    }
                }
            }

            // Fetch port locations
            if(count($chunk_port_location)) {
                foreach ($chunk_port_location as $bulk_location) {
                    // fetch viator place data
                    $viator_place_data = ViatorHelper::find_google_place_id_from_ref_number(['locations' => $bulk_location]);

                    // fetch chunk locations
                    if(count($viator_place_data)) {
                        foreach ($viator_place_data as $row) {
                            $viator_pickup_location[] = [
                                'location_type' => 'port',
                                'provider' => $row['provider'],
                                'ref' => $row['reference'] ?? null,
                                'name' => $row['name'] ?? null,
                                'address' => (!empty($row['address'])) ? implode(', ', array_filter($row['address'])) : '',
                            ];
                        }
                    }
                }
            }

            // Sort by name
            usort($viator_pickup_location, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });

            // update values in array
            $logistics['travelerPickup']['locations'] = $viator_pickup_location;
        }

        // Return response
        return $logistics;
    }

    // Filter product itinerary
    public static function filter_product_itinerary($itinerary = [])
    {
        // Check and process activity location
        if (!empty($itinerary['activityInfo']['location'])) {
            $itinerary['activityInfo']['location'] = self::process_single_location($itinerary['activityInfo']['location']);
        }

        // Check and process itinerary items
        if (!empty($itinerary['itineraryItems'])) {
            $locations = [];
            $processed_locations = [];

            // Collect all reference numbers to minimize individual calls
            foreach ($itinerary['itineraryItems'] as $row) {
                $ref = $row['pointOfInterestLocation']['location']['ref'] ?? null;
                if ($ref) {
                    $locations[] = $ref;
                }
            }

            // Fetch all place data in a single call
            $batch_place_data = ViatorHelper::batch_find_google_place_ids($locations);

            // Process each itinerary item
            foreach ($itinerary['itineraryItems'] as $itinerary_key => $row) {
                // Get reference number
                $ref = $row['pointOfInterestLocation']['location']['ref'] ?? null;

                // Check batch location
                if ($ref && isset($batch_place_data[$ref])) {
                    // Use pre-fetched data to process the location
                    $place_data = $batch_place_data[$ref];
                    $itinerary['itineraryItems'][$itinerary_key]['pointOfInterestLocation'] = self::format_location($place_data);
                }
            }

            // Process `filterItineraryItems`
            $itinerary['filterItineraryItems'] = self::process_itinerary_items($itinerary['itineraryItems']);
        }

        // Return response
        return $itinerary;
    }

    // Process a single location and fetch relevant details.
    private static function process_single_location($location)
    {
        // Fetch place data
        $place_data = ViatorHelper::find_google_place_id_from_ref_number($location['ref'], true);

        // Check place data
        if (!empty($place_data)) {
            if ($place_data['provider'] === 'GOOGLE') {
                $google_place_data = self::find_google_map_location_data($place_data['providerReference']);
                if (!empty($google_place_data['result'])) {
                    return [
                        'ref' => $place_data['reference'],
                        'name' => $google_place_data['result']['name'],
                        'address' => $google_place_data['result']['formatted_address'],
                        'url' => $google_place_data['result']['url'],
                    ];
                }
            } elseif ($place_data['provider'] === 'TRIPADVISOR') {
                return [
                    'ref' => $place_data['reference'] ?? '',
                    'name' => $place_data['name'] ?? '',
                    'address' => !empty($place_data['address']) ? implode(', ', array_filter($place_data['address'])) : '',
                    'url' => null,
                    'center' => $place_data['center'] ?? [],
                ];
            }
        }

        // Return original if no updates
        return $location; 
    }

    // Format location data into a consistent structure.
    private static function format_location($place_data)
    {
        if ($place_data['provider'] === 'GOOGLE') {
            $google_place_data = self::find_google_map_location_data($place_data['providerReference']);
            if (!empty($google_place_data['result'])) {
                return [
                    'ref' => $place_data['reference'],
                    'name' => $google_place_data['result']['name'],
                    'address' => $google_place_data['result']['formatted_address'],
                    'url' => $google_place_data['result']['url'],
                ];
            }
        } elseif ($place_data['provider'] === 'TRIPADVISOR') {
            return [
                'ref' => $place_data['reference'] ?? '',
                'name' => $place_data['name'] ?? '',
                'address' => !empty($place_data['address']) ? implode(', ', array_filter($place_data['address'])) : '',
                'center' => $place_data['center'] ?? [],
            ];
        } else {
            return [];
        }
    }

    // Process and filter itinerary items.
    private static function process_itinerary_items($itinerary_items)
    {
        $filter_items = [];
        $item_no = 1;

        foreach ($itinerary_items as $row) {
            if ($row['passByWithoutStopping']) {
                $filter_items[] = [
                    'pass_by' => true,
                    'name' => $row['pointOfInterestLocation']['name'] ?? 'N/A',
                    'description' => $row['description'],
                    'duration' => ViatorHelper::convert_duration_into_timeline($row['duration'] ?? []),
                ];
            } else {
                $filter_items[] = [
                    'no' => $item_no,
                    'pass_by' => false,
                    'name' => $row['pointOfInterestLocation']['name'] ?? 'N/A',
                    'description' => $row['description'],
                    'duration' => ViatorHelper::convert_duration_into_timeline($row['duration'] ?? []),
                ];
                $item_no++;
            }
        }

        return $filter_items;
    }

    // Filter product itinerary
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

    // Filter product travelers photos
    public static function filter_product_travelers_photos($filterReviews = [])
    {
        $travelersPhotos = [];

        if (!empty($filterReviews['reviews'])) {
            foreach ($filterReviews['reviews'] as $review) {
                foreach ($review['photosInfo'] ?? [] as $photo) {
                    foreach ($photo['photoVersions'] ?? [] as $version) {
                        if ($version['height'] == '733' && $version['width'] == '550') {
                            $travelersPhotos[] = $version['url'];
                        }
                    }
                }
            }
        }

        return $travelersPhotos;
    }

    // Filter google location data
    public static function filter_google_location_data($google_location = [])
    {
        $return_location = [];

        // Check if Google location data is not empty
        if (!empty($google_location)) {
            $return_location['provider'] = 'GOOGLE';
            $return_location['name'] = $google_location['name'] ?? 'N/A';
            $return_location['address'] = isset($google_location['formatted_address']) ? explode(', ', $google_location['formatted_address']) : [];
            $return_location['center'] = [
                'latitude' => $google_location['geometry']['location']['lat'] ?? null,
                'longitude' => $google_location['geometry']['location']['lng'] ?? null,
            ];
        }

        // Return filtered location data
        return $return_location;
    }

    // Filter activity special badge
    public static function filter_activity_special_badge($product_flags = [])
    {
        // define array
        $filter_badge = [];

        // fetch loop
        if(!empty($product_flags)) {
            foreach ($product_flags as $badge_name) {
                // check condition and set flag name
                if ($badge_name === 'NEW_ON_VIATOR') {
                    $filter_flag_name = 'New On TravelOne';
                } else {
                    $filter_flag_name = ucwords(strtolower(str_replace('_', ' ', $badge_name)));
                }

                // push data in array
                $filter_badge[] = $filter_flag_name;
            }
        }

        // return response
        return $filter_badge;
    }

    // filter activity attraction
    public static function filter_activity_attraction($itinerary = [])
    {
        // Define array
        $attraction_list = [];

        // Check if itinerary items exist and is an array
        if (!empty($itinerary['itineraryItems']) && is_array($itinerary['itineraryItems'])) {
            // Extract attraction ids
            $attraction_ids = array_map(function($item) {
                return $item['pointOfInterestLocation']['attractionId'] ?? '';
            }, $itinerary['itineraryItems']);

            // Remove empty values and duplicates
            $attraction_ids = array_unique(array_filter($attraction_ids));

            // Fetch attraction data
            foreach ($attraction_ids as $att_id) {
                // Find single attraction
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_URL => env('VIATOR_API_ENDPOINT') . '/partner/attractions/' . $att_id,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_HTTPHEADER => array(
                        'exp-api-key: ' . env('VIATOR_API_TOKEN'),
                        'Accept-Language: en',
                        'Content-Type: application/json',
                        'Accept: application/json;version=2.0',
                        'RateLimit-Limit: ',
                        'RateLimit-Remaining: ',
                        'RateLimit-Reset: '
                    )
                ));
                $response = json_decode(curl_exec($curl), true);
                curl_close($curl);

                // Check if response contains valid data
                if (!empty($response['attractionId'])) {
                    $attraction_list[] = [
                        'id' => $response['attractionId'],
                        'title' => $response['name'],
                        'image' => (!empty($response['images'][1]['url'])) ? $response['images'][1]['url'] : '',
                    ];
                }

                // Sleep for 3 seconds
                sleep(3);
            }
        }

        // Return attraction list
        return $attraction_list;
    }

    // Fapping viator and travelone city
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

    // Fend slack notification
    public static function send_slack_notification($slack_message) {
        // Create payload
        $payload = json_encode([
            "text" => $slack_message
        ]);

        // Set cURL options
        $ch = curl_init('https://hooks.slack.com/services/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');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload)
        ]);

        // Execute cURL request
        $result = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }

        // Close cURL session
        curl_close($ch);

        return $result;
    }

    // Single tour available next date
    public static function single_tour_available_next_date($tour_id)
    {
        // Define flag
        $is_matched = false;

        // Define default date
        $is_date = date('Y-m-d', strtotime('+1 day'));

        // Fetch unavailable date of tour
        $extra_data = DB::table('to_tour_viator_extra_data')->select('unavailable_dates')->where('tour_id', $tour_id)->first();

        // Check extra data valid
        if(!empty($extra_data)) {
            // Convert string to array
            $unavailable_dates = (!empty($extra_data->unavailable_dates)) ? explode(', ', $extra_data->unavailable_dates) : [];

            // Loop while date matched
            if(count($unavailable_dates) < 360) {
                while (!$is_matched) {
                    // Check not in array
                    if(!in_array($is_date, $unavailable_dates)) {
                        // Update flag
                        $is_matched = true;
                        break;
                    } else {
                        // Change date + 1 day
                        $is_date = date('Y-m-d', strtotime($is_date . ' +1 day'));
                    }
                }
            }
        }

        // Return response
        return $is_date;
    }

    // Viator filter package options
    public static function viator_filter_package_options($json_data, $bookable_items = [])
    {
        // Define array
        $return_arr = [];

        // Fetch items
        foreach ($bookable_items as $row) {
            // Get option data
            $option_name = $row['productOptionCode'] ?? 'TG1';
            $start_time = (!empty($row['startTime'])) ? $row['startTime'] : '';
            $price = (!empty($row['totalPrice']['price']['recommendedRetailPrice'])) ? $row['totalPrice']['price']['recommendedRetailPrice'] : '';

            // Find package options
            $find_option = ViatorHelper::find_product_options($json_data['productOptions'], $option_name);

            // Push data in array
            if(!empty($find_option)) {
                $return_arr[$option_name]['title'] = $find_option['title'] ?? $option_name;
                $return_arr[$option_name]['description'] = $find_option['description'];
                $return_arr[$option_name]['price'] = $price;
                if(!empty($start_time)) {
                    $return_arr[$option_name]['time'][] = $start_time;
                }
            }
        }

        // Return response
        return $return_arr;
    }

    // Find product options
    public static function find_product_options($array, $option_code)
    {
        // Define flag
        $return = [];

        // Loop through each item in the array and extract productOptionCode
        foreach ($array as $item) {
            // Check if productOptionCode exists in the current item
            if (!empty($item['productOptionCode']) && $item['productOptionCode'] == $option_code) {
                $return = $item;
            }
        }

        // Return response
        return $return;
    }

    // Convert duration into timeline
    public static function convert_duration_into_timeline($timeframe) {
        // Define default value
        $isTimeline = '';

        // Check for fixed duration
        if (isset($timeframe['fixedDurationInMinutes']) && !empty($timeframe['fixedDurationInMinutes'])) {
            $isTimeline = ViatorHelper::convert_minutes_to_hours($timeframe['fixedDurationInMinutes']);
        }

        // Check for variable duration
        if (isset($timeframe['variableDurationFromMinutes']) && isset($timeframe['variableDurationToMinutes'])) {
            $isTimeline = ViatorHelper::convert_minutes_to_hours($timeframe['variableDurationFromMinutes']) . " to " . ViatorHelper::convert_minutes_to_hours($timeframe['variableDurationToMinutes']);
        }

        // Check unstructured duration
        if(isset($timeframe['unstructuredDuration'])) {
            $isTimeline = $timeframe['unstructuredDuration'];
        }

        // Return response
        return $isTimeline;
    }

    // Convert minutes to hours
    public static function convert_minutes_to_hours($minutes)
    {
        $final_string = '';
        $hours = floor($minutes / 60);
        $remain_minutes = $minutes % 60;

        if ($hours) {
            $final_string .= $hours . (($hours == 1) ? ' hour' : ' hours');
        }
        if ($remain_minutes) {
            $final_string .= ' ' . $remain_minutes . (($remain_minutes == 1) ? ' minute' : ' minutes');
        }
        return trim($final_string);
    }
}