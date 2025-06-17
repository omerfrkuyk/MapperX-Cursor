'use client';

import Image from 'next/image';

const ArGeMissionSection = () => {
  return (
    <section className="w-full px-6 md:px-20 py-24 bg-white flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Sol yazı alanı */}
      <div className="flex-1 text-[#0f2027] text-center lg:text-left">
        <p className="text-xl leading-relaxed font-medium mb-8">
          MapperX, Ar-Ge faaliyetlerinde teknik personel ve mühendis sayısını sürekli artırarak,
          inovasyona dayalı ekonomik büyüme ve kalkınma hedeflerine odaklanmaktadır. Yüksek teknolojiye dayalı katma değerli ürünler üretmekte ve bu alanlara yatırımlar yapmaya devam etmektedir.
          Mühendis ve teknik kadromuz ile iş ortaklarımızın beklentilerini karşılamak için yeni ürün
          ve süreçler geliştirmekteyiz. Bu çerçevede misyon edindiğimiz ilkeler:
        </p>

        <ul className="space-y-5 text-lg font-semibold">
          <li className="flex items-start gap-2">
            <span className="text-green-600 text-xl">✔️</span> Doğruluk, tarafsızlık ve gizlilik ilkelerine uymak
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 text-xl">✔️</span> Test ve deney faaliyetlerimizde ulusal ve uluslararası kuruluşlarca hazırlanan kalite standartlarını uygulamak
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 text-xl">✔️</span> Ekipmanlarımızı ve bilgi birikimimizi güncel tutmak
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 text-xl">✔️</span> Müşterilerimizin problemlerine en hızlı ve en yenilikçi çözümleri sunmak
          </li>
        </ul>

        <p className="text-md text-gray-600 mt-8 leading-relaxed">
          Ar-Ge projemiz, T.C. Sanayi ve Teknoloji Bakanlığı ve TÜBİTAK’ın (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu)
          desteği ile yürütülmektedir. Çalışmalarımız, ODTÜ Teknokent Bilişim İnovasyon Merkezi’nde devam etmektedir.
        </p>
      </div>

      {/* Sağ görsel */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/InspectionMobileNew-1.jpg"
          alt="Mobil Denetim Drone"
          width={700}
          height={500}
          className="rounded-2xl shadow-xl w-auto h-auto"
          priority
        />
      </div>
    </section>
  );
};

export default ArGeMissionSection;