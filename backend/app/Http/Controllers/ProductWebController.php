<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductWebController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Produit ajouté avec succès !');
    }
}
