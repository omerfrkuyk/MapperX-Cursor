export interface TranslationType {
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
  };
  languages: {
    tr: string;
    en: string;
    de: string;
    fr: string;
    it: string;
  };
  hero: {
    title: string;
    subtitle: string;
    imageAlt: string;
  };
  features: {
    section: {
      title: string;
      subtitle: string;
    };
    items: Array<{
      title: string;
      description: string;
      imageAlt: string;
    }>;
  };
  thermalInspection: {
    title: {
      line1: string;
      line2: string;
    };
    description: string;
    features: string[];
    button: string;
    images: {
      before: {
        src: string;
        alt: string;
      };
      after: {
        src: string;
        alt: string;
      };
    };
  };
}

export type Locale = 'tr' | 'en' | 'de' | 'fr' | 'it'; 