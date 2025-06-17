"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const HeroSection = () => {
  const { translate, currentLanguage } = useLanguage();

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-[1920px] mx-auto mt-20 rounded-[32px] bg-gradient-to-br from-[#00153A] to-black p-10 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-12">
            <span className="relative inline-block pb-2">
              {translate('hero.title.line1')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-[#F2BC8D] via-[#F2BC8D] to-transparent opacity-95"></span>
            </span>
            <br />
            {translate('hero.title.line2')}
          </h1>

          <div className="w-full mt-10 flex justify-center">
            <Image
              src={translate('hero.image.src')}
              alt={translate('hero.image.alt')}
              width={1600}
              height={900}
              className="max-w-[85vw] w-full h-auto object-contain rounded-xl"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;