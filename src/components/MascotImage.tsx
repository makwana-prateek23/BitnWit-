'use client';

import { useState } from 'react';
import { Mascot } from './ui/Mascot';

interface MascotImageProps {
  src?: string;
  directions?: string;
  reactions?: string;
  size?: number;
  alt?: string;
  className?: string;
}

export default function MascotImage({
  src,
  directions = '/mascots/bitty-directions.webp',
  reactions = '/mascots/bitty-reactions.webp',
  size = 260,
  alt = 'Bitty — Official BITnWIT Mascot',
  className = ''
}: MascotImageProps) {
  const [error, setError] = useState(false);

  // If a specific static image source is requested (e.g. custom about banner)
  if (src && !error) {
    return (
      <div className={`mascot-frame ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain rounded-2xl mx-auto"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  // Default interactive cursor-tracking & boop-reactive Mascot
  return (
    <div className={`mascot-frame flex flex-col items-center justify-center ${className}`}>
      <Mascot
        directions={directions}
        reactions={reactions}
        size={size}
        label={alt}
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
