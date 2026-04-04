<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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


