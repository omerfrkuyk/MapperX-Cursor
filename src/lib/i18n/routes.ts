type RouteConfig = {
  [key: string]: {
    tr: string;
    en: string;
    de: string;
    fr: string;
    it: string;
  };
};

export const routes: RouteConfig = {
  home: {
    tr: '/tr',
    en: '/en',
    de: '/de',
    fr: '/fr',
    it: '/it'
  },
  thermographic: {
    tr: '/tr/platform/termografik-inceleme',
    en: '/en/platform/thermographic-inspection',
    de: '/de/plattform/thermografische-untersuchung',
    fr: '/fr/plateforme/inspection-thermographique',
    it: '/it/piattaforma/ispezione-termografica'
  },
  inspection: {
    tr: '/tr/platform/denetim-ve-muayene',
    en: '/en/platform/inspection-and-audit',
    de: '/de/plattform/inspektion-und-ueberpruefung',
    fr: '/fr/plateforme/inspection-et-audit',
    it: '/it/piattaforma/ispezione-e-verifica'
  },
  powerPlant: {
    tr: '/tr/platform/santral-yonetimi',
    en: '/en/platform/power-plant-management',
    de: '/de/plattform/kraftwerksmanagement',
    fr: '/fr/plateforme/gestion-de-centrale',
    it: '/it/piattaforma/gestione-della-centrale'
  },
  pricing: {
    tr: '/tr/fiyatlar',
    en: '/en/prices',
    de: '/de/preise',
    fr: '/fr/prix',
    it: '/it/prezzi'
  },
  support: {
    tr: 'https://support.mapperx.com',
    en: 'https://support.mapperx.com/en/knowledge-base',
    de: 'https://support.mapperx.com/de/knowledge-base-2',
    fr: 'https://support.mapperx.com/fr/knowledge-base-3',
    it: 'https://support.mapperx.com/it/knowledge-base-4'
  },
  blog: {
    tr: '/blog',
    en: '/en/blog',
    de: '/de/blog',
    fr: '/fr/blog',
    it: '/it/blog'
  },
  faq: {
    tr: '/tr/sikca-sorulan-sorular',
    en: '/en/faq',
    de: '/de/faq',
    fr: '/fr/faq',
    it: '/it/faq'
  },
  corporate: {
    tr: '/tr/kurumsal',
    en: '/en/corporate',
    de: '/de/unternehmen',
    fr: '/fr/entreprise',
    it: '/it/aziendale'
  },
  'ar-ge': {
    tr: '/tr/ar-ge',
    en: '/en/rd',
    de: '/de/fe',
    fr: '/fr/rd',
    it: '/it/rs'
  },
  kariyer: {
    tr: '/kariyer',
    en: '/en/career',
    de: '/de/karriere',
    fr: '/fr/carriere',
    it: '/it/carriera'
  },
  'staj-programi': {
    tr: '/staj-programi',
    en: '/en/internship',
    de: '/de/praktikum',
    fr: '/fr/stage',
    it: '/it/tirocinio'
  },
  contact: {
    tr: '/tr/iletisim',
    en: '/en/contact',
    de: '/de/kontakt',
    fr: '/fr/contact',
    it: '/it/contatto'
  }
};

export function getLocalizedRoute(routeKey: keyof typeof routes, locale: string) {
  return routes[routeKey][locale as keyof (typeof routes)[typeof routeKey]];
}

export function getRouteKeyFromPath(path: string, locale: string): string | null {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  for (const [key, value] of Object.entries(routes)) {
    if (value[locale as keyof typeof value] === normalizedPath) {
      return key;
    }
  }
  
  return null;
}

export function translateUrl(currentPath: string, fromLocale: string, toLocale: string): string {
  const routeKey = getRouteKeyFromPath(currentPath, fromLocale);
  if (!routeKey) return currentPath;
  
  return routes[routeKey][toLocale as keyof (typeof routes)[typeof routeKey]] || currentPath;
} 