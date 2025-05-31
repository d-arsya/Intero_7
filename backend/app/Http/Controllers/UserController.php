<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = Auth::user();
        return ResponseHelper::send('Success retrieve user profile', $user, 200);
    }
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['string'],
            'address' => ['string'],
            'latitude' => ['string'],
            'longitude' => ['string'],
            'email' => ['string'],
            'photo' => ['image', 'mimes:jpeg,png,jpg,svg,webp', 'max:2048']
        ]);

        if ($validator->fails()) {
            return ResponseHelper::send('Your input is invalid', $validator->messages(), 400);
        }
        $user = User::find(Auth::user()->id);
        $data = $validator->validated();
        if ($request->hasFile('photo')) {
            if (str_starts_with($user->photo, 'https://intero-be.disyfa.cloud/storage/')) {
                Storage::disk('public')->delete(str_replace('https://intero-be.disyfa.cloud/storage/', "", $user->photo));
            }
            $data['photo'] = Storage::disk('public')->put('user', $request->file('photo'));
            $data['photo'] = 'https://intero-be.disyfa.cloud/storage/' . $data['photo'];
        }
        $user->update($data);
        return ResponseHelper::send('Success update user profile', $user, 200);
    }
}
