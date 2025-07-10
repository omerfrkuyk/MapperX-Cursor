'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { Blog } from '@/types/Blog';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';

// TinyMCE editörünü client-side olarak yükle
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>
});

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
  categories: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  slug: string;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      // Slug'a göre blog'u bul
      const blogsCollection = collection(db, 'blogs');
      const q = query(blogsCollection, where('slug', '==', resolvedParams.slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Blog yazısı bulunamadı');
        return;
      }

      const blogDoc = querySnapshot.docs[0];
      setDocumentId(blogDoc.id); // Döküman ID'sini sakla

      const blogData = { id: blogDoc.id, ...blogDoc.data() } as Blog;
      const { id, date, excerpt, ...formData } = blogData;
      setFormData(formData);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Blog yazısı yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !documentId) return;

    setSaving(true);
    try {
      let imageUrl = formData.featuredImage;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const updateData = {
        ...formData,
        featuredImage: imageUrl,
      };

      console.log('Güncellenecek blog verisi:', updateData);
      console.log('Döküman ID:', documentId);

      // Slug kontrolü
      if (!updateData.slug) {
        throw new Error('Blog yazısı için URL slug\'ı gereklidir');
      }

      // Saklanan döküman ID'sini kullanarak güncelleme yap
      const blogRef = doc(db, 'blogs', documentId);
      await updateDoc(blogRef, updateData);
      
      alert('Blog yazısı başarıyla güncellendi!');
      router.push('/admin/blogs');
    } catch (error: any) {
      console.error('Error updating blog:', error);
      alert(error.message || 'Blog yazısı güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => prev ? {
      ...prev,
      title: newTitle,
      slug: prev.slug ? prev.slug : generateSlug(newTitle)
    } : null);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => prev ? {
      ...prev,
      slug: newSlug
    } : null);
  };

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

  if (!formData) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Blog Yazısını Düzenle</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 admin-form">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Başlık
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium placeholder-gray-500"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Blog yazısının başlığı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL Slug
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 text-black font-medium"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="blog-yazisinin-url-slug"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Sadece küçük harfler, rakamlar ve tire (-) kullanabilirsiniz.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                İçerik
              </label>
              <div className="mt-1">
                <Editor
                  apiKey="nqgy99dfhh5hljy4cyqlg5eqmtzzoujmzqft5jr9a4ivp62h"
                  value={formData.content}
                  onEditorChange={(content) => setFormData(prev => prev ? { ...prev, content } : null)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    branding: false,
                    promotion: false,
                    setup: (editor: any) => {
                      editor.on('init', () => {
                        // Editörün read-only durumunu false olarak ayarla
                        editor.setContent(formData.content || '');
                        editor.getBody().contentEditable = true;
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Yazar
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.author}
                onChange={(e) => setFormData(prev => prev ? { ...prev, author: e.target.value } : null)}
                placeholder="Yazarın adı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dil
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.lang}
                onChange={(e) => setFormData(prev => prev ? { ...prev, lang: e.target.value as 'tr' | 'en' | 'de' | 'fr' | 'it' } : null)}
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
                Kategoriler
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.categories.join(', ')}
                onChange={(e) => {
                  const categoriesArray = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                  setFormData(prev => prev ? {
                    ...prev,
                    categories: categoriesArray
                  } : null);
                }}
                placeholder="Kategorileri virgülle ayırarak girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Etiketler
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.tags.join(', ')}
                onChange={(e) => {
                  const tagsArray = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                  setFormData(prev => prev ? {
                    ...prev,
                    tags: tagsArray
                  } : null);
                }}
                placeholder="Etiketleri virgülle ayırarak girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Başlığı
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.seoTitle}
                onChange={(e) => setFormData(prev => prev ? { ...prev, seoTitle: e.target.value } : null)}
                placeholder="SEO başlığı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Açıklaması
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.seoDescription}
                onChange={(e) => setFormData(prev => prev ? { ...prev, seoDescription: e.target.value } : null)}
                placeholder="SEO açıklaması"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Anahtar Kelimeleri
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black font-medium"
                value={formData.seoKeywords}
                onChange={(e) => setFormData(prev => prev ? { ...prev, seoKeywords: e.target.value } : null)}
                placeholder="SEO anahtar kelimeleri (virgülle ayırın)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Öne Çıkan Görsel
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt="Öne çıkan görsel"
                  className="mt-4 h-32 w-auto object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 