'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Language = 'tr' | 'en' | 'de' | 'it' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // URL'den dil kodunu al veya varsayılan olarak 'tr' kullan
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const langFromPath = path.split('/')[1] as Language;
      return ['tr', 'en', 'de', 'it', 'fr'].includes(langFromPath) ? langFromPath : 'tr';
    }
    return 'tr';
  });
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // URL'den dil kodunu al
    const langFromPath = pathname.split('/')[1] as Language;
    if (['tr', 'en', 'de', 'it', 'fr'].includes(langFromPath) && langFromPath !== currentLanguage) {
      setCurrentLanguage(langFromPath);
    }
  }, [pathname]);

  useEffect(() => {
    // Dil değiştiğinde çevirileri yükle
    loadTranslations(currentLanguage);
  }, [currentLanguage]);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    try {
      const translationModule = await import(`./translations/${lang}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Hata durumunda boş obje yerine fallback dil (İngilizce) çevirilerini yükle
      if (lang !== 'en') {
        const fallbackModule = await import('./translations/en.json');
        setTranslations(fallbackModule.default);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = (lang: Language) => {
    if (lang === currentLanguage) return;
    
    setCurrentLanguage(lang);
    
    // URL'yi güncelle
    const segments = pathname.split('/');
    if (['tr', 'en', 'de', 'it', 'fr'].includes(segments[1])) {
      segments[1] = lang;
    } else {
      segments.splice(1, 0, lang);
    }
    router.push(segments.join('/'));
  };

  const translate = (key: string): any => {
    if (isLoading || !translations) return '';
    
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value ?? key;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 