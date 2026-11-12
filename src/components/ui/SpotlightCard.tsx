'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  tiltIntensity?: number;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(109, 31, 162, 0.16)', // Brand purple
  enableTilt = true,
  tiltIntensity = 10,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      setMousePos({ x: relativeX, y: relativeY });

      if (enableTilt) {
        // Calculate tilt between -tiltIntensity and +tiltIntensity
        const width = rect.width;
        const height = rect.height;
        const normalizedX = (relativeX / width - 0.5) * 2;
        const normalizedY = (relativeY / height - 0.5) * 2;

        x.set(-normalizedY * tiltIntensity); // rotateX
        y.set(normalizedX * tiltIntensity);  // rotateY
      }
    },
    [enableTilt, tiltIntensity, x, y]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: enableTilt ? mouseXSpring : 0,
        rotateY: enableTilt ? mouseYSpring : 0,
        transformStyle: 'preserve-3d'
      }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white transition-shadow duration-300',
        isHovered ? 'shadow-2xl shadow-purple-900/10' : 'shadow-xs',
        className
      )}
      {...props}
    >
      {/* Interactive Cursor Spotlight Follow */}
      <div
        className="pointer-events-none absolute -inset-px z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`
        }}
        aria-hidden="true"
      />

      {/* Border Glow Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 121, 14, 0.3), transparent 70%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude'
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-30 h-full">{children}</div>
    </motion.div>
  );
}
