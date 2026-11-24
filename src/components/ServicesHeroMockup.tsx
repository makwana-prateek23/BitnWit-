'use client';

import { useState } from 'react';
import { LuCode, LuActivity, LuLayers, LuCheck, LuArrowUpRight } from 'react-icons/lu';

type Tab = 'architecture' | 'metrics' | 'deliverables';

export default function ServicesHeroMockup() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Editorial Frame Background */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-navy/5"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-navy/15 bg-cream shadow-2xl shadow-slate-900/10">
        {/* Mockup Window Header */}
        <div className="flex items-center justify-between border-b border-navy/15 bg-cream/70 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red/80" />
            <span className="h-3 w-3 rounded-full bg-navy/30" />
            <span className="h-3 w-3 rounded-full bg-navy/70" />
            <span className="ml-2 font-mono text-xs text-slate-500">bitnwit.studio/sprint-board</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Sprint Active
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-navy/15 bg-white px-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'architecture'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuCode size={14} className={activeTab === 'architecture' ? 'text-navy' : 'text-slate-400'} />
            <span>Architecture Spec</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'metrics'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuActivity size={14} className={activeTab === 'metrics' ? 'text-navy' : 'text-slate-400'} />
            <span>Performance Audit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deliverables')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'deliverables'
                ? 'border-navy text-navy'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuLayers size={14} className={activeTab === 'deliverables' ? 'text-navy' : 'text-slate-400'} />
            <span>Delivery Pipeline</span>
          </button>
        </div>

        {/* Dynamic Preview Content */}
        <div className="p-5 sm:p-7 min-h-[310px] flex flex-col justify-between">
          {activeTab === 'architecture' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  TypeScript • Next.js 14 • PostgreSQL
                </span>
                <span className="text-[11px] font-semibold text-navy">Production-grade</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#010313] p-4 text-xs font-mono text-slate-200 shadow-inner overflow-x-auto">
                <p className="text-slate-400">{`// BITnWIT Modern Product Service Architecture`}</p>
                <p className="mt-1">
                  <span className="text-cream">interface</span> <span className="text-white">ClientSprint</span> {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-cream/80">discipline</span>: <span className="text-white">&apos;Web&apos; | &apos;App&apos; | &apos;AI&apos; | &apos;Growth&apos;</span>;
                </p>
                <p className="pl-4">
                  <span className="text-cream/80">milestones</span>: <span className="text-white">Milestone</span>[];
                </p>
                <p className="pl-4">
                  <span className="text-cream/80">codeOwnership</span>: <span className="text-white">100% Client Owned</span>;
                </p>
                <p className="pl-4">
                  <span className="text-cream/80">targetSLA</span>: <span className="text-white">&apos;&lt;200ms TTFB&apos;</span>;
                </p>
                <p>{'}'}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LuCheck size={13} className="text-emerald-600" />
                  Type-safe API routes
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LuCheck size={13} className="text-emerald-600" />
                  CI/CD automated deployment
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LuCheck size={13} className="text-emerald-600" />
                  Git repo full handover
                </span>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Core Web Vitals & Audit Benchmarks
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">Sub-second load times</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-navy/15 bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">99</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">Performance</p>
                  <p className="text-[10px] text-slate-400">Mobile + Desktop</p>
                </div>
                <div className="rounded-2xl border border-navy/15 bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">100</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">Accessibility</p>
                  <p className="text-[10px] text-slate-400">WCAG 2.1 AA</p>
                </div>
                <div className="rounded-2xl border border-navy/15 bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">100</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">SEO Structure</p>
                  <p className="text-[10px] text-slate-400">Structured Data</p>
                </div>
                <div className="rounded-2xl border border-navy/15 bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">0.4s</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">LCP Speed</p>
                  <p className="text-[10px] text-slate-400">Edge Caching</p>
                </div>
              </div>

              <div className="rounded-xl border border-navy/20 bg-cream/60 p-3 text-xs text-navy flex items-center justify-between">
                <span>All engineering sprints are benchmarked against live Lighthouse scoring.</span>
                <LuArrowUpRight size={14} className="text-navy" />
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Deliverable Streams
                </span>
                <span className="text-[11px] font-semibold text-navy">8 Disciplines Available</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Web & App Engineering', progress: '100%', status: 'Production Deployed', color: 'bg-emerald-500' },
                  { name: 'Practical AI & Assistants', progress: '94%', status: 'Final Testing', color: 'bg-navy' },
                  { name: 'UI/UX Design Systems', progress: '100%', status: 'Figma Tokens Ready', color: 'bg-navy' },
                  { name: 'Growth Marketing & SEO', progress: '88%', status: 'Campaigns Active', color: 'bg-navy' }
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-navy/15 bg-white px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>
                    <span className="font-mono font-medium text-slate-500 text-[11px]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-navy/15 flex items-center justify-between text-[11px] text-slate-500">
            <span>Built by BITnWIT digital studio engineers</span>
            <span className="font-mono text-slate-400">v2.4 • Remote-first</span>
          </div>
        </div>
      </div>
    </div>
  );
}
