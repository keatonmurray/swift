<?php

namespace App\Http\Controllers\Accounts\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\RapydService;

class VirtualAccountController extends Controller
{

    protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    public function createVirtualAccount(Request $request)
    {
        $data = $request->validate([
            'country' => 'required|string',
            'currency' => 'required|string',
            'ewallet' => 'required|string',
            'description' => 'nullable|string',
            'merchant_reference_id' => 'required|string',
            'metadata' => 'nullable|array',
            'requested_currency' => 'required|string',
        ]);

        $response = $this->rapyd->issueVirtualAccountToWallet($data);

        return response()->json([
            'success' => true,
            'message' => 'Virtual account issued successfully',
            'data' => $response
        ]);
    }

    public function retrieveVirtualAccount(string $id)
    {
        // TODO: 
        // 1.
    }

}
