'use client';

import Image from 'next/image';

const MapperXStudioSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Sol içerik */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            MapperX Studio
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
            MapperX Studio, müşterilerin inverter, transformatör ve elektriksel altyapılarını ekleyip yönetebildiği kapsamlı bir araçtır. Kullanıcılar, santrallerinin dijital ikizlerini oluşturarak, string ve panel numaralandırmalarını kolayca yapabilir ve tüm bileşenleri detaylı bir şekilde planlayabilir. Üçüncü taraf yazılım gerektirmeden, tüm santral yönetim süreçlerinizi tek bir platformdan optimize edin ve verimliliği artırın.
          </p>

          <ul className="space-y-5 text-gray-700 text-lg md:text-xl">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">›</span>
              <span><strong>Elektriksel Altyapı Yönetimi:</strong> Inverter, transformatör ve diğer elektriksel bileşenlerinizi ekleyip yönetmenize olanak tanır.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">›</span>
              <span><strong>Numaralandırma ve Planlama:</strong> String ve panel numaralandırmalarını kolayca yaparak, santralinizi detaylı bir şekilde planlayın.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">›</span>
              <span><strong>Dijital İkiz Teknolojisi:</strong> Santralin dijital ikizini oluşturarak, tüm yönetim süreçlerinizi optimize edin ve verimliliği artırın.</span>
            </li>
          </ul>
        </div>

        {/* Sağ görsel */}
        <div className="w-full">
          <Image
            src="/mapperx-studio-1.png"
            alt="MapperX Studio ekran görüntüsü"
            width={1920}
            height={1080}
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default MapperXStudioSection;