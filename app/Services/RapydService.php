<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RapydService
{
    protected RapydSignatureService $signer;
    protected string $baseUrl;
    protected string $endpoint;

    public function __construct(RapydSignatureService $signer)
    {
        $this->signer = $signer;
        $this->baseUrl = config('services.rapyd.base_url');
        $this->endpoint = '/v1';
    }

    /**
     * Create Rapyd Wallet (User)
     */
    public function createWallet(array $data): array
    {
        $endpoint = $this->endpoint . '/user';

        $signature = $this->signer->generate(
            'POST',
            $endpoint,
            json_encode($data)
        );

        $response = Http::withHeaders([
            'access_key'   => $signature['access_key'],
            'salt'         => $signature['salt'],
            'timestamp'    => $signature['timestamp'],
            'signature'    => $signature['signature'],
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . $endpoint, $data);

        return $response->json();
    }

    public function retrieveWallet(string $eWalletToken): array
    {
        $endpoint = $this->endpoint . '/ewallets/' . $eWalletToken;

        $signature = $this->signer->generate(
            'GET',
            $endpoint,
            ''
        );

        $response = Http::withHeaders([
            'access_key'   => $signature['access_key'],
            'salt'         => $signature['salt'],
            'timestamp'    => $signature['timestamp'],
            'signature'    => $signature['signature'],
            'Content-Type' => 'application/json',
        ])->get($this->baseUrl . $endpoint);

        return $response->json();
    }
}