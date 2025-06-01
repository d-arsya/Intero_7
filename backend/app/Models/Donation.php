<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Donation extends Model
{
    protected $guarded = [];
    public function hotel()
    {
        return $this->belongsTo(User::class);
    }
    public function foundation()
    {
        $foundations = Http::withHeader('API-KEY', env('API_KEY'))->get(env('BBJ_ENDPOINT') . 'foundations');
        $data = json_decode($foundations->body())->data;
        $fo = null;
        foreach ($data as $item) {
            if ($item->id == $this->foundation_id) {
                $fo = $item;
            }
        }
        return $fo;
    }
}
