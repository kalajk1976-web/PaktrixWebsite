import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    short_description: product?.short_description || '',
    description: product?.description || '',
    image: product?.image || '',
    category_id: product?.category_id || '',
    published: product?.published ?? true,
    features: product?.features || [],
    specifications: product?.specifications || [],
    applications: product?.applications || [],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [specLabel, setSpecLabel] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [applicationInput, setApplicationInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('product_categories')
      .select('id, name')
      .order('name');

    if (data) {
      setCategories(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: '' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'product-images');

      const adminToken = localStorage.getItem('admin_token');
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-image`;

      console.log('Uploading image to:', apiUrl);
      console.log('File name:', file.name);
      console.log('File size:', file.size);
      console.log('Admin token exists:', !!adminToken);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'X-Admin-Token': adminToken || '',
        },
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok || !data.success) {
        console.error('Upload failed:', data.error || 'Unknown error');
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
        return null;
      }

      console.log('Upload successful! Public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error}`);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Form submit started');
    console.log('Initial formData.image:', formData.image);
    console.log('ImageFile exists:', !!imageFile);

    let imageUrl = formData.image;

    if (imageFile) {
      console.log('Uploading file...');
      setUploading(true);
      const uploadedUrl = await uploadImage(imageFile);
      setUploading(false);

      console.log('Upload result:', uploadedUrl);

      if (uploadedUrl) {
        imageUrl = uploadedUrl;
        console.log('Image URL set to:', imageUrl);
      } else {
        alert('Failed to upload image. Please try again.');
        setIsLoading(false);
        return;
      }
    }

    if (!imageUrl) {
      alert('Please provide a product image (upload file or enter URL)');
      setIsLoading(false);
      return;
    }

    const dataToSave = {
      ...formData,
      image: imageUrl,
      updated_at: new Date().toISOString(),
    };

    console.log('Saving product with data:', dataToSave);

    if (product) {
      const { error, data } = await supabase
        .from('products')
        .update(dataToSave)
        .eq('id', product.id)
        .select();

      console.log('Update result - error:', error, 'data:', data);

      if (error) {
        alert('Failed to update product: ' + error.message);
      } else {
        console.log('Product updated successfully!');
        onClose();
      }
    } else {
      const { error, data } = await supabase
        .from('products')
        .insert([dataToSave])
        .select();

      console.log('Insert result - error:', error, 'data:', data);

      if (error) {
        alert('Failed to create product: ' + error.message);
      } else {
        console.log('Product created successfully!');
        onClose();
      }
    }

    setIsLoading(false);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_: any, i: number) => i !== index),
    });
  };

  const addSpecification = () => {
    if (specLabel.trim() && specValue.trim()) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, { label: specLabel.trim(), value: specValue.trim() }],
      });
      setSpecLabel('');
      setSpecValue('');
    }
  };

  const removeSpecification = (index: number) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_: any, i: number) => i !== index),
    });
  };

  const addApplication = () => {
    if (applicationInput.trim()) {
      setFormData({
        ...formData,
        applications: [...formData.applications, applicationInput.trim()],
      });
      setApplicationInput('');
    }
  };

  const removeApplication = (index: number) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            {imagePreview && (
              <div className="mb-4 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="h-5 w-5 mr-2 text-gray-600" />
                <span className="text-sm text-gray-700">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">or</span>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => {
                  setImageFile(null);
                  setFormData({ ...formData, image: e.target.value });
                  setImagePreview(e.target.value);
                }}
                placeholder="Enter image URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
              />
            </div>
            {uploading && (
              <p className="mt-2 text-sm text-blue-600">Uploading image...</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                placeholder="Add a feature"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specifications
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={specLabel}
                onChange={(e) => setSpecLabel(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                placeholder="Label"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.specifications.map((spec: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                  <span className="text-sm"><strong>{spec.label}:</strong> {spec.value}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applications
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={applicationInput}
                onChange={(e) => setApplicationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addApplication())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                placeholder="Add an application"
              />
              <button
                type="button"
                onClick={addApplication}
                className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.applications.map((app: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                  <span className="text-sm">{app}</span>
                  <button
                    type="button"
                    onClick={() => removeApplication(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 text-sm text-gray-700">
              Published
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
