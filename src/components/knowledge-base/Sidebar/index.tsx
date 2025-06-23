'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import CategoryTree from './CategoryTree';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { translate } = useLanguage();

  return (
    <div className="fixed left-0 top-0 h-screen w-80 flex flex-col border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translate('knowledgeBase.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <CategoryTree />
      </div>
    </div>
  );
};

export default Sidebar; 