<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * API-friendly login using Laravel Sanctum tokens
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401); // <-- important
        }

        $user = Auth::user();

        // Create a token for API authentication
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in',
            'user'    => $user,
            'token'   => $token
        ]);
    }

    /**
     * API logout (revokes all tokens)
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            // Revoke all tokens for the authenticated user
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}