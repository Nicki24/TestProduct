<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

// Routes publiques (pas besoin d'authentification pour le moment)
Route::apiResource('products', ProductController::class);

// Route pour récupérer l'utilisateur connecté (si tu utilises Sanctum plus tard)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Optionnel : route dashboard futur (à décommenter quand tu l'auras implémenté)
// Route::get('/dashboard/stats', [DashboardController::class, 'stats']);