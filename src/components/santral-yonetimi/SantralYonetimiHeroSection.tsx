'use client';

import Image from 'next/image';
import Link from 'next/link';

const SantralYonetimiHeroSection = () => {
  return (
    <section className="bg-white py-36 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol içerik */}
        <div>
          <h4 className="text-black font-semibold text-base md:text-lg mb-3">
            Santral Yönetiminde
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-tight mb-6">
            Zaman Tasarrufu Sağlayın <br /> ve Operasyonel Verimliliğinizi Artırın
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            Güneş enerjisi santrallerinde iş akışlarınızı optimize edin, verimliliği artırın ve hızlı operasyonel yönetim ile anında aksiyon alın. Yangın riskleri ve finansal kayıpların önüne geçerek işletmenizi koruma altında tutun.
          </p>

          <div className="flex gap-6">
            <Link
              href="https://mapperx.com/iletisim/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
            >
              Kayıt Ol
            </Link>
            <Link
              href="https://mapperx.com/iletisim/"
              className="text-sm font-medium underline underline-offset-4 text-gray-700 hover:text-blue-700"
            >
              Uzman ile Görüş
            </Link>
          </div>
        </div>

        {/* Sağ görsel */}
        <div className="w-full max-w-[700px] mx-auto">
          <Image
            src="/mapperx-img.png"
            alt="Santral Yönetimi Ekranı"
            width={1000}
            height={700}
            className="w-full h-auto rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default SantralYonetimiHeroSection;