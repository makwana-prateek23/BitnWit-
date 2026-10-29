import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineArrowRight,
  AiOutlineBulb,
  AiOutlineCheckCircle,
  AiOutlineCode,
  AiOutlineCompass,
  AiOutlineRocket,
  AiOutlineThunderbolt
} from 'react-icons/ai';
import MascotImage from '../components/MascotImage';
import RabbitMark from '../components/RabbitMark';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import ServiceIcon, { ServiceIconName, serviceTheme } from '../components/ServiceIcon';
import TalkToRabbitButton from '../components/TalkToRabbitButton';

interface MinimalService {
  title: string;
  slug: string;
  icon: ServiceIconName;
  description: string;
}

const allServices: MinimalService[] = [
  {
    title: 'Web Development',
    slug: '/services/web-development',
    icon: 'web',
    description: 'Fast, conversion-tuned web applications engineered with Next.js and sub-second load times.'
  },
  {
    title: 'Mobile App Development',
    slug: '/services/app-development',
    icon: 'app',
    description: 'Cross-platform iOS and Android products built with Flutter & React Native for seamless UX.'
  },
  {
    title: 'AI Integration',
    slug: '/services/ai-integration',
    icon: 'ai',
    description: 'Production-ready AI workflows, conversational guides, and custom LLM automations.'
  },
  {
    title: 'Digital Marketing',
    slug: '/services/digital-marketing',
    icon: 'marketing',
    description: 'Growth-first campaigns, paid acquisition funnels, and performance reporting focused on revenue.'
  },
  {
    title: 'UI/UX Design',
    slug: '/services/ui-ux-design',
    icon: 'design',
    description: 'Thoughtful user journeys, interactive Figma prototypes, and scalable design systems.'
  },
  {
    title: 'SEO & Analytics',
    slug: '/services/seo-analytics',
    icon: 'seo',
    description: 'Technical search architecture, schema markup, and attribution tracking to maximize organic leads.'
  },
  {
    title: 'Custom Engineering',
    slug: '/services/custom-code',
    icon: 'code',
    description: 'Bespoke software architecture, internal dashboards, secure APIs, and database engineering.'
  },
  {
    title: 'Branding & Strategy',
    slug: '/services/branding-strategy',
    icon: 'branding',
    description: 'Distinct visual identity systems, market positioning, and brand guidelines that build authority.'
  }
];

const marqueeItems = [
  'Web Development', 'App Development', 'UI/UX Design', 'SEO & Analytics',
  'Branding', 'AI Integration', 'Digital Marketing', 'Custom Code'
];

const process = [
  { title: 'Discover', icon: AiOutlineCompass, copy: 'We dig into your goals, users, and constraints before writing a single line.' },
  { title: 'Design & Plan', icon: AiOutlineBulb, copy: 'Wireframes, brand systems, and a build plan you can see and approve.' },
  { title: 'Build & Ship', icon: AiOutlineCode, copy: 'Fast, iterative delivery with real progress you can check in on.' },
  { title: 'Grow & Optimize', icon: AiOutlineRocket, copy: 'Launch is day one — we tune performance, SEO, and conversion after.' }
];

const differentiators = [
  { icon: AiOutlineThunderbolt, title: 'Built for speed', copy: 'Lean process, fast iterations, no bloated timelines.' },
  { icon: AiOutlineCheckCircle, title: 'Senior craft', copy: 'Every project gets real engineering and design attention, not templates.' },
  { icon: AiOutlineRocket, title: 'AI-native', copy: 'White Rabbit and modern AI tooling baked into how we build and support you.' }
];

const stats = [
  { value: 40, suffix: '+', label: 'Projects shipped' },
  { value: 8, suffix: '', label: 'Core services' },
  { value: 98, suffix: '%', label: 'On-time delivery' },
  { value: 24, suffix: '/7', label: 'AI-assisted support' }
];

export default function HomePage() {
  return (
    <main className="site-page min-h-screen overflow-hidden px-4 py-10 text-ink sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* ---------------------------------------------------------- HERO */}
        <section className="hero-shell grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="hero-blob hero-blob-blue" aria-hidden />
          <div className="hero-blob hero-blob-red" aria-hidden />

          <Reveal direction="right">
            <p className="inline-flex items-center gap-2 rounded-full border border-rabbit/20 bg-rabbit/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rabbit" />
              BITnWIT
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              We <span className="text-gradient">build</span>. We <span className="text-gradient">think</span>.
              <br />
              We <span className="text-gradient">create</span>. We <span className="text-gradient">grow</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-700">
              A digital studio for digital marketing, web and app development, UI/UX design, SEO, custom engineering,
              and AI integration with White Rabbit as your guide.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <TalkToRabbitButton className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-rabbit px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rabbit/20 transition hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-xl hover:shadow-rabbit/30">
                Talk to White Rabbit
                <AiOutlineArrowRight className="transition group-hover:translate-x-1" />
              </TalkToRabbitButton>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-rabbit/40 hover:bg-slate-50"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-600">
              {['40+ projects shipped', '98% on-time delivery', 'AI-assisted from day one'].map((line) => (
                <span key={line} className="inline-flex items-center gap-2">
                  <AiOutlineCheckCircle className="text-rabbit" />
                  {line}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="mascot-showcase rounded-3xl p-5">
              <div className="flex items-center gap-4">
                <RabbitMark size={32} />
                <div>
                  <p className="text-sm text-slate-500">Meet your guide</p>
                  <p className="text-xl font-semibold">White Rabbit</p>
                </div>
              </div>
              <div className="mt-2">
                <MascotImage className="max-h-[430px] min-h-[280px]" />
              </div>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                <p>Ask anything about BITnWIT services, timelines, and budgets.</p>
                <div className="pt-1">
                  <TalkToRabbitButton className="inline-flex items-center gap-2 text-xs font-bold text-rabbit hover:underline">
                    <span>💬 Open AI Assistant</span>
                    <AiOutlineArrowRight />
                  </TalkToRabbitButton>
                </div>
              </div>
            </div>

            <div className="floating-chip absolute -top-5 left-8 z-10 hidden rounded-2xl border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg shadow-slate-300/40 backdrop-blur sm:block">
              ⚡ Fast delivery
            </div>
            <TalkToRabbitButton className="floating-chip delay-1 absolute -right-6 top-1/2 z-10 hidden cursor-pointer rounded-2xl border border-purple-200/80 bg-white/95 px-4 py-2 text-xs font-semibold text-rabbit shadow-lg shadow-purple-200/50 backdrop-blur transition hover:scale-105 hover:border-rabbit sm:block">
              💬 AI chat ready
            </TalkToRabbitButton>
            <div className="floating-chip delay-2 absolute -bottom-5 left-10 z-10 hidden rounded-2xl border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg shadow-slate-300/40 backdrop-blur sm:block">
              🎯 ROI focused
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------------- MARQUEE */}
        <Reveal className="marquee-mask mt-12 overflow-hidden rounded-full border border-line bg-white/70 py-3 backdrop-blur">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-rabbit/60" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ---------------------------------------------------------- MINIMAL & MODERN SERVICES SECTION */}
        <section className="mt-20">
          {/* Airy Minimalist Header with Service Representation */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <Reveal className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                <RabbitMark size={15} />
                <span>Core Capabilities</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-rabbit">8 Disciplines</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Crafted for speed, conversion, and scale.
              </h2>
              <p className="mt-3 text-base text-slate-600 max-w-xl">
                Senior engineering, intuitive design, practical AI, and performance marketing—delivered in focused, milestone-driven sprints.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="shrink-0">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-xs transition hover:border-slate-400 hover:bg-slate-50"
              >
                <span>All Deliverables & Sprints</span>
                <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Symmetrical 8-Card Clean Grid (4x2 on desktop, 2x4 on tablet) */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {allServices.map((service, i) => {
              const theme = serviceTheme[service.icon];
              return (
                <Reveal key={service.slug} delay={i * 0.04}>
                  <Link
                    href={service.slug}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div>
                      {/* Premium Dual-Tone Tinted Icon */}
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${theme.border} ${theme.bg} ${theme.text} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${theme.glow}`}
                      >
                        <ServiceIcon name={service.icon} size={22} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-ink transition-colors group-hover:text-rabbit">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors group-hover:text-ink">
                        <span>Explore</span>
                        <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="font-mono text-xs text-slate-300 transition-colors group-hover:text-rabbit">
                        0{i + 1}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Minimal Assistant Quick-Prompt */}
          <Reveal delay={0.2} className="mt-10 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-6 py-2.5 text-xs text-slate-600 shadow-xs backdrop-blur-md">
              <span>Unsure which service matches your exact scope?</span>
              <TalkToRabbitButton className="font-bold text-rabbit hover:underline">
                💬 Ask White Rabbit to recommend a sprint plan →
              </TalkToRabbitButton>
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------------- PROCESS */}
        <section className="mt-20">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">How we work</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">From idea to launch, without the guesswork</h2>
          </Reveal>

          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block" aria-hidden />
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white shadow-lg shadow-ink/20">
                  <step.icon className="text-lg" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- STATS */}
        <Reveal className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-ink p-8 text-white sm:p-9 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} className="text-3xl font-extrabold sm:text-4xl" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        {/* ---------------------------------------------------------- DIFFERENTIATORS */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal/10 text-signal">
                <item.icon className="text-lg" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
            </Reveal>
          ))}
        </section>

        {/* ---------------------------------------------------------- CLIENTS & REACH */}
        <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal className="surface-card rounded-3xl p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">Who we work with</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Built for teams ready to move forward.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">From founders validating an MVP to established businesses modernizing their digital operations, we shape the engagement around the problem and the people solving it.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['Founders', 'Service teams', 'Growing brands', 'Global teams'].map((client) => (
                <div key={client} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-semibold text-slate-700">{client}</div>
              ))}
            </div>
            <Link href="/clients" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-rabbit">Explore our collaborations <AiOutlineArrowRight /></Link>
          </Reveal>
          <Reveal className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rabbit/25 blur-3xl" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">Pan-India · Worldwide</p>
            <h2 className="mt-3 text-2xl font-bold text-white">One workflow across every time zone.</h2>
            <p className="mt-4 leading-7 text-slate-400">Remote-first delivery, documented decisions, async updates, and planned overlap hours make collaboration straightforward across India and international markets.</p>
            <div className="mt-7 flex gap-3"><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">India-wide</span><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Global-ready</span></div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------------- REDESIGNED PREMIUM CTA BANNER */}
        <Reveal className="relative mt-20 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#06122c] via-[#101032] to-[#25083a] p-10 text-center shadow-2xl sm:p-14 lg:p-16">
          {/* Ambient Lighting & Micro-Grid Texture */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rabbit/30 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-signal/20 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(109,31,162,0.25),transparent_65%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />

          {/* White Rabbit Glowing Medallion */}
          <div className="relative z-10">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl shadow-purple-900/50 backdrop-blur-xl transition duration-300 hover:scale-105">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-rabbit/40 to-signal/30 blur-md" />
              <Image
                src="/icon.png"
                alt="White Rabbit mascot"
                width={72}
                height={72}
                className="h-16 w-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-500" />
              </span>
            </div>

            {/* Availability Eyebrow */}
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-purple-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for New Projects
              </span>
            </div>

            {/* Crisp High-Contrast Headline */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight !text-white sm:text-4xl lg:text-5xl">
              Ready to build something <span className="text-gradient">remarkable</span>?
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Tell White Rabbit about your idea and we'll turn it into an actionable plan, realistic timeline, and working product.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TalkToRabbitButton className="btn-shine group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-ink shadow-2xl shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-white/20 active:scale-95">
                <span>Talk to White Rabbit</span>
                <AiOutlineArrowRight className="text-rabbit transition-transform duration-300 group-hover:translate-x-1" />
              </TalkToRabbitButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 active:scale-95"
              >
                <span>Send a project brief</span>
                <span className="text-purple-300">→</span>
              </Link>
            </div>

            {/* Value & Trust Signals */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-xs font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                Direct founder & tech lead access
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                Guaranteed response within 24 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                Transparent sprint deliverables
              </span>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
