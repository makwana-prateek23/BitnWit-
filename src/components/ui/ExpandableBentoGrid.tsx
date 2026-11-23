'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  AiOutlineArrowRight,
  AiOutlineCheck,
  AiOutlineCode,
  AiOutlineThunderbolt,
  AiOutlineRobot,
  AiOutlineMobile,
  AiOutlineBarChart,
  AiOutlineClose
} from 'react-icons/ai';
import NeuCard from './NeuCard';
import NeuBadge from './NeuBadge';
import NeuButton from './NeuButton';
import NeuSurface from './NeuSurface';
import RabbitMark from '../RabbitMark';
import { cn } from '@/lib/utils';

interface BentoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string;
  statsLabel: string;
  tags: string[];
  icon: React.ReactNode;
  colSpan?: string;
  accentColor: string;
  details: {
    overview: string;
    deliverables: string[];
    timeline: string;
  };
}

const bentoItems: BentoItem[] = [
  {
    id: 'ai-workflows',
    title: 'Autonomous AI Workflows & Guided Assistants',
    category: 'AI Integration',
    description:
      'Turn repetitive manual tasks into high-accuracy automated pipelines. Custom RAG knowledge retrieval, multi-step LLM routing, and White Rabbit conversational guides.',
    stats: '< 180ms',
    statsLabel: 'Median inference latency',
    tags: ['Custom RAG', 'Multi-Agent Routing', 'Enterprise Guardrails', 'LangChain / Vercel AI'],
    icon: <AiOutlineRobot className="text-2xl text-neu-purple" />,
    colSpan: 'md:col-span-2 lg:col-span-2',
    accentColor: '#9A8AFF',
    details: {
      overview:
        'We engineer practical production AI implementations rather than shallow demo wrappers. Our systems connect directly to your relational databases, vector embeddings, and internal APIs with stringent safety boundaries.',
      deliverables: [
        'Vector database setup & semantic chunking pipelines',
        'Streaming chat interfaces with tool-calling capabilities',
        'Human-in-the-loop review dashboards for sensitive operations',
        'Real-time latency & cost monitoring instrumentation'
      ],
      timeline: '2–4 week milestone sprint'
    }
  },
  {
    id: 'performance-web',
    title: 'Ultra-Fast Next.js 14 Web Applications',
    category: 'Web Development',
    description:
      'Engineered with sub-second page transitions, App Router architecture, server components, and 99+ Core Web Vitals.',
    stats: '99/100',
    statsLabel: 'Lighthouse mobile score',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    icon: <AiOutlineThunderbolt className="text-2xl text-amber-500" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    accentColor: '#F5C84C',
    details: {
      overview:
        'Every millisecond of latency costs conversions. We build with aggressive edge caching, optimized dynamic fonts, responsive fluid typography, and zero hydration layout shifts.',
      deliverables: [
        'Production Next.js 14 App Router code with full TypeScript strictness',
        'Lighthouse performance and accessibility auditing',
        'Dynamic OpenGraph social banner generation',
        'Automated CI/CD deployment pipelines on Vercel'
      ],
      timeline: '3–5 week delivery sprint'
    }
  },
  {
    id: 'mobile-mvp',
    title: 'Cross-Platform Mobile Apps (iOS & Android)',
    category: 'App Development',
    description:
      'Native-feel fluid mobile experiences with offline caching, push notifications, and seamless device hardware integrations.',
    stats: '60 FPS',
    statsLabel: 'Sustained frame rendering',
    tags: ['React Native', 'Flutter', 'Offline-First SQLite', 'Store Compliance'],
    icon: <AiOutlineMobile className="text-2xl text-emerald-500" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    accentColor: '#10B981',
    details: {
      overview:
        'Launch on both Apple App Store and Google Play from a single clean codebase. Built with native performance bridges and validated on real device test matrices.',
      deliverables: [
        'Universal mobile codebase with complete responsive layout fidelity',
        'Authentication flows (Google, Apple, Phone OTP)',
        'Push notification server setup & deep link handling',
        'TestFlight & Play Store Internal Track readiness'
      ],
      timeline: '4–8 week MVP sprint'
    }
  },
  {
    id: 'systems-architecture',
    title: 'Mission-Critical Backend & API Engineering',
    category: 'Custom Engineering',
    description:
      'Fault-tolerant microservices, resilient background queue workers, and typed GraphQL/REST architectures that scale effortlessly.',
    stats: '99.99%',
    statsLabel: 'Uptime reliability design',
    tags: ['Node.js / Go', 'PostgreSQL', 'Redis BullMQ', 'Docker / K8s'],
    icon: <AiOutlineCode className="text-2xl text-blue-500" />,
    colSpan: 'md:col-span-2 lg:col-span-2',
    accentColor: '#3B82F6',
    details: {
      overview:
        'Architectures structured to handle traffic spikes without degraded database locks or dropped transactions. Comprehensive idempotency, automated backups, and rate-limiting.',
      deliverables: [
        'Normalized schema design with migrations and automated indexing',
        'JWT/Session security with role-based access control (RBAC)',
        'Webhook delivery engine with exponential retry logic',
        'Interactive OpenAPI / Swagger documentation suite'
      ],
      timeline: '4–10 week milestone plan'
    }
  },
  {
    id: 'growth-telemetry',
    title: 'Search Optimization & Conversion Attribution',
    category: 'Growth & SEO',
    description:
      'Server-side telemetry and search architecture designed to convert qualified inbound organic traffic into measurable revenue.',
    stats: '3.4x',
    statsLabel: 'Average conversion lift',
    tags: ['Schema.org', 'GA4 Server GTM', 'Search Console', 'Technical SEO'],
    icon: <AiOutlineBarChart className="text-2xl text-rose-500" />,
    colSpan: 'md:col-span-3 lg:col-span-3',
    accentColor: '#F43F5E',
    details: {
      overview:
        'Traffic without conversion is vanity. We instrument granular funnel tracking, implement structured semantic JSON-LD metadata for rich snippets, and eliminate crawl bottlenecks.',
      deliverables: [
        'Complete Technical SEO crawl fix & core indexation setup',
        'Server-side Google Tag Manager (sGTM) & Meta CAPI integration',
        'Conversion event tracking dashboard with multi-touch attribution',
        'Core Web Vitals diagnostic report and asset delivery tuning'
      ],
      timeline: '2–3 week technical audit & implementation'
    }
  }
];

export default function ExpandableBentoGrid() {
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-white-rabbit-chat'));
  };

  return (
    <div className="relative w-full">
      {/* Interactive Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bentoItems.map((item) => (
          <NeuCard
            key={item.id}
            variant="raised"
            interactive
            tilt
            className={cn(
              'flex flex-col justify-between p-7 sm:p-8 cursor-pointer transition-all duration-300',
              item.colSpan
            )}
            onClick={() => setActiveItem(item)}
          >
            <div>
              {/* Top Row: Category + Stat Chip */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full neu-recessed px-3 py-1 text-xs font-semibold text-neu-text">
                  {item.icon}
                  <span>{item.category}</span>
                </span>
                <div className="text-right">
                  <div className="font-mono text-base font-bold text-neu-text sm:text-lg">
                    {item.stats}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-neu-textSec">
                    {item.statsLabel}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold tracking-tight text-neu-text group-hover:text-neu-purple transition-colors sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neu-textSec sm:text-base">
                {item.description}
              </p>

              {/* Interactive Tag Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg neu-recessed px-2.5 py-1 font-mono text-[11px] font-medium text-neu-textSec"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row Action */}
            <div className="mt-8 flex items-center justify-between border-t border-neu-border pt-4 text-xs font-semibold text-neu-textSec">
              <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-neu-purple">
                <span>Click to view sprint deliverables & architecture</span>
                <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="rounded-full neu-recessed px-2.5 py-1 text-[11px] font-bold text-neu-text">
                Inspect
              </span>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* Expandable Modal View */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto"
            >
              <NeuSurface variant="raised-lg" className="p-7 sm:p-10 rounded-3xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <NeuBadge color="purple" variant="recessed" pulseDot>{activeItem.category}</NeuBadge>
                    <h3 className="mt-3 text-2xl font-bold text-neu-text sm:text-3xl">
                      {activeItem.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="rounded-full neu-recessed p-2 text-neu-textSec hover:text-neu-text transition"
                    aria-label="Close dialog"
                  >
                    <AiOutlineClose className="text-lg" />
                  </button>
                </div>

                {/* Overview */}
                <p className="mt-5 text-sm leading-relaxed text-neu-textSec sm:text-base">
                  {activeItem.details.overview}
                </p>

                {/* Deliverables List */}
                <div className="mt-6 rounded-2xl neu-recessed p-5 sm:p-6 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-neu-purple">
                    Verified Deliverables
                  </div>
                  <ul className="space-y-2.5">
                    {activeItem.details.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-neu-text">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neu-purple text-[10px] text-white">
                          <AiOutlineCheck />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sprint Timeline & Actions */}
                <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-neu-border pt-6 sm:flex-row">
                  <div className="text-xs text-neu-textSec">
                    <span className="font-semibold text-neu-text">Estimated Turnaround:</span>{' '}
                    {activeItem.details.timeline}
                  </div>
                  <div className="flex items-center gap-3">
                    <NeuButton
                      variant="purple"
                      size="sm"
                      onClick={() => {
                        setActiveItem(null);
                        handleOpenChat();
                      }}
                      icon={<RabbitMark size={14} />}
                    >
                      Discuss with White Rabbit
                    </NeuButton>
                    <Link href="/services">
                      <NeuButton variant="default" size="sm">
                        View All Services
                      </NeuButton>
                    </Link>
                  </div>
                </div>
              </NeuSurface>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
