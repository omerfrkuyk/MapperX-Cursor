'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Search } from 'lucide-react';

// Geçici veri yapısı - daha sonra Firebase'den gelecek
interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

const TEMP_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'MapperX Platformuna Nasıl Üye Olunur?',
    excerpt: 'MapperX platformuna üye olma adımlarını ve gerekli bilgileri bu makalede bulabilirsiniz.',
    category: 'Başlangıç ve Hesap Yönetimi'
  },
  {
    id: '2',
    title: 'Şirket Hesabı Oluşturma',
    excerpt: 'Şirketiniz için hesap oluşturma ve yönetici atama işlemlerini öğrenin.',
    category: 'Başlangıç ve Hesap Yönetimi'
  },
  {
    id: '3',
    title: 'Anomali Türleri ve Sınıflandırması',
    excerpt: 'MapperX platformunda tespit edilen anomali türleri ve bunların sınıflandırılması hakkında detaylı bilgi.',
    category: 'Platformun Tanıtımı ve Kullanımı'
  }
];

const MainContent = () => {
  const { translate } = useLanguage();

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {translate('knowledgeBase.welcomeTitle')}
          </h1>
          <p className="text-lg text-gray-600">
            {translate('knowledgeBase.welcomeDescription')}
          </p>
        </div>

        <div className="mb-12">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder={translate('knowledgeBase.mainSearchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMP_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="text-sm text-gray-500">{article.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent; 