<?php

namespace App\Http\Controllers\Accounts\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\RapydService;
use Illuminate\Http\JsonResponse;

class WalletController extends Controller
{
    protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    /**
     * Create a Rapyd wallet 
     */
    public function createWallet(Request $request): JsonResponse
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
            'country'    => ['required', 'string', 'size:2'],
            'phone_number' => ['nullable', 'string'],
        ]);

        $payload = [
            'ewallet_reference_id' => 'test_user_' . uniqid(),
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'type'       => 'person',
            'email'      => $data['email'],

            'contact' => [
                'country'     => strtoupper($data['country']),
                'email'       => $data['email'],
                'first_name'  => $data['first_name'],
                'last_name'   => $data['last_name'],
                'phone_number'=> $data['phone_number'] ?? '+10000000000',
            ],

            'metadata' => [
                'source' => 'laravel-test',
            ],
        ];

        try {
            $response = $this->rapyd->createWallet($payload);

            return response()->json([
                'success' => true,
                'message' => 'Wallet created successfully',
                'data'    => $response,
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create wallet',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function retrieveWallet() 
    {
        // TODO:
        // 1. Pass the wallet reference ID as param
        // 2. Write logic to retrieve wallet
        // 3. Feed JSON for client-side consumption
    }

}