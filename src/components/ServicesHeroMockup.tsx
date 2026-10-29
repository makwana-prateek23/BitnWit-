'use client';

import { useState } from 'react';
import { LuCode, LuActivity, LuLayers, LuCheck, LuArrowUpRight } from 'react-icons/lu';

type Tab = 'architecture' | 'metrics' | 'deliverables';

export default function ServicesHeroMockup() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Editorial Frame Background Glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#4A101A]/20 via-[#6D1FA2]/15 to-[#D97706]/15 blur-xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E2D8] bg-[#FAF8F5] shadow-2xl shadow-slate-900/10">
        {/* Mockup Window Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] bg-[#F4EFEA] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#E57373]/80" />
            <span className="h-3 w-3 rounded-full bg-[#FFD54F]/80" />
            <span className="h-3 w-3 rounded-full bg-[#81C784]/80" />
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
        <div className="flex border-b border-[#E8E2D8] bg-white px-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'architecture'
                ? 'border-[#4A101A] text-[#4A101A]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuCode size={14} className={activeTab === 'architecture' ? 'text-[#4A101A]' : 'text-slate-400'} />
            <span>Architecture Spec</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'metrics'
                ? 'border-[#4A101A] text-[#4A101A]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuActivity size={14} className={activeTab === 'metrics' ? 'text-[#4A101A]' : 'text-slate-400'} />
            <span>Performance Audit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deliverables')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 transition-colors ${
              activeTab === 'deliverables'
                ? 'border-[#4A101A] text-[#4A101A]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LuLayers size={14} className={activeTab === 'deliverables' ? 'text-[#4A101A]' : 'text-slate-400'} />
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
                <span className="text-[11px] font-semibold text-[#4A101A]">Production-grade</span>
              </div>

              <div className="rounded-2xl border border-[#E8E2D8] bg-[#1E1B2E] p-4 text-xs font-mono text-slate-200 shadow-inner overflow-x-auto">
                <p className="text-slate-400">{`// BITnWIT Modern Product Service Architecture`}</p>
                <p className="mt-1">
                  <span className="text-purple-400">interface</span> <span className="text-amber-300">ClientSprint</span> {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">discipline</span>: <span className="text-emerald-300">&apos;Web&apos; | &apos;App&apos; | &apos;AI&apos; | &apos;Growth&apos;</span>;
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">milestones</span>: <span className="text-amber-300">Milestone</span>[];
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">codeOwnership</span>: <span className="text-purple-300">100% Client Owned</span>;
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">targetSLA</span>: <span className="text-emerald-300">&apos;&lt;200ms TTFB&apos;</span>;
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
                <div className="rounded-2xl border border-[#E8E2D8] bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">99</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">Performance</p>
                  <p className="text-[10px] text-slate-400">Mobile + Desktop</p>
                </div>
                <div className="rounded-2xl border border-[#E8E2D8] bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">100</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">Accessibility</p>
                  <p className="text-[10px] text-slate-400">WCAG 2.1 AA</p>
                </div>
                <div className="rounded-2xl border border-[#E8E2D8] bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">100</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">SEO Structure</p>
                  <p className="text-[10px] text-slate-400">Structured Data</p>
                </div>
                <div className="rounded-2xl border border-[#E8E2D8] bg-white p-3.5 text-center shadow-xs">
                  <p className="text-2xl font-extrabold text-emerald-600">0.4s</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-700">LCP Speed</p>
                  <p className="text-[10px] text-slate-400">Edge Caching</p>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-900 flex items-center justify-between">
                <span>All engineering sprints are benchmarked against live Lighthouse scoring.</span>
                <LuArrowUpRight size={14} className="text-amber-700" />
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Deliverable Streams
                </span>
                <span className="text-[11px] font-semibold text-rabbit">8 Disciplines Available</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Web & App Engineering', progress: '100%', status: 'Production Deployed', color: 'bg-emerald-500' },
                  { name: 'Practical AI & Assistants', progress: '94%', status: 'Final Testing', color: 'bg-[#6D1FA2]' },
                  { name: 'UI/UX Design Systems', progress: '100%', status: 'Figma Tokens Ready', color: 'bg-blue-600' },
                  { name: 'Growth Marketing & SEO', progress: '88%', status: 'Campaigns Active', color: 'bg-amber-600' }
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-[#E8E2D8] bg-white px-3.5 py-2.5">
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
          <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-slate-500">
            <span>Built by BITnWIT digital studio engineers</span>
            <span className="font-mono text-slate-400">v2.4 • Remote-first</span>
          </div>
        </div>
      </div>
    </div>
  );
}
