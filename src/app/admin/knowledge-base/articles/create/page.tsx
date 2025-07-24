'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import DOMPurify from 'isomorphic-dompurify';
import { articleService, categoryService } from '@/services/firebase/knowledge-base';
import { KnowledgeBaseCategory } from '@/types/KnowledgeBase';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TinyMCE editörünü client-side olarak yükle
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>
});

interface FormData {
  title: string;
  content: string;
  author: string;
  categoryId: string;
  lang: 'tr' | 'en' | 'de' | 'fr' | 'it';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  slug: string;
  isPublished: boolean;
  order: number;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<KnowledgeBaseCategory[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    categoryId: '',
    lang: 'tr',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    slug: '',
    isPublished: false,
    order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, [formData.lang]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories(formData.lang);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Görsel yükleme işleyicisi
  const handleImageUpload = async (blobInfo: any) => {
    try {
      const file = blobInfo.blob();
      const fileName = `knowledge-base-images/${Date.now()}-${blobInfo.filename()}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Görsel yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // HTML içeriğini temizle
      const cleanContent = DOMPurify.sanitize(formData.content);

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

      // Sıralama değerini belirle
      const order = formData.order || 0;

      await articleService.createArticle({
        ...formData,
        content: cleanContent,
        slug,
        order
      });

      router.push('/admin/knowledge-base/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Makale oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            href="/admin/knowledge-base/articles"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Makale Oluştur</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6">
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
                  Kategori
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Başlık
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Yazar
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  İçerik
                </label>
                <div className="mt-1 border border-gray-300 rounded-md">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    value={formData.content}
                    onEditorChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    init={{
                      height: 600,
                      menubar: true,
                      statusbar: true,
                      browser_spellcheck: true,
                      document_base_url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'image', 'quickbars', 'codesample'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media table codesample | help',
                      content_style: `
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.6; }
                        h1 { font-size: 2em; margin-top: 1em; margin-bottom: 0.5em; }
                        h2 { font-size: 1.5em; margin-top: 1em; margin-bottom: 0.5em; }
                        h3 { font-size: 1.17em; margin-top: 1em; margin-bottom: 0.5em; }
                        p { margin-bottom: 1em; }
                        ul, ol { margin-bottom: 1em; padding-left: 2em; }
                        table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
                        th, td { border: 1px solid #ddd; padding: 8px; }
                        img { max-width: 100%; height: auto; }
                        pre { background-color: #f5f5f5; padding: 1em; border-radius: 4px; overflow-x: auto; }
                        code { font-family: Monaco, Consolas, monospace; background-color: #f5f5f5; padding: 2px 4px; border-radius: 2px; }
                        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1em; color: #666; }
                        .alert { padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; }
                        .alert-info { color: #31708f; background-color: #d9edf7; border-color: #bce8f1; }
                        .alert-warning { color: #8a6d3b; background-color: #fcf8e3; border-color: #faebcc; }
                        .alert-danger { color: #a94442; background-color: #f2dede; border-color: #ebccd1; }
                      `,
                      formats: {
                        alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-left' },
                        aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-center' },
                        alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-right' },
                        alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-justify' }
                      },
                      style_formats: [
                        { title: 'Headers', items: [
                          { title: 'Header 1', format: 'h1' },
                          { title: 'Header 2', format: 'h2' },
                          { title: 'Header 3', format: 'h3' }
                        ]},
                        { title: 'Inline', items: [
                          { title: 'Bold', format: 'bold' },
                          { title: 'Italic', format: 'italic' },
                          { title: 'Code', format: 'code' }
                        ]},
                        { title: 'Blocks', items: [
                          { title: 'Paragraph', format: 'p' },
                          { title: 'Blockquote', format: 'blockquote' },
                          { title: 'Alert Info', block: 'div', classes: 'alert alert-info' },
                          { title: 'Alert Warning', block: 'div', classes: 'alert alert-warning' },
                          { title: 'Alert Danger', block: 'div', classes: 'alert alert-danger' }
                        ]}
                      ],
                      branding: false,
                      promotion: false,
                      images_upload_handler: handleImageUpload,
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
                      quickbars_insert_toolbar: 'image media table codesample',
                      quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
                      contextmenu: 'link image table',
                      image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
                      skin: 'oxide',
                      content_css: 'default',
                      init_instance_callback: function(editor) {
                        editor.getBody().setAttribute('contenteditable', 'true');
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">SEO ve URL Ayarları</h2>
            <div className="grid grid-cols-1 gap-6">
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
                  SEO Başlığı
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO Açıklaması
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO Anahtar Kelimeleri
                </label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Virgülle ayırın"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Yayın Ayarları</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Makaleyi yayınla
                  </span>
                </label>
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
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/knowledge-base/articles"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 