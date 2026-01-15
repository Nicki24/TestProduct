// backend/resources/js/Pages/Dashboard.jsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Carte Statistiques */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Produits total
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        -- Chargement --
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carte Actions rapides */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Actions rapides
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="/products/create"
                                className="block w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                + Ajouter un produit
                            </a>
                            <a
                                href="/products"
                                className="block w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Voir tous les produits
                            </a>
                        </div>
                    </div>
                </div>

                {/* Carte Informations */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            À propos
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Cette application permet de gérer votre inventaire de produits.
                            Utilisez le menu pour naviguer entre les différentes sections.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section supplémentaire */}
            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Bienvenue sur le Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                    L'authentification n'est pas requise pour accéder à cette application.
                    Vous pouvez naviguer librement et gérer vos produits.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <a
                        href="/"
                        className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
                    >
                        <h4 className="font-semibold text-blue-800">Page d'accueil</h4>
                        <p className="text-sm text-blue-600 mt-1">Retour à la page principale</p>
                    </a>
                    <a
                        href="/products"
                        className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition"
                    >
                        <h4 className="font-semibold text-green-800">Gestion des produits</h4>
                        <p className="text-sm text-green-600 mt-1">Voir et gérer les produits</p>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}