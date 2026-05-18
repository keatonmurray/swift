<?php

namespace App\Http\Controllers\Llm;

use App\Http\Controllers\Controller;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Accounts\Personal\WalletController;

class GeminiController extends Controller
{
    protected WalletController $wallet;
    protected GeminiService $gemini;

    public function __construct(WalletController $wallet, GeminiService $gemini)
    {
        $this->wallet = $wallet;
        $this->gemini = $gemini;
    }

    /**
     * POST /api/gemini/personal-summary
     *
     * Accepts compact financial data from the frontend and returns
     * a Gemini-powered AI summary with insights and a recommendation.
     */
    public function personalSummary(Request $request)
    {
        $validated = $request->validate([
            'totalBalance'      => 'required|numeric',
            'currencyCount'     => 'required|integer|min:0',
            'transactionCount'  => 'required|integer|min:0',
            'receivedCount'     => 'required|integer|min:0',
            'sentCount'         => 'required|integer|min:0',
            'currencies'        => 'nullable|array',
            'currencies.*'      => 'string|max:10',
            'recentTransactions' => 'nullable|array|max:10',
            'recentTransactions.*.type'     => 'string|max:100',
            'recentTransactions.*.amount'   => 'numeric',
            'recentTransactions.*.currency' => 'string|max:10',
            'recentTransactions.*.status'   => 'string|max:20',
        ]);

        try {
            $result = $this->gemini->personalSummary($validated);

            return response()->json([
                'success' => true,
                'data'    => $result,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => true,
                'data'    => $this->gemini->fallbackSummary(),
            ]);
        }
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