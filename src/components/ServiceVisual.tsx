'use client';

import { useState } from 'react';
import RabbitMark from './RabbitMark';

const serviceVisuals: Record<
  string,
  { src: string; alt: string; caption: string }
> = {
  'digital-marketing': {
    src: '/services/digital-marketing.png',
    alt: 'White Rabbit mascot presenting social media and digital marketing channels',
    caption: 'Marketing brilliance with every campaign'
  },
  'web-development': {
    src: '/services/web-development.png',
    alt: 'White Rabbit mascot showing a website design and code screen',
    caption: 'Modern websites built for performance and conversion'
  },
  'app-development': {
    src: '/services/app-development.png',
    alt: 'White Rabbit mascot building an app with mobile UI screens',
    caption: 'Smart app experiences for web and mobile'
  },
  'ui-ux-design': {
    src: '/services/ui-ux-design.png',
    alt: 'White Rabbit mascot presenting interface design and user experience screens',
    caption: 'Interfaces that feel polished, clear, and friendly'
  },
  'seo-analytics': {
    src: '/services/seo-analytics.png',
    alt: 'White Rabbit mascot analyzing search and metrics dashboards',
    caption: 'Search visibility and growth intelligence for your business'
  },
  'branding-strategy': {
    src: '/services/branding-strategy-v2.png',
    alt: 'White Rabbit mascot holding a brand identity board and colors',
    caption: 'Brand systems designed to cut through the noise'
  },
  'custom-code': {
    src: '/services/custom-code.png',
    alt: 'White Rabbit mascot customizing code for a tailored digital solution',
    caption: 'Custom code built to fit your product vision'
  },
  'ai-integration': {
    src: '/services/ai-integration.png',
    alt: 'White Rabbit mascot integrating AI and automation into digital workflows',
    caption: 'AI-powered integration for smarter software'
  }
};

interface ServiceVisualProps {
  slug: string;
  className?: string;
}

export default function ServiceVisual({ slug, className = '' }: ServiceVisualProps) {
  const [imageError, setImageError] = useState(false);
  const visual = serviceVisuals[slug] ?? serviceVisuals['web-development'];

  return (
    <div className={`rounded-3xl border border-line bg-white p-4 shadow-sm shadow-slate-200/50 ${className}`}>
      {imageError ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-6 rounded-3xl bg-cloud p-8 text-center text-slate-700">
          <RabbitMark size={92} className="text-rabbit" badge={false} />
          <div>
            <p className="text-xl font-semibold text-ink">Service image unavailable</p>
            <p className="mt-2 text-sm leading-6">Add {visual.src} to the public folder to show the service-specific White Rabbit illustration.</p>
          </div>
        </div>
      ) : (
        <img
          src={visual.src}
          alt={visual.alt}
          className="content-image min-h-[360px] w-full rounded-3xl object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )}
      <p className="mt-5 text-sm font-semibold text-slate-600">{visual.caption}</p>
    </div>
  );
}
