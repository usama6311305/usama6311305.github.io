// src/components/common/ThemeSwitcher.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode, ThemeColor, colorSchemes } from '@/context/ThemeContext';

const colorOptions: { value: ThemeColor; label: string; color: string }[] = [
  { value: 'purple', label: 'Purple', color: '#9C27B0' },
  { value: 'blue', label: 'Blue', color: '#2563EB' },
  { value: 'green', label: 'Green', color: '#16A34A' },
  { value: 'red', label: 'Red', color: '#DC2626' },
  { value: 'orange', label: 'Orange', color: '#F97316' },
  { value: 'pink', label: 'Pink', color: '#DB2777' },
  { value: 'teal', label: 'Teal', color: '#0D9488' },
];

const modeIcons = {
  light: '☀️',
  dark: '🌙',
  system: '🖥️',
};

const modeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

export default function ThemeSwitcher() {
  const { mode, color, setMode, setColor, toggleMode } = useTheme();
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsColorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentColor = colorSchemes[color];

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
      {/* Theme Mode Toggle */}
      <div className="flex items-center gap-1 bg-white/20 rounded-lg p-1">
        {(['light', 'dark', 'system'] as ThemeMode[]).map((modeOption) => (
          <button
            key={modeOption}
            onClick={() => setMode(modeOption)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              mode === modeOption
                ? 'bg-white text-gray-800 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="hidden sm:inline">{modeLabels[modeOption]}</span>
            <span className="sm:hidden">{modeIcons[modeOption]}</span>
          </button>
        ))}
      </div>

      {/* Color Picker Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition text-white text-sm font-medium"
        >
          <span>🎨</span>
          <span className="hidden sm:inline">Color</span>
          <span className="text-xs">▼</span>
        </button>

        {isColorDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setColor(option.value);
                    setIsColorDropdownOpen(false);
                  }}
                  className={`w-10 h-10 rounded-lg transition-all transform hover:scale-110 ${
                    color === option.value
                      ? 'ring-2 ring-offset-2 ring-gray-800 scale-110'
                      : 'hover:shadow-lg'
                  }`}
                  style={{ backgroundColor: option.color }}
                  title={option.label}
                >
                  {color === option.value && (
                    <span className="text-white text-lg flex items-center justify-center">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">Click to change theme color</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Toggle Button (Mobile friendly) */}
      <button
        onClick={toggleMode}
        className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition text-white text-sm font-medium"
      >
        {modeIcons[mode]}
      </button>
    </div>
  );
}