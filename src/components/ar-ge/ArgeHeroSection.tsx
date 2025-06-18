'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const ArGeHeroSection = () => {
  const { translate, currentLanguage } = useLanguage();

  const getTitle = () => {
    switch (currentLanguage) {
      case 'tr':
        return { highlight: 'Ar-Ge', text: 'Merkezi' };
      case 'de':
        return { highlight: 'F&E', text: 'Zentrum' };
      case 'it':
        return { highlight: 'R&S', text: 'Centro' };
      case 'fr':
        return { highlight: 'R&D', text: 'Centre' };
      default:
        return { highlight: 'R&D', text: 'Center' };
    }
  };

  const title = getTitle();

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex">
      {/* Sol Yazı Alanı */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 z-10 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] relative">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            {title.highlight}
          </span>{' '}
          {title.text}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-white">
          {translate('rAndD.hero.description')}
        </p>

        {/* Noktalı arka plan sadece sol tarafa */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255, 255, 255, 0.05)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Sağ Görsel Alanı */}
      <div className="w-1/2 h-full relative z-10">
        <Image
          src="/side-view-engineer-drawing-plan-outdoors.jpeg"
          alt={`${title.highlight} ${title.text}`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default ArGeHeroSection;