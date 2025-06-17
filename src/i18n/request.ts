import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';

export default getRequestConfig(async (params: GetRequestConfigParams) => {
  const locale = params.locale ?? 'tr'; // Fallback to 'tr' if locale is undefined
  return {
    locale,
    messages: (await import(`../lib/i18n/translations/${locale}.json`)).default
  };
}); 