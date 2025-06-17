"use client";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#3C3C3C] text-white pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Sol: Logo + Açıklama */}
        <div className="flex-1 max-w-md pr-6">
          <img src="/logo.svg" alt="MapperX Logo" className="h-10 mb-4" />
          <p className="text-[15px] mb-2 leading-relaxed">
            MapperX, güneş enerjisi santrallerinin verimliliğini artırarak karbon emisyonunu azaltmayı hedefleyen yapay zeka destekli analiz ve raporlama yazılımıdır.
          </p>
          <p className="text-[15px] mb-2 leading-relaxed">
            IEC–62446 standartlarına uyumlu olarak çalışan MapperX, bakım ve onarım süreçlerini dijitalleştirerek operasyonel verimliliği artırır ve finansal kayıpları en aza indirir.
          </p>
          <p className="text-xs mt-4">
            Güneş Enerji Santrallerinde, Analiz, Yönetim ve Raporlama Platformu.
          </p>
          <p className="text-xs mt-1">© 2025 MapperX – All Rights Reserved.</p>
        </div>

        {/* Orta: Kurumsal Menü + Sosyal */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-4">Kurumsal</h4>
          <ul className="space-y-2 text-[15px]">
            <li><Link href="/kisisel-verilerinin-korunmasi">Kişisel Verilerin Korunması</Link></li>
            <li><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
            <li><Link href="/teslimat-ve-iade">Teslimat ve iade</Link></li>
            <li><Link href="/sikca-sorulan-sorular">Sıkça Sorulan Sorular</Link></li>
            <li><Link href="/fiyatlar">Fiyatlar</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <Link href="#"><Linkedin size={20} /></Link>
            <Link href="#"><Facebook size={20} /></Link>
            <Link href="#"><Twitter size={20} /></Link>
            <Link href="#"><Instagram size={20} /></Link>
            <Link href="#"><Youtube size={20} /></Link>
          </div>
        </div>

        {/* Sağ: Hızlı Menü */}
        <div className="flex-1 max-w-sm">
          <h4 className="font-semibold text-lg mb-4">Hızlı Menü</h4>
          <ul className="space-y-2 text-[15px]">
            <li className="font-semibold mt-2">Platform</li>
            <li><Link href="/termografik-inceleme">Termografik İnceleme</Link></li>
            <li><Link href="/denetim-ve-muayene">Denetim ve Muayene</Link></li>
            <li><Link href="/santral-yonetimi">Santral Yönetimi</Link></li>

            <li className="font-semibold mt-4">Kaynaklar</li>
            <li><Link href="/support">Bilgi Bankası</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/sikca-sorulan-sorular">Sıkça Sorulan Sorular</Link></li>

            <li className="font-semibold mt-4">Kurumsal</li>
            <li><Link href="/kurumsal">Hakkımızda</Link></li>
            <li><Link href="/ar-ge">Ar-Ge</Link></li>
            <li><Link href="/kariyer">Kariyer</Link></li>
            <li className="pl-4">↳ <Link href="/kariyer">Açık Pozisyonlar</Link></li>
            <li className="pl-4">↳ <Link href="/staj-programi">Staj Programı</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
          </ul>
        </div>
      </div>

      {/* Alt: Ödeme Logoları */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-wrap justify-center gap-4 items-center">
        <img src="/iyzico.svg" alt="iyzico" className="h-6" />
        <img src="/visa.svg" alt="visa" className="h-6" />
        <img src="/mastercard.svg" alt="mastercard" className="h-6" />
        <img src="/amex.svg" alt="amex" className="h-6" />
        <img src="/troy.svg" alt="troy" className="h-6" />
        <img src="/dmca.svg" alt="dmca" className="h-6" />
        <img src="/qr-code-placeholder.svg" alt="qr" className="h-6" />
      </div>
    </footer>
  );
};

export default Footer;