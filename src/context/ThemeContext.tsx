// src/context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'pink' | 'teal';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorSchemes = {
  purple: {
    primary: 'from-purple-600 to-pink-600',
    primaryLight: 'from-purple-500 to-pink-500',
    primaryDark: 'from-purple-700 to-pink-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-50',
    ring: 'ring-purple-500',
  },
  blue: {
    primary: 'from-blue-600 to-cyan-600',
    primaryLight: 'from-blue-500 to-cyan-500',
    primaryDark: 'from-blue-700 to-cyan-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-50',
    ring: 'ring-blue-500',
  },
  green: {
    primary: 'from-green-600 to-emerald-600',
    primaryLight: 'from-green-500 to-emerald-500',
    primaryDark: 'from-green-700 to-emerald-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    hover: 'hover:bg-green-50',
    ring: 'ring-green-500',
  },
  red: {
    primary: 'from-red-600 to-rose-600',
    primaryLight: 'from-red-500 to-rose-500',
    primaryDark: 'from-red-700 to-rose-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    hover: 'hover:bg-red-50',
    ring: 'ring-red-500',
  },
  orange: {
    primary: 'from-orange-600 to-amber-600',
    primaryLight: 'from-orange-500 to-amber-500',
    primaryDark: 'from-orange-700 to-amber-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-50',
    ring: 'ring-orange-500',
  },
  pink: {
    primary: 'from-pink-600 to-rose-600',
    primaryLight: 'from-pink-500 to-rose-500',
    primaryDark: 'from-pink-700 to-rose-700',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
    hover: 'hover:bg-pink-50',
    ring: 'ring-pink-500',
  },
  teal: {
    primary: 'from-teal-600 to-cyan-600',
    primaryLight: 'from-teal-500 to-cyan-500',
    primaryDark: 'from-teal-700 to-cyan-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-600',
    hover: 'hover:bg-teal-50',
    ring: 'ring-teal-500',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('purple');
  const [mounted, setMounted] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    const savedColor = localStorage.getItem('theme-color') as ThemeColor | null;
    
    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);
    setMounted(true);
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', mode);
      localStorage.setItem('theme-color', color);
      
      // Apply dark mode class
      if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [mode, color, mounted]);

  const toggleMode = () => {
    setMode(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, color, setMode, setColor, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { colorSchemes };