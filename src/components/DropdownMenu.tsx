'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getLocalizedRoute, routes } from '@/lib/i18n/routes';

interface SubItem {
  name: string;
  path: keyof typeof routes;
  children?: SubItem[];
}

interface DropdownMenuProps {
  label: string;
  items: SubItem[];
}

const DropdownMenu = ({ label, items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { currentLanguage, translate } = useLanguage();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 100);
  };

  const handleSubmenuEnter = (path: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(path);
  };

  const handleSubmenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 100);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium inline-flex items-center">
        {label}
        <svg
          className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
          {items.map((item) => (
            <div
              key={String(item.path)}
              className="relative"
              onMouseEnter={() => handleSubmenuEnter(String(item.path))}
              onMouseLeave={handleSubmenuLeave}
            >
              <Link
                href={getLocalizedRoute(item.path, currentLanguage)}
                className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-between"
              >
                {translate(item.name)}
                {item.children && <ChevronRight className="w-4 h-4" />}
              </Link>

              {item.children && activeSubmenu === String(item.path) && (
                <div className="absolute left-full top-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100">
                  {item.children.map((child) => (
                    <Link
                      key={String(child.path)}
                      href={getLocalizedRoute(child.path, currentLanguage)}
                      className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {translate(child.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;