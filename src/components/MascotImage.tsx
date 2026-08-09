'use client';

import { useState } from 'react';
import RabbitMark from './RabbitMark';

interface MascotImageProps {
  className?: string;
}

export default function MascotImage({ className = '' }: MascotImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-line bg-cloud p-8 text-center ${className}`}>
        <RabbitMark size={72} className="text-rabbit" badge={false} />
        <p className="mt-6 text-lg font-semibold text-ink">White Rabbit mascot</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Place your generated mascot file at <span className="font-mono text-sm text-ink">/public/rabbit-mascot.png</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mascot-frame">
      <img
        src="/rabbit-mascot.png"
        alt="White Rabbit mascot with laptop"
        className={`mascot-image relative max-h-[520px] min-h-[320px] w-full object-cover object-center ${className}`}
        onError={() => setError(true)}
      />
    </div>
  );
}
