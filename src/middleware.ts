import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './lib/i18n/routes'

const PUBLIC_FILE = /\.(.*)$/

// Supported locales
const locales = ['tr', 'en', 'de', 'it', 'fr']
const defaultLocale = 'tr'

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Eğer public dosyası ise (resimler, css, js vb.) middleware'i atla
  if (PUBLIC_FILE.test(pathname)) return

  // Dil kodlarını kontrol et
  const locale = pathname.split('/')[1]

  // Eğer URL'de dil kodu yoksa veya geçersiz bir dil kodu varsa
  if (!locale || !locales.includes(locale)) {
    // Varsayılan olarak Türkçe'ye yönlendir
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Ana sayfa kontrolü
  if (pathname === `/${locale}`) {
    return intlMiddleware(request)
  }

  // URL'yi normalize et
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const pathSegments = normalizedPath.split('/').slice(2) // Dil kodunu çıkar
  const currentPath = '/' + pathSegments.join('/')

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

  return intlMiddleware(request)
}

// Middleware'in çalışacağı path'leri belirt
export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 