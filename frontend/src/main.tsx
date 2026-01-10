// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'          // ← ou './App.jsx' selon ton extension
import './index.css'               // ← doit exister pour Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)