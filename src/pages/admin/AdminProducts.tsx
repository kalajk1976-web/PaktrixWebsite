import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import ProductModal from '../../components/admin/ProductModal';

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  image: string;
  published: boolean;
  category_id: string;
  display_order: number;
  product_categories?: { name: string };
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name, display_order)')
      .order('product_categories(display_order)', { ascending: true })
      .order('display_order', { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      loadProducts();
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ published: !currentStatus })
      .eq('id', id);

    if (!error) {
      loadProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleMoveUp = async (product: Product, index: number) => {
    if (index === 0) return;

    const previousProduct = products[index - 1];
    if (previousProduct.category_id !== product.category_id) return;

    const { error } = await supabase
      .from('products')
      .update({ display_order: previousProduct.display_order })
      .eq('id', product.id);

    if (!error) {
      await supabase
        .from('products')
        .update({ display_order: product.display_order })
        .eq('id', previousProduct.id);

      loadProducts();
    }
  };

  const handleMoveDown = async (product: Product, index: number) => {
    if (index === products.length - 1) return;

    const nextProduct = products[index + 1];
    if (nextProduct.category_id !== product.category_id) return;

    const { error } = await supabase
      .from('products')
      .update({ display_order: nextProduct.display_order })
      .eq('id', product.id);

    if (!error) {
      await supabase
        .from('products')
        .update({ display_order: product.display_order })
        .eq('id', nextProduct.id);

      loadProducts();
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-brand-teal transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => {
                  const isFirstInCategory = index === 0 || products[index - 1].category_id !== product.category_id;
                  const isLastInCategory = index === products.length - 1 || products[index + 1].category_id !== product.category_id;

                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleMoveUp(product, index)}
                            disabled={isFirstInCategory}
                            className={`p-1 rounded ${
                              isFirstInCategory
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                            title="Move up"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(product, index)}
                            disabled={isLastInCategory}
                            className={`p-1 rounded ${
                              isLastInCategory
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                            title="Move down"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {product.product_categories?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {product.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleTogglePublish(product.id, product.published)}
                            className="text-gray-600 hover:text-gray-900"
                            title={product.published ? 'Unpublish' : 'Publish'}
                          >
                            {product.published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <ProductModal
            product={editingProduct}
            onClose={handleModalClose}
          />
        )}
      </div>
    </AdminLayout>
  );
}
