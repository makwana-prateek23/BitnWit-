import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  LuArrowRight,
  LuArrowUpRight,
  LuCheck,
  LuSparkles,
  LuCode,
  LuLayers,
  LuZap,
  LuShieldCheck,
  LuFolderCheck
} from 'react-icons/lu';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { services, projects } from '../../data/content';
import ServiceIcon, { ServiceIconName, serviceTheme } from '../../components/ServiceIcon';
import TalkToRabbitButton from '../../components/TalkToRabbitButton';
import ServicesHeroMockup from '../../components/ServicesHeroMockup';
import ServicesProcessStepper from '../../components/ServicesProcessStepper';
import ServicesFaqAccordion from '../../components/ServicesFaqAccordion';

export const metadata: Metadata = {
  title: 'Digital Engineering & Creative Agency Services | BITnWIT',
  description:
    'Explore BITnWIT digital engineering, AI integration, web & mobile app development, UI/UX design, custom software, digital marketing, and brand strategy.',
  alternates: { canonical: '/services' }
};

const serviceMeta: Record<
  string,
  {
    iconName: ServiceIconName;
    stack: string[];
    turnaround: string;
    targetOutcome: string;
  }
> = {
  'digital-marketing': {
    iconName: 'marketing',
    stack: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'Conversion API', 'Klaviyo'],
    turnaround: '2–4 week sprint setup',
    targetOutcome: 'Lower CPA & qualified inbound leads'
  },
  'web-development': {
    iconName: 'web',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel', 'PostgreSQL'],
    turnaround: '3–6 week delivery',
    targetOutcome: 'Sub-second load times & 99+ Lighthouse'
  },
  'app-development': {
    iconName: 'app',
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    turnaround: '4–8 week MVP sprint',
    targetOutcome: 'Cross-platform iOS & Android launch'
  },
  'custom-code': {
    iconName: 'code',
    stack: ['Node.js', 'Python', 'Docker', 'GraphQL', 'Redis', 'AWS'],
    turnaround: '4–10 week milestone plan',
    targetOutcome: 'Scalable APIs & zero manual bottleneck'
  },
  'ai-integration': {
    iconName: 'ai',
    stack: ['OpenAI API', 'Claude 3.5', 'LangChain', 'Vector DB', 'Llama 3'],
    turnaround: '2–5 week implementation',
    targetOutcome: 'Automated repetitive customer workflows'
  },
  'ui-ux-design': {
    iconName: 'design',
    stack: ['Figma', 'Interactive Prototypes', 'Design Systems', 'WCAG AA'],
    turnaround: '2–4 week design sprint',
    targetOutcome: 'Tested user flows & production tokens'
  },
  'seo-analytics': {
    iconName: 'seo',
    stack: ['Google Analytics 4', 'GTM', 'Schema.org', 'Semrush', 'Search Console'],
    turnaround: '2–3 week technical audit',
    targetOutcome: 'Search visibility & reliable revenue attribution'
  },
  'branding-strategy': {
    iconName: 'branding',
    stack: ['Brand Guidelines', 'Typography', 'Color Systems', 'Tone of Voice'],
    turnaround: '2–3 week brand sprints',
    targetOutcome: 'Unmistakable digital brand identity'
  }
};

// Selected Genuine Case Studies from content.ts
const featuredProjects = projects.slice(0, 3);

export default function ServicesPage() {
  return (
    <main className="site-page min-h-screen px-4 py-8 text-ink sm:px-8 lg:px-12 2xl:px-16 lg:py-12">
      <div className="mx-auto w-full max-w-[1720px] space-y-24 lg:space-y-32">
        {/* ==============================================================
            1. HERO SECTION WITH RESPONSIVE DIGITAL PRODUCT MOCKUP
        ============================================================== */}
        <section className="relative pt-4 sm:pt-8 lg:pt-12">
          {/* Subtle Ambient Background Warmth */}
          <div
            className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#4A101A]/5 blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-40 right-10 h-80 w-80 rounded-full bg-rabbit/5 blur-[100px]"
            aria-hidden="true"
          />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center 2xl:gap-16">
            {/* Left Column: Editorial Headline & Actions */}
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4A101A]/20 bg-[#4A101A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#4A101A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A101A]" />
                <span>BITnWIT Core Disciplines</span>
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.08] text-ink">
                Engineering precision. <br />
                <span className="text-gradient">Creative clarity.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg 2xl:text-xl leading-relaxed text-slate-700">
                We design and ship high-performance digital products, practical AI workflows, modern web platforms,
                and targeted growth systems—delivered through milestone-backed sprints.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <TalkToRabbitButton className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-[#4A101A] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4A101A]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#360A11] hover:shadow-xl">
                  <LuSparkles size={15} className="text-amber-300" />
                  <span>Talk to White Rabbit</span>
                  <LuArrowRight className="transition-transform group-hover:translate-x-1" />
                </TalkToRabbitButton>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E2D8] bg-white px-7 py-3.5 text-sm font-bold text-ink shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-[#FAF8F5]"
                >
                  <span>Start a Project Brief</span>
                  <span className="text-slate-400">→</span>
                </Link>
              </div>

              {/* Trust & Craft Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-600" />
                  100% Client Code Ownership
                </span>
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-600" />
                  Fixed-Scope Milestones
                </span>
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-600" />
                  Senior Engineering Craft
                </span>
              </div>
            </div>

            {/* Right Column: Digital Product Mockup */}
            <div className="relative">
              <ServicesHeroMockup />
            </div>
          </div>

          {/* Quick Filter Navigation Bar */}
          <div className="mt-16 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] p-3 shadow-xs">
            <div className="flex items-center justify-between gap-4 overflow-x-auto px-2 py-1 scrollbar-none">
              <span className="hidden font-mono text-xs font-bold uppercase tracking-wider text-slate-400 lg:inline-block shrink-0">
                Jump to Discipline:
              </span>
              <div className="flex flex-nowrap items-center gap-2">
                {services.map((item, i) => (
                  <a
                    key={item.slug}
                    href={`#${item.slug}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-transparent bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-[#4A101A]/30 hover:text-[#4A101A]"
                  >
                    <span className="font-mono text-[10px] text-slate-400">0{i + 1}</span>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            2. EIGHT SERVICE SECTIONS (ALTERNATING EDITORIAL LAYOUT)
        ============================================================== */}
        <section id="all-services" className="space-y-16 lg:space-y-24">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E8E2D8] pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                Catalog of Capabilities
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Eight disciplines. One unified standard.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-slate-600">
              Each discipline is delivered as an end-to-end sprint with clear artifacts, documented code, and measurable business KPIs.
            </p>
          </div>

          {/* 8 Alternating Cards */}
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const meta = serviceMeta[service.slug] ?? {
                iconName: 'web' as ServiceIconName,
                stack: ['TypeScript', 'Next.js'],
                turnaround: '3–6 weeks',
                targetOutcome: 'Production results'
              };
              const theme = serviceTheme[meta.iconName];
              const isEven = index % 2 === 0;

              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-[#E8E2D8] bg-white p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
                    {/* Visual Column */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven ? 'lg:order-last' : 'lg:order-first'
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#F5F1EB] p-3 sm:p-4 shadow-inner">
                        <div className="relative aspect-[16/11] min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-2xl bg-[#EFEAE2]">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="content-image object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Subtle White Rabbit Signature Hallmark */}
                          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                            <span className="font-mono text-xs font-bold text-slate-400">0{index + 1}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs font-bold text-ink">{service.title}</span>
                          </div>

                          <div className="absolute bottom-4 right-4 rounded-xl border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                            ⚡ {meta.turnaround}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Text & Deliverables Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        {/* Eyebrow & Icon */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${theme.border} ${theme.bg} ${theme.text}`}
                          >
                            <ServiceIcon name={meta.iconName} size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A101A]">
                              {service.eyebrow}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                              Discipline 0{index + 1} of 08
                            </p>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
                          {service.title}
                        </h3>

                        <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600">
                          {service.description}
                        </p>

                        {/* Target Business Outcome Highlight */}
                        <div className="mt-5 rounded-2xl border border-amber-600/15 bg-[#FBF7EE] p-4 text-xs sm:text-sm">
                          <span className="font-bold text-amber-900">Primary Value Outcome: </span>
                          <span className="text-amber-800 font-medium">{meta.targetOutcome}</span>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="mt-6">
                          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                            Core Deliverables Included
                          </p>
                          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {service.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs mt-0.5">
                                  ✓
                                </span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technology Stack Pills */}
                        <div className="mt-6 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400 mr-1.5">Stack:</span>
                          {meta.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-[#E8E2D8] bg-[#FAF8F5] px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Service Links & Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-[#E8E2D8]">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4A101A]"
                        >
                          <span>Explore {service.title} Specs</span>
                          <LuArrowRight size={14} />
                        </Link>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4A101A] transition hover:underline"
                        >
                          <span>Book this sprint</span>
                          <LuArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ==============================================================
            3. SELECTED WORK CASE STUDIES SPOTLIGHT
        ============================================================== */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[#E8E2D8] bg-[#FAF8F5] p-6 sm:p-10 lg:p-14">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rabbit/20 bg-rabbit/5 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-rabbit">
                <LuFolderCheck size={14} />
                <span>Selected Work</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Systems shipped. Real outcomes.
              </h2>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E8E2D8] bg-white px-5 py-2.5 text-sm font-bold text-ink shadow-xs transition hover:border-slate-400 hover:bg-[#F5F1EB]"
            >
              <span>View All Case Studies</span>
              <LuArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="group flex flex-col justify-between rounded-3xl border border-[#E8E2D8] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="content-image object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-ink transition-colors group-hover:text-[#4A101A]">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {project.summary}
                  </p>

                  <div className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-50/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Primary Outcome
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-emerald-950">
                      {project.results[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#E8E2D8] pt-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A101A] hover:underline"
                  >
                    <span>Read case study</span>
                    <LuArrowRight size={13} />
                  </Link>

                  {'liveUrl' in project && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-ink"
                    >
                      <span>Live App</span>
                      <LuArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==============================================================
            4. ACCESSIBLE INTERACTIVE 4-STEP PROCESS STEPPER
        ============================================================== */}
        <ServicesProcessStepper />

        {/* ==============================================================
            5. CONCISE FAQS ACCORDION
        ============================================================== */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
              Clear Answers
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Everything you need to know about working with BITnWIT, our sprint model, and code delivery.
            </p>
          </div>

          <ServicesFaqAccordion />
        </section>

        {/* ==============================================================
            6. PREMIUM FINAL PROJECT ENQUIRY SECTION
        ============================================================== */}
        <section className="relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] border border-[#5A1822]/40 bg-gradient-to-br from-[#360A11] via-[#4A101A] to-[#1E080C] p-10 sm:p-14 lg:p-20 text-white shadow-2xl text-center">
          {/* Ambient Warm Maroon Lighting Glows */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#D97706]/15 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-rabbit/20 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* White Rabbit Mascot Glowing Seal */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
              <Image
                src="/icon.png"
                alt="White Rabbit mascot seal"
                width={72}
                height={72}
                className="h-16 w-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-500" />
              </span>
            </div>

            {/* Availability Pill */}
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Now Booking Next Sprint Cycle
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl !text-white leading-tight">
              Ready to engineer your next <span className="text-amber-300">digital breakthrough</span>?
            </h2>

            <p className="mt-4 text-base sm:text-lg 2xl:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Tell White Rabbit about your idea or send us a direct message. We’ll review your goals and deliver a
              tangible sprint roadmap within 24 hours.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TalkToRabbitButton className="btn-shine group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-ink shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FAF8F5] active:scale-95">
                <LuSparkles size={16} className="text-[#4A101A]" />
                <span>Talk to White Rabbit</span>
                <LuArrowRight className="text-[#4A101A] transition-transform duration-300 group-hover:translate-x-1" />
              </TalkToRabbitButton>

              <a
                href="https://wa.me/918949728810?text=Hi%20BITnWIT!%20I%20would%20like%20to%20discuss%20a%20project%20sprint."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-8 py-4 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500/25 active:scale-95"
              >
                <AiOutlineWhatsApp size={17} className="text-emerald-400" />
                <span>WhatsApp Studio Lead</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
              >
                <span>Send Detailed RFP →</span>
              </Link>
            </div>

            {/* Guarantees & Trust Signals */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2">
                <LuShieldCheck className="text-emerald-400" size={15} />
                Direct Senior Engineering Access
              </span>
              <span className="inline-flex items-center gap-2">
                <LuZap className="text-amber-400" size={15} />
                Guaranteed Response &lt; 24h
              </span>
              <span className="inline-flex items-center gap-2">
                <LuCode className="text-purple-300" size={15} />
                Full IP &amp; Repository Handover
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
