'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';

// Geçici veri yapısı - daha sonra Firebase'den gelecek
interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

const TEMP_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Başlangıç ve Hesap Yönetimi',
    slug: 'baslangic-ve-hesap-yonetimi',
    children: [
      {
        id: '1-1',
        name: 'Platforma Giriş',
        slug: 'platforma-giris',
        children: [
          { id: '1-1-1', name: 'Üyelik Oluşturma', slug: 'uyelik-olusturma' },
          { id: '1-1-2', name: 'Şirket Oluşturma', slug: 'sirket-olusturma' },
          { id: '1-1-3', name: 'Santral Oluşturma', slug: 'santral-olusturma' },
          { id: '1-1-4', name: 'Yeni Sipariş Oluşturma', slug: 'yeni-siparis-olusturma' },
          { id: '1-1-5', name: 'Ödeme İşlemleri', slug: 'odeme-islemleri' },
          { id: '1-1-6', name: 'Fotoğraf ve Proje Planı Yükleme', slug: 'fotograf-ve-proje-plani-yukleme' },
          { id: '1-1-7', name: 'BOS Bileşenleri ve MapperX Studio', slug: 'bos-bilesenleri-ve-mapperx-studio' },
          { id: '1-1-8', name: 'Scada Yazılımı Entegrasyonu (Yakında)', slug: 'scada-yazilimi-entegrasyonu' }
        ]
      },
      {
        id: '1-2',
        name: 'Hesap Tercihleri ve Yönetimi',
        slug: 'hesap-tercihleri-ve-yonetimi',
        children: [
          {
            id: '1-2-1',
            name: 'Takım Oluşturma ve Yönetimi',
            slug: 'takim-olusturma-ve-yonetimi',
            children: [
              { id: '1-2-1-1', name: 'Alt Kullanıcı Oluşturma', slug: 'alt-kullanici-olusturma' },
              { id: '1-2-1-2', name: 'Alt Kullanıcı Yetkilendirme', slug: 'alt-kullanici-yetkilendirme' },
              { id: '1-2-1-3', name: 'Alt Kullanıcı Düzenleme', slug: 'alt-kullanici-duzenleme' },
              { id: '1-2-1-4', name: 'Alt Kullanıcı Silme', slug: 'alt-kullanici-silme' }
            ]
          },
          { id: '1-2-2', name: 'Kullanıcı Hesaplarının Yönetimi', slug: 'kullanici-hesaplarinin-yonetimi' },
          { id: '1-2-3', name: 'Sistem Dil Seçenekleri', slug: 'sistem-dil-secenekleri' },
          { id: '1-2-4', name: 'Bildirim Tercihlerini Ayarlama', slug: 'bildirim-tercihlerini-ayarlama' },
          { id: '1-2-5', name: 'Hesap Silme', slug: 'hesap-silme' },
          { id: '1-2-6', name: 'Şifre Sıfırlama', slug: 'sifre-sifirlama' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Platformun Tanıtımı ve Kullanımı',
    slug: 'platformun-tanitimi-ve-kullanimi',
    children: [
      {
        id: '2-1',
        name: 'Genel Özellikler',
        slug: 'genel-ozellikler',
        children: [
          { id: '2-1-1', name: 'Anomali Türleri ve Anomali İnceleme', slug: 'anomali-turleri-ve-anomali-inceleme' },
          { id: '2-1-2', name: 'Anomali Öncelikleri', slug: 'anomali-oncelikleri' },
          { id: '2-1-3', name: 'Sıcaklık Ölçümü ve Bilgisi', slug: 'sicaklik-olcumu-ve-bilgisi' },
          { id: '2-1-4', name: 'Santral Görünümü Filtreleme Özellikleri', slug: 'santral-gorunumu-filtreleme-ozellikleri' },
          { id: '2-1-5', name: 'Panel Elektriksel Ölçüm Değeri Ekleme', slug: 'panel-elektriksel-olcum-degeri-ekleme' },
          { id: '2-1-6', name: 'Panel Seri Numarası Ekleme', slug: 'panel-seri-numarasi-ekleme' },
          {
            id: '2-1-7',
            name: 'BOS Bileşenleri ve İnceleme',
            slug: 'bos-bilesenleri-ve-inceleme',
            children: [
              { id: '2-1-7-1', name: 'BOS Bileşenleri Fotoğraf Yükleme', slug: 'bos-bilesenleri-fotograf-yukleme' },
              { id: '2-1-7-2', name: 'BOS Bileşenleri Düzenleme', slug: 'bos-bilesenleri-duzenleme' },
              { id: '2-1-7-3', name: 'MapperX Studio Kullanımı', slug: 'mapperx-studio-kullanimi' }
            ]
          }
        ]
      },
      {
        id: '2-2',
        name: 'Santral Verimlilik Analizi',
        slug: 'santral-verimlilik-analizi',
        children: [
          { id: '2-2-1', name: 'Central Efficiency', slug: 'central-efficiency' },
          { id: '2-2-2', name: 'Finansal Kayıp Hesaplama', slug: 'finansal-kayip-hesaplama' }
        ]
      },
      {
        id: '2-3',
        name: 'İnceleme Ekranı ve Yönetimi',
        slug: 'inceleme-ekrani-ve-yonetimi',
        children: [
          { id: '2-3-1', name: 'Yeni İnceleme Oluşturma', slug: 'yeni-inceleme-olusturma' },
          { id: '2-3-2', name: 'Santral İnceleme Durumu', slug: 'santral-inceleme-durumu' },
          { id: '2-3-3', name: 'Santral Fotoğraf Yükleme ve Onaylama', slug: 'santral-fotograf-yukleme-ve-onaylama' },
          { id: '2-3-4', name: 'Santral Proje Dosyası Yükleme', slug: 'santral-proje-dosyasi-yukleme' },
          { id: '2-3-5', name: 'Santral İnceleme Başlatma', slug: 'santral-inceleme-baslatma' }
        ]
      },
      {
        id: '2-4',
        name: 'İş Akışları ve Görev Yönetimi',
        slug: 'is-akislari-ve-gorev-yonetimi',
        children: [
          { id: '2-4-1', name: 'İş Akışı Oluşturma ve Düzenleme', slug: 'is-akisi-olusturma-ve-duzenleme' },
          { id: '2-4-2', name: 'Görev Oluşturma ve İzleme', slug: 'gorev-olusturma-ve-izleme' },
          { id: '2-4-3', name: 'Görev Durumu Güncelleme ve Silme', slug: 'gorev-durumu-guncelleme-ve-silme' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Veri Toplama ve İşleme',
    slug: 'veri-toplama-ve-isleme',
    children: [
      {
        id: '3-1',
        name: 'Uçuş Planlama ve Veri Toplama',
        slug: 'ucus-planlama-ve-veri-toplama',
        children: [
          { id: '3-1-1', name: 'Uçuş Koşulları ve Ekipman Seçimi', slug: 'ucus-kosullari-ve-ekipman-secimi' },
          { id: '3-1-2', name: 'Uçuş Talimatları ve Veri Toplama Teknikleri', slug: 'ucus-talimatlari-ve-veri-toplama-teknikleri' },
          { id: '3-1-3', name: 'Desteklenen Drone Modelleri', slug: 'desteklenen-drone-modelleri' },
          { id: '3-1-4', name: 'DSM Uçuşu Planlama ve Kullanma', slug: 'dsm-ucusu-planlama-ve-kullanma' },
          { id: '3-1-5', name: 'GSD Nedir? Nasıl Kullanılır?', slug: 'gsd-nedir-nasil-kullanilir' },
          { id: '3-1-6', name: 'GNSS nedir? Neden kullanılır?', slug: 'gnss-nedir-neden-kullanilir' }
        ]
      },
      {
        id: '3-2',
        name: 'Drone Modelleri',
        slug: 'drone-modelleri',
        children: [
          { id: '3-2-1', name: 'DJI Mavic 3 Enterprise Thermal (M3T)', slug: 'dji-mavic-3-enterprise-thermal' },
          { id: '3-2-2', name: 'DJI Matrice 30T (M30T)', slug: 'dji-matrice-30t' },
          { id: '3-2-3', name: 'DJI Matrice 300 + H20T / H20N', slug: 'dji-matrice-300' },
          { id: '3-2-4', name: 'DJI Matrice 350 + H30T', slug: 'dji-matrice-350' }
        ]
      },
      {
        id: '3-3',
        name: 'Veri Yükleme ve İşleme',
        slug: 'veri-yukleme-ve-isleme',
        children: [
          { id: '3-3-1', name: 'Uçuş Verilerinin Aktarılması ve İşlenmesi', slug: 'ucus-verilerinin-aktarilmasi-ve-islenmesi' },
          { id: '3-3-2', name: 'İşlenen Verilerin İncelenmesi ve Onayı', slug: 'islenen-verilerin-incelenmesi-ve-onayi' }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Veri Analizi ve Raporlama',
    slug: 'veri-analizi-ve-raporlama',
    children: [
      {
        id: '4-1',
        name: 'Rapor Oluşturma ve Paylaşımı',
        slug: 'rapor-olusturma-ve-paylasimi',
        children: [
          { id: '4-1-1', name: 'Rapor Oluşturma ve İnceleme', slug: 'rapor-olusturma-ve-inceleme' },
          { id: '4-1-2', name: 'Analiz Sonuçlarının Paylaşımı', slug: 'analiz-sonuclarinin-paylasimi' }
        ]
      },
      {
        id: '4-2',
        name: 'Veri Dışa Aktarma ve Analiz',
        slug: 'veri-disa-aktarma-ve-analiz',
        children: [
          { id: '4-2-1', name: 'Veri Dışa Aktarma Formatları ve Kullanımları', slug: 'veri-disa-aktarma-formatlari-ve-kullanimlari' }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Tanımlar ve Ek Raporlar',
    slug: 'tanimlar-ve-ek-raporlar',
    children: [
      {
        id: '5-1',
        name: 'Anomali ve Veri Kavramları',
        slug: 'anomali-ve-veri-kavramlari',
        children: [
          { id: '5-1-1', name: 'Koordinat Sistemleri', slug: 'koordinat-sistemleri' },
          { id: '5-1-2', name: 'Dijital Modeller (Dijital İkiz)', slug: 'dijital-modeller' },
          { id: '5-1-3', name: 'Anomali ve Veri Tipi Tanımları', slug: 'anomali-ve-veri-tipi-tanimlari' }
        ]
      },
      {
        id: '5-2',
        name: 'Ek Raporlar ve Uygulamalar',
        slug: 'ek-raporlar-ve-uygulamalar',
        children: [
          { id: '5-2-1', name: 'Saha Ekspertiz Raporları', slug: 'saha-ekspertiz-raporlari' },
          { id: '5-2-2', name: 'Finansal ve Çevresel Etki Raporları', slug: 'finansal-ve-cevresel-etki-raporlari' },
          { id: '5-2-3', name: 'Doğal Afet Sonrası Raporlama', slug: 'dogal-afet-sonrasi-raporlama' },
          { id: '5-2-4', name: 'Devreye Alma ve Hasar Tespiti Raporları', slug: 'devreye-alma-ve-hasar-tespiti-raporlari' }
        ]
      }
    ]
  }
];

interface CategoryItemProps {
  category: Category;
  level?: number;
  currentLanguage: string;
}

const CategoryItem = ({ category, level = 0, currentLanguage }: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const baseUrl = `/${currentLanguage}/knowledge-base`;

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center gap-2 py-2 px-4 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors ${
          level > 0 ? 'pl-' + (level * 4 + 4) : ''
        }`}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 w-full text-left"
          >
            <span className="flex-shrink-0">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
            <span className="text-sm">{category.name}</span>
          </button>
        ) : (
          <Link
            href={`${baseUrl}/${category.slug}`}
            className="text-sm hover:text-blue-600 transition-colors w-full"
          >
            {category.name}
          </Link>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div className="w-full">
          {category.children?.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree = () => {
  const { translate, currentLanguage } = useLanguage();

  return (
    <div className="w-full py-2">
      {TEMP_CATEGORIES.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          currentLanguage={currentLanguage}
        />
      ))}
    </div>
  );
};

export default CategoryTree; 