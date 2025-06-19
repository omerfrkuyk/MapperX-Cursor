'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SeriNumarasiSection() {
  const t = useTranslations('powerPlantManagement.serialNumber');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="w-full lg:w-1/2">
            <Image
              src="/mapperx-panel-seri-numarasi-okutma-1.png"
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
            <p className="text-lg text-gray-600">
              {t('description')}
            </p>
            <ul className="space-y-4">
              {[1, 2, 3].map((index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    {t(`features.${index}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}