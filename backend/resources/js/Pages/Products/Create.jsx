import { Head, useForm } from '@inertiajs/react';

export default function ProductCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/products', {
      onSuccess: () => {
        // Optionnel : on pourra ajouter une notification plus tard
      },
    });
  };

  return (
    <>
      <Head title="Ajouter un Produit" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-bold mb-6">Ajouter un nouveau produit</h1>

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
                    {processing ? 'Enregistrement...' : 'Enregistrer le produit'}
                  </button>

                  <a
                    href="/products"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Annuler
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}