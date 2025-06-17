// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  const { currentLanguage, setLanguage, translate } = useLanguage();
  const pathname = usePathname();

  const languages = {
    tr: 'Türkçe',
    en: 'English',
    de: 'Deutsch',
    it: 'Italiano',
    fr: 'Français'
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
        name: 'nav.support',
        path: 'support'
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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={getLocalizedRoute('home', currentLanguage)}>
                <img className="h-8 w-auto" src="/logo.png" alt="MapperX" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={getLocalizedRoute('home', currentLanguage)}
                className={`${
                  isActivePath('home')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {translate('nav.home')}
        </Link>
              <DropdownMenu {...platformMenu} />
              <DropdownMenu {...resourcesMenu} />
              <DropdownMenu {...corporateMenu} />
              <Link
                href={getLocalizedRoute('pricing', currentLanguage)}
                className={`${
                  isActivePath('pricing')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {translate('nav.pricing')}
              </Link>
            </div>
          </div>

          {/* Dil seçim dropdown'ı */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
        <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as keyof typeof languages)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white shadow-sm"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobil menü butonu */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href={getLocalizedRoute('home', currentLanguage)}
            className={`${
              isActivePath('home')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
          >
            {translate('nav.home')}
          </Link>
          {[...platformMenu.items, ...resourcesMenu.items].map((item) => (
            <Link
              key={item.path}
              href={getLocalizedRoute(item.path, currentLanguage)}
              className={`${
                isActivePath(item.path)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
            >
              {translate(item.name)}
            </Link>
          ))}
          {corporateMenu.items.map((item) => (
            <div key={item.path}>
              <Link
                href={getLocalizedRoute(item.path, currentLanguage)}
                className={`${
                  isActivePath(item.path)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                {translate(item.name)}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.path}
                  href={getLocalizedRoute(child.path, currentLanguage)}
                  className={`${
                    isActivePath(child.path)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-8 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                >
                  {translate(child.name)}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href={getLocalizedRoute('pricing', currentLanguage)}
            className={`${
              isActivePath('pricing')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
          >
            {translate('nav.pricing')}
          </Link>
          {/* Mobil dil seçimi */}
          <div className="pl-3 pr-4 py-2">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as keyof typeof languages)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white shadow-sm"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}