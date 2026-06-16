import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Package, FolderOpen, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    publishedProducts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: products } = await supabase
      .from('products')
      .select('id, published');

    const { data: categories } = await supabase
      .from('product_categories')
      .select('id');

    setStats({
      totalProducts: products?.length || 0,
      totalCategories: categories?.length || 0,
      publishedProducts: products?.filter(p => p.published).length || 0,
    });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <FolderOpen className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold text-gray-900">{stats.publishedProducts}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/products"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green transition-colors"
            >
              <Package className="h-6 w-6 text-brand-green mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Products</h3>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or remove products</p>
            </a>

            <a
              href="/admin/categories"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green transition-colors"
            >
              <FolderOpen className="h-6 w-6 text-brand-green mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Categories</h3>
              <p className="text-sm text-gray-600 mt-1">Organize product categories</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
