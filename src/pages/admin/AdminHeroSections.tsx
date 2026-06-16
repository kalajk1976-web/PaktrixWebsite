import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import { Upload, Save, Trash2, Plus } from 'lucide-react';

interface HeroSection {
  id: string;
  page: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
  is_active: boolean;
}

export default function AdminHeroSections() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSection>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroSections();
  }, []);

  const loadHeroSections = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('hero_sections')
      .select('*')
      .order('page');

    if (data) {
      setHeroSections(data);
    }
    setLoading(false);
  };

  const handleEdit = (hero: HeroSection) => {
    setEditingId(hero.id);
    setFormData(hero);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-image`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'hero-images');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'X-Admin-Token': adminToken || '',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return data.publicUrl;
      } else {
        console.error('Upload error:', data.error);
        alert('Failed to upload image: ' + (data.error || 'Unknown error'));
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    }
  };

  const handleSave = async () => {
    if (!editingId) return;

    let backgroundImage = formData.background_image || '';

    if (imageFile) {
      setUploading(true);
      const uploadedUrl = await uploadImage(imageFile);
      setUploading(false);

      if (uploadedUrl) {
        backgroundImage = uploadedUrl;
      }
    }

    try {
      const adminToken = localStorage.getItem('admin_token');
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-hero-section`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingId,
          ...formData,
          background_image: backgroundImage,
          adminToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEditingId(null);
        setFormData({});
        setImageFile(null);
        loadHeroSections();
      } else {
        console.error('Failed to update hero section:', data.error);
        alert('Failed to update hero section: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating hero section:', error);
      alert('Error updating hero section. Please try again.');
    }
  };

  const handleCreate = async () => {
    let backgroundImage = formData.background_image || '';

    if (imageFile) {
      setUploading(true);
      const uploadedUrl = await uploadImage(imageFile);
      setUploading(false);

      if (uploadedUrl) {
        backgroundImage = uploadedUrl;
      }
    }

    try {
      const adminToken = localStorage.getItem('admin_token');
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-hero-sections`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          adminToken,
          data: {
            ...formData,
            background_image: backgroundImage,
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEditingId(null);
        setFormData({});
        setImageFile(null);
        loadHeroSections();
      } else {
        console.error('Failed to create hero section:', data.error);
        alert('Failed to create hero section: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating hero section:', error);
      alert('Error creating hero section. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hero section?')) {
      try {
        const adminToken = localStorage.getItem('admin_token');
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-hero-sections`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            adminToken,
            id,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          loadHeroSections();
        } else {
          console.error('Failed to delete hero section:', data.error);
          alert('Failed to delete hero section: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting hero section:', error);
        alert('Error deleting hero section. Please try again.');
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-hero-sections`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'toggle',
          adminToken,
          id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        loadHeroSections();
      } else {
        console.error('Failed to toggle hero section:', data.error);
        alert('Failed to toggle hero section: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error toggling hero section:', error);
      alert('Error toggling hero section. Please try again.');
    }
  };

  const startNewHero = () => {
    setEditingId('new');
    setFormData({
      page: '',
      title: '',
      subtitle: '',
      cta_text: '',
      cta_link: '',
      background_image: '',
      is_active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Hero Sections</h1>
          <button
            onClick={startNewHero}
            className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Hero
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-6">
            {editingId === 'new' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Name
                    </label>
                    <input
                      type="text"
                      value={formData.page || ''}
                      onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                      placeholder="home, about, services, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <textarea
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.cta_text || ''}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={formData.cta_link || ''}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image
                    </label>
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
                        value={formData.background_image || ''}
                        onChange={(e) => setFormData({ ...formData, background_image: e.target.value })}
                        placeholder="Enter image URL"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                      />
                    </div>
                    {imageFile && (
                      <p className="mt-2 text-sm text-gray-600">Selected: {imageFile.name}</p>
                    )}
                    {uploading && (
                      <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({});
                      setImageFile(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={uploading}
                    className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal disabled:opacity-50"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Create
                  </button>
                </div>
              </div>
            )}

            {heroSections.map((hero) => (
              <div key={hero.id} className="bg-white rounded-lg shadow-md p-6">
                {editingId === hero.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Name
                        </label>
                        <input
                          type="text"
                          value={formData.page || ''}
                          onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtitle
                        </label>
                        <textarea
                          value={formData.subtitle || ''}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                          rows={2}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={formData.cta_text || ''}
                          onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Link
                        </label>
                        <input
                          type="text"
                          value={formData.cta_link || ''}
                          onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Image
                        </label>
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
                            value={formData.background_image || ''}
                            onChange={(e) => setFormData({ ...formData, background_image: e.target.value })}
                            placeholder="Enter image URL"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b5e20]"
                          />
                        </div>
                        {imageFile && (
                          <p className="mt-2 text-sm text-gray-600">Selected: {imageFile.name}</p>
                        )}
                        {uploading && (
                          <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({});
                          setImageFile(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={uploading}
                        className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-teal disabled:opacity-50"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {hero.page.charAt(0).toUpperCase() + hero.page.slice(1)} Page
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                          hero.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {hero.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleActive(hero.id, hero.is_active)}
                          className={`px-4 py-2 rounded-lg ${
                            hero.is_active
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {hero.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(hero)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hero.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Title:</span> {hero.title}
                      </div>
                      <div>
                        <span className="font-semibold">Subtitle:</span> {hero.subtitle}
                      </div>
                      <div>
                        <span className="font-semibold">CTA:</span> {hero.cta_text} → {hero.cta_link}
                      </div>
                      {hero.background_image && (
                        <div>
                          <span className="font-semibold">Background Image:</span>
                          <img
                            src={hero.background_image}
                            alt="Hero background"
                            className="mt-2 w-64 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
