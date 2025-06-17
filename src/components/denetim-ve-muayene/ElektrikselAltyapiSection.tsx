'use client';

import Image from 'next/image';
import Link from 'next/link';

const ElektrikselAltyapiSection = () => {
  return (
    <section className="bg-white py-24 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Görsel */}
        <div className="w-full">
          <Image
            src="/mapperx-electric2-1.png"
            alt="Elektriksel Altyapı Görseli"
            width={1200}
            height={800}
            className="w-full rounded-xl shadow-xl"
          />
        </div>

        {/* İçerik */}
        <div>
          <h4 className="text-black font-semibold text-base md:text-lg mb-2">
            Elektriksel Altyapı Operasyonlarınızı
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Tek Platformda Yönetin
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Karmaşık denetim ve muayene operasyonlarının farklı zamanlarda ve ekipmanlarla gerçekleştirilmesi, manuel iş akışlarında analizleri zorlaştırarak hatalı tespitlere yol açabilir. MapperX platformu, yapılan elektriksel ölçüm ve test verilerini standartlara uyumlu tek platformda toplayarak otonom raporlar oluşturun ve sürdürülebilir dijital ikizler üzerinden yorumlayın. Bu sayede hızlı ve doğru aksiyonlar alın.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg mb-8">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Manuel iş gücünü azaltarak, maliyetleri düşürün ve insan hatalarını en aza indirin
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Dijital ikizler üzerinden verileri yorumlayarak hızlı ve doğru kararlar alın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Standartlara uyumlu, sürdürülebilir ve otonom raporlar oluşturun.
            </li>
          </ul>

          <Link
            href="/ges-elektriksel-olcum-ve-testler/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
          >
            Daha Fazla Bilgi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ElektrikselAltyapiSection;