import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App(){
  const [editing, setEditing] = useState(null);

  return (
    <div className="App">
      <ProductForm
        product={editing}
        onSaved={(p)=>{ setEditing(null); window.location.reload(); }}
        onCancel={()=>setEditing(null)}
      />
      <ProductList onEdit={(p)=>setEditing(p)} />
    </div>
  );
}

export default App;
