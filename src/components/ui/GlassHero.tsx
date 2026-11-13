'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedRays from './AnimatedRays';
import { cn } from '@/lib/utils';

interface GlassHeroProps {
  children?: React.ReactNode;
  className?: string;
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  proof?: React.ReactNode;
  raysColor?: string;
  raysSecondaryColor?: string;
  raysSpeed?: number;
  blobColor1?: string;
  blobColor2?: string;
}

export default function GlassHero({
  children,
  className,
  badge,
  title,
  description,
  actions,
  visual,
  proof,
  raysColor = 'rgba(109, 31, 162, 0.45)', // BITnWIT Purple
  raysSecondaryColor = 'rgba(255, 121, 14, 0.35)', // BITnWIT Amber
  raysSpeed = 0.0015
}: GlassHeroProps) {
  return (
    <section
      className={cn(
        'glass-hero relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] p-7 sm:p-11 lg:p-14 2xl:p-20 transition-all duration-500',
        className
      )}
    >
      {/* Vengeance UI Volumetric Atmospheric Light Rays */}
      <AnimatedRays
        color={raysColor}
        secondaryColor={raysSecondaryColor}
        speed={raysSpeed}
        className="opacity-70"
      />

      {/* Ambient Gradient Glow Orbs shining through the frosted glass */}
      <div
        className="pointer-events-none absolute -top-28 -left-20 h-96 w-96 rounded-full bg-rabbit/20 blur-[100px] animate-pulse"
        style={{ animationDuration: '8s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-signal/15 blur-[100px] animate-pulse"
        style={{ animationDuration: '10s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]"
        aria-hidden="true"
      />

      {/* Cyber Grid Dot Matrix Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(rgba(109,31,162,0.6)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Specular Top Edge Crystal Highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        aria-hidden="true"
      />

      {/* Custom Children or Standard Two-Column Layout */}
      {children ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center 2xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && <div className="mb-5">{badge}</div>}

            {title && (
              <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.08]">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-6 max-w-2xl text-base sm:text-lg 2xl:text-xl leading-relaxed text-slate-700">
                {description}
              </p>
            )}

            {actions && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {actions}
              </div>
            )}

            {proof && (
              <div className="mt-10 pt-6 border-t border-slate-200/50">
                {proof}
              </div>
            )}
          </motion.div>

          {visual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {visual}
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
