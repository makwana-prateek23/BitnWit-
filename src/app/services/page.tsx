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
import NeuSurface from '../../components/ui/NeuSurface';
import NeuButton from '../../components/ui/NeuButton';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';

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

const featuredProjects = projects.slice(0, 3);

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-20 lg:space-y-28">

        {/* 1. HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-7 sm:p-12 lg:p-16 2xl:p-20 overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center 2xl:gap-16">
            <div className="space-y-6">
              <NeuBadge color="purple" variant="recessed" pulseDot>
                BITnWIT Core Disciplines
              </NeuBadge>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.08] text-neu-text">
                Engineering precision. <br />
                <span className="text-gradient">Creative clarity.</span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg 2xl:text-xl leading-relaxed text-neu-textSec">
                We design and ship high-performance digital products, practical AI workflows, modern web platforms,
                and targeted growth systems—delivered through milestone-backed sprints.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
                <TalkToRabbitButton className="inline-flex">
                  <NeuButton variant="purple" size="lg" icon={<LuSparkles size={16} />}>
                    Talk to White Rabbit
                  </NeuButton>
                </TalkToRabbitButton>

                <Link href="/contact">
                  <NeuButton variant="default" size="lg">
                    Start a Project Brief →
                  </NeuButton>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-neu-textSec pt-4">
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-500" />
                  100% Client Code Ownership
                </span>
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-500" />
                  Fixed-Scope Milestones
                </span>
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="text-emerald-500" />
                  Senior Engineering Craft
                </span>
              </div>
            </div>

            {/* Right Column: Digital Product Mockup in Raised Plate */}
            <div className="relative">
              <NeuSurface variant="raised-lg" className="p-4 sm:p-8 rounded-[2rem] overflow-hidden">
                <ServicesHeroMockup />
              </NeuSurface>
            </div>
          </div>
        </section>

        {/* 2. THE 8 SERVICES IN NEUMORPHIC CARDS */}
        <section className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <NeuBadge color="yellow" variant="recessed">
              Sprint Catalog
            </NeuBadge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
              All Eight Disciplines &amp; Deliverables
            </h2>
            <p className="text-base text-neu-textSec">
              Each discipline is shaped around a concrete business outcome, built with production-grade engineering, and transferred with full IP ownership.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-10">
            {services.map((service, index) => {
              const meta = serviceMeta[service.slug] || {
                iconName: 'code',
                stack: ['TypeScript', 'Next.js'],
                turnaround: '2–4 weeks',
                targetOutcome: 'High performance scalable system'
              };

              return (
                <NeuCard
                  key={service.slug}
                  variant="raised"
                  interactive
                  className="flex flex-col justify-between h-full group hover:-translate-y-1.5"
                >
                  <div className="space-y-5">
                    {/* Header: Icon & Order */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl neu-recessed text-neu-purple group-hover:text-neu-text transition-colors">
                        <ServiceIcon name={meta.iconName} size={22} />
                      </div>
                      <span className="font-mono text-xs font-bold text-neu-purple px-2 py-1 rounded-md neu-recessed">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neu-textSec leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Deliverables Pills */}
                    <div className="space-y-2 pt-2 border-t border-neu-border">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neu-textSec">
                        Key Deliverables:
                      </p>
                      <ul className="space-y-1.5">
                        {service.deliverables.slice(0, 3).map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-neu-text">
                            <LuCheck size={14} className="text-neu-purple shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {meta.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] font-semibold text-neu-textSec px-2 py-0.5 rounded neu-recessed">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-6 pt-4 border-t border-neu-border flex items-center justify-between">
                    <span className="text-xs font-bold text-neu-textSec">
                      ⏱ {meta.turnaround}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-purple hover:underline"
                    >
                      <span>Explore Sprint</span>
                      <LuArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </NeuCard>
              );
            })}
          </div>
        </section>

        {/* 3. SPRINT PROCESS STEPPER */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <NeuBadge color="purple" variant="recessed">
              Sprint Execution
            </NeuBadge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-neu-text">
              How our service sprints run from start to handoff
            </h2>
          </div>

          <NeuSurface variant="raised" className="p-6 sm:p-12 rounded-[2rem]">
            <ServicesProcessStepper />
          </NeuSurface>
        </section>

        {/* 4. GENUINE CASE STUDIES SHOWCASE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <NeuBadge color="yellow" variant="recessed">
                Proof of Delivery
              </NeuBadge>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
                Featured Case Studies
              </h2>
            </div>
            <Link href="/work">
              <NeuButton variant="default" size="sm">
                View All Case Studies →
              </NeuButton>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="block group h-full">
                <NeuCard variant="raised" interactive className="h-full flex flex-col justify-between overflow-hidden !p-0">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neu-surfaceSec">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <NeuBadge color="purple" variant="raised">
                        {p.category}
                      </NeuBadge>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-neu-textSec line-clamp-2">
                        {p.summary}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-purple pt-2 border-t border-neu-border">
                      <span>Read Case Study</span>
                      <LuArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </NeuCard>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. SERVICES FAQ ACCORDION */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <NeuBadge color="purple" variant="recessed">
              Sprint FAQs
            </NeuBadge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-neu-text">
              Frequently Asked Questions About Our Sprints
            </h2>
          </div>

          <NeuSurface variant="raised" className="p-6 sm:p-10 rounded-[2rem] max-w-4xl mx-auto">
            <ServicesFaqAccordion />
          </NeuSurface>
        </section>

        {/* 6. WHATSAPP & SPRINT CONVERSION CTA */}
        <section className="neu-raised-lg rounded-[2.5rem] p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <NeuBadge color="green" variant="recessed" pulseDot>
            Ready to Sprint
          </NeuBadge>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neu-text tracking-tight">
            Need a custom technical roadmap?
          </h2>

          <p className="text-sm sm:text-base text-neu-textSec max-w-2xl mx-auto leading-relaxed">
            Send us your scope or connect directly on WhatsApp with our technical heads. We will review your requirements and provide an estimated budget and milestone breakdown.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/918949728810?text=Hi%20BITnWIT!%20I%20would%20like%20to%20discuss%20a%20service%20sprint."
              target="_blank"
              rel="noreferrer"
            >
              <NeuButton variant="purple" size="lg" icon={<AiOutlineWhatsApp size={18} />}>
                Chat on WhatsApp
              </NeuButton>
            </a>

            <Link href="/contact">
              <NeuButton variant="default" size="lg">
                Submit Online Brief →
              </NeuButton>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
