// resources/js/Pages/Products/Edit.jsx
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function ProductEdit({ product }) {
    const [data, setData] = useState({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null); // ← Pour le message fixe après succès

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSuccessMessage(null); // Reset message

        axios.put(`/api/products/${product.id}`, data)
            .then(() => {
                // Succès : affiche le message fixe
                setSuccessMessage('Produit modifié avec succès !');
            })
            .catch((err) => {
                if (err.response?.status === 422) {
                    // Erreurs de validation Laravel
                    setErrors(err.response.data.errors);
                    toast.error('Veuillez corriger les erreurs dans le formulaire.');
                } else {
                    toast.error('Une erreur est survenue lors de la mise à jour.');
                }
            })
            .finally(() => setProcessing(false));
    };

    const handleReturnToList = () => {
        window.location.href = '/products'; // Retour propre sans Inertia → pas de JSON
    };

    return (
        <>
            <Head title={`Modifier : ${product.name}`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-indigo-600 px-6 py-4">
                            <h1 className="text-2xl font-bold text-white">
                                Modifier le produit : <span className="text-indigo-200">{product.name}</span>
                            </h1>
                        </div>

                        {/* Message de succès fixe */}
                        {successMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 mx-8 mt-6 rounded" role="alert">
                                <p className="font-bold">Succès</p>
                                <p>{successMessage}</p>
                                <button
                                    onClick={handleReturnToList}
                                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Retour à la liste
                                </button>
                            </div>
                        )}

                        <form onSubmit={submit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom du produit *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prix (Ar) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData({ ...data, price: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock *</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) => setData({ ...data, stock: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock[0]}</p>}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = '/products';
                                    }}
                                    className="text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    Annuler
                                </button>

                                {/* Bouton supprimer retiré */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}