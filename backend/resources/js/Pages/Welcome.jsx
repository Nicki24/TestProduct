// backend/resources/js/Pages/Welcome.jsx
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome({ laravelVersion, phpVersion }) {
    return (
        <AppLayout>
            <Head title="Accueil" />
            
            <div className="py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Bienvenue sur l'application de gestion de produits
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                        Gestion complète de votre inventaire avec Laravel, Inertia.js et React.
                        Créez, modifiez et suivez vos produits en temps réel.
                    </p>
                    
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/products"
                            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Voir les produits
                        </Link>
                        <Link
                            href="/products/create"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Ajouter un produit <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900">📦 Gestion Stock</h3>
                        <p className="mt-2 text-gray-600">
                            Suivez vos stocks en temps réel avec alertes de réapprovisionnement.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900">⚡ Rapide & Moderne</h3>
                        <p className="mt-2 text-gray-600">
                            Interface React fluide avec Laravel en backend pour des performances optimales.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900">📊 Tableau de bord</h3>
                        <p className="mt-2 text-gray-600">
                            Visualisez vos statistiques et tendances de vente.
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-900">Technologies utilisées</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Laravel</p>
                            <p className="font-medium">Version {laravelVersion}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">PHP</p>
                            <p className="font-medium">Version {phpVersion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}