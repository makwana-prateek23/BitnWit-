'use client';

import React from 'react';
import NeuSurface from './ui/NeuSurface';
import NeuBadge from './ui/NeuBadge';

interface PageHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <NeuSurface variant="raised" className="rounded-[2.5rem] p-8 sm:p-12 lg:p-16 space-y-6">
      <NeuBadge color="purple" variant="recessed" pulseDot>
        {eyebrow}
      </NeuBadge>
      <h1 className="font-display hero-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neu-text leading-[1.08]">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base sm:text-lg text-neu-textSec leading-relaxed">
          {description}
        </p>
      )}
      {actions && (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {actions}
        </div>
      )}
    </NeuSurface>
  );
}
