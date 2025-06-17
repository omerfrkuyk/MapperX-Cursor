'use client';

import Image from 'next/image';
import Link from 'next/link';

const DenetimHeroSection = () => {
  return (
    <section className="bg-white py-28 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Sol içerik */}
        <div>
          <h4 className="text-black font-semibold text-base md:text-lg mb-2">
            Enerji Verimliliğinde Güçlü Adımlar
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-tight mb-6">
            Denetim ve Muayene<br />Süreçlerinizi<br />Optimize Edin
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Güneş enerjisi santrallerinde denetim ve muayene süreçlerinizi dijitalleştirerek optimize edin. MapperX platformu üzerinden IEC 62446 standartlarına uyumlu olarak gözlem, ölçüm ve testlerinizi yöneterek operasyonel verimliliğinizi artırın. İş gücü ve maliyet tasarrufu sağlayarak, analiz ve raporlama süreçlerinizi hızlandırın ve doğru sonuçlar elde edin.
          </p>

          <div className="flex gap-6">
            <Link href="/iletisim">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition">
                Kayıt Ol
              </button>
            </Link>
            <Link
              href="/iletisim"
              className="text-sm font-medium underline underline-offset-4 text-gray-700 hover:text-blue-700 flex items-center"
            >
              Uzman ile Görüş
            </Link>
          </div>
        </div>

        {/* Sağ görsel */}
        <div className="w-full max-w-[900px] mx-auto">
          <Image
            src="/mapperx-ges-bakim-1-1.png"
            alt="Güneş Paneli Bakım Görseli"
            width={900}
            height={600}
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default DenetimHeroSection;