'use client';

import { FaCheckCircle } from 'react-icons/fa';

const InternshipSection = () => {
  return (
    <section className="w-full pt-32 pb-24 px-6 md:px-32 bg-white text-[#0f2027]">
      {/* Başlık ve açıklama */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Geleceği Birlikte İnşa Edelim<br />MapperX Staj Programına Katıl!
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
          MapperX olarak, enerji ve teknoloji sektöründe yenilikçi projeler geliştiren bir öncüyüz.
          Sektördeki tecrübemizi ve bilgi birikimimizi paylaşmak için genç yeteneklere kapılarımızı açıyoruz.
          Sen de kariyerine güçlü bir başlangıç yapmak istiyorsan, staj programımıza katıl!
        </p>
      </div>

      {/* İçerik grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Sol */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Neden MapperX Staj Programı?</h3>
          <ul className="space-y-5 text-gray-800 text-lg">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                <strong>Gerçek Projeler Üzerinde Çalış:</strong> Stajyerlerimizi sadece gözlemci olarak değil, aktif birer takım üyesi olarak görüyoruz.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                <strong>Mentorluk Desteği:</strong> Alanında uzman mentorlarımız, kariyer gelişimine katkı sağlamak için yanında olacak.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                <strong>Eğitim ve Seminerler:</strong> Teknik becerilerini ve sektörel bilincini artırmak için özel eğitim ve seminerlerle destekliyoruz.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                <strong>Ar-Ge Projelerinde Yer Al:</strong> Yenilikçi R&D projelerinde aktif rol alarak fark yarat.
              </span>
            </li>
          </ul>
        </div>

        {/* Sağ */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Kimleri Arıyoruz?</h3>
          <ul className="space-y-5 text-gray-800 text-lg">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                Enerji sistemleri, bilgisayar mühendisliği, elektrik-elektronik mühendisliği, harita mühendisliği veya ilgili bölümlerde okuyan öğrenciler.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>
                İnovasyona ve öğrenmeye açık, analitik düşünebilen, takım çalışmasına yatkın genç yetenekler.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;