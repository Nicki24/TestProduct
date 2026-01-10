import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    // Recharger les produits si nécessaire
  };

  return (
    <Router>
      <div className="App min-h-screen bg-background">
        {/* Navigation Sidebar */}
        <nav className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-4 shadow-lg">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">ProductApp</h1>
          </div>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className="block px-4 py-2 rounded hover:bg-slate-800 transition"
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="block px-4 py-2 rounded hover:bg-slate-800 transition"
              >
                📦 Produits
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenu principal */}
        <div className="ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>

          {/* Formulaire Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <ProductForm 
                product={editingProduct}
                onSaved={handleSave} 
                onCancel={() => setShowForm(false)} 
              />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
