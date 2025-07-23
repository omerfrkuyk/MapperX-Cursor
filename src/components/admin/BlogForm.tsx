import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage, db } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import BlogEditor from './BlogEditor';
import { Blog } from '@/types/Blog';
import { Loader2 } from 'lucide-react';

interface BlogFormProps {
  initialData?: Blog;
  mode: 'create' | 'edit';
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    lang: initialData?.lang || 'tr',
    featuredImage: initialData?.featuredImage || '',
    excerpt: initialData?.excerpt || '',
    slug: initialData?.slug || '',
    categories: initialData?.categories || [],
    tags: initialData?.tags || [],
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    seoKeywords: initialData?.seoKeywords || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageLoading(true);
      const fileName = `featured-images/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({ ...prev, featuredImage: downloadURL }));
      
      // Dosya input'unu resetle
      e.target.value = '';
    } catch (error) {
      console.error('Featured image upload error:', error);
      alert('Görsel yükleme başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Lütfen başlık ve içerik alanlarını doldurun.');
      return;
    }

    try {
      setLoading(true);

      // Slug oluştur
      const slug = formData.slug || formData.title
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

      const blogData = {
        ...formData,
        slug,
        date: new Date().toISOString(),
      };

      if (mode === 'create') {
        await addDoc(collection(db, 'blogs'), blogData);
      } else if (mode === 'edit' && initialData?.id) {
        await updateDoc(doc(db, 'blogs', initialData.id), blogData);
      }

      router.push('/admin/blogs');
    } catch (error) {
      console.error('Blog save error:', error);
      alert('Blog kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Başlık</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dil</label>
        <select
          name="lang"
          value={formData.lang}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
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
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Özet</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Öne Çıkan Görsel</label>
        <div className="mt-1 flex items-center space-x-4">
          {formData.featuredImage && (
            <img
              src={formData.featuredImage}
              alt="Öne çıkan görsel"
              className="h-32 w-32 object-cover rounded-lg"
            />
          )}
          <div className="relative">
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              id="featured-image"
              disabled={imageLoading}
            />
            <label
              htmlFor="featured-image"
              className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${imageLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {imageLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Yükleniyor...
                </>
              ) : (
                'Dosya Seç'
              )}
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">İçerik</label>
        <div className="mt-1">
          <BlogEditor
            content={formData.content || ''}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">SEO Başlığı</label>
        <input
          type="text"
          name="seoTitle"
          value={formData.seoTitle}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">SEO Açıklaması</label>
        <textarea
          name="seoDescription"
          value={formData.seoDescription}
          onChange={handleInputChange}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">SEO Anahtar Kelimeleri</label>
        <input
          type="text"
          name="seoKeywords"
          value={formData.seoKeywords}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Virgülle ayırarak yazın"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL Slug (Boş bırakılırsa otomatik oluşturulur)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading || imageLoading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || imageLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Kaydediliyor...
            </>
          ) : (
            'Kaydet'
          )}
        </button>
      </div>
    </form>
  );
} 