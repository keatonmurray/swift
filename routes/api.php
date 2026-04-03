<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);
Route::get('/profile', [ProfileController::class, 'profile'])->middleware('auth:sanctum');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
