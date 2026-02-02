// resources/js/Pages/Products/Edit.jsx
import { Head, useForm, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ProductEdit({ product }) {
    const { flash } = usePage().props;
    const toastRef = useRef(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    // Toast qui disparaît automatiquement (exactement comme dans l'ajout)
    useEffect(() => {
        if (flash?.success && toastRef.current) {
            const timer = setTimeout(() => {
                if (toastRef.current) {
                    toastRef.current.style.transition = 'opacity 0.6s ease-out';
                    toastRef.current.style.opacity = '0';
                    setTimeout(() => toastRef.current?.remove(), 600);
                }
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    const submit = (e) => {
        e.preventDefault();

        put(route('products.update', product.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Retour automatique à la liste (SPA-like, sans JSON ou rechargement complet)
                router.visit(route('products.index'), {
                    preserveScroll: true,
                    only: ['products', 'flash'], // Recharge seulement la liste et le flash
                });
            },
            onError: (errors) => {
                console.log('Erreurs validation :', errors);
            },
        });
    };

    const confirmDelete = () => {
        router.delete(route('products.destroy', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                // Retour automatique à la liste après suppression
                router.visit(route('products.index'), {
                    preserveScroll: true,
                    only: ['products', 'flash'],
                });
            },
        });
    };

    return (
        <>
            <Head title={`Modifier : ${product.name}`} />

            {/* Toast temporaire (exactement comme dans l'ajout) */}
            {flash?.success && (
                <div className="fixed top-5 right-5 z-50 max-w-md w-full pointer-events-none">
                    <div
                        ref={toastRef}
                        className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-xl animate-fade-in pointer-events-auto"
                        role="alert"
                    >
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-base font-medium text-green-800">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-indigo-600 px-6 py-4">
                            <h1 className="text-2xl font-bold text-white">
                                Modifier le produit : <span className="text-indigo-200">{product.name}</span>
                            </h1>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom du produit *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prix (Ar) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock *</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>

                                <Link
                                    href={route('products.index')}
                                    className="text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    Annuler
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="ml-auto bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Supprimer ce produit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modale de confirmation de suppression */}
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
                            Êtes-vous sûr de vouloir supprimer définitivement le produit "{product.name}" ?
                        </p>

                        <p className="text-sm text-gray-500 mb-8">
                            Cette action est irréversible.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Annuler
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
        </>
    );
}