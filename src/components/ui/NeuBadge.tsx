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
    default: 'text-navy border-navy/20 dark:text-cream dark:border-cream/20',
    purple: 'text-navy border-navy/30 dark:text-cream dark:border-cream/30',
    yellow: 'text-navy border-navy/25 dark:text-cream dark:border-cream/25',
    maroon: 'text-navy border-navy/25 dark:text-cream dark:border-cream/25',
    green: 'text-emerald-700 dark:text-emerald-400 border-emerald-300/30',
    orange: 'text-red border-red/30',
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
    default: 'bg-red',
    purple: 'bg-red',
    yellow: 'bg-navy',
    maroon: 'bg-navy',
    green: 'bg-emerald-500',
    orange: 'bg-red',
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
