<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductWebController extends Controller
{
    /**
     * Affiche la liste de tous les produits
     */
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Affiche le formulaire de création
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Enregistre un nouveau produit et retourne la liste mise à jour
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
        ]);

        Product::create($validated);

        $request->session()->flash('success', 'Produit ajouté avec succès !');

        return Inertia::render('Products/Index', [
            'products' => Product::all(),
        ]);
    }

    /**
     * Affiche les détails d'un produit
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Affiche le formulaire de modification
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Met à jour un produit et retourne la liste mise à jour
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
        ]);

        $product->update($validated);

        $request->session()->flash('success', 'Produit mis à jour avec succès !');

        return Inertia::render('Products/Index', [
            'products' => Product::all(),
        ]);
    }

    /**
     * Supprime un produit et retourne la liste mise à jour
     */
    public function destroy(Request $request, Product $product)
    {
        $product->delete();

        $request->session()->flash('success', 'Produit supprimé avec succès !');

        return Inertia::render('Products/Index', [
            'products' => Product::all(),
        ]);
    }
}