'use client';

import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const ArGeMissionSection = () => {
  const { translate } = useLanguage();

  return (
    <section className="w-full px-4 md:px-12 py-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Sol yazı alanı */}
        <div className="flex-1 text-[#0f2027] text-center lg:text-left">
          <p className="text-xl leading-relaxed font-medium mb-8">
            {translate('rAndD.mission.description')}
          </p>

          <ul className="space-y-5 text-lg font-semibold">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                {translate(`rAndD.mission.principles.${index}`)}
              </li>
            ))}
          </ul>

          <p className="text-md text-gray-600 mt-8 leading-relaxed">
            {translate('rAndD.mission.footer')}
          </p>
        </div>

        {/* Sağ görsel */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/InspectionMobileNew-1.jpg"
            alt={translate('rAndD.hero.title')}
            width={700}
            height={500}
            className="rounded-2xl shadow-xl w-auto h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ArGeMissionSection;