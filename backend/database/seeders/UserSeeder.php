<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = public_path('hotel.csv');
        $pass = Hash::make('password');
        $now = 1;
        $date = now();
        $rows = [];
        if (($handle = fopen($path, 'r')) !== false) {
            fgetcsv($handle, 1000, ',');
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                $data[2] = str_replace(".", "", $data[2]);
                $data[3] = str_replace(".", "", $data[3]);
                $data["latitude"] = (str_starts_with($data[2], '-') ? '-' : '') . substr(ltrim($data[2], '-'), 0, 1) . '.' . substr(ltrim($data[2], '-'), 1);
                $data["longitude"] = (str_starts_with($data[3], '-') ? '-' : '') . substr(ltrim($data[3], '-'), 0, 3) . '.' . substr(ltrim($data[3], '-'), 3);;
                $data["name"] = $data[4];
                $data["address"] = $data[0];
                $data["photo"] = $data[1];
                $data["password"] = $pass;
                $data["email"] = "hotel$now@email.com";
                $data["created_at"] = $date;
                $data["updated_at"] = $date;
                unset($data[0]);
                unset($data[1]);
                unset($data[2]);
                unset($data[3]);
                unset($data[4]);
                $rows[] = $data;
                $now++;
            }
            fclose($handle);
        }
        User::insert($rows);
    }
}
