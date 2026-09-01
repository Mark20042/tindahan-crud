<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'SkyFlakes Crackers',
                'category' => 'Snacks',
                'price' => 75.00,
                'stock' => 100,
                'image' => 'https://cf.shopee.com.my/file/e2325769c35b9961f2feac70e7860427_tn',
                'status' => 'active',
            ],
            [
                'name' => 'Boy Bawang Cornick',
                'category' => 'Snacks',
                'price' => 20.00,
                'stock' => 150,
                'image' => 'https://asiamartjp.com/wp-content/uploads/2023/07/boy-bawang-cornick-garlic-flavor-asiamart.jpg',
                'status' => 'active',
            ],
            [
                'name' => 'Mang Tomas All-Around Sarsa',
                'category' => 'Condiments',
                'price' => 55.00,
                'stock' => 80,
                'image' => 'https://shopsuki.ph/cdn/shop/files/4801668100271_1024x.jpg?v=1733895399',
                'status' => 'active',
            ],
            [
                'name' => 'Datu Puti Soy Sauce',
                'category' => 'Condiments',
                'price' => 45.00,
                'stock' => 200,
                'image' => 'https://bf1af2.akinoncloudcdn.com/products/2024/09/11/93414/1a26270c-0ddc-4362-8158-f0f4492184c5_size3840_cropCenter.jpg',
                'status' => 'active',
            ],
            [
                'name' => 'Silver Swan Vinegar',
                'category' => 'Condiments',
                'price' => 40.00,
                'stock' => 200,
                'image' => 'https://cdn.store-assets.com/s/377840/i/17108748.jpeg',
                'status' => 'active',
            ],
            [
                'name' => 'San Miguel Pale Pilsen',
                'category' => 'Beverages',
                'price' => 65.00,
                'stock' => 300,
                'image' => 'https://tse2.mm.bing.net/th/id/OIP.IaE95H38SfIQBSTUm5o4PAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
                'status' => 'active',
            ],
            [
                'name' => 'Lucky Me! Pancit Canton (Kalamansi)',
                'category' => 'Food',
                'price' => 18.00,
                'stock' => 500,
                'image' => 'https://shopsuki.ph/cdn/shop/products/4807770270123_1_1024x.jpg?v=1676602107',
                'status' => 'active',
            ],
            [
                'name' => 'Piattos (Cheese Flavor)',
                'category' => 'Snacks',
                'price' => 35.00,
                'stock' => 120,
                'image' => 'https://d2j6dbq0eux0bg.cloudfront.net/images/17197054/2914575511.jpg',
                'status' => 'active',
            ],
            [
                'name' => 'Choc Nut',
                'category' => 'Sweets',
                'price' => 50.00,
                'stock' => 60,
                'image' => 'https://th.bing.com/th/id/R.e169fc7bf47ac58f314285e6faae774d?rik=jcu1w52NvdXDuQ&riu=http%3a%2f%2fchuchaysupermarket.com%2fcdn%2fshop%2fproducts%2fKINGCHOCNUT200GRAMS.jpg%3fv%3d1643625572&ehk=mf4x9144dQsAlJ%2buhySR6Hbsmqh%2b1bjUzwGsuI1MANo%3d&risl=&pid=ImgRaw&r=0',
                'status' => 'active',
            ],
            [
                'name' => 'Century Tuna Flakes in Oil',
                'category' => 'Food',
                'price' => 42.00,
                'stock' => 110,
                'image' => 'https://th.bing.com/th/id/OIP.ZfozuBGrAP2OOzTSQd372wHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
                'status' => 'active',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
