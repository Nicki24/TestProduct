// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, ShoppingCart, AlertTriangle } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    estimatedRevenue: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]); // [{ month: "Jan", value: 450000 }, ...]
  const [categoryDistribution, setCategoryDistribution] = useState([]); // [{ name: "Électronique", value: 45 }, ...]

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Option 1 : une seule route dashboard (recommandé côté Laravel)
        // const res = await axios.get('/api/dashboard');

        // Option 2 : plusieurs requêtes (solution rapide si pas encore de route dashboard)
        const [productsRes, statsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/products'),
          axios.get('http://127.0.0.1:8000/api/dashboard/stats'), // à créer
        ]);

        const products = productsRes.data;

        // Calculs côté frontend (solution temporaire)
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
        const lowStock = products.filter(p => p.stock <= 5 && p.stock > 0).length;
        const estimatedRevenue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

        setStats({
          totalProducts,
          totalStock,
          lowStock,
          estimatedRevenue: Math.round(estimatedRevenue / 1000) * 1000, // arrondi joli
        });

        // Exemple de données mensuelles (à remplacer par vraie API)
        setMonthlySales([
          { month: 'Jan', value: 1450000 },
          { month: 'Fév', value: 2300000 },
          { month: 'Mar', value: 1800000 },
          { month: 'Avr', value: 3200000 },
          { month: 'Mai', value: 4100000 },
          { month: 'Juin', value: 3800000 },
          { month: 'Juil', value: 2900000 },
        ]);

        // Distribution catégories (exemple - à adapter avec vraies données)
        setCategoryDistribution([
          { name: 'Électronique', value: 42 },
          { name: 'Vêtements', value: 28 },
          { name: 'Maison', value: 15 },
          { name: 'Beauté', value: 10 },
          { name: 'Autres', value: 5 },
        ]);

      } catch (error) {
        console.error('Erreur chargement dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Skeletons pendant le chargement
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-32 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 w-24 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Aperçu de votre gestion de produits • 10 janvier 2026</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {stats.totalProducts} produits
        </Badge>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produits"
          value={stats.totalProducts}
          icon={<Package className="h-6 w-6" />}
          description="+12 cette semaine"
          trend="up"
        />
        <StatCard
          title="Stock Total"
          value={stats.totalStock}
          icon={<ShoppingCart className="h-6 w-6" />}
          description="unités en stock"
        />
        <StatCard
          title="Stock Faible"
          value={stats.lowStock}
          icon={<AlertTriangle className="h-6 w-6 text-amber-500" />}
          description="produits à réapprovisionner"
          trend={stats.lowStock > 0 ? "warning" : "neutral"}
        />
        <StatCard
          title="Valeur Stock"
          value={`${(stats.estimatedRevenue / 1000000).toFixed(1)} M Ar`}
          icon={<DollarSign className="h-6 w-6" />}
          description="estimation stock actuel"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique Barres - Ventes/Entrées par mois */}
        <Card>
          <CardHeader>
            <CardTitle>Ventes estimées par mois (2025)</CardTitle>
            <CardDescription>Montant en Ariary</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `${value.toLocaleString()} Ar`}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graphique Donut - Répartition catégories */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Pourcentage du stock</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Petit composant réutilisable pour les stats
function StatCard({ title, value, icon, description, trend = "neutral" }) {
  const trendColors = {
    up: "text-emerald-600 dark:text-emerald-400",
    down: "text-rose-600 dark:text-rose-400",
    warning: "text-amber-600 dark:text-amber-400",
    neutral: "text-muted-foreground"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`opacity-80 ${trendColors[trend]}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default Dashboard;