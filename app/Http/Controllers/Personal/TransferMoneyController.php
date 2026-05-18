<?php

namespace App\Http\Controllers\Personal;

use App\Http\Controllers\Controller;
use App\Services\RapydService;
use Illuminate\Http\Request;

class TransferMoneyController extends Controller
{
    protected RapydService $rapydService;

    public function __construct(RapydService $rapydService)
    {
        $this->rapydService = $rapydService;
    }

    public function transferToOtherWallet(Request $request)
    {   
        $validated = $request->validate([
            'amount' => ['required', 'numeric'],
            'currency' => ['required', 'string'],
            'destination_ewallet' => ['required', 'string'],
            'source_ewallet' => ['required', 'string'],
            'expiration' => ['nullable', 'string'],
        ]);

        $payload = [
            'amount' => (float) $validated['amount'],
            'currency' => $validated['currency'],
            'destination_ewallet' => $validated['destination_ewallet'],
            'source_ewallet' => $validated['source_ewallet'],
            'expiration' => $validated['expiration'] ?? null,
        ];

        $callRapyd = $this->rapydService->transferFundsBetweenWallets($payload);

        return response()->json([
            'success' => true,
            'message' => 'Transfer completed successfully.',
            'data' => $callRapyd,
        ]);
    }
}