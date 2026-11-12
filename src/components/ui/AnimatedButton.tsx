'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  text?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'glow';
  icon?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  asChild?: boolean;
}

export default function AnimatedButton({
  children,
  text,
  variant = 'primary',
  icon,
  showIcon = true,
  className,
  ...props
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const variantStyles = {
    primary:
      'bg-rabbit text-white shadow-lg shadow-rabbit/25 hover:bg-purple-800 hover:shadow-xl hover:shadow-rabbit/35 border border-purple-500/30',
    secondary:
      'bg-white text-ink border border-slate-200/90 shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:shadow-md',
    glass:
      'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40 shadow-lg',
    glow:
      'bg-gradient-to-r from-purple-700 via-rabbit to-signal text-white shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 border border-white/20'
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Vengeance UI Radial Spotlight Cursor Follow */}
      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.25), transparent 70%)`
        }}
        aria-hidden="true"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children || text}
      </span>

      {showIcon && (
        <motion.span
          className="relative z-10 inline-flex transition-transform duration-300 group-hover:translate-x-1"
        >
          {icon || <AiOutlineArrowRight className="h-4 w-4" />}
        </motion.span>
      )}
    </motion.button>
  );
}
