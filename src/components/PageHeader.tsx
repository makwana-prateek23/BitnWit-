'use client';

import React from 'react';
import GlassHero from './ui/GlassHero';
import ShimmerBadge from './ui/ShimmerBadge';

interface PageHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <GlassHero
      badge={
        <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="text-xs font-bold uppercase tracking-[0.25em]">
          {eyebrow}
        </ShimmerBadge>
      }
      title={title}
      description={description}
      actions={actions}
    />
  );
}
