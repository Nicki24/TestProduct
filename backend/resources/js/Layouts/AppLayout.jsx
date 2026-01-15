// backend/resources/js/Layouts/AppLayout.jsx
import { Link } from '@inertiajs/react';

export default function AppLayout({ children, header = null }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation commune */}
            <nav className="bg-white shadow-lg">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                🛒 Gestion Produits
                            </Link>
                            <div className="hidden ml-10 space-x-8 sm:flex">
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                >
                                    Accueil
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                >
                                    Produits
                                </Link>
                                <Link
                                    href="/products/create"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                >
                                    + Nouveau produit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header optionnel */}
            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Contenu principal */}
            <main className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow-inner mt-12">
                <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2024 Gestion Produits - Laravel + Inertia + React
                    </p>
                </div>
            </footer>
        </div>
    );
}