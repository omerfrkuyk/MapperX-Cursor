'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaCheckCircle } from 'react-icons/fa';

const ElektrikselAltyapiSection = () => {
  const t = useTranslations('inspectionAndAudit.electricalInfrastructure');

  return (
    <section className="bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol taraf - Görsel */}
        <div className="relative">
          <Image
            src="/mapperx-electric2-1.png"
            alt={t('image.alt')}
            width={800}
            height={600}
            className="w-full rounded-xl"
            priority
          />
        </div>

        {/* Sağ taraf - İçerik */}
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
                <p className="text-black text-lg">
                  {t(`features.${index}.description`)}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-semibold transition"
          >
            {t('moreInfo')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElektrikselAltyapiSection;