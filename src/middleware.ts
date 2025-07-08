import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from '@/i18n.config';
import { routes } from './lib/i18n/routes'

const PUBLIC_FILE = /\.(.*)$/

// Supported locales
const locales = ['tr', 'en', 'de', 'it', 'fr']
const defaultLocale = 'tr'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin route'larını kontrol et
  if (pathname.startsWith('/admin')) {
    // Admin sayfalarını olduğu gibi bırak
    return NextResponse.next();
  }

  // Public dosyaları ve API route'larını bypass et
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Eğer pathname zaten desteklenen bir dil ile başlıyorsa
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale && !pathname.startsWith('/admin')) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  // Eğer public dosyası ise (resimler, css, js vb.) middleware'i atla
  if (PUBLIC_FILE.test(pathname)) return

  // URL'yi normalize et
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const pathSegments = normalizedPath.split('/')
  const locale = pathSegments[1] // Extract locale from the first segment after the leading slash
  const currentPath = '/' + pathSegments.slice(2).join('/') // Dil kodunu çıkar

  // Admin sayfaları için route kontrolü yapma
  if (currentPath.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Mevcut dildeki URL'yi bul
  let foundRoute = false
  for (const [key, value] of Object.entries(routes)) {
    if (value[locale as keyof typeof value] === normalizedPath) {
      foundRoute = true
      break
    }
  }

  // Eğer URL geçerli bir route değilse ve özel bir durum değilse (örn: api routes)
  if (!foundRoute && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    // 404 sayfasına yönlendir
    return NextResponse.redirect(new URL(`/${locale}/404`, request.url))
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirt
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|static|.*\\.).*)',
    // Optional: only run on root (/) URL
    '/',
    // Admin routes
    '/admin/:path*'
  ],
} 