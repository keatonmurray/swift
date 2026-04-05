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

    private function generateHeaders($method, $path, $body = '')
    {
        $salt      = bin2hex(random_bytes(8));
        $timestamp = time();
        $bodyString = $body ? json_encode($body) : '';
        $toSign    = $method . $path . $salt . $timestamp . $this->accessKey . $this->secretKey . $bodyString;
        $signature = base64_encode(hash('sha256', $toSign, true));

        return [
            'Content-Type' => 'application/json',
            'access_key'   => $this->accessKey,
            'salt'         => $salt,
            'timestamp'    => $timestamp,
            'signature'    => $signature,
        ];
    }

    public function createUser($payload)
    {
        $path = '/v1/user';
        $headers = $this->generateHeaders('POST', $path, $payload);
        $response = Http::withHeaders($headers)->post($this->baseUrl . $path, $payload);

        return response()->json($response);
    }
}