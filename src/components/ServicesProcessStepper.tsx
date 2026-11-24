'use client';

import { useState } from 'react';
import { LuCompass, LuFileCode2, LuCheck, LuRocket, LuArrowRight, LuClock, LuShieldCheck } from 'react-icons/lu';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: typeof LuCompass;
  duration: string;
  description: string;
  deliverables: string[];
  clientCommitment: string;
  keyOutcome: string;
}

const steps: ProcessStep[] = [
  {
    id: 'step-discover',
    number: '01',
    title: 'Discover & Align',
    tagline: 'Deconstruct the problem before writing a line of code.',
    icon: LuCompass,
    duration: 'Week 1',
    description:
      'We dig into your audience, business goals, existing system bottlenecks, and technical constraints. Rather than guessing requirements, we define measurable success metrics upfront.',
    deliverables: [
      'Technical feasibility & architecture review',
      'Target user persona & problem statement',
      'Competitor & product positioning benchmark',
      'Sprint roadmap with fixed deliverables'
    ],
    clientCommitment: '2 × 45-min kickoff & alignment workshops',
    keyOutcome: 'A clear sprint brief and zero ambiguity on scope or budget.'
  },
  {
    id: 'step-shape',
    number: '02',
    title: 'Shape & Prototype',
    tagline: 'Visible designs and validated systems you can test.',
    icon: LuFileCode2,
    duration: 'Week 1–2',
    description:
      'Wireframes, clickable user journeys, brand design systems, and database schema diagrams come together. You test real interactive prototypes on mobile and desktop before engineering starts.',
    deliverables: [
      'Interactive Figma prototypes & component systems',
      'API contracts & data model architecture',
      'Responsive user flows for mobile & desktop',
      'Technical specification documentation'
    ],
    clientCommitment: '1 milestone review & prototype feedback session',
    keyOutcome: 'Full alignment on the exact user experience before engineering begins.'
  },
  {
    id: 'step-engineer',
    number: '03',
    title: 'Engineer & Validate',
    tagline: 'Iterative, senior craft with visible staging builds.',
    icon: LuCheck,
    duration: 'Week 2–5',
    description:
      'Clean Next.js, TypeScript, Flutter, or custom API implementation in focused bi-weekly milestones. You get continuous access to private staging URLs and GitHub repos with zero agency fluff.',
    deliverables: [
      'Production-ready, type-safe codebase',
      'Private preview environments on Vercel/Cloud',
      'Automated testing & accessibility (WCAG AA)',
      'Third-party API & AI model integrations'
    ],
    clientCommitment: 'Bi-weekly 20-min demo check-ins (async updates welcome)',
    keyOutcome: 'A functional, high-speed digital product running on staging.'
  },
  {
    id: 'step-launch',
    number: '04',
    title: 'Launch & Scale',
    tagline: 'Day one is launch; we tune conversion and growth after.',
    icon: LuRocket,
    duration: 'Week 6+',
    description:
      'DNS transition, zero-downtime production deployment, analytics attribution tracking, and full code handoff. We remain available for performance tuning, SEO monitoring, and feature iteration.',
    deliverables: [
      'Zero-downtime production cutover',
      'Complete Git repository & credential handover',
      'Google Analytics 4 & conversion tracking setup',
      '30-day post-launch warranty & maintenance'
    ],
    clientCommitment: 'Final sign-off & launch celebration',
    keyOutcome: 'A live, high-performing product driving real business results.'
  }
];

export default function ServicesProcessStepper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % steps.length;
      setActiveIndex(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + steps.length) % steps.length;
      setActiveIndex(prevIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(steps.length - 1);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-navy/15 bg-cream p-6 sm:p-10 lg:p-14 shadow-sm">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-navy">
          <span>Disciplined Engineering Rhythm</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Four stages. Zero guesswork.
        </h2>
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-700">
          We operate in transparent, milestone-backed phases so you always know what is being built, when it will ship, and what value it delivers.
        </p>
      </div>

      {/* Step Selector Tablist */}
      <div
        role="tablist"
        aria-label="Service delivery process stages"
        className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              role="tab"
              id={`tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${step.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`group relative flex flex-col items-start rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                isActive
                  ? 'border-navy bg-navy text-white shadow-lg shadow-navy/20'
                  : 'border-navy/15 bg-white text-navy hover:border-navy hover:bg-cream/40'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold tracking-widest ${
                    isActive ? 'text-cream' : 'text-navy/60 group-hover:text-navy'
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <LuClock size={10} />
                  {step.duration}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <Icon size={18} className={isActive ? 'text-cream' : 'text-navy'} />
                <span className="text-base font-bold">{step.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeStep.id}`}
        aria-labelledby={`tab-${activeStep.id}`}
        className="mt-8 rounded-3xl border border-navy/15 bg-white p-6 sm:p-9 lg:p-10 shadow-xs"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Description Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
              <span>Stage {activeStep.number}</span>
              <span className="text-navy/30">•</span>
              <span className="text-navy/70">{activeStep.duration}</span>
            </div>

            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink">
              {activeStep.title}: {activeStep.tagline}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {activeStep.description}
            </p>

            {/* Deliverables List */}
            <div className="mt-6">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-navy/70">
                Key Stage Deliverables
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {activeStep.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-navy/15 bg-cream/40 p-3 text-xs sm:text-sm font-medium text-slate-900"
                  >
                    <LuCheck size={15} className="shrink-0 text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Card: Collaboration & Outcome (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-navy/20 bg-cream/60 p-5">
              <div className="flex items-center gap-2 text-navy">
                <LuShieldCheck size={16} className="text-navy" />
                <span className="text-xs font-bold uppercase tracking-wider">Client Time Needed</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {activeStep.clientCommitment}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                We respect your time. All decisions are documented asynchronously in writing.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/15 bg-navy/5 p-5">
              <div className="flex items-center gap-2 text-navy">
                <LuArrowRight size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Guaranteed Outcome</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">
                {activeStep.keyOutcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
