<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use ViatorHelper;
use DB;

class ImageController extends Controller
{
    // Country image sync table
    public function country_table(Request $request)
    {
        // Fetch list of active countries
        $location_countries = DB::table('location_countries')->select('*')->where('status', 1)->get();

        // Iterate over each country
        foreach ($location_countries as $row) {
            // Default featured image
            $featured_image = '';

            // Fetch top tour data
            $top_tours = DB::table('to_tour_product AS tour')
                ->select('tour.id', 'tour.featured_image')
                ->join('to_tour_viator_extra_data AS extra', 'tour.id', 'extra.tour_id')
                ->join('to_tour_location AS location', 'tour.id', 'location.tour_id')
                ->where('location.country_id', $row->id)
                ->where('tour.status', 1)
                ->orderBy('extra.total_reviews', 'DESC')
                ->first();

            // If there are top tours, update featured image
            if ($top_tours) {
                $featured_image = str_replace(['720x480', '360x240'], '400x400', $top_tours->featured_image);
            }

            // Check if the country image is already from the 'uploads/country/' directory
            if (strpos($row->featured_image, 'uploads/country/') === false) {
                // Update the country image only if it's not already in the 'uploads/country/' directory
                $country_image = $featured_image ?: null;

                // Update the country record with the new image, if necessary
                if ($country_image && $row->featured_image !== $country_image) {
                    DB::table('location_countries')->where('id', $row->id)->update(['featured_image' => $country_image]);
                }
            }
        }

        // Return success response
        return response()->json(['success' => true]);
    }

    // State image sync table
    public function state_table(Request $request)
    {
        // Fetch list of active states
        $location_states = DB::table('location_states')->select('*')->where('status', 1)->get();

        // Iterate over each state
        foreach ($location_states as $row) {
            // Default featured image
            $featured_image = '';

            // Fetch top tour data
            $top_tours = DB::table('to_tour_product AS tour')
                ->select('tour.id', 'tour.featured_image')
                ->join('to_tour_viator_extra_data AS extra', 'tour.id', 'extra.tour_id')
                ->join('to_tour_location AS location', 'tour.id', 'location.tour_id')
                ->where('location.state_id', $row->id)
                ->where('tour.status', 1)
                ->orderBy('extra.total_reviews', 'DESC')
                ->first();

            // If there are top tours, update featured image
            if ($top_tours) {
                $featured_image = str_replace(['720x480', '360x240'], '400x400', $top_tours->featured_image);
            }

            // Check if the state image is already from the 'uploads/state/' directory
            if (strpos($row->featured_image, 'uploads/state/') === false) {
                // Update the state image only if it's not already in the 'uploads/state/' directory
                $state_image = $featured_image ?: null;

                // Update the state record with the new image, if necessary
                if ($state_image && $row->featured_image !== $state_image) {
                    DB::table('location_states')->where('id', $row->id)->update(['featured_image' => $state_image]);
                }
            }
        }

        // Return success response
        return response()->json(['success' => true]);
    }

    // City image sync table
    public function city_table(Request $request)
    {
        // Fetch list of active cities
        $location_cities = DB::table('location_cities')->select('*')->where('status', 1)->get();

        // Iterate over each city
        foreach ($location_cities as $row) {
            // Default featured image
            $featured_image = '';

            // Fetch top tour data
            $top_tours = DB::table('to_tour_product AS tour')
                ->select('tour.id', 'tour.featured_image')
                ->join('to_tour_viator_extra_data AS extra', 'tour.id', 'extra.tour_id')
                ->join('to_tour_location AS location', 'tour.id', 'location.tour_id')
                ->where('location.city_id', $row->id)
                ->where('tour.status', 1)
                ->orderBy('extra.total_reviews', 'DESC')
                ->first();

            // If there are top tours, update featured image
            if ($top_tours) {
                $featured_image = str_replace(['720x480', '360x240'], '400x400', $top_tours->featured_image);
            }

            // Check if the city image is already from the 'uploads/city/' directory
            if (strpos($row->featured_image, 'uploads/city/') === false) {
                // Update the city image only if it's not already in the 'uploads/city/' directory
                $city_image = $featured_image ?: null;

                // Update the city record with the new image, if necessary
                if ($city_image && $row->featured_image !== $city_image) {
                    DB::table('location_cities')->where('id', $row->id)->update(['featured_image' => $city_image]);
                }
            }
        }

        // Return success response
        return response()->json(['success' => true]);
    }

    // Attraction image sync table
    public function attraction_table(Request $request)
    {
        // Fetch attractions with no featured image
        $attractions = DB::table('to_tour_viator_attraction')
            ->select('id', 'attraction_slug')
            ->whereNull('featured_image')
            ->limit(500)
            ->get();

        if ($attractions->isNotEmpty()) {
            $attraction_slugs = $attractions->pluck('attraction_slug')->toArray();

            // Fetch top tours for all attractions in one query
            $top_tours = DB::table('to_tour_product AS tour')
                ->select('tour.featured_image', 'attraction.attraction_slug')
                ->join('to_tour_viator_extra_data AS extra', 'tour.id', '=', 'extra.tour_id')
                ->join('to_tour_viator_attraction AS attraction', 'tour.id', '=', 'attraction.tour_id')
                ->whereIn('attraction.attraction_slug', $attraction_slugs)
                ->where('tour.status', 1)
                ->orderBy('extra.total_reviews', 'DESC')
                ->get()
                ->groupBy('attraction_slug');

            // Prepare data for batch updates
            $updates = [];
            foreach ($attractions as $attraction) {
                $slug = $attraction->attraction_slug;

                if (isset($top_tours[$slug])) {
                    // Get the top tour's featured image
                    $featured_image = $top_tours[$slug]->first()->featured_image;
                    $updated_image = str_replace(['720x480', '360x240'], '400x400', $featured_image);

                    // Add to updates batch
                    $updates[] = [
                        'id' => $attraction->id,
                        'featured_image' => $updated_image,
                    ];
                }
            }

            // Perform batch update in a single query
            if (!empty($updates)) {
                $update_ids = collect($updates)->pluck('id')->toArray();
                $update_values = collect($updates)->pluck('featured_image', 'id')->toArray();

                DB::table('to_tour_viator_attraction')
                    ->whereIn('id', $update_ids)
                    ->update(['featured_image' => DB::raw("CASE id " .
                        collect($update_values)
                            ->map(fn($image, $id) => "WHEN $id THEN '$image'")
                            ->implode(' ') . " END")]);
            }
        }

        // Return success response
        return response()->json(['success' => true]);
    }
}