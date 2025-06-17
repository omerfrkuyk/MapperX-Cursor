'use client';

import { useEffect, useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Link as LinkIcon, Search } from 'lucide-react';
import faqData from '@/data/faqData';
import debounce from 'lodash.debounce';

const FullFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    if (openIndex !== null) {
      const slug = faqData[openIndex].question
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      history.replaceState(null, '', `#${slug}`);
    }
  }, [openIndex]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const index = faqData.findIndex((faq) =>
        faq.question
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '') === hash
      );
      if (index !== -1) {
        setOpenIndex(index);
      }
    }
  }, []);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, 300);

  return (
    <section className="bg-white py-20 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
          Sıkça Sorulan Sorular
        </h2>

        {/* Arama kutusu */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Bir soru arayın..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e2a3a] text-sm text-black placeholder-gray-700"
          />
        </div>

        <div className="space-y-6">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const slug = faq.question
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '');

            return (
              <div
                key={index}
                id={slug}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`cursor-pointer transition-all duration-300 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transform`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-medium text-gray-800 leading-snug transition-colors duration-200 group-hover:text-blue-600">
                    {faq.question}
                  </span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`#${slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Bağlantıyı kopyala"
                    >
                      <LinkIcon className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </a>
                    {isOpen ? (
                      <ChevronUp className="text-blue-600 group-hover:text-blue-700" />
                    ) : (
                      <ChevronDown className="text-gray-500 group-hover:text-gray-700" />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <p className="text-gray-700 mt-4 leading-relaxed text-sm md:text-base transition-opacity duration-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FullFAQSection;