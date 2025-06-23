// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getLocalizedRoute, routes } from '@/lib/i18n/routes';
import DropdownMenu from './DropdownMenu';
import { usePathname } from 'next/navigation';

interface MenuItem {
  name: string;
  path: keyof typeof routes;
  children?: MenuItem[];
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage, setLanguage, translate } = useLanguage();
  const pathname = usePathname();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = {
    tr: 'Türkçe',
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano'
  };

  const platformMenu: MenuSection = {
    label: translate('nav.platform'),
    items: [
      {
        name: 'nav.thermographic',
        path: 'thermographic'
      },
      {
        name: 'nav.inspection',
        path: 'inspection'
      },
      {
        name: 'nav.powerPlant',
        path: 'powerPlant'
      }
    ]
  };

  const resourcesMenu: MenuSection = {
    label: translate('nav.resources'),
    items: [
      {
        name: 'nav.knowledgeBase',
        path: 'knowledge-base'
      },
      {
        name: 'nav.blog',
        path: 'blog'
      },
      {
        name: 'nav.faq',
        path: 'faq'
      }
    ]
  };

  const corporateMenu: MenuSection = {
    label: translate('nav.corporate'),
    items: [
      {
        name: 'nav.about',
        path: 'corporate'
      },
      {
        name: 'nav.rAndD',
        path: 'ar-ge'
      },
      {
        name: 'nav.career',
        path: 'kariyer',
        children: [
          {
            name: 'nav.openPositions',
            path: 'kariyer'
          },
          {
            name: 'nav.internship',
            path: 'staj-programi'
          }
        ]
      },
      {
        name: 'nav.contact',
        path: 'contact'
      }
    ]
  };

  const isActivePath = (path: keyof typeof routes) => {
    return pathname === getLocalizedRoute(path, currentLanguage);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href={getLocalizedRoute('home', currentLanguage)} className="flex-shrink-0">
              <Image src="/logo.svg" alt="MapperX" width={140} height={40} priority />
            </Link>
            <div className="hidden md:ml-12 md:flex md:space-x-10">
              <DropdownMenu {...platformMenu} />
              <Link
                href={getLocalizedRoute('pricing', currentLanguage)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
              >
                {translate('nav.pricing')}
              </Link>
              <DropdownMenu {...resourcesMenu} />
              <DropdownMenu {...corporateMenu} />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Dil seçimi */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="text-base font-medium">{currentLanguage.toUpperCase()}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code as keyof typeof languages);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-base ${
                        currentLanguage === code
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MapperX APP butonu */}
            <a
              href="https://app.mapperx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors"
            >
              MapperX APP
            </a>

            {/* Mobil menü butonu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1">
          {[...platformMenu.items, ...resourcesMenu.items].map((item) => (
            <Link
              key={item.path}
              href={getLocalizedRoute(item.path, currentLanguage)}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {translate(item.name)}
            </Link>
          ))}
          <Link
            href={getLocalizedRoute('pricing', currentLanguage)}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {translate('nav.pricing')}
          </Link>
          {corporateMenu.items.map((item) => (
            <div key={item.path}>
              <Link
                href={getLocalizedRoute(item.path, currentLanguage)}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {translate(item.name)}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.path}
                  href={getLocalizedRoute(child.path, currentLanguage)}
                  className="block pl-8 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {translate(child.name)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}