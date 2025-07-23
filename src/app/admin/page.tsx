'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Blog } from '@/types/Blog';
import Link from 'next/link';
import { FileText, Settings, Clock, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [lastUpdatedBlogs, setLastUpdatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // Son eklenen bloglar
        const recentQuery = query(
          collection(db, 'blogs'),
          orderBy('date', 'desc'),
          limit(5)
        );
        
        const recentSnapshot = await getDocs(recentQuery);
        const recentBlogsList = recentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Blog[];
        
        setRecentBlogs(recentBlogsList);

        // Son güncellenen bloglar
        const updatedQuery = query(
          collection(db, 'blogs'),
          orderBy('date', 'desc'),
          limit(3)
        );

        const updatedSnapshot = await getDocs(updatedQuery);
        const updatedBlogsList = updatedSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Blog[];

        setLastUpdatedBlogs(updatedBlogsList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blog İstatistikleri */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Son Blog Yazıları</h2>
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <Link 
                    href={`/admin/blogs/edit/${blog.slug}`}
                    className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors"
                  >
                    <h3 className="text-base font-medium text-gray-900">{blog.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{blog.author}</span>
                    </div>
                  </Link>
                </div>
              ))}
              {recentBlogs.length === 0 && (
                <p className="text-gray-500 text-center py-4">Henüz blog yazısı bulunmuyor</p>
              )}
            </div>
          )}
          <div className="mt-4 text-right">
            <Link
              href="/admin/blogs"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Tüm Blog Yazıları →
            </Link>
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div className="space-y-6">
          {/* Hızlı Erişim Butonları */}
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Hızlı Erişim</h2>
              <Settings className="w-5 h-5 text-gray-500" />
            </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/blogs/create"
              className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
                <Plus className="w-5 h-5 mr-2" />
              <span className="text-center">Yeni Blog Yazısı</span>
            </Link>
            <Link
              href="/admin/seo"
              className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
                <Settings className="w-5 h-5 mr-2" />
              <span className="text-center">SEO Ayarları</span>
            </Link>
            </div>
          </div>

          {/* Son Güncellenen Bloglar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Son Güncellenen Bloglar</h2>
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {lastUpdatedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/admin/blogs/edit/${blog.slug}`}
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(blog.date).toLocaleDateString()}
                        </p>
                      </div>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
                {lastUpdatedBlogs.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Henüz blog yazısı bulunmuyor</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 