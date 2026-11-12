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
import SpotlightCard from './SpotlightCard';
import ShimmerBadge from './ShimmerBadge';
import AnimatedButton from './AnimatedButton';
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
    icon: <AiOutlineRobot className="text-2xl text-purple-600" />,
    colSpan: 'lg:col-span-2',
    accentColor: 'from-purple-600/20 via-rabbit/10 to-transparent',
    details: {
      overview:
        'We architect production-grade conversational and workflow agents that integrate directly into your databases, CRM, and team tools with strict output validation.',
      deliverables: [
        'Domain-specific knowledge graph & vector embeddings',
        'Multi-agent task orchestration & fallback chains',
        'Conversational web UI & WhatsApp/Telegram bot bridges',
        'Continuous evaluation, latency logging & safety filters'
      ],
      timeline: '2 to 3-week sprint'
    }
  },
  {
    id: 'high-perf-web',
    title: 'Sub-Second Next.js Web Platforms',
    category: 'Web Engineering',
    description:
      'Engineered with Next.js 14 App Router, dynamic server rendering, streaming, and conversion-optimized micro-interactions.',
    stats: '100 / 100',
    statsLabel: 'Core Web Vitals benchmark',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    icon: <AiOutlineThunderbolt className="text-2xl text-amber-500" />,
    colSpan: 'lg:col-span-1',
    accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    details: {
      overview:
        'Zero-bloat web architecture designed for ultra-fast discoverability, SEO indexability, and frictionless checkout or lead generation.',
      deliverables: [
        'Component design system & responsive layout',
        'Edge caching, image optimization & zero layout shifts',
        'Automated CI/CD and automated preview environments',
        'Comprehensive technical SEO & OpenGraph card setup'
      ],
      timeline: '2 to 4-week sprint'
    }
  },
  {
    id: 'mobile-engineering',
    title: 'Native-Feel Cross-Platform Mobile Apps',
    category: 'App Development',
    description:
      'Single-codebase iOS and Android applications built with Flutter or React Native that feel indistinguishable from native apps.',
    stats: '60 FPS',
    statsLabel: 'Silky smooth frame rendering',
    tags: ['Flutter', 'React Native', 'Offline-First', 'Push Notifications'],
    icon: <AiOutlineMobile className="text-2xl text-blue-500" />,
    colSpan: 'lg:col-span-1',
    accentColor: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    details: {
      overview:
        'From interactive Figma prototypes to App Store & Google Play submission, we craft reliable mobile journeys that retain daily active users.',
      deliverables: [
        'Interactive Figma prototype & user journey flows',
        'Cross-platform app build with local state sync',
        'Biometric auth, push notifications & deep links',
        'App Store and Play Store compliance & release'
      ],
      timeline: '4 to 6-week sprint'
    }
  },
  {
    id: 'growth-systems',
    title: 'Precision Growth & Revenue Analytics',
    category: 'Digital Marketing & SEO',
    description:
      'End-to-end multi-channel acquisition funnels, server-side attribution tracking, and targeted SEO architecture tuned for enterprise revenue.',
    stats: '+320%',
    statsLabel: 'Average inbound organic traffic lift',
    tags: ['Schema Graph', 'Server-Side GTM', 'Paid Ad Funnels', 'Revenue Attribution'],
    icon: <AiOutlineBarChart className="text-2xl text-emerald-500" />,
    colSpan: 'lg:col-span-2',
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    details: {
      overview:
        'Eliminate guesswork with unified analytics, high-intent search landing pages, and repeatable campaign sprints tied directly to closed deals.',
      deliverables: [
        'Full technical SEO audit & keyword gap hierarchy',
        'Custom GA4 & PostHog conversion funnel telemetry',
        'Creative direction & high-converting ad variants',
        'Bi-weekly attribution reporting & sprint optimization'
      ],
      timeline: 'Ongoing monthly sprints'
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
          <SpotlightCard
            key={item.id}
            className={cn(
              'flex flex-col justify-between p-7 sm:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1',
              item.colSpan
            )}
            onClick={() => setActiveItem(item)}
          >
            <div>
              {/* Top Row: Category + Stat Chip */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-1 text-xs font-semibold text-slate-700">
                  {item.icon}
                  <span>{item.category}</span>
                </span>
                <div className="text-right">
                  <div className="font-mono text-base font-bold text-ink sm:text-lg">
                    {item.stats}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {item.statsLabel}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink group-hover:text-rabbit transition-colors sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {item.description}
              </p>

              {/* Interactive Tag Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-slate-200/60 bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-600 transition-colors group-hover:border-purple-300 group-hover:text-purple-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row Action */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-rabbit">
                <span>Click to view sprint deliverables & architecture</span>
                <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                Inspect
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Vengeance UI Expandable Modal View */}
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
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-7 sm:p-10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <ShimmerBadge pulseDot>{activeItem.category}</ShimmerBadge>
                  <h3 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="rounded-full border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-ink transition"
                  aria-label="Close dialog"
                >
                  <AiOutlineClose className="text-lg" />
                </button>
              </div>

              {/* Overview */}
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {activeItem.details.overview}
              </p>

              {/* Deliverables List */}
              <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/50 p-5 sm:p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-rabbit">
                  Verified Deliverables
                </div>
                <ul className="mt-3 space-y-2.5">
                  {activeItem.details.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rabbit text-[10px] text-white">
                        <AiOutlineCheck />
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sprint Timeline & Actions */}
              <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-ink">Estimated Turnaround:</span>{' '}
                  {activeItem.details.timeline}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(null);
                      handleOpenChat();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-rabbit px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-purple-800"
                  >
                    <RabbitMark size={14} />
                    <span>Discuss with White Rabbit</span>
                  </button>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold text-ink hover:bg-slate-50"
                  >
                    <span>View All Services</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
