'use client';

import React from 'react';
import NeuSurface, { NeuVariant } from './NeuSurface';
import NeuTiltCard from './NeuTiltCard';

export interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NeuVariant;
  interactive?: boolean;
  tilt?: boolean;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function NeuCard({
  variant = 'raised',
  interactive = false,
  tilt = false,
  maxTilt = 5,
  scale = 1.02,
  glare = true,
  className = '',
  children,
  onClick,
  ...props
}: NeuCardProps) {
  // If tilt is explicitly set, OR interactive is true, activate 3D cursor tilt physics!
  const shouldTilt = tilt || interactive;

  if (shouldTilt) {
    const elevation =
      variant === 'raised-lg'
        ? 'raised-lg'
        : variant === 'raised-sm'
        ? 'raised-sm'
        : 'raised';

    return (
      <NeuTiltCard
        elevation={elevation}
        maxTilt={maxTilt}
        scale={scale}
        glare={glare}
        onClick={onClick}
        className={`p-6 sm:p-8 2xl:p-10 ${className}`}
        {...props}
      >
        {children}
      </NeuTiltCard>
    );
  }

  return (
    <NeuSurface
      variant={variant}
      interactive={interactive}
      onClick={onClick}
      className={`p-6 sm:p-8 2xl:p-10 ${className}`}
      {...props}
    >
      {children}
    </NeuSurface>
  );
}
