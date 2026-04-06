<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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

    /**
     * Generate salt with 12 characters in length containing alphanumeric characters
     */
    private function generateSalt(int $length = 12): string
    {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $salt = '';
        for ($i = 0; $i < $length; $i++) {
            $salt .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $salt;
    }

    /**
     * Generate base64 based URL to build signature
     */
    private function toBase64Url(string $str): string
    {
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }

    /**
     * Generate request headers
     */
    private function generateHeaders(string $method, string $path, array $body = []): array
    {
        $salt = $this->generateSalt();
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

        // Compact JSON body (sorted keys)
        $bodyString = $body ? json_encode($body, JSON_UNESCAPED_SLASHES) : '';

        // Build toSign: method + path + salt + timestamp + accessKey + bodyString
        $toSign = strtolower($method) . $path . $salt . $timestamp . $this->accessKey . $bodyString;

        // HMAC SHA256 signature, then URL-safe Base64
        $hash = hash_hmac('sha256', $toSign, $this->secretKey, true);
        $signature = $this->toBase64Url($hash);

        return [
            'Content-Type' => 'application/json',
            'access_key'   => $this->accessKey,
            'salt'         => $salt,
            'timestamp'    => $timestamp,
            'signature'    => $signature,
            'idempotency'  => $timestamp . $salt,
        ];
    }

    /**
     * Handle Rapyd user creation
     */
    public function createUser(array $payload)
    {
        $path = '/v1/customers';

        $headers = $this->generateHeaders('POST', $path, $payload);

        $response = Http::withHeaders($headers)
                        ->post($this->baseUrl . $path, $payload);

        return $response->json(); // returns associative array
    }
}