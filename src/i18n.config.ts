export type Locale = 'tr' | 'en' | 'de' | 'fr' | 'it';

export const i18n = {
  defaultLocale: 'tr' as Locale,
  locales: ['tr', 'en', 'de', 'fr', 'it'] as Locale[],
} as const;

export type I18nConfig = typeof i18n; 