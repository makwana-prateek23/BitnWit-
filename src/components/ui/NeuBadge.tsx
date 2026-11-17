'use client';

import React from 'react';

export type NeuBadgeColor = 'default' | 'purple' | 'yellow' | 'maroon' | 'green' | 'orange';
export type NeuBadgeSize = 'sm' | 'md';

interface NeuBadgeProps {
  color?: NeuBadgeColor;
  variant?: 'raised' | 'recessed' | 'flat';
  size?: NeuBadgeSize;
  pulseDot?: boolean;
  pulseColor?: string;
  className?: string;
  children: React.ReactNode;
}

export default function NeuBadge({
  color = 'default',
  variant = 'raised',
  size = 'md',
  pulseDot = false,
  pulseColor,
  className = '',
  children,
}: NeuBadgeProps) {
  const colorStyles = {
    default: 'text-neu-text border-neu-border',
    purple: 'text-neu-purple border-neu-purple/30',
    yellow: 'text-amber-700 dark:text-amber-300 border-amber-300/40',
    maroon: 'text-[#642E42] dark:text-[#A95B73] border-[#642E42]/30',
    green: 'text-emerald-700 dark:text-emerald-400 border-emerald-300/30',
    orange: 'text-orange-700 dark:text-orange-400 border-orange-300/30',
  }[color];

  const variantStyles = {
    raised: 'neu-raised-sm',
    recessed: 'neu-recessed',
    flat: 'neu-flat',
  }[variant];

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3.5 py-1.5 text-xs',
  }[size];

  const defaultDotColor = {
    default: 'bg-neu-purple',
    purple: 'bg-neu-purple',
    yellow: 'bg-neu-yellow',
    maroon: 'bg-[#642E42] dark:bg-[#A95B73]',
    green: 'bg-emerald-500',
    orange: 'bg-orange-500',
  }[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${sizeStyles} ${variantStyles} ${colorStyles} ${className}`}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              pulseColor || defaultDotColor
            }`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              pulseColor || defaultDotColor
            }`}
          />
        </span>
      )}
      {children}
    </span>
  );
}
