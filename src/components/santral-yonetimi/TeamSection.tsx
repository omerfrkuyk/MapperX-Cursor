'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaCheckCircle } from 'react-icons/fa';

export default function TeamSection() {
  const t = useTranslations('powerPlantManagement.team');

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <Image
            src="/mapperx-santral-gorunumu-8-1-1.png"
            alt={t('image.alt')}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {t('title')}
          </h2>
          <p className="text-lg text-black">
            {t('description')}
          </p>
          <ul className="space-y-4">
            {[1, 2, 3].map((index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                <span className="text-black">
                  {t(`features.${index}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}