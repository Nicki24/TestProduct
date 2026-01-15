// backend/resources/js/Pages/Products/Show.jsx
import { Head, Link } from '@inertiajs/react';

export default function ProductShow({ product }) {
  return (
    <>
      <Head title={`Détails: ${product.name}`} />

      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">Gestion Produits</a>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/products" className="text-gray-700 hover:text-gray-900">← Liste produits</Link>
                <Link href={`/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                  Modifier
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-12">
          <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-2 text-gray-500">ID: #{product.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-indigo-600">
                      {parseFloat(product.price).toLocaleString()} Ar
                    </div>
                    <div className={`mt-2 px-3 py-1 inline-flex text-sm font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} unités en stock
                    </div>
                  </div>
                </div>

                {product.description && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                  </div>
                )}

                <div className="border-t pt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date de création</p>
                      <p className="font-medium">
                        {new Date(product.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dernière modification</p>
                      <p className="font-medium">
                        {new Date(product.updated_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-8 border-t">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                  >
                    Modifier ce produit
                  </Link>
                  <Link
                    href="/products"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition"
                  >
                    Retour à la liste
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Supprimer définitivement ce produit ?')) {
                        // À implémenter
                      }
                    }}
                    className="ml-auto bg-red-100 text-red-700 px-6 py-3 rounded-md hover:bg-red-200 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}