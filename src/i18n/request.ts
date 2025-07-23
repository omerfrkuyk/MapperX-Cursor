import { getRequestConfig } from 'next-intl/server';
import { i18n } from '../i18n.config';

export default getRequestConfig(async ({ locale }) => {
  // Eğer locale undefined ise varsayılan dili kullan
  const currentLocale = locale || i18n.defaultLocale;
  
  try {
    const messages = (await import(`../lib/i18n/translations/${currentLocale}.json`)).default;
    return {
      locale: currentLocale,
      messages,
      timeZone: 'Europe/Istanbul'
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${currentLocale}"`, error);
    // Hata durumunda varsayılan dili kullan
    const defaultMessages = (await import(`../lib/i18n/translations/${i18n.defaultLocale}.json`)).default;
  return {
      locale: i18n.defaultLocale,
      messages: defaultMessages,
      timeZone: 'Europe/Istanbul'
  };
  }
}); 