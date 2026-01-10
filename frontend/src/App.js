// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

function StatCard({ title, value, description }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {title}
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    estimatedRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        const products = res.data;

        const totalProducts = products.length;
        const totalStock = products.reduce(
          (sum, p) => sum + (p.stock || 0),
          0
        );
        const lowStock = products.filter(
          (p) => p.stock <= 5 && p.stock > 0
        ).length;
        const estimatedRevenue = products.reduce(
          (sum, p) => sum + (Number(p.price) || 0) * (p.stock || 0),
          0
        );

        setStats({
          totalProducts,
          totalStock,
          lowStock,
          estimatedRevenue,
        });
      } catch (e) {
        console.error('Erreur dashboard :', e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-slate-600 dark:text-slate-300">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tableau de bord
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Vue d’ensemble de vos produits
          </p>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total produits"
          value={stats.totalProducts}
          description="+X cette semaine (statistique fictive)"
        />
        <StatCard
          title="Stock total"
          value={stats.totalStock}
          description="Unités en stock"
        />
        <StatCard
          title="Stock faible"
          value={stats.lowStock}
          description="Produits à réapprovisionner"
        />
        <StatCard
          title="Valeur du stock"
          value={stats.estimatedRevenue.toLocaleString('fr-FR') + ' Ar'}
          description="Estimation basée sur prix × stock"
        />
      </div>

      {/* Ici tu pourras plus tard remettre des vrais graphes avec recharts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Zone graphiques (barres / donut) à intégrer plus tard.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
