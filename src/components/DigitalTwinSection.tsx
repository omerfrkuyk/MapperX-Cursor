'use client';

import React from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getLocalizedRoute } from '@/lib/i18n/routes';

const DigitalTwinSection = () => {
  const { translate, currentLanguage } = useLanguage();

  // Özellikleri doğru şekilde al
  const featuresData = translate('digitalTwin.features');
  const features = Array.isArray(featuresData) ? featuresData : [];

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
            {translate('digitalTwin.title.line1')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {translate('digitalTwin.title.line2')}
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {translate('digitalTwin.description')}
          </p>

          <ul className="space-y-4 mb-8 text-gray-700">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={getLocalizedRoute('inspection', currentLanguage)}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-full transition"
          >
            {translate('digitalTwin.button')}
          </Link>
        </div>

        {/* Right image */}
        <div className="flex-1">
          <Image
            src={translate('digitalTwin.image.src')}
            alt={translate('digitalTwin.image.alt')}
            width={700}
            height={500}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default DigitalTwinSection;