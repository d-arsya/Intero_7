<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{


    /**
     * @OA\Post(
     *     path="/register",
     *     summary="Register a new user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password"},
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 minLength=5,
     *                 maxLength=64,
     *                 example="John Doe"
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="johndoe@example.com"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 format="password",
     *                 example="password123"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=201),
     *             @OA\Property(property="message", type="string", example="Success create user"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="email", type="string", example="johndoe@example.com"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error or Other Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=400),
     *             @OA\Property(property="message", type="string", example="Your input is invalid"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 example={"email": {"The email field is required."}, "name": {"The name must be at least 5 characters."}}
     *             )
     *         )
     *     )
     * )
     */


    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'min:5', 'max:64'],
            'email' => ['required', 'email'],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::send('Your input is invalid', $validator->messages(), 400);
        }
        try {
            $data = $request->all();
            $data["password"] = Hash::make($data["password"]);
            $user = User::create($data);
            return ResponseHelper::send('Success create user', $user, 201);
        } catch (\Throwable $th) {
            return ResponseHelper::send($th->getMessage(), null, 400);
        }
    }
    /**
     * @OA\Post(
     *     path="/login",
     *     summary="Login user and get authentication token",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="johndoe@example.com"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 format="password",
     *                 example="password123"
     *             ),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(property="message", type="string", example="Login success"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="token", type="string", example="1|abc123def456ghi789")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=400),
     *             @OA\Property(property="message", type="string", example="Your input is invalid"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 example={"email": {"The email field is required."}, "password": {"The password field is required."}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Login failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="code", type="integer", example=404),
     *             @OA\Property(property="message", type="string", example="Login failed"),
     *             @OA\Property(property="data", type="object", nullable=true)
     *         )
     *     )
     * )
     */

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::send('Your input is invalid', $validator->messages(), 400);
        }

        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $data = [
                "token" => $user->createToken($request['email'])->plainTextToken
            ];
            return ResponseHelper::send('Login success', $data, 200);
        } else {
            return ResponseHelper::send('Login failed', null, 404);
        }
    }
}
