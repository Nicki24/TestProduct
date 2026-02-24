// resources/js/Pages/Products/Index.jsx
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useToastStore } from '@/stores/useToastStore'; // ← Nouveau import

export default function ProductIndex({ products }) {
    const { flash } = usePage().props;
    const toastRef = useRef(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const { successMessage, setSuccessMessage, clearSuccessMessage } = useToastStore();

    // Gestion du toast flash (Inertia) + toast local persistant
    useEffect(() => {
        if (flash?.success && toastRef.current) {
            const timer = setTimeout(() => {
                if (toastRef.current) {
                    toastRef.current.style.transition = 'opacity 0.6s ease-out';
                    toastRef.current.style.opacity = '0';
                    setTimeout(() => {
                        if (toastRef.current) {
                            toastRef.current.remove();
                        }
                    }, 600);
                }
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    // Afficher le toast persistant après suppression
    useEffect(() => {
        if (successMessage && toastRef.current) {
            const timer = setTimeout(() => {
                clearSuccessMessage();
            }, 4000); // 4 secondes

            return () => clearTimeout(timer);
        }
    }, [successMessage, clearSuccessMessage]);

    // Ouvrir la modale
    const openDeleteModal = (id, name) => {
        setProductToDelete({ id, name });
        setShowDeleteModal(true);
    };

    // Confirmer la suppression
    const confirmDelete = () => {
        if (!productToDelete) return;

        axios.delete(`/api/products/${productToDelete.id}`)
            .then(() => {
                // Toast persistant + actualisation SPA de la liste
                setSuccessMessage(`Produit "${productToDelete.name}" supprimé avec succès !`);
                router.reload({
                    only: ['products'],
                    preserveState: true,
                    preserveScroll: true,
                });
            })
            .catch(() => {
                toast.error('Erreur lors de la suppression.');
            })
            .finally(() => {
                setShowDeleteModal(false);
                setProductToDelete(null);
            });
    };

    // Annuler
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Liste des Produits
                </h2>
            }
        >
            <Head title="Liste des Produits" />

            {/* Toast de notification (flash + persistant) */}
            {(flash?.success || successMessage) && (
                <div className="fixed top-5 right-5 z-50 max-w-md w-full pointer-events-none">
                    <div
                        ref={toastRef}
                        className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-xl animate-fade-in pointer-events-auto"
                        role="alert"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-base font-medium text-green-800">
                                    {flash?.success || successMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
                                    <p className="text-gray-600">Total : {products.length} produit(s)</p>
                                </div>
                                <Link
                                    href="/products/create"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition flex items-center gap-1"
                                >
                                    <span>+</span> Nouveau produit
                                </Link>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg mb-4">
                                        Aucun produit disponible.
                                    </p>
                                    <Link
                                        href="/products/create"
                                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Créer votre premier produit
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nom
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Prix
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Stock
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        #{product.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                        {product.description && (
                                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                {product.description}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-semibold">
                                                            {parseFloat(product.price).toLocaleString()} Ar
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                product.stock > 10
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : product.stock > 0
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                        >
                                                            {product.stock} unité(s)
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-4">
                                                            <Link
                                                                href={route('products.show', product.id)}
                                                                className="text-blue-600 hover:text-blue-800"
                                                            >
                                                                Voir
                                                            </Link>
                                                            <Link
                                                                href={route('products.edit', product.id)}
                                                                className="text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                Modifier
                                                            </Link>
                                                            <button
                                                                onClick={() => openDeleteModal(product.id, product.name)}
                                                                className="text-red-600 hover:text-red-800 font-medium"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale de confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-red-100 rounded-full p-4 mr-5">
                                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Confirmer la suppression</h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Voulez-vous vraiment supprimer le produit  
                            <span className="font-bold text-red-600"> "{productToDelete?.name}"</span> ?
                        </p>

                        <p className="text-sm text-gray-500 mb-8">
                            Cette action est irréversible.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Non, annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Oui, supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}