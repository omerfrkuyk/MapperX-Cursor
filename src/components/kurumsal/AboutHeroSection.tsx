'use client';

import Image from 'next/image';

const AboutHeroSection = () => {
  return (
    <section className="bg-white pt-28 px-4 md:px-12">
      <div className="w-full max-w-none mx-auto grid md:grid-cols-2 items-center gap-20">
        {/* Sol görsel */}
        <div className="px-4 md:px-12">
          <Image
            src="/mapperx-solarpanel-aboutus-1.png"
            alt="PV Panel Denetimi"
            width={1200}
            height={900}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Sağ metin */}
        <div className="px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            PV Panel Denetiminden <br /> Daha Fazlası
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">
                MapperX Teknolojisi
              </h4>
              <p className="text-gray-700">
                MapperX, ileri drone ve termografi teknolojilerini kullanarak endüstriyel
                tesislerin durumunu detaylı bir şekilde analiz eden yenilikçi bir platformdur.
                Gelişmiş görüntü işleme algoritmaları ve yapay zeka desteği ile yüksek
                hassasiyetle veri toplar ve analiz eder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-1">Operasyonel Verimlilik</h4>
                <p className="text-gray-700">
                  Tesislerin bakım ve onarım süreçlerini optimize eder, arızaları önceden tespit
                  ederek operasyonel verimliliği artırır.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-1">Proaktif Bakım</h4>
                <p className="text-gray-700">
                  Mevcut sorunları belirlemenin yanı sıra gelecekte ortaya çıkabilecek potansiyel
                  sorunları öngörerek proaktif bir bakım stratejisi sunar.
                </p>
              </div>
            </div>

            <div>
              <a
                href="https://mapperx.com/iletisim/"
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                İletişime geç
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;