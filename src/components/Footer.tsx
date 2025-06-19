"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/types";

const Footer = () => {
  const params = useParams();
  const locale = (params?.locale as Locale) || "tr";
  const { translate } = useLanguage();

  const localizedHref = (path: string) => `/${locale}${path}`;

  const paymentLogos = [
    { src: "/payment/Iyzico-logo.png", alt: "iyzico", width: 80 },
    { src: "/payment/visa-logo.png", alt: "Visa", width: 65 },
    { src: "/payment/mastercard-logo.png", alt: "Mastercard", width: 65 },
    { src: "/payment/amex-logo.png", alt: "American Express", width: 65 },
    { src: "/payment/troy-logo.png", alt: "Troy", width: 65 },
    { src: "/payment/ssl-logo.png", alt: "SSL Secure", width: 80 },
  ];

  return (
    <footer className="bg-[#3C3C3C] text-white pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Sol: Logo + Açıklama */}
        <div className="flex-1 max-w-md pr-6">
          <img src="/logo.svg" alt="MapperX Logo" className="h-10 mb-4" />
          <p className="text-[15px] mb-2 leading-relaxed">
            {translate("footer.description.line1")}
          </p>
          <p className="text-[15px] mb-2 leading-relaxed">
            {translate("footer.description.line2")}
          </p>
          <p className="text-xs mt-4">
            {translate("footer.description.line3")}
          </p>
          <p className="text-xs mt-1">{translate("footer.description.copyright")}</p>
        </div>

        {/* Orta: Kurumsal Menü + Sosyal */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-4">{translate("footer.corporate.title")}</h4>
          <ul className="space-y-2 text-[15px]">
            <li><Link href={localizedHref("/kisisel-verilerinin-korunmasi")}>{translate("footer.corporate.dataProtection")}</Link></li>
            <li><Link href={localizedHref("/gizlilik-politikasi")}>{translate("footer.corporate.privacyPolicy")}</Link></li>
            <li><Link href={localizedHref("/teslimat-ve-iade")}>{translate("footer.corporate.deliveryReturn")}</Link></li>
            <li><Link href={localizedHref("/sikca-sorulan-sorular")}>{translate("footer.corporate.faq")}</Link></li>
            <li><Link href={localizedHref("/fiyatlar")}>{translate("footer.corporate.pricing")}</Link></li>
            <li><Link href={localizedHref("/iletisim")}>{translate("footer.corporate.contact")}</Link></li>
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
          <h4 className="font-semibold text-lg mb-4">{translate("footer.quickMenu.title")}</h4>
          <ul className="space-y-2 text-[15px]">
            <li className="font-semibold mt-2">{translate("footer.quickMenu.platform.title")}</li>
            <li><Link href={localizedHref("/termografik-inceleme")}>{translate("footer.quickMenu.platform.thermographic")}</Link></li>
            <li><Link href={localizedHref("/denetim-ve-muayene")}>{translate("footer.quickMenu.platform.inspection")}</Link></li>
            <li><Link href={localizedHref("/santral-yonetimi")}>{translate("footer.quickMenu.platform.powerPlant")}</Link></li>

            <li className="font-semibold mt-4">{translate("footer.quickMenu.resources.title")}</li>
            <li><Link href={localizedHref("/support")}>{translate("footer.quickMenu.resources.knowledgeBase")}</Link></li>
            <li><Link href={localizedHref("/blog")}>{translate("footer.quickMenu.resources.blog")}</Link></li>
            <li><Link href={localizedHref("/sikca-sorulan-sorular")}>{translate("footer.quickMenu.resources.faq")}</Link></li>

            <li className="font-semibold mt-4">{translate("footer.quickMenu.corporate.title")}</li>
            <li><Link href={localizedHref("/kurumsal")}>{translate("footer.quickMenu.corporate.about")}</Link></li>
            <li><Link href={localizedHref("/ar-ge")}>{translate("footer.quickMenu.corporate.rAndD")}</Link></li>
            <li><Link href={localizedHref("/kariyer")}>{translate("footer.quickMenu.corporate.career.title")}</Link></li>
            <li className="pl-4">↳ <Link href={localizedHref("/kariyer")}>{translate("footer.quickMenu.corporate.career.openPositions")}</Link></li>
            <li className="pl-4">↳ <Link href={localizedHref("/staj-programi")}>{translate("footer.quickMenu.corporate.career.internship")}</Link></li>
            <li><Link href={localizedHref("/iletisim")}>{translate("footer.quickMenu.corporate.contact")}</Link></li>
          </ul>
        </div>
      </div>

      {/* Alt: Ödeme ve Güvenlik Logoları */}
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {paymentLogos.map((logo, index) => (
            <div key={index} className="relative hover:opacity-90 transition-all duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={35}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;