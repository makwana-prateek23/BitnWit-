'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

interface NeuThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function NeuThemeToggle({ className = '', showLabel = false }: NeuThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-9 w-16 rounded-full neu-recessed ${className}`} aria-hidden="true" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-xs font-bold text-neu-textSec uppercase tracking-wider">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
        className="relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full neu-recessed p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-red"
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full neu-raised transition-transform duration-300 ${
            isDark ? 'translate-x-7 text-white' : 'translate-x-0 text-navy'
          }`}
        >
          {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
        </span>
      </button>
    </div>
  );
}
