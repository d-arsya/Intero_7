<?php

namespace App\Http\Controllers;

use App\Helper\BotHelper;
use App\Helper\ResponseHelper;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DonationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/donation",
     *     summary="Get authenticated user's donation history",
     *     tags={"Donations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Success retrieve donation history",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(property="message", type="string", example="Success retrieve donation history"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="foundation_id", type="integer", example=2),
     *                     @OA\Property(property="user_id", type="integer", example=1),
     *                     @OA\Property(property="variant", type="string", example="Makanan Kering"),
     *                     @OA\Property(property="description", type="string", example="Soto Sapi"),
     *                     @OA\Property(property="take", type="string", format="date", example="2025-06-01"),
     *                     @OA\Property(property="time", type="string", example="09.00 - 10.00"),
     *                     @OA\Property(property="notes", type="string", example="Catatan"),
     *                     @OA\Property(property="portion", type="integer", example=10),
     *                     @OA\Property(property="status", type="string", example="Diproses"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-06-01T16:09:12.000000Z"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-06-01T16:09:12.000000Z"),
     *                     @OA\Property(property="foundation_name", type="string", example="Yayasan Al Kahfi")
     *                 )
     *             )
     *         )
     *     )
     * )
     */

    public function index()
    {
        $user = Auth::user();
        $donations = $user->donations;
        foreach ($donations as $item) {
            $item->foundation_name = $item->foundation()->name;
        }
        return ResponseHelper::send('Success retrieve donation history', $donations, 200);
    }

    /**
     * @OA\Post(
     *     path="/donation",
     *     summary="Create a new donation",
     *     tags={"Donations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"foundation_id", "variant", "description", "portion", "take", "time"},
     *             @OA\Property(property="foundation_id", type="integer", example=2),
     *             @OA\Property(property="variant", type="string", example="Makanan Kering"),
     *             @OA\Property(property="description", type="string", example="Soto Sapi"),
     *             @OA\Property(property="portion", type="integer", example=10),
     *             @OA\Property(property="take", type="string", format="date", example="2025-06-01"),
     *             @OA\Property(property="time", type="string", example="09.00 - 10.00"),
     *             @OA\Property(property="notes", type="string", example="Catatan opsional")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success create donation",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=201),
     *             @OA\Property(property="message", type="string", example="Success create donation"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=10),
     *                 @OA\Property(property="foundation_id", type="integer", example=2),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="variant", type="string", example="Makanan Kering"),
     *                 @OA\Property(property="description", type="string", example="Soto Sapi"),
     *                 @OA\Property(property="portion", type="integer", example=10),
     *                 @OA\Property(property="take", type="string", format="date", example="2025-06-01"),
     *                 @OA\Property(property="time", type="string", example="09.00 - 10.00"),
     *                 @OA\Property(property="notes", type="string", example="Catatan"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-06-01T17:05:05.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-06-01T17:05:05.000000Z"),
     *                 @OA\Property(property="foundation_name", type="string", example="Yayasan Al Kahfi")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error or failure",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=400),
     *             @OA\Property(property="message", type="string", example="Your input is invalid"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'foundation_id' => ['required', 'integer'],
            'variant' => ['required', 'string'],
            'description' => ['required', 'string'],
            'portion' => ['required', 'integer'],
            'take' => ['required', 'date'],
            'time' => ['required', 'string'],
            'notes' => ['string', 'string'],
            'portion' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::send('Your input is invalid', $validator->messages(), 400);
        }
        try {
            $data = $validator->validated();
            $data["user_id"] = Auth::user()->id;
            $donation = Donation::create($data);
            $foundation = $donation->foundation();
            $donation->foundation_name = $foundation->name;
            BotHelper::send($foundation->phone, 'Halo ' . $foundation->name . "\n\nAnda akan mendapatkan donasi dari " . Auth::user()->name . " sebanyak " . $donation->portion . " porsi. Makanan akan dikirimkan pada " . $donation->take . " pukul " . $donation->time);
            return ResponseHelper::send('Success create donation', $donation, 201);
        } catch (\Throwable $th) {
            return ResponseHelper::send($th->getMessage(), null, 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/donation/{id}",
     *     summary="Get donation details by ID",
     *     tags={"Donations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the donation",
     *         @OA\Schema(type="integer", example=2)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success retrieve donation",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(property="message", type="string", example="Success retrieve donation"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=2),
     *                 @OA\Property(property="foundation_id", type="integer", example=2),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="variant", type="string", example="Makanan Kering"),
     *                 @OA\Property(property="description", type="string", example="Soto Sapi"),
     *                 @OA\Property(property="portion", type="integer", example=10),
     *                 @OA\Property(property="take", type="string", format="date", example="2025-06-01"),
     *                 @OA\Property(property="time", type="string", example="09.00 - 10.00"),
     *                 @OA\Property(property="notes", type="string", example="Catatan"),
     *                 @OA\Property(property="status", type="string", example="Diterima"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-06-01T16:19:08.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-06-01T16:43:56.000000Z"),
     *                 @OA\Property(property="foundation_name", type="string", example="Yayasan Al Kahfi"),
     *                 @OA\Property(property="hotel_name", type="string", example="@HOM Premiere Timoho Jogjakarta")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Donation not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=404),
     *             @OA\Property(property="message", type="string", example="Donation not found"),
     *             @OA\Property(property="data", type="object", example=null)
     *         )
     *     )
     * )
     */

    public function show(string $donation)
    {
        $donation = Donation::find($donation);
        $donation->foundation_name = $donation->foundation()->name;
        $donation->hotel_name = User::find($donation->user_id)->name;
        return ResponseHelper::send('Success retrieve donation', $donation, 200);
    }

    /**
     * @OA\Put(
     *     path="/donation/{id}",
     *     summary="Update donation status",
     *     tags={"Donations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the donation",
     *         @OA\Schema(type="integer", example=2)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(property="status", type="string", example="Dikirim", enum={"Diproses", "Dikirim", "Diterima"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success update donation",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(property="message", type="string", example="Success update donation"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=2),
     *                 @OA\Property(property="foundation_id", type="integer", example=2),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="variant", type="string", example="Makanan Kering"),
     *                 @OA\Property(property="description", type="string", example="Soto Sapi"),
     *                 @OA\Property(property="portion", type="integer", example=10),
     *                 @OA\Property(property="take", type="string", format="date", example="2025-06-01"),
     *                 @OA\Property(property="time", type="string", example="09.00 - 10.00"),
     *                 @OA\Property(property="notes", type="string", example="Catatan"),
     *                 @OA\Property(property="status", type="string", example="Dikirim"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-06-01T16:19:08.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-06-01T17:07:01.000000Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error or bad request",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=400),
     *             @OA\Property(property="message", type="string", example="Your input is invalid"),
     *             @OA\Property(property="data", type="object", example={"status": {"The selected status is invalid."}})
     *         )
     *     )
     * )
     */

    public function update(Request $request, Donation $donation)
    {
        $validator = Validator::make($request->all(), [
            'status' => ['required', 'string', 'in:Diproses,Dikirim,Diterima'],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::send('Your input is invalid', $validator->messages(), 400);
        }
        try {
            $donation->update(["status" => $request->status]);
            return ResponseHelper::send('Success update donation', $donation, 200);
        } catch (\Throwable $th) {
            return ResponseHelper::send($th->getMessage(), null, 400);
        }
    }
}
