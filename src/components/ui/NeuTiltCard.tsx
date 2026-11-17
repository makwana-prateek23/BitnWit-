'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export interface NeuTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  elevation?: 'raised' | 'raised-sm' | 'raised-lg';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function NeuTiltCard({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.02,
  glare = true,
  elevation = 'raised',
  onClick,
  style,
  ...props
}: NeuTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse normalized position (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation and translation
  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position percentage (0% to 100%)
  const glareX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normalizedX = clientX / rect.width - 0.5;
    const normalizedY = clientY / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const elevationClass = {
    'raised-sm': isHovered ? 'neu-raised' : 'neu-raised-sm',
    raised: isHovered ? 'neu-raised-lg' : 'neu-raised',
    'raised-lg': 'neu-raised-lg',
  }[elevation];

  return (
    <div
      style={{ perspective: 1100, ...style }}
      className="relative rounded-2xl will-change-transform"
      {...props}
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
          y: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-2xl transition-shadow duration-300 ${elevationClass} ${className}`}
      >
        {/* Dynamic Specular Light Glare following the cursor */}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(420px circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.16), transparent 70%)`,
            }}
          />
        )}

        {/* Dynamic Edge Highlight Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.4 }}
        />

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 [transform:translateZ(20px)]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
