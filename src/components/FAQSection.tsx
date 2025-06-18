'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getLocalizedRoute } from '@/lib/i18n/routes';
import { useFaqData } from '@/data/faqData';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { translate, currentLanguage } = useLanguage();
  const faqData = useFaqData();

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const limitedFaqs = faqData.slice(0, 6);

  return (
    <section className="bg-gray-50 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* SSS kısmı */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {translate('faq.title')}
          </h2>
          <div className="space-y-4">
            {limitedFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => toggleIndex(index)}
                  className={`cursor-pointer bg-white border border-gray-200 rounded-xl px-6 py-5 transition-all hover:shadow-md ${
                    isOpen ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-800">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-blue-600" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                  {isOpen && (
                    <p className="text-gray-700 mt-4 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={getLocalizedRoute('faq', currentLanguage)}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-full border border-blue-200 text-sm font-medium transition"
            >
              {translate('faq.showAll')}
            </Link>
          </div>
        </div>

        {/* Yardım ve Destek kutuları + Blog kutusu */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-700 mb-4">
              {translate('faq.helpCenter.description')}
            </p>
            <Link
              href="https://support.mapperx.com/"
              className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-full border border-blue-200 text-sm font-medium transition"
            >
              {translate('faq.helpCenter.button')}
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-700 mb-4">
              {translate('faq.technicalSupport.description')}
            </p>
            <Link
              href={getLocalizedRoute('contact', currentLanguage)}
              className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-full border border-blue-200 text-sm font-medium transition"
            >
              {translate('faq.technicalSupport.button')}
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {translate('faq.blog.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {translate('faq.blog.description')}
            </p>
            <p className="text-gray-700 mb-6">
              {translate('faq.blog.subDescription')}
            </p>
            <Link
              href={getLocalizedRoute('blog', currentLanguage)}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
            >
              {translate('faq.blog.button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;