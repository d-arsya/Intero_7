<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\FoundationController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('profile', 'getProfile');
        Route::put('profile', 'updateProfile');
    });
    Route::get('foundations', [FoundationController::class, 'index']);
    Route::apiResource('donation', DonationController::class)->except('destroy');
});
Route::get('hotels', [HotelController::class, 'index']);
