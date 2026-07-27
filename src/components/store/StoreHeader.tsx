// src/components/store/StoreHeader.tsx
"use client";

import Link from 'next/link';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import { useTheme, colorSchemes } from '@/context/ThemeContext';

export default function StoreHeader() {
  const { color } = useTheme();
  const colors = colorSchemes[color];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏪</span>
            <span className={`text-2xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
              ServiceStore
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
              ❤️ <span className="hidden sm:inline">Wishlist</span>
            </button>
            
            {/* Cart */}
            <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
              🛒 <span className="hidden sm:inline">Cart</span>
            </button>
            
            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}