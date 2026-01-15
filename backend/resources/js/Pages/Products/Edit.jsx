// backend/resources/js/Pages/Products/Edit.jsx
import { Head, useForm, Link } from '@inertiajs/react';

export default function ProductEdit({ product }) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    stock: product.stock || '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/products/${product.id}`);
  };

  return (
    <>
      <Head title={`Modifier: ${product.name}`} />

      <div className="min-h-screen bg-gray-100">
        {/* Navigation identique à Index */}
        <nav className="bg-white shadow">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">Gestion Produits</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/products" className="text-gray-700 hover:text-gray-900">← Retour liste</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">
                <h1 className="text-2xl font-bold mb-6">
                  Modifier: <span className="text-indigo-600">{product.name}</span>
                </h1>

                <form onSubmit={submit} className="space-y-6 max-w-xl">
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom du produit *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  {/* Prix */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Prix (Ar) *
                    </label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.price}
                      onChange={(e) => setData('price', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                  {/* Stock */}
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Quantité en stock *
                    </label>
                    <input
                      id="stock"
                      type="number"
                      min="0"
                      value={data.stock}
                      onChange={(e) => setData('stock', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                  </div>

                  {/* Boutons */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={processing}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {processing ? 'Mise à jour...' : 'Mettre à jour'}
                    </button>

                    <Link
                      href="/products"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Annuler
                    </Link>
                    
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
                          // À implémenter : suppression
                          window.location.href = `/products/${product.id}`;
                        }
                      }}
                      className="ml-auto text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}