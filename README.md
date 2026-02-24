# Gestion de Produits - Laravel + Inertia + React

Une application web moderne de gestion de produits avec backend Laravel, frontend React via Inertia.js, et une interface utilisateur fluide et responsive.

## Fonctionnalités principales

- **CRUD complet** des produits (Créer, Lire, Mettre à jour, Supprimer)
- **Interface moderne** avec Tailwind CSS
- **Navigation SPA** (Single Page Application) grâce à Inertia.js
- **Validation côté serveur** et affichage des erreurs en temps réel
- **Notifications toast** (messages de succès/erreur qui disparaissent automatiquement)
- **Modale de confirmation** pour la suppression
- **Gestion manuelle des IDs** pour éviter les trous dans la numérotation après suppression (réutilisation intelligente des IDs libérés)
- **Design responsive** (mobile-first)
- **Toast de succès** après chaque action (ajout, modification, suppression)

## Aperçu

![Capture d'écran de la liste des produits](screenshot-index.png)  
![Capture d'écran du formulaire de modification](screenshot-edit.png)  
*(Ajoute tes propres captures d'écran ici)*

## Technologies utilisées

- **Backend** : Laravel 12
- **Frontend** : React + Inertia.js
- **Styling** : Tailwind CSS
- **Requêtes API** : Axios (pour certaines actions en React pur)
- **Gestion d'état** : Zustand (pour les messages toast persistants)
- **Base de données** : MySQL / MariaDB (via WAMP)

## Prérequis

- PHP 8.1+
- Composer
- Node.js 18+ & npm
- MySQL / MariaDB
- Serveur local (WAMP, XAMPP, Laravel Sail, Valet, etc.)

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Nicki24/TestProduct.git
   cd TestProduct
