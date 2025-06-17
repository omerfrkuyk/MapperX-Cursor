'use client';

import Image from 'next/image';

const AnomaliTurleriSection = () => {
  return (
    <section className="bg-gray-50 py-24 px-4 md:px-20">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Sol içerik */}
        <div>
          <h4 className="text-gray-900 font-semibold text-base md:text-lg mb-2">
            Otonom Tespit Edilen
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Anomali Türleri
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Geleneksel yöntemler ile yapılan termal incelemeler analizlerinde hatalı veya arızalı güneş panelinin tespit edilmesi uzun sürmektedir. MapperX ile IEC 62446 standartları kapsamında yer alan tüm anomali türlerini ve sebeplerini otonom bir şekilde standarda uyumlu olarak kısa sürede tespit edin.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Anomali türlerini belirleyin ve sebeplerini kontrol altına alın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Bakım ve onarım sürecinde hızlı kararlar alarak kayıplarınızı azaltın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Gelişmiş filtreleme seçenekleri ile önceliklerinizi belirleyin.
            </li>
          </ul>
        </div>

        {/* Sağ görsel */}
        <div className="w-full">
          <Image
            src="/thermal-inspection/mapperx-santral-gorunumu-7-1.png"
            alt="Anomali Tespiti Görseli"
            width={1600}
            height={1000}
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AnomaliTurleriSection;