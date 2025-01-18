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
        $location_countries = DB::table('location_countries')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($location_countries)) {
            // Fetch destination
            foreach ($location_countries as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'country',
                        'keyword' => $row->name
                    ],
                    [
                        'search_type' => 'country',
                        'keyword' => $row->name,
                        'slug' => $row->slug,
                        'image' => $row->featured_image,
                        'reference_id' => $row->id,
                        'extra_json' => null
                    ]
                );
            }
        }

        // Return response
        echo true;
    }

    // State sync table
    public function state_table(Request $request)
    {
        // Fetch list
        $location_states = DB::table('location_states')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($location_states)) {
            // Fetch destination
            foreach ($location_states as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'state',
                        'keyword' => $row->name
                    ],
                    [
                        'search_type' => 'state',
                        'keyword' => $row->name,
                        'slug' => $row->slug,
                        'image' => $row->featured_image,
                        'reference_id' => $row->id,
                        'extra_json' => null
                    ]
                );
            }
        }

        // Return response
        echo true;
    }

    // City sync table
    public function city_table(Request $request)
    {
        // Fetch list
        $location_cities = DB::table('location_cities')->select('*')->where('status', 1)->get();

        // Check array length
        if(count($location_cities)) {
            // Fetch destination
            foreach ($location_cities as $row) {
                // Update if keyword exists for the same search_type, or create a new record
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => 'city',
                        'keyword' => $row->name
                    ],
                    [
                        'search_type' => 'city',
                        'keyword' => $row->name,
                        'slug' => $row->slug,
                        'image' => $row->featured_image,
                        'reference_id' => $row->id,
                        'extra_json' => null
                    ]
                );
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
        // Fetch attractions with `is_synced` = 0, grouped and limited
        $attraction_list = DB::table('to_tour_viator_attraction')
            ->select('id', 'attraction_name', 'attraction_slug', 'featured_image')
            ->where('is_synced', 0)
            ->orderBy('attraction_slug')
            ->limit(3000)
            ->get();

        // Check if attractions exist
        if ($attraction_list->isNotEmpty()) {
            // Prepare data for batch operations
            $search_data = [];
            $update_slugs = [];

            // Fetch lists
            foreach ($attraction_list as $row) {
                // Update the image path
                $featured_image = str_replace(['720x480', '360x240'], '400x400', $row->featured_image);

                // Add attraction_slug for batch `is_synced` update
                if(!in_array($row->attraction_slug, $update_slugs)) {
                    // Prepare data for `to_search` table
                    $search_data[] = [
                        'search_type' => 'attraction',
                        'reference_id' => $row->id,
                        'keyword' => $row->attraction_name,
                        'slug' => trim($row->attraction_slug),
                        'image' => $featured_image ?? null,
                        'created_at' => now(),
                    ];

                    // Push update slugs
                    $update_slugs[] = $row->attraction_slug;
                }
            }

            // Iterate over the search_data and update or insert each record
            foreach ($search_data as $data) {
                DB::table('to_search')->updateOrInsert(
                    [
                        'search_type' => $data['search_type'],
                        'keyword' => $data['keyword'],
                        'slug' => $data['slug'],
                    ],
                    [
                        'reference_id' => $data['reference_id'],
                        'image' => $data['image'],
                    ]
                );
            }

            // Batch update `is_synced` in `to_tour_viator_attraction`
            DB::table('to_tour_viator_attraction')
                ->whereIn('attraction_slug', $update_slugs)
                ->update(['is_synced' => 1]);
        }

        // Return response
        return response()->json(['success' => true]);
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

    // Update image in location
    public function update_image_in_location(Request $request)
    {
        // Fetch only the necessary columns from the database to minimize memory usage
        $location_data = DB::table('to_search')
            ->select('search_type', 'reference_id', 'image')
            ->whereIn('search_type', ['country', 'city', 'attraction'])
            ->get();

        // Group the references by their search type to reduce repeated queries
        $country_ids = $location_data->where('search_type', 'country')->pluck('reference_id')->toArray();
        $city_ids = $location_data->where('search_type', 'city')->pluck('reference_id')->toArray();

        // Update country images in a single query
        DB::table('location_countries')
            ->whereIn('id', $country_ids)
            ->whereIn('id', $location_data->where('search_type', 'country')->pluck('reference_id'))
            ->update([
                'featured_image' => DB::raw('CASE id ' . implode(' ', array_map(function ($id, $image) {
                    return "WHEN $id THEN '$image'";
                }, $country_ids, $location_data->where('search_type', 'country')->pluck('image')->toArray())) . ' END')
            ]);

        // Update city images in a single query
        DB::table('location_cities')
            ->whereIn('id', $city_ids)
            ->update([
                'featured_image' => DB::raw('CASE id ' . implode(' ', array_map(function ($id, $image) {
                    return "WHEN $id THEN '$image'";
                }, $city_ids, $location_data->where('search_type', 'city')->pluck('image')->toArray())) . ' END')
            ]);

        // Return structured response
        return response()->json([
            'success' => true,
            'message' => 'Images updated successfully',
        ]);
    }

    // Remove duplicate search
    public function remove_duplicate_search(Request $request)
    {
        // Get duplicate records grouped by `search_type` and `keyword`, excluding the most recent one
        $duplicates = DB::table('to_search')
            ->select('id')
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MIN(id)'))
                    ->from('to_search')
                    ->groupBy('search_type', 'keyword');
            }, 'and', false)
            ->where('search_type', 'attraction')
            ->pluck('id');

        // Delete duplicate rows
        DB::table('to_search')
            ->whereIn('id', $duplicates)
            ->delete();

        // Return response
        return response()->json(['success' => true]);
    }
}