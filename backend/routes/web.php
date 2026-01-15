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

// Routes profile publiques (optionnel - tu peux les commenter si inutiles)
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

// ============================================
// ROUTES PRODUITS - PARTIE GESTION COMPLÈTE
// ============================================

// 1. LISTE de tous les produits (page principale)
Route::get('/products', [ProductWebController::class, 'index'])
    ->name('products.index');

// 2. AFFICHER les détails d'un produit
Route::get('/products/{product}', [ProductWebController::class, 'show'])
    ->name('products.show');

// 3. FORMULAIRE de création
Route::get('/products/create', [ProductWebController::class, 'create'])
    ->name('products.create');

// 4. ENREGISTRER un nouveau produit
Route::post('/products', [ProductWebController::class, 'store'])
    ->name('products.store');

// 5. FORMULAIRE de modification
Route::get('/products/{product}/edit', [ProductWebController::class, 'edit'])
    ->name('products.edit');

// 6. METTRE À JOUR un produit existant
Route::put('/products/{product}', [ProductWebController::class, 'update'])
    ->name('products.update');

// 7. SUPPRIMER un produit
Route::delete('/products/{product}', [ProductWebController::class, 'destroy'])
    ->name('products.destroy');

// ============================================
// POUR VERIFIER QUE TOUTES LES ROUTES SONT BIEN DÉCLARÉES :
// ============================================

// Liste toutes les routes produits :
// php artisan route:list --name=products

// OPTIONNEL: Si tu ne veux pas du tout d'authentification,
// commente cette ligne :
// require __DIR__.'/auth.php';