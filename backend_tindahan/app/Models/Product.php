<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category',
        'price',
        'stock',
        'image',
        'status',
    ];

    public static $rules = [
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'image' => 'required|string', // or 'image|mimes:jpeg,png,jpg|max:2048' depending on if it's an upload or URL
        'status' => 'required|in:active,inactive',
    ];

    public function scopeActive($query) {
        return $query->where('status', 'active');
    }
}
