import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n.config';

// Create and export the middleware
export default createMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,
  
  // Used when no locale matches
  defaultLocale: i18n.defaultLocale,

  // Paths that should not be internationalized
  localePrefix: 'as-needed',
  pathnames: {
    '/admin': '/admin',
    '/admin/blogs': '/admin/blogs',
    '/admin/blogs/create': '/admin/blogs/create',
    '/admin/blogs/edit/[slug]': '/admin/blogs/edit/[slug]',
    '/admin/seo': '/admin/seo',
  }
});

export const config = {
  // Match all pathnames except for
  // - ... (e.g. files, api routes)
  // - /_next (Next.js internals)
  // - /admin (our admin routes)
  // - /static (public files)
  matcher: ['/((?!api|_next|admin|static|.*\\..*).*)']
}; 