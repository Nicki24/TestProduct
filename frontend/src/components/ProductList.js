import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');

  const fetchProducts = async (query='') => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/products`, {
        params: query ? { q: query } : {}
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur en récupérant les produits');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(q);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <h2>Produits</h2>
      <form onSubmit={handleSearch}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un produit..." />
        <button>Rechercher</button>
        <button type="button" onClick={() => { setQ(''); fetchProducts(); }}>Réinitialiser</button>
      </form>

      <table>
        <thead><tr><th>Nom</th><th>Prix</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{Number(p.price).toFixed(2)} €</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => onEdit(p)}>Modifier</button>
                <button onClick={() => handleDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
