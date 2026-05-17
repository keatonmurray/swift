<?php

namespace App\Http\Controllers\Llm;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Accounts\Personal\WalletController;

class GeminiController extends Controller
{
    protected WalletController $wallet;

    public function __construct(WalletController $wallet)
    {
        $this->wallet = $wallet;
    }

    public function test()
    {
        $today = now()->day;
        $billingDay = 16;

        if ($today != $billingDay) {
            return response()->json([
                'message' => 'Today is NOT payroll day'
            ]);
        }

        // RETRIEVE WALLET DATA
        $walletResponse = $this->wallet->retrieveWallet();

        // CONVERT RESPONSE TO ARRAY
        $walletData = $walletResponse->getData(true);

        // SEND TO GEMINI
        $geminiResponse = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . env('GEMINI_API_KEY'),
            [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' =>
                                    "Analyze and summarize this wallet JSON data.

                                    Include:
                                    - wallet owner
                                    - wallet status
                                    - verification status
                                    - whether the wallet appears active
                                    - any useful financial/account insights

                                    JSON:
                                    " . json_encode($walletData)
                            ]
                        ]
                    ]
                ]
            ]
        );

        // SAFE EXTRACTION
        $summary = data_get(
            $geminiResponse->json(),
            'candidates.0.content.parts.0.text',
            'No summary generated'
        );

        return response()->json([
            'success' => true,
            'wallet' => $walletData,
            'summary' => $summary,
            'gemini_raw' => $geminiResponse->json()
        ]);
    }
}