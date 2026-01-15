import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ProductIndex({ products }) {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Liste des Produits" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-bold mb-6">Nos Produits</h1>

              {/* Zone bouton / message connexion */}
              {auth.user ? (
                <div className="mb-8">
                  <Link
                    href="/products/create"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    + Ajouter un produit
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500 mb-8">
                  Connectez-vous pour pouvoir ajouter ou modifier des produits.
                </p>
              )}

              {products.length === 0 ? (
                <p className="text-gray-500">
                  Aucun produit disponible pour le moment.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">
                        {product.name}
                      </h2>

                      {product.description && (
                        <p className="mt-2 text-gray-600">
                          {product.description}
                        </p>
                      )}

                      <p className="mt-4 text-lg font-bold text-indigo-600">
                        {product.price} Ar
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Stock : {product.stock}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
