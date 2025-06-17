'use client';

import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
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
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition">
        {label}
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 rounded-xl bg-white shadow-xl border border-gray-200 w-56 z-50 py-2">
          {items.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition cursor-pointer">
                  {translate(item.name)}
                  <ChevronRight size={14} />
                </div>
                {activeSubmenu === item.name && (
                  <div className="absolute left-full top-0 ml-1 rounded-xl bg-white shadow-xl border border-gray-200 w-56 z-50 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={getLocalizedRoute(child.path, currentLanguage)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                      >
                        {translate(child.name)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                href={getLocalizedRoute(item.path, currentLanguage)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                {translate(item.name)}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;