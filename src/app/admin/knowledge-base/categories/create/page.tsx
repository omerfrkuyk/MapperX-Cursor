'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categoryService } from '@/services/firebase/knowledge-base';
import { KnowledgeBaseCategory } from '@/types/KnowledgeBase';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<KnowledgeBaseCategory[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    description: string;
    parentId: string;
    lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
    order: number;
  }>({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    lang: 'tr',
    order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, [formData.lang]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories(formData.lang);
      setCategories(data.filter(category => !category.parentId));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Slug oluştur
      const slug = formData.slug || formData.name
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      // Sıralama değerini belirle
      const order = formData.order || (categories.length > 0 
        ? Math.max(...categories.map(c => c.order)) + 1 
        : 0);

      await categoryService.createCategory({
        ...formData,
        slug,
        order,
        parentId: formData.parentId || null
      });

      router.push('/admin/knowledge-base/categories');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Kategori oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryOptions = (parentId: string | null = null, level: number = 0) => {
    const filteredCategories = categories.filter(category => category.parentId === parentId);

    return filteredCategories.map(category => (
      <optgroup key={category.id} label={'—'.repeat(level) + ' ' + category.name}>
        <option value={category.id}>
          {'—'.repeat(level) + ' ' + category.name}
        </option>
        {renderCategoryOptions(category.id, level + 1)}
      </optgroup>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            href="/admin/knowledge-base/categories"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Kategori Oluştur</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dil
              </label>
              <select
                value={formData.lang}
                onChange={(e) => setFormData(prev => ({ ...prev, lang: e.target.value as 'tr' | 'en' | 'de' | 'fr' | 'it' }))}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kategori Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Otomatik oluşturulacak"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Üst Kategori
              </label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Ana Kategori</option>
                {renderCategoryOptions()}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sıralama
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <Link
              href="/admin/knowledge-base/categories"
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 