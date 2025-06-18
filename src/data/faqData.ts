import { useLanguage } from '@/lib/i18n/LanguageContext';

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const useFaqData = (): FAQItem[] => {
  const { translate } = useLanguage();

  return [
    // Termografik Muayene Soruları
    {
      id: 'termografik-muayene-nedir',
      question: translate('faq.items.termografik-muayene-nedir.question'),
      answer: translate('faq.items.termografik-muayene-nedir.answer'),
      category: 'thermographic'
    },
    {
      id: 'termografik-muayene-neden-onemlidir',
      question: translate('faq.items.termografik-muayene-neden-onemlidir.question'),
      answer: translate('faq.items.termografik-muayene-neden-onemlidir.answer'),
      category: 'thermographic'
    },
    {
      id: 'termografik-muayene-nasil-yapilir',
      question: translate('faq.items.termografik-muayene-nasil-yapilir.question'),
      answer: translate('faq.items.termografik-muayene-nasil-yapilir.answer'),
      category: 'thermographic'
    },
    {
      id: 'termal-drone-kullanim-avantajlari',
      question: translate('faq.items.termal-drone-kullanim-avantajlari.question'),
      answer: translate('faq.items.termal-drone-kullanim-avantajlari.answer'),
      category: 'thermographic'
    },
    {
      id: 'termografik-muayene-sonuclari-nasil-raporlanir',
      question: translate('faq.items.termografik-muayene-sonuclari-nasil-raporlanir.question'),
      answer: translate('faq.items.termografik-muayene-sonuclari-nasil-raporlanir.answer'),
      category: 'thermographic'
    },
    {
      id: 'termografik-muayene-siklik',
      question: translate('faq.items.termografik-muayene-siklik.question'),
      answer: translate('faq.items.termografik-muayene-siklik.answer'),
      category: 'thermographic'
    },
    {
      id: 'hangi-arizalar-tespit-edilebilir',
      question: translate('faq.items.hangi-arizalar-tespit-edilebilir.question'),
      answer: translate('faq.items.hangi-arizalar-tespit-edilebilir.answer'),
      category: 'thermographic'
    },
    {
      id: 'veri-analiz-algoritmalari',
      question: translate('faq.items.veri-analiz-algoritmalari.question'),
      answer: translate('faq.items.veri-analiz-algoritmalari.answer'),
      category: 'thermographic'
    },
    {
      id: 'enerji-verimliligi-artirma',
      question: translate('faq.items.enerji-verimliligi-artirma.question'),
      answer: translate('faq.items.enerji-verimliligi-artirma.answer'),
      category: 'thermographic'
    },
    // Denetim ve Muayene Soruları
    {
      id: 'denetim-ve-muayene-nedir',
      question: translate('faq.items.denetim-ve-muayene-nedir.question'),
      answer: translate('faq.items.denetim-ve-muayene-nedir.answer'),
      category: 'inspection'
    },
    {
      id: 'denetim-ve-muayene-neden-onemlidir',
      question: translate('faq.items.denetim-ve-muayene-neden-onemlidir.question'),
      answer: translate('faq.items.denetim-ve-muayene-neden-onemlidir.answer'),
      category: 'inspection'
    },
    {
      id: 'denetim-ve-muayene-testler',
      question: translate('faq.items.denetim-ve-muayene-testler.question'),
      answer: translate('faq.items.denetim-ve-muayene-testler.answer'),
      category: 'inspection'
    },
    {
      id: 'platform-yardim',
      question: translate('faq.items.platform-yardim.question'),
      answer: translate('faq.items.platform-yardim.answer'),
      category: 'inspection'
    },
    {
      id: 'veri-toplama-analiz',
      question: translate('faq.items.veri-toplama-analiz.question'),
      answer: translate('faq.items.veri-toplama-analiz.answer'),
      category: 'inspection'
    },
    {
      id: 'kullanilan-ekipmanlar',
      question: translate('faq.items.kullanilan-ekipmanlar.question'),
      answer: translate('faq.items.kullanilan-ekipmanlar.answer'),
      category: 'inspection'
    },
    {
      id: 'standart-uyumluluk',
      question: translate('faq.items.standart-uyumluluk.question'),
      answer: translate('faq.items.standart-uyumluluk.answer'),
      category: 'inspection'
    },
    {
      id: 'zaman-maliyet-tasarrufu',
      question: translate('faq.items.zaman-maliyet-tasarrufu.question'),
      answer: translate('faq.items.zaman-maliyet-tasarrufu.answer'),
      category: 'inspection'
    },
    {
      id: 'raporlama-verilerimi-raporlayabilir-miyim',
      question: translate('faq.items.raporlama-verilerimi-raporlayabilir-miyim.question'),
      answer: translate('faq.items.raporlama-verilerimi-raporlayabilir-miyim.answer'),
      category: 'inspection'
    },
    {
      id: 'elektriksel-test-raporlayabilir-miyim',
      question: translate('faq.items.elektriksel-test-raporlayabilir-miyim.question'),
      answer: translate('faq.items.elektriksel-test-raporlayabilir-miyim.answer'),
      category: 'inspection'
    },
    {
      id: 'seri-numarasi-yonetimi-onemi',
      question: translate('faq.items.seri-numarasi-yonetimi-onemi.question'),
      answer: translate('faq.items.seri-numarasi-yonetimi-onemi.answer'),
      category: 'inspection'
    },
    {
      id: 'rapor-olusturma-procesi',
      question: translate('faq.items.rapor-olusturma-procesi.question'),
      answer: translate('faq.items.rapor-olusturma-procesi.answer'),
      category: 'inspection'
    },
    // Santral Yönetimi Soruları
    {
      id: 'santral-yonetimi-nedir',
      question: translate('faq.items.santral-yonetimi-nedir.question'),
      answer: translate('faq.items.santral-yonetimi-nedir.answer'),
      category: 'powerPlant'
    },
    {
      id: 'seri-numarasi-yonetimi-nedir-onemi',
      question: translate('faq.items.seri-numarasi-yonetimi-nedir-onemi.question'),
      answer: translate('faq.items.seri-numarasi-yonetimi-nedir-onemi.answer'),
      category: 'powerPlant'
    },
    {
      id: 'santral-yonetimi-finansal-kayiplar',
      question: translate('faq.items.santral-yonetimi-finansal-kayiplar.question'),
      answer: translate('faq.items.santral-yonetimi-finansal-kayiplar.answer'),
      category: 'powerPlant'
    },
    {
      id: 'meteorolojik-veriler-kullanimi',
      question: translate('faq.items.meteorolojik-veriler-kullanimi.question'),
      answer: translate('faq.items.meteorolojik-veriler-kullanimi.answer'),
      category: 'powerPlant'
    },
    {
      id: 'ekip-performansi-takip',
      question: translate('faq.items.ekip-performansi-takip.question'),
      answer: translate('faq.items.ekip-performansi-takip.answer'),
      category: 'powerPlant'
    },
    {
      id: 'verimlilik-artirma-onlemler',
      question: translate('faq.items.verimlilik-artirma-onlemler.question'),
      answer: translate('faq.items.verimlilik-artirma-onlemler.answer'),
      category: 'powerPlant'
    },
    {
      id: 'platform-yardimci-ozellikler',
      question: translate('faq.items.platform-yardimci-ozellikler.question'),
      answer: translate('faq.items.platform-yardimci-ozellikler.answer'),
      category: 'powerPlant'
    },
    {
      id: 'yonetimin-onemi',
      question: translate('faq.items.yonetimin-onemi.question'),
      answer: translate('faq.items.yonetimin-onemi.answer'),
      category: 'powerPlant'
    }
  ];
};