'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { Blog } from '@/types/Blog';

interface BlobInfo {
  blob: () => File;
}

interface Props {
  params: {
    id: string;
  };
}

type BlogFormData = Omit<Blog, 'id' | 'date' | 'excerpt' | 'slug'>;

export default function EditBlogPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    author: '',
    featuredImage: '',
    lang: 'tr',
    categories: [],
    tags: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const blogData = docSnap.data() as Blog;
          setFormData({
            title: blogData.title,
            content: blogData.content,
            author: blogData.author,
            featuredImage: blogData.featuredImage,
            lang: blogData.lang,
            categories: blogData.categories,
            tags: blogData.tags,
            seoTitle: blogData.seoTitle,
            seoDescription: blogData.seoDescription,
            seoKeywords: blogData.seoKeywords
          });
        } else {
          alert('Blog yazısı bulunamadı');
          router.push('/admin/blogs');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        alert('Blog yazısı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Excerpt oluştur (içeriğin ilk paragrafı)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formData.content;
      const firstParagraph = tempDiv.querySelector('p');
      const excerpt = firstParagraph ? firstParagraph.textContent || '' : '';

      const blogData = {
        ...formData,
        excerpt,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      };

      await updateDoc(doc(db, 'blogs', params.id), blogData);
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Blog yazısı güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData({ ...formData, featuredImage: downloadURL });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Resim yüklenirken bir hata oluştu');
    }
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
      <h1 className="text-2xl font-bold mb-6">Blog Yazısını Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dil</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.lang}
            onChange={(e) => setFormData({ ...formData, lang: e.target.value as Blog['lang'] })}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Yazar</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Öne Çıkan Görsel</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full"
          />
          {formData.featuredImage && (
            <img
              src={formData.featuredImage}
              alt="Preview"
              className="mt-2 h-32 w-auto object-cover"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İçerik</label>
          <Editor
            apiKey="your-tinymce-api-key"
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
            }}
            value={formData.content}
            onEditorChange={(content) => setFormData({ ...formData, content })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kategoriler (virgülle ayırın)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.categories.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              categories: e.target.value.split(',').map(cat => cat.trim()).filter(Boolean)
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Etiketler (virgülle ayırın)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.tags.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
            })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">SEO Bilgileri</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Başlığı</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Açıklaması</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Anahtar Kelimeleri</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.seoKeywords}
              onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
              placeholder="anahtar1, anahtar2, anahtar3"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 