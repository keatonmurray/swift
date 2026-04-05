<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RapydService 
{
    private $accessKey; 
    private $secretKey;
    private $baseUrl;

    public function __construct()
    {
        $this->accessKey = config('services.rapyd.access_key');
        $this->secretKey = config('services.rapyd.secret_key');
        $this->baseUrl   = config('services.rapyd.base_url'); 
    }

    private function generateHeaders($method, $path, array $body = [])
    {
        $salt      = bin2hex(random_bytes(8));
        $timestamp = time();

        // Convert all numeric values to strings
        array_walk_recursive($body, function (&$item) {
            if (is_numeric($item)) {
                $item = (string)$item;
            }
        });

        // Sort body keys recursively
        $sortRecursive = function (&$array) use (&$sortRecursive) {
            ksort($array);
            foreach ($array as &$value) {
                if (is_array($value)) {
                    $sortRecursive($value);
                }
            }
        };
        $sortRecursive($body);

        // JSON encode compactly
        $bodyString = $body ? json_encode($body, JSON_UNESCAPED_SLASHES) : '';

        // String to sign
        $toSign = $method . $path . $salt . $timestamp . $this->accessKey . $this->secretKey . $bodyString;

        // HMAC SHA256 signature
        $signature = base64_encode(hash_hmac('sha256', $toSign, $this->secretKey, true));

        $data = [
            'Content-Type' => 'application/json',
            'access_key'   => $this->accessKey,
            'salt'         => $salt,
            'timestamp'    => $timestamp,
            'signature'    => $signature,
        ];

        dd($data);

        return $data;
    }

    public function createUser(array $payload)
    {
        $path = '/v1/customers';

        $headers = $this->generateHeaders('POST', $path, $payload);

        $response = Http::withHeaders($headers)
                        ->post($this->baseUrl . $path, $payload);

        return $response->json(); // returns associative array
    }
}