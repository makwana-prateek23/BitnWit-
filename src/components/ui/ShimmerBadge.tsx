'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShimmerBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  pulseDot?: boolean;
  pulseColor?: string;
}

export default function ShimmerBadge({
  children,
  className,
  icon,
  pulseDot = false,
  pulseColor = 'bg-emerald-400'
}: ShimmerBadgeProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-purple-500/25 bg-white/80 px-4 py-1.5 text-xs font-semibold text-rabbit shadow-xs backdrop-blur-md',
        className
      )}
    >
      {/* Vengeance UI Shimmer / Border Beam Sweep */}
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'linear'
        }}
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
        aria-hidden="true"
      />

      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              pulseColor
            )}
          />
          <span className={cn('relative inline-flex h-2 w-2 rounded-full', pulseColor)} />
        </span>
      )}

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </div>
  );
}
