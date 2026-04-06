<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RapydService 
{
    private string $accessKey; 
    private string $secretKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->accessKey = config('services.rapyd.access_key');
        $this->secretKey = config('services.rapyd.secret_key');
        $this->baseUrl   = config('services.rapyd.base_url'); 
    }

    private function generateSalt(int $length = 12): string
    {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $salt = '';
        for ($i = 0; $i < $length; $i++) {
            $salt .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $salt;
    }


    private function generateHeaders(string $method, string $path, string $bodyString, string $salt, int $timestamp): array
    {
        $toSign = strtolower($method) . $path . $salt . $timestamp . $this->accessKey . $this->secretKey . $bodyString;

        $hash = hash_hmac('sha256', $toSign, $this->secretKey, true); // raw bytes
        $signature = rtrim(strtr(base64_encode($hash), '+/', '-_'), '=');

        return [
            'Content-Type' => 'application/json',
            'access_key'   => $this->accessKey,
            'salt'         => $salt,
            'timestamp'    => $timestamp,
            'signature'    => $signature,
            'idempotency'  => $timestamp . $salt,
        ];
    }

    public function createUser(array $payload)
    {
        $path = '/v1/customers';
        $method = 'POST';

        // 1️⃣ Convert all numbers to strings
        array_walk_recursive($payload, function (&$item) {
            if (is_numeric($item)) {
                $item = (string)$item;
            }
        });

        // 2️⃣ Sort keys recursively for consistent JSON
        $sortRecursive = function (&$array) use (&$sortRecursive) {
            ksort($array);
            foreach ($array as &$value) {
                if (is_array($value)) {
                    $sortRecursive($value);
                }
            }
        };
        $sortRecursive($payload);

        // 3️⃣ JSON encode compactly
        $bodyString = $payload ? json_encode($payload, JSON_UNESCAPED_SLASHES) : '';

        // 4️⃣ Generate salt & timestamp
        $salt = $this->generateSalt();
        $timestamp = time();

        // 5️⃣ Generate headers
        $headers = $this->generateHeaders($method, $path, $bodyString, $salt, $timestamp);

        // dd(
        //     'Body String:', $bodyString,
        //     'ToSign:', strtolower($method) . $path . $salt . $timestamp . $this->accessKey . $bodyString,
        //     'Headers:', $headers
        // );

        // 6️⃣ Send POST request using raw body to ensure exact match
        $response = Http::withHeaders($headers)
                        ->withBody($bodyString, 'application/json')
                        ->post($this->baseUrl . $path);

        return $response->json();
    }
}