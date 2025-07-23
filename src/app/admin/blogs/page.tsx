'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import { Blog } from '@/types/Blog';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const blogsQuery = query(blogsCollection, orderBy('date', 'desc'));
      const blogsSnapshot = await getDocs(blogsQuery);
      const blogsList = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      setBlogs(blogsList);
    } catch (error: any) {
      setError('Blog yazıları yüklenirken bir hata oluştu');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'blogs', blogId));
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      alert('Blog yazısı silinirken bir hata oluştu');
    }
  };

  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLang = selectedLang ? blog.lang === selectedLang : true;
        return matchesSearch && matchesLang;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'desc'
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          return sortOrder === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        }
      });
  }, [blogs, searchTerm, selectedLang, sortBy, sortOrder]);

  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(blogs.map(blog => blog.lang)));
  }, [blogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Yazıları</h1>
        <Link
          href="/admin/blogs/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Blog Yazısı
        </Link>
      </div>

      {/* Arama ve Filtreleme Bölümü */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Arama Kutusu */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Blog yazısı ara..."
              className="pl-10 w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dil Filtresi */}
          <div>
            <select
              className="w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 font-medium"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="" className="text-gray-500">Tüm Diller</option>
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang} className="text-gray-900">
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sıralama Seçenekleri */}
          <div>
            <select
              className="w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            >
              <option value="date" className="text-gray-900">Tarihe Göre Sırala</option>
              <option value="title" className="text-gray-900">Başlığa Göre Sırala</option>
            </select>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 font-medium"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="desc" className="text-gray-900">Azalan</option>
              <option value="asc" className="text-gray-900">Artan</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {blog.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {blog.lang.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {blog.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/blogs/edit/${blog.slug}`}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-4"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            {filteredAndSortedBlogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  {blogs.length === 0 ? 'Henüz blog yazısı bulunmuyor' : 'Aramanızla eşleşen blog yazısı bulunamadı'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  );
} 