<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class SearchController extends Controller
{
    // Destination sync table
    public function destination_table(Request $request)
    {
        // Fetch list
        $destination_list = DB::table('to_destination')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($destination_list)) {
            // Fetch destination
            foreach ($destination_list as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'destination',
                        'keyword' => $row->name
                    ],
                    [
                        'search_type' => 'destination',
                        'keyword' => $row->name,
                        'slug' => $row->slug,
                        'image' => $row->image,
                        'reference_id' => $row->id,
                        'extra_json' => null
                    ]
                );
            }
        }

        // Return response
        echo true;
    }

    // Country sync table
    public function country_table(Request $request)
    {
        // Fetch list
        $country_list = DB::table('location_countries')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($country_list)) {
            // Fetch country
            foreach ($country_list as $row) {
                // Check destination is set
                if(!empty($row->destination_id)) {
                    // Update if keyword exists for the same search_type, or create a new record
                    DB::table('to_search')->updateOrInsert(
                        [
                            'search_type' => 'country',
                            'keyword' => $row->name
                        ],
                        [
                            'search_type' => 'country',
                            'reference_id' => $row->id,
                            'keyword' => $row->name,
                            'slug' => $row->slug,
                            'image' => $row->featured_image,
                            'extra_json' => null
                        ]
                    );
                }
            }
        }

        // Return response
        echo true;
    }

    // City sync table
    public function city_table(Request $request)
    {
        // Fetch list
        $city_list = DB::table('location_cities')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($city_list)) {
            // Fetch city
            foreach ($city_list as $row) {
                // Check destination is set
                if(!empty($row->destination_id) && !empty($row->country_id)) {
                    // Update if keyword exists for the same search_type, or create a new record
                    DB::table('to_search')->updateOrInsert(
                        [
                            'search_type' => 'city',
                            'keyword' => $row->name
                        ],
                        [
                            'search_type' => 'city',
                            'reference_id' => $row->id,
                            'keyword' => $row->name,
                            'slug' => $row->slug,
                            'image' => $row->featured_image,
                            'extra_json' => null
                        ]
                    );
                }
            }
        }

        // Return response
        echo true;
    }

    // Themes sync table
    public function theme_table(Request $request)
    {
        // Fetch list
        $theme_list = DB::table('to_theme')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($theme_list)) {
            // Fetch theme
            foreach ($theme_list as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'theme',
                        'keyword' => $row->name
                    ],
                    [
                        'search_type' => 'theme',
                        'reference_id' => $row->id,
                        'keyword' => $row->name,
                        'slug' => $row->slug,
                        'image' => $row->image,
                        'extra_json' => null
                    ]
                );
            }
        }

        // Return response
        echo true;
    }

    // Attraction sync table
    public function attraction_table(Request $request)
    {
        // Fetch list
        $attraction_list = DB::table('to_tour_viator_attraction')->get();

        // Check array length
        if(count($attraction_list)) {
            // Fetch attraction
            foreach ($attraction_list as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'attraction',
                        'keyword' => $row->attraction_name
                    ],
                    [
                        'search_type' => 'attraction',
                        'reference_id' => $row->id,
                        'keyword' => $row->attraction_name,
                        'slug' => ViatorHelper::str_slug($row->attraction_name),
                        'image' => null,
                        'extra_json' => null
                    ]
                );
            }
        }

        // Return response
        echo true;
    }

    // Tour sync table
    public function tour_table(Request $request)
    {
        // Fetch list
        $tour_list = DB::table('to_tour_product')->where('status', 1)->orderBy('id', 'DESC')->limit(500)->get();

        // Check array length
        if(count($tour_list)) {
            // Fetch tours data
            foreach ($tour_list as $row) {
                // Check is destination exist
                $is_dest_exist = DB::table('to_search')->select('*')->where('search_type', 'tour')->where('reference_id', $row->id)->first();

                // Decode json data
                $viator_json = (!empty($row->extra_json_data)) ? json_decode($row->extra_json_data, true) : [];

                // Check is tour exist
                if(!empty($is_dest_exist->id)) {
                    // Update keyword value
                    DB::table('to_search')->where('id', $is_dest_exist->id)->update([
                        'keyword'    => $row->tour_name,
                        'slug'       => $row->slug,
                        'image'      => $row->featured_image,
                        'extra_json' => json_encode([
                            'tour_sync_type'              => $row->tour_sync_type,
                            'fixedDurationInMinutes'      => (!empty($viator_json['durationActivityTime']['fixedDurationInMinutes'])) ? $viator_json['durationActivityTime']['fixedDurationInMinutes'] : '',
                            'unstructuredDuration'        => (!empty($viator_json['durationActivityTime']['unstructuredDuration'])) ? $viator_json['durationActivityTime']['unstructuredDuration'] : '',
                            'variableDurationFromMinutes' => (!empty($viator_json['durationActivityTime']['variableDurationFromMinutes'])) ? $viator_json['durationActivityTime']['variableDurationFromMinutes'] : '',
                            'variableDurationToMinutes'   => (!empty($viator_json['durationActivityTime']['variableDurationToMinutes'])) ? $viator_json['durationActivityTime']['variableDurationToMinutes'] : '',
                            'fromPrice'                   => (!empty($viator_json['pricingSummary']['summary']['fromPrice'])) ? $viator_json['pricingSummary']['summary']['fromPrice'] : '',
                            'price_type'                  => (!empty($viator_json['pricingInfo']['type'])) ? $viator_json['pricingInfo']['type'] : '',
                        ])
                    ]);
                } else {
                    // Insert search record
                    DB::table('to_search')->insert([
                        'search_type'  => 'tour',
                        'reference_id' => $row->id,
                        'keyword'      => $row->tour_name,
                        'slug'         => $row->slug,
                        'image'        => $row->featured_image,
                        'extra_json'   => json_encode([
                            'tour_sync_type'              => ($row->tour_sync_type == 'viator') ? 'activity' : 'tour',
                            'fixedDurationInMinutes'      => (!empty($viator_json['durationActivityTime']['fixedDurationInMinutes'])) ? $viator_json['durationActivityTime']['fixedDurationInMinutes'] : '',
                            'unstructuredDuration'        => (!empty($viator_json['durationActivityTime']['unstructuredDuration'])) ? $viator_json['durationActivityTime']['unstructuredDuration'] : '',
                            'variableDurationFromMinutes' => (!empty($viator_json['durationActivityTime']['variableDurationFromMinutes'])) ? $viator_json['durationActivityTime']['variableDurationFromMinutes'] : '',
                            'variableDurationToMinutes'   => (!empty($viator_json['durationActivityTime']['variableDurationToMinutes'])) ? $viator_json['durationActivityTime']['variableDurationToMinutes'] : '',
                            'fromPrice'                   => (!empty($viator_json['pricingSummary']['summary']['fromPrice'])) ? $viator_json['pricingSummary']['summary']['fromPrice'] : '',
                            'price_type'                  => (!empty($viator_json['pricingInfo']['type'])) ? $viator_json['pricingInfo']['type'] : '',
                        ])
                    ]);
                }
            }
        }

        // Return response
        echo true;
    }

    // Remove duplicate search
    public function remove_duplicate_search(Request $request)
    {
        DB::table('to_search')->whereNotIn('id', function ($query) {
            $query->select(DB::raw('MIN(id)'))
                ->from('to_search')
                ->groupBy('search_type', 'keyword');
        })->delete();

        // Return response
        echo true;
    }

    // Update attraction slug
    public function update_attraction_slug(Request $request)
    {
        // Fetch list
        $attraction_list = DB::table('to_tour_viator_attraction')->get();

        foreach ($attraction_list as $row) {
            DB::table('to_tour_viator_attraction')->where('id', $row->id)->update([
                'attraction_slug' => ViatorHelper::str_slug($row->attraction_name)
            ]);
        }
    }
}