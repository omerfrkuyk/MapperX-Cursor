'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, MoveUp, MoveDown, ChevronsUpDown } from 'lucide-react';
import { categoryService } from '@/services/firebase/knowledge-base';
import { KnowledgeBaseCategory } from '@/types/KnowledgeBase';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<KnowledgeBaseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState<string>('tr');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [selectedLang]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories(selectedLang);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Kategori silinirken bir hata oluştu');
    }
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleOrderChange = async (category: KnowledgeBaseCategory, direction: 'up' | 'down') => {
    const currentIndex = categories.findIndex(c => c.id === category.id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap orders
    const currentOrder = newCategories[currentIndex].order;
    newCategories[currentIndex].order = newCategories[swapIndex].order;
    newCategories[swapIndex].order = currentOrder;

    // Update in database
    try {
      await categoryService.updateCategory(category.id!, { order: newCategories[currentIndex].order });
      await categoryService.updateCategory(newCategories[swapIndex].id!, { order: currentOrder });
      
      // Refresh categories
      await fetchCategories();
    } catch (error) {
      console.error('Error updating category order:', error);
      alert('Kategori sırası güncellenirken bir hata oluştu');
    }
  };

  const renderCategories = (parentId: string | null = null, level: number = 0) => {
    const filteredCategories = categories.filter(category => category.parentId === parentId);

    return filteredCategories.map((category, index) => {
      const hasChildren = categories.some(c => c.parentId === category.id);
      const isExpanded = expandedCategories.includes(category.id!);

      return (
        <div key={category.id} className="w-full">
          <div className={`flex items-center gap-2 py-2 px-4 hover:bg-gray-50 ${level > 0 ? 'ml-' + (level * 4) : ''}`}>
            {hasChildren && (
              <button
                onClick={() => toggleExpand(category.id!)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            
            <span className="flex-1 font-medium">{category.name}</span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOrderChange(category, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <MoveUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOrderChange(category, 'down')}
                disabled={index === filteredCategories.length - 1}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <MoveDown className="w-4 h-4" />
              </button>
              <Link
                href={`/admin/knowledge-base/categories/edit/${category.id}`}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(category.id!)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {hasChildren && isExpanded && renderCategories(category.id, level + 1)}
        </div>
      );
    });
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Bilgi Bankası Kategorileri</h1>
        <Link
          href="/admin/knowledge-base/categories/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kategori
        </Link>
      </div>

      <div className="mb-6">
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
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {categories.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Henüz kategori bulunmuyor
            </div>
          ) : (
            renderCategories()
          )}
        </div>
      </div>
    </div>
  );
} 