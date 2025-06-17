'use client';

import Image from 'next/image';

const SeriNumarasiSection = () => {
  return (
    <section className="bg-gray-50 py-24 px-4 md:px-20">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol içerik */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Seri Numaralarını Hızlıca Tara ve Aksiyon Al
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Garanti talepleri ve yönetim süreçlerinde, güneş paneli ve invertör gibi bileşenlerin seri numaralarını hızlı ve doğru bir şekilde kayıt altına almak genellikle ciddi zaman ve maliyet gerektirir. MapperX teknolojisi ile bu süreci kolaylaştırarak önemli ölçüde zaman kazanın ve operasyonel verimliliğinizi artırın. Mobil telefon kamerası yardımıyla ek bir donanıma gerek duymadan anında seri numaralarını tarayın ve kaydedin.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Garanti taleplerinde önemli ölçüde zaman kazanarak verimliliği artırın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Seri No. dijital ikizlerini oluşturarak bir sonraki operasyona hız katın.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Taranan seri numaralarını Excel formatında toplu dışa aktarın.
            </li>
          </ul>
        </div>

        {/* Sağ görsel */}
        <div className="w-full">
          <Image
            src="/panel-no-mapperx-1.png"
            alt="Seri Numarası Taraması"
            width={1600}
            height={1000}
            className="w-full h-auto rounded-none shadow-none"
          />
        </div>
      </div>
    </section>
  );
};

export default SeriNumarasiSection;