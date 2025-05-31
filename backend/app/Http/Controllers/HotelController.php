<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\User;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    /**
     * @OA\Get(
     *     path="/hotels",
     *     summary="Get all hotel data",
     *     tags={"Hotels"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Success retrieve all hotel data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Success retrieve all hotel data"),
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="latitude", type="string", example="-7.798264"),
     *                 @OA\Property(property="longitude", type="string", example="110.392555"),
     *                 @OA\Property(property="name", type="string", example="gatau"),
     *                 @OA\Property(property="address", type="string", example="Jl. Ipda Tut Harsono No.24 ...")
     *             )),
     *             @OA\Property(property="status", type="integer", example=200)
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function index()
    {
        $hotel = User::select('latitude', 'longitude', 'name', 'address')->get();
        return ResponseHelper::send('Success retireve all hotel data', $hotel, 200);
    }
}
