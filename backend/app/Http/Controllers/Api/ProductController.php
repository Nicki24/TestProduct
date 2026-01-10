<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products?q=...
    public function index(Request $req)
    {
        $q = $req->query('q');
        $query = Product::query();

        if ($q) {
            $query->where('name', 'like', "%{$q}%");
        }

        return $query->orderBy('name')->get();
    }

    // POST /api/products
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'stock'       => 'nullable|integer',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->only([
            'name',
            'price',
            'description',
            'stock',
        ]));

        return response()->json($product);
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }
}
