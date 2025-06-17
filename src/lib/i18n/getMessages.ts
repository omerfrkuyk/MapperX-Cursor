import type { Locale } from './types';

export async function getMessages(locale: Locale) {
  try {
    return (await import(`./translations/${locale}.json`)).default;
  } catch (error) {
    throw new Error(`Failed to load messages for locale "${locale}"`);
  }
} 