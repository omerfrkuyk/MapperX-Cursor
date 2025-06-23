'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaCheckCircle } from 'react-icons/fa';

const ElectricTestSection = () => {
  const t = useTranslations('inspectionAndAudit.electricTest');

  return (
    <section className="bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol görsel */}
        <div className="relative w-full h-full flex items-center">
          <Image
            src="/electric-test-1.png"
            alt={t('image.alt')}
            width={2000}
            height={1500}
            className="w-[120%] h-auto rounded-xl"
            priority
          />
        </div>

        {/* Sağ içerik */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-black text-lg mb-8">
            {t('description')}
          </p>

          <div className="space-y-6 mb-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-4">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                <p className="text-black">
                  {t(`features.${index}`)}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-semibold transition"
          >
            {t('button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElectricTestSection;