'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, ChevronsUpDown, Eye } from 'lucide-react';
import { articleService, categoryService } from '@/services/firebase/knowledge-base';
import { KnowledgeBaseArticle, KnowledgeBaseCategory } from '@/types/KnowledgeBase';

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [categories, setCategories] = useState<KnowledgeBaseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState<string>('tr');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedLang]);

  const fetchData = async () => {
    try {
      const [articlesData, categoriesData] = await Promise.all([
        articleService.getArticles(selectedLang),
        categoryService.getCategories(selectedLang)
      ]);
      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await articleService.deleteArticle(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Makale silinirken bir hata oluştu');
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Kategori Bulunamadı';
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? article.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bilgi Bankası Makaleleri</h1>
        <Link
          href="/admin/knowledge-base/articles/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Makale
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        {/* Dil Seçimi */}
        <div className="relative inline-block">
          <div className="inline-flex items-center bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="appearance-none w-full bg-transparent pl-4 pr-10 py-2.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="tr" className="font-medium">Türkçe</option>
              <option value="en" className="font-medium">English</option>
              <option value="de" className="font-medium">Deutsch</option>
              <option value="fr" className="font-medium">Français</option>
              <option value="it" className="font-medium">Italiano</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronsUpDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Kategori Filtresi */}
        <div className="relative inline-block">
          <div className="inline-flex items-center bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full bg-transparent pl-4 pr-10 py-2.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronsUpDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Arama */}
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Makale ara..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Güncelleme
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Henüz makale bulunmuyor
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getCategoryName(article.categoryId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {article.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.isPublished ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(article.updatedAt).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/${selectedLang}/knowledge-base/${article.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-4"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </Link>
                      <Link
                        href={`/admin/knowledge-base/articles/edit/${article.id}`}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-4"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id!)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 