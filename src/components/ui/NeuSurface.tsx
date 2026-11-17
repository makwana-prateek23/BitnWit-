'use client';

import React from 'react';

export type NeuVariant = 'raised' | 'raised-sm' | 'raised-lg' | 'pressed' | 'recessed' | 'flat';

interface NeuSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NeuVariant;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function NeuSurface({
  variant = 'raised',
  interactive = false,
  className = '',
  children,
  ...props
}: NeuSurfaceProps) {
  const variantClass = {
    raised: 'neu-raised',
    'raised-sm': 'neu-raised-sm',
    'raised-lg': 'neu-raised-lg',
    pressed: 'neu-pressed',
    recessed: 'neu-recessed',
    flat: 'neu-flat',
  }[variant];

  const interactiveClass = interactive ? 'neu-interactive cursor-pointer' : '';

  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${variantClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
