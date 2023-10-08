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
}