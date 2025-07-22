'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Blog } from '@/types/Blog';
import Link from 'next/link';

export default function AdminDashboard() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        const q = query(
          collection(db, 'blogs'),
          orderBy('date', 'desc'),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Blog[];
        
        setRecentBlogs(blogs);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blog İstatistikleri */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Son Blog Yazıları</h2>
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
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(blog.date).toLocaleDateString()} - {blog.author}
                    </p>
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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/blogs/create"
              className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-center">Yeni Blog Yazısı</span>
            </Link>
            <Link
              href="/admin/seo"
              className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-center">SEO Ayarları</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 