<?php

use App\Http\Controllers\Accounts\Personal\TransactionsController;
use App\Http\Controllers\Accounts\Personal\VirtualAccountController;
use App\Http\Controllers\Accounts\Personal\WalletController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Accounts\Business\Wallet;
use Illuminate\Support\Facades\Route;

// Login Controller
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// User Controller
Route::post('/register', [UserController::class, 'store']);
Route::get('/user', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::put('/update/{id}', [UserController::class, 'update']);

// Profile Controler
Route::get('/profile', [ProfileController::class, 'profile'])->middleware('auth:sanctum');

// Wallet Controller (Personal)
Route::post('/create-personal-wallet/{id}', [WalletController::class, 'createWallet'])->middleware('auth:sanctum');
Route::get('/retrieve-personal-wallet/{id}', [WalletController::class, 'retrieveWallet'])->middleware('auth:sanctum');

// Virtual Account Controller (Personal) 
Route::post('/create-personal-currency-account', [VirtualAccountController::class, 'createVirtualAccount'])->middleware('auth:sanctum');
Route::get('/retrieve-personal-currency/{id}', [VirtualAccountController::class, 'retrieveVirtualAccount'])->middleware('auth:sanctum');

// Currencies
Route::get('/retrieve-currencies', [CurrencyController::class, 'retrieveCurrencies']);

// Transactions (Personal)
Route::get('/get-wallet-transactions', [TransactionsController::class, 'getTransactionsByWallet'])->middleware('auth:sanctum');