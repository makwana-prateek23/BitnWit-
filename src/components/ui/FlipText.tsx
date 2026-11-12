'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlipTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function FlipText({
  words,
  className,
  interval = 2800
}: FlipTextProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={cn('relative inline-block overflow-hidden py-1 align-bottom', className)}>
      <motion.span
        key={index}
        initial={{ y: '100%', opacity: 0, rotateX: -60 }}
        animate={{ y: '0%', opacity: 1, rotateX: 0 }}
        exit={{ y: '-100%', opacity: 0, rotateX: 60 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="inline-block transform-gpu font-extrabold text-gradient drop-shadow-xs"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
