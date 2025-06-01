<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FoundationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/foundations",
     *     summary="Get list of yayasan",
     *     description="Returns a list of yayasan with their details",
     *     operationId="getFoundation",
     *     tags={"Foundation"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(property="message", type="string", example="Success retrieve all foundation data"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="name", type="string", example="Yayasan La Tahzan"),
     *                     @OA\Property(property="latitude", type="string", example="-7.12345"),
     *                     @OA\Property(property="longitude", type="string", example="110.12345"),
     *                     @OA\Property(property="address", type="string", example="Jl. Merdeka No. 1, Jakarta"),
     *                     @OA\Property(property="phone", type="string", example="+6281234567890"),
     *                     @OA\Property(property="distance", type="decimal", example="1.2")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=401),
     *             @OA\Property(property="message", type="string", example="Unauthorized"),
     *             @OA\Property(property="data", type="object", example=null)
     *         )
     *     )
     * )
     */
    public function index()
    {
        $foundations = Http::withHeader('API-KEY', env('API_KEY'))->get(env('BBJ_ENDPOINT') . 'foundations');
        $data = json_decode($foundations->body())->data;
        $data = collect($data)->map(function ($item) {
            unset($item->created_at);
            unset($item->updated_at);
            $item->distance = $this->distance($item->latitude, $item->longitude, Auth::user()->latitude, Auth::user()->longitude);
            return $item;
        })->sortBy('distance')->values();
        return ResponseHelper::send('Success retrieve all foundation data', $data, 200);
    }
    protected function distance($lat1, $lon1, $lat2, $lon2, $unit = 'K')
    {
        // Radius of the earth in different units
        $earthRadius = [
            'K' => 6371,       // Kilometers
            'M' => 3958.8,     // Miles
            'N' => 3440.1      // Nautical Miles
        ];

        // Convert degrees to radians
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        // Haversine formula
        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;

        $a = sin($deltaLat / 2) ** 2 +
            cos($lat1) * cos($lat2) * sin($deltaLon / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius[$unit] * $c;

        return round($distance, 1);
    }
}
