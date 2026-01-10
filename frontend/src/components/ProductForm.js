import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductForm({ product, onSaved, onCancel }) {
  const [form, setForm] = useState({ name:'', price:'', description:'', stock:0 });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product && product.id) {
        const res = await axios.put(`http://127.0.0.1:8000/api/products/${product.id}`, form);
        onSaved(res.data);
      } else {
        const res = await axios.post('http://127.0.0.1:8000/api/products', form);
        onSaved(res.data);
      }
      setForm({name:'', price:'', description:'', stock:0});
    } catch (err) {
      console.error(err);
      alert('Erreur en sauvegarde');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{product ? 'Modifier' : 'Ajouter'} produit</h3>
      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Nom" required />
      <input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Prix" required />
      <input value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value || 0)})} placeholder="Stock" />
      <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" />
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
}
