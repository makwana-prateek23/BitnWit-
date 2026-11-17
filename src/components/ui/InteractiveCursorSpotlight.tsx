'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveCursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring mouse positions for the fluid cursor follower
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailingConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const trailingX = useSpring(mouseX, trailingConfig);
  const trailingY = useSpring(mouseY, trailingConfig);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse), skip touch devices
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .interactive-hover');
        setIsHoveredInteractive(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* 1. Ambient Dynamic Light Spotlight - illuminates Neumorphic surfaces under cursor */}
      <motion.div
        className="absolute h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{
          x: trailingX,
          y: trailingY,
          background:
            'radial-gradient(circle, rgba(139, 124, 246, 0.16) 0%, rgba(245, 200, 76, 0.06) 40%, transparent 70%)',
        }}
      />

      {/* 2. Secondary soft accent focal beam */}
      <motion.div
        className="absolute h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
        style={{
          x: smoothX,
          y: smoothY,
          background:
            'radial-gradient(circle, rgba(154, 138, 255, 0.22) 0%, rgba(100, 46, 66, 0.08) 55%, transparent 75%)',
        }}
      />

      {/* 3. Sleek Precision Cursor Glow Dot */}
      <motion.div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neu-purple/70 shadow-[0_0_12px_rgba(139,124,246,0.8)] backdrop-blur-xs transition-transform duration-150"
        style={{
          x: smoothX,
          y: smoothY,
          scale: isHoveredInteractive ? 2.2 : 1,
          opacity: isHoveredInteractive ? 0.9 : 0.45,
        }}
      />

      {/* 4. Magnetic Interactive Ring expanding when hovering buttons/cards */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-neu-purple/40"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHoveredInteractive ? 48 : 28,
          height: isHoveredInteractive ? 48 : 28,
          scale: isHoveredInteractive ? 1.15 : 1,
          opacity: isHoveredInteractive ? 0.8 : 0.25,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      />
    </div>
  );
}
