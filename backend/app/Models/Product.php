<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // AJOUTE CETTE LIGNE :
    protected $fillable = [
        'name',
        'description', 
        'price',
        'stock',
    ];
}