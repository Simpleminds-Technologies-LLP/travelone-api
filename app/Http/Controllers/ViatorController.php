<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ViatorController extends Controller
{
    /**
     * index
     */
    public function index()
    {
        // fetch product search
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.sandbox.viator.com/partner/products/search',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{
                "filtering": {
                    "destination": 732,
                    "flags": [
                        "SPECIAL_OFFER"
                    ],
                    "includeAutomaticTranslations": true,
                    "confirmationType": "INSTANT",
                    "rating": {
                        "from": 1,
                        "to": 5
                    }
                },
                "sorting": {
                    "sort": "TRAVELER_RATING",
                    "order": "DESCENDING"
                },
                "pagination": {
                    "start": 1,
                    "count": 50
                },
                "currency": "USD"
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
        echo "<pre>"; print_r($response); echo "</pre>"; die;
    }
}
