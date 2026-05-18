<?php

use App\Http\Controllers\Accounts\Personal\TransactionsController;
use App\Http\Controllers\Accounts\Personal\VirtualAccountController;
use App\Http\Controllers\Accounts\Personal\WalletController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\Llm\GeminiController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Personal\TransferMoneyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Login Controller (Personal)
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// User Controller (Personal)
Route::post('/register', [UserController::class, 'store']);
Route::get('/user', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::put('/update', [UserController::class, 'update']);

// Profile Controler (Personal)
Route::get('/profile', [ProfileController::class, 'profile'])->middleware('auth:sanctum');

// Wallet Controller (Personal)
Route::post('/create-personal-wallet', [WalletController::class, 'createWallet'])->middleware('auth:sanctum');
Route::get('/retrieve-personal-wallet', [WalletController::class, 'retrieveWallet'])->middleware('auth:sanctum');

// Virtual Account Controller (Personal) 
Route::post('/create-personal-currency-account', [VirtualAccountController::class, 'createVirtualAccount'])->middleware('auth:sanctum');
Route::get('/retrieve-personal-currency', [VirtualAccountController::class, 'retrieveVirtualAccount'])->middleware('auth:sanctum');

// Currencies (Personal)
Route::get('/retrieve-currencies', [CurrencyController::class, 'retrieveCurrencies']);

// Transfer Money (Personal)
Route::post('/transfer-personal-money', [TransferMoneyController::class, 'transferToOtherWallet'])->middleware('auth:sanctum');
Route::get('/get-pending-wallet-transactions', [TransferMoneyController::class, 'getPendingWalletTransfers'])->middleware('auth:sanctum');
Route::post('/accept-wallet-transfer', [TransferMoneyController::class, 'acceptPendingWalletTransfers'])->middleware('auth:sanctum');

// Transactions (Personal)
Route::get('/get-wallet-transactions', [TransactionsController::class, 'getTransactionsByWallet'])->middleware('auth:sanctum');

// ****************************** GEMINI ROUTE ************************* //
Route::get('/test-gemini', [GeminiController::class, 'test']);
Route::post('/gemini/personal-summary', [GeminiController::class, 'personalSummary'])->middleware('auth:sanctum');