'use client';

import React from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const AkilliRaporlamaSection = () => {
  const t = useTranslations();

  return (
    <section className="bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <Image
            src="/report-file-1-1.png"
            alt={t('smartReporting.title')}
            width={800}
            height={800}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-black font-semibold text-lg md:text-xl mb-2">
            {t('smartReporting.title')}
          </h3>
          <p className="text-black text-base md:text-lg mb-6">
            {t('smartReporting.description')}
          </p>

          <ul className="space-y-4 text-black text-base md:text-lg">
            {t.raw('smartReporting.features').map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AkilliRaporlamaSection;