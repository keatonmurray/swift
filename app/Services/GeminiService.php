<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey  = env('GEMINI_API_KEY', '');
        $this->model   = 'gemini-2.5-flash';
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    /**
     * Send a prompt to Gemini and return the raw text response.
     */
    public function generate(string $prompt): ?string
    {
        if (empty($this->apiKey)) {
            Log::warning('GeminiService: GEMINI_API_KEY is not configured.');
            return null;
        }

        try {
            $response = Http::timeout(30)->withHeaders([
                'Content-Type' => 'application/json',
            ])->post(
                "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}",
                [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt],
                            ],
                        ],
                    ],
                    'generationConfig' => [
                        'responseMimeType' => 'application/json',
                    ],
                ]
            );

            if (!$response->successful()) {
                Log::error('GeminiService: API returned status ' . $response->status(), [
                    'body' => $response->body(),
                ]);
                return null;
            }

            return data_get(
                $response->json(),
                'candidates.0.content.parts.0.text'
            );
        } catch (\Throwable $e) {
            Log::error('GeminiService: request failed', [
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Generate a personal financial summary from account data.
     */
    public function personalSummary(array $data): array
    {
        $prompt = $this->buildPersonalSummaryPrompt($data);

        $rawText = $this->generate($prompt);

        if ($rawText === null) {
            return $this->fallbackSummary();
        }

        return $this->parseAndValidateSummary($rawText);
    }

    /**
     * Build the prompt for personal summary.
     */
    protected function buildPersonalSummaryPrompt(array $data): string
    {
        $json = json_encode($data, JSON_UNESCAPED_SLASHES);

        return <<<PROMPT
You are a concise financial assistant. Analyze the following personal account activity and return a JSON object with exactly these keys:

1. "summary" — A 1–2 sentence plain-English summary of the account health.
2. "insights" — An array of exactly 3 short, actionable insight strings.
3. "recommendation" — A single sentence recommendation for the user.

Rules:
- Do NOT include any markdown, code fences, or explanation outside the JSON.
- Keep every string under 120 characters.
- Be helpful but never give specific investment advice.
- If data is sparse, say so honestly.

Account data:
{$json}
PROMPT;
    }

    /**
     * Parse Gemini's response and ensure it matches the expected schema.
     */
    protected function parseAndValidateSummary(string $rawText): array
    {
        try {
            // Strip potential markdown code fences
            $cleaned = preg_replace('/^```(?:json)?\s*/i', '', trim($rawText));
            $cleaned = preg_replace('/\s*```$/i', '', $cleaned);

            $parsed = json_decode($cleaned, true, 512, JSON_THROW_ON_ERROR);

            // Validate structure
            if (
                !is_string($parsed['summary'] ?? null) ||
                !is_array($parsed['insights'] ?? null) ||
                !is_string($parsed['recommendation'] ?? null)
            ) {
                Log::warning('GeminiService: response structure mismatch', ['parsed' => $parsed]);
                return $this->fallbackSummary();
            }

            // Sanitize insights — keep only strings, cap at 3
            $insights = array_values(array_filter($parsed['insights'], 'is_string'));
            $insights = array_slice($insights, 0, 3);

            if (count($insights) < 1) {
                return $this->fallbackSummary();
            }

            return [
                'summary'        => substr(strip_tags($parsed['summary']), 0, 300),
                'insights'       => array_map(fn($i) => substr(strip_tags($i), 0, 200), $insights),
                'recommendation' => substr(strip_tags($parsed['recommendation']), 0, 300),
            ];
        } catch (\Throwable $e) {
            Log::warning('GeminiService: failed to parse summary JSON', [
                'error'   => $e->getMessage(),
                'rawText' => $rawText,
            ]);
            return $this->fallbackSummary();
        }
    }

    /**
     * Safe fallback when Gemini is unavailable or returns garbage.
     */
    public function fallbackSummary(): array
    {
        return [
            'summary'        => 'We couldn\'t generate a live AI summary right now. Your dashboard data is still accurate.',
            'insights'       => [
                'Review your recent transactions for any unusual activity.',
                'Consider diversifying across multiple currencies.',
                'Keep your incoming transfers higher than outgoing for a healthy score.',
            ],
            'recommendation' => 'Check back later for a personalised AI analysis of your finances.',
            'is_fallback'    => true,
        ];
    }
}
