'use client';

import Image from 'next/image';

const TeamSection = () => {
  return (
    <section className="bg-white py-24 px-4 md:px-20">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Görsel */}
        <div className="w-full">
          <Image
            src="/mapperx-santral-gorunumu-8-1-1.png"
            alt="Takım Üyeleri ve Görevlendirme"
            width={1200}
            height={700}
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Metin İçeriği */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Takım Üyeleri ve Görevlendirme
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Denetim ve muayene faaliyetlerinde ekipleri etkili bir şekilde görevlendirmek ve iş
            akışlarında performanslarını takip etmek zorlu ve karmaşıktır. MapperX platformu ile takım
            üyelerinin görev dağılımlarını yaparak tek bir platform üzerinden yönetin ve
            performanslarını izleyin. Bu sayede, ekip yönetimini ve santral performansını optimize edin.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              İş emirlerini ve geçmişini sınırsız güncel rapor oluşturun.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Santral üyelerini istediğiniz santralde ve görev için yetkilendirin
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Santralin tüm teknik ve operasyonel bilgilerine kolayca erişin.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;