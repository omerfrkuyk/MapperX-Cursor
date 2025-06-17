'use client';

import Image from 'next/image';

const ElectricTestSection = () => {
  return (
    <section className="bg-white py-28 px-6 md:px-20">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Görsel */}
        <div className="w-full">
          <Image
            src="/electric-test-1.png"
            alt="Elektriksel Test Görseli"
            width={1200}
            height={800}
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>

        {/* Metin */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Elektriksel Test ve Ölçümlerinizi Kolayca Raporlayın
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Denetim ve muayene operasyonlarında ekiplerin bir arada çalışmalarını doğru olarak yürütmesi ve elektriksel test ve ölçüm sonuçlarını kayıt altına alarak bu veriler üzerinden standartlara uygun olarak raporlar oluşturması zaman ve maliyet gerektirir. MapperX platform ile iş akışlarınızı sürdürülebilir hale getirerek verimli ve doğru bir şekilde yönetebilir, IEC 62446 standartlarında kendi logonuz ile sınırsız rapor oluşturabilirsiniz.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg mb-8">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Elektriksel ölçüm ve kontrollerin dijital ikizlerini oluşturun.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Birleşik olarak test, ölçüm ve kontrollerinizi yönetin.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Periyodik kontrollerinizi zamanında planla ve operasyonlarını yürüt.
            </li>
          </ul>

          <a
            href="https://mapperx.com/iletisim/"
            target="_blank"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
          >
            Uzman ile Görüşün
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElectricTestSection;