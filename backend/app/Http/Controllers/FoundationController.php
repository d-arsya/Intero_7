<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use Illuminate\Http\Request;
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
     *                     @OA\Property(property="phone", type="string", example="+6281234567890")
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
        return ResponseHelper::send('Success retrieve all foundation data', $data, 200);
    }
}
