'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useFaqData } from '@/data/faqData';

const FAQPage = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { translate } = useLanguage();
  const faqData = useFaqData();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const index = faqData.findIndex(faq => faq.id === id);
      if (index !== -1) {
        setOpenIndexes([index]);
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsLoading(false);
  }, [faqData]);

  const toggleIndex = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleAll = () => {
    setOpenIndexes(prev => 
      prev.length === filteredFAQs.length ? [] : filteredFAQs.map((_, i) => i)
    );
  };

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchQuery, selectedCategory]);

  const categories = [
    { id: 'thermographic', label: translate('faq.categories.thermographic') },
    { id: 'inspection', label: translate('faq.categories.inspection') },
    { id: 'powerPlant', label: translate('faq.categories.powerPlant') }
  ];

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.label || categoryId;
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          {translate('faq.heading')}
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={translate('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {translate('faq.allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {filteredFAQs.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={toggleAll}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {openIndexes.length === filteredFAQs.length
                  ? translate('faq.collapseAll')
                  : translate('faq.expandAll')}
              </button>
            </div>
          )}
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {translate('faq.noResults')}
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);
              return (
                <div
                  key={index}
                  id={faq.id}
                  className={`bg-white border border-gray-200 rounded-xl px-6 py-5 transition-all hover:shadow-md ${
                    isOpen ? 'bg-gray-50' : ''
                  }`}
                >
                  <div 
                    onClick={() => toggleIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    role="button"
                    tabIndex={0}
                    className="flex justify-between items-start cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-lg font-medium text-gray-800 block">
                        {faq.question}
                      </span>
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                        {getCategoryLabel(faq.category)}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                    )}
                  </div>
                  {isOpen && (
                    <p className="text-gray-700 mt-4 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 