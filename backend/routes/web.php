<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductWebController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page d'accueil publique
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => false,
        'canRegister' => false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard public (sans auth)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Routes profile publiques
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

// ============================================
// ROUTES PRODUITS - CORRECT ORDER IS CRITICAL!
// ============================================

// 1. LISTE des produits - TOUJOURS EN PREMIER
Route::get('/products', [ProductWebController::class, 'index'])
    ->name('products.index');

// 2. FORMULAIRE création - AVANT la route dynamique {product}
Route::get('/products/create', [ProductWebController::class, 'create'])
    ->name('products.create');

// 3. FORMULAIRE modification
Route::get('/products/{product}/edit', [ProductWebController::class, 'edit'])
    ->name('products.edit');

// 4. DÉTAILS produit - APRÈS les routes spécifiques
Route::get('/products/{product}', [ProductWebController::class, 'show'])
    ->name('products.show');

// 5. ENREGISTRER produit
Route::post('/products', [ProductWebController::class, 'store'])
    ->name('products.store');

// 6. METTRE À JOUR produit
Route::put('/products/{product}', [ProductWebController::class, 'update'])
    ->name('products.update');

// 7. SUPPRIMER produit
Route::delete('/products/{product}', [ProductWebController::class, 'destroy'])
    ->name('products.destroy');