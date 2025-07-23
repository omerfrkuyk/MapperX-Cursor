'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogService } from '@/services/firebase/blog';
import { ArrowLeft, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import DOMPurify from 'isomorphic-dompurify';

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

export default function CreateBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
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
    seoKeywords: '',
    slug: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // HTML içeriğini temizle
      const cleanContent = DOMPurify.sanitize(formData.content);

      const blogData = {
        ...formData,
        content: cleanContent,
        date: new Date().toISOString(),
        excerpt: cleanContent.replace(/<[^>]*>/g, '').substring(0, 200) // HTML taglerini kaldır ve ilk 200 karakter
      };

      await blogService.createBlog(blogData);
      router.push('/admin/blogs');
    } catch (error: any) {
      console.error('Error creating blog:', error);
      alert(error.message || 'Blog yazısı oluşturulurken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageLoading(true);
      
      // Görsel önizleme için URL oluştur
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Firebase'e yükle
      const downloadURL = await blogService.uploadImage(file, 'featured');
      setFormData(prev => ({ ...prev, featuredImage: downloadURL }));

      // Input'u resetle
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Görsel yükleme başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setImageLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
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
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle)
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({
      ...prev,
      slug: newSlug
    }));
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
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
                Dil
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.lang}
                onChange={(e) => setFormData(prev => ({ ...prev, lang: e.target.value as any }))}
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
                Yazar
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Öne Çıkan Görsel
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {(imagePreview || formData.featuredImage) && (
                  <img
                    src={imagePreview || formData.featuredImage}
                    alt="Öne çıkan görsel"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                )}
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="featured-image"
                    disabled={imageLoading}
                  />
                  <label
                    htmlFor="featured-image"
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${imageLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
              <label className="block text-sm font-medium text-gray-700">
                İçerik
              </label>
              <div className="mt-1">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  value={formData.content}
                  onEditorChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                      'image'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | image | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    branding: false,
                    promotion: false,
                    images_upload_handler: blogService.handleEditorImageUpload,
                    image_dimensions: true,
                    image_class_list: [
                      { title: 'Responsive', value: 'img-fluid' },
                      { title: 'Full Width', value: 'img-full' },
                      { title: 'Left Aligned', value: 'img-left' },
                      { title: 'Right Aligned', value: 'img-right' },
                      { title: 'Center Aligned', value: 'img-center' }
                    ],
                    file_picker_types: 'image',
                    automatic_uploads: true,
                    image_caption: true,
                    image_advtab: true,
                    image_dimensions_default_constrain: true,
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Başlığı
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.seoTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Açıklaması
              </label>
              <textarea
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.seoDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Anahtar Kelimeleri
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.seoKeywords}
                onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                placeholder="Virgülle ayırarak yazın"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving || imageLoading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(saving || imageLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Kaydediliyor...
                </>
              ) : (
                'Kaydet'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 