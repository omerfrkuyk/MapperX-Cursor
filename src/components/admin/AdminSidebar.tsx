'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Globe,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: {
    name: string;
    href: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Blog Yönetimi',
    href: '/admin/blogs',
    icon: FileText,
    children: [
      {
        name: 'Tüm Yazılar',
        href: '/admin/blogs'
      },
      {
        name: 'Yeni Yazı',
        href: '/admin/blogs/create'
      }
    ]
  },
  {
    name: 'SEO Yönetimi',
    href: '/admin/seo',
    icon: Globe
  },
  {
    name: 'Ayarlar',
    href: '/admin/settings',
    icon: Settings
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isExpanded = (name: string) => expandedItems.includes(name);

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-5rem)]">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.children ? (
              // Menü öğesinin alt öğeleri varsa
              <div>
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isExpanded(item.name) ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isExpanded(item.name) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm rounded-md ${
                          isActive(child.href)
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Menü öğesinin alt öğeleri yoksa
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
} 