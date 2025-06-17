'use client';

import Image from 'next/image';

const MeteorolojikVeriSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-24">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol metin içerik */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Santrallerin Meteorolojik Verileri
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Kestirimci ve periyodik bakım faaliyetlerinde ayın tarih ve saate ait meteorolojik veriler üzerinden verimlilik hesaplamaları yapılması uzmanlık ve maliyet gerektirir. MapperX platformu ile ek bir lisans maliyeti gerektirmeden sizin için otonom olarak en doğru meteorolojik verileri çekerek IEC 62446 standartları kapsamında verimlilik analizlerinizi yapar ve verileri size raporlar.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Işınım, rüzgar ve hava sıcaklık gibi verileri otomatik çekin.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Meteorolojik verilere ulaşmada maliyetleri ortadan kaldırın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Bir çok meteorolojik veriye ulaşarak detaylı raporlar oluşturun.
            </li>
          </ul>
        </div>

        {/* Sağ görsel */}
        <div className="w-full">
          <Image
            src="/panel-operasyon-status2-1.png"
            alt="Meteorolojik Veriler Görseli"
            width={1400}
            height={900}
            className="w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MeteorolojikVeriSection;