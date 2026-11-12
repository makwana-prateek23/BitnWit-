'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
}

interface SpotlightNavbarProps {
  items: NavItem[];
  className?: string;
}

export default function SpotlightNavbar({ items, className }: SpotlightNavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSpotlightPos({ x, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={navRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex items-center rounded-full border border-slate-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-slate-300 hover:shadow-md',
        className
      )}
    >
      {/* Vengeance UI Cursor Follow Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-full transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(110px circle at ${spotlightPos.x}px 50%, rgba(109, 31, 162, 0.15) 0%, transparent 80%)`
        }}
        aria-hidden="true"
      />

      <nav className="relative z-10 flex items-center gap-1">
        {items.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const isHovered = hoveredIdx === idx;

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={cn(
                'relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 sm:text-sm',
                isActive
                  ? 'text-white'
                  : 'text-slate-600 hover:text-ink'
              )}
            >
              {/* Active Tab Spring Glow Pill (Vengeance UI Active Ambience) */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-rabbit shadow-md shadow-rabbit/30"
                />
              )}

              {/* Hover Pill for inactive tabs */}
              {!isActive && isHovered && (
                <motion.div
                  layoutId="hover-nav-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  className="absolute inset-0 -z-10 rounded-full bg-slate-100"
                />
              )}

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
