<?php

namespace App\Helpers;
use DB;

class GptHelper
{
    // Run prompt
    public static function run_prompt($prompt_command)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL            => 'https://api.openai.com/v1/chat/completions',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => 'POST',
            CURLOPT_POSTFIELDS     => '{
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": "' . $prompt_command . '"
                            }
                        ]
                    }
                ],
                "temperature": 0.1,
                "max_tokens": 200,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
            }',
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . env('CHATGPT_API_TOKEN')
            ]
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response ? json_decode($response, true) : [];
    }

    // Filter result text
    public static function filter_result_text($text)
    {
        // Split the input into individual lines
        $text = explode("\n", $text);
        $text = array_unique($text);

        // Define blank value
        $new_line = [];

        // Fetch array
        foreach ($text as $line) {
            // Check is valid text
            if(!empty($line)) {
                // Remove the leading index number (e.g., "1. ", "2. ", etc.)
                $line = preg_replace('/^\d+\.\s*/', '', $line);

                // Update item
                $new_line[] = $line;
            }
        }

        // Check is valid length
        if(count($new_line)) {
            // Check searchable tag is valid
            if(!empty($new_line[1])) {
                $new_line[1] = explode(', ', $new_line[1]);
            }

            // Check seo keyword is valid
            if(!empty($new_line[3])) {
                $new_line[3] = explode(', ', $new_line[3]);
            }
        }

        // Return response
        return $new_line;
    }
}