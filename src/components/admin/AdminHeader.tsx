'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Bell, Settings, LogOut } from 'lucide-react';

export default function AdminHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/tr/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            MapperX Admin Panel
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Bildirimler"
          >
            <Bell size={20} />
          </button>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Ayarlar"
          >
            <Settings size={20} />
          </button>

          <div className="flex items-center space-x-3 ml-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">
                {user?.email}
              </div>
              <div className="text-xs text-gray-500">
                Admin
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
              title="Çıkış Yap"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 