import Link from 'next/link';
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
import ServiceIcon, { ServiceIconName } from '../components/ServiceIcon';

const services: { title: string; icon: ServiceIconName; slug: string; description: string }[] = [
  {
    title: 'Digital Marketing',
    icon: 'marketing',
    slug: '/services/digital-marketing',
    description: 'Brand growth, ads, social, and ROI-driven campaigns.'
  },
  {
    title: 'Web Development',
    icon: 'web',
    slug: '/services/web-development',
    description: 'Modern websites built for speed, SEO, and conversions.'
  },
  {
    title: 'App Development',
    icon: 'app',
    slug: '/services/app-development',
    description: 'Mobile and web applications designed for usability and scale.'
  },
  {
    title: 'Custom Code',
    icon: 'code',
    slug: '/services/custom-code',
    description: 'Tailor-made software, integrations, and custom engineering solutions.'
  },
  {
    title: 'AI Integration',
    icon: 'ai',
    slug: '/services/ai-integration',
    description: 'AI-powered workflows, automation, and smart product features.'
  },
  {
    title: 'Branding & Strategy',
    icon: 'branding',
    slug: '/services/branding-strategy',
    description: 'Positioning, messaging, and creative systems that resonate.'
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
              <Link
                href="/contact"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-rabbit px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rabbit/20 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl hover:shadow-rabbit/30"
              >
                Talk to White Rabbit
                <AiOutlineArrowRight className="transition group-hover:translate-x-1" />
              </Link>
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
                <p>Get help, qualify your idea, and move to a contact conversation quickly.</p>
              </div>
            </div>

            <div className="floating-chip absolute -top-5 left-8 z-10 hidden rounded-2xl border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg shadow-slate-300/40 backdrop-blur sm:block">
              ⚡ Fast delivery
            </div>
            <div className="floating-chip delay-1 absolute -right-6 top-1/2 z-10 hidden rounded-2xl border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg shadow-slate-300/40 backdrop-blur sm:block">
              💬 AI chat ready
            </div>
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

        {/* ---------------------------------------------------------- SERVICES */}
        <section className="mt-12 rounded-3xl bg-white p-7 shadow-sm shadow-slate-200/50 sm:p-9">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">What we do</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Built for clients who want modern digital products</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.07}>
                <Link
                  href={service.slug}
                  className="group block h-full rounded-3xl border border-line bg-cloud p-6 transition duration-300 hover:-translate-y-1.5 hover:border-rabbit/60 hover:bg-white hover:shadow-xl hover:shadow-rabbit/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rabbit/10 text-rabbit transition duration-300 group-hover:scale-110 group-hover:bg-rabbit group-hover:text-white">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rabbit">
                    Learn more
                    <AiOutlineArrowRight className="transition duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- PROCESS */}
        <section className="mt-12">
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
        <Reveal className="mt-12 grid grid-cols-2 gap-6 rounded-3xl bg-ink p-8 text-white sm:p-9 md:grid-cols-4">
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
        <section className="mt-12 grid gap-6 md:grid-cols-3">
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
        <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
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

        {/* ---------------------------------------------------------- CTA */}
        <Reveal className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-rabbit via-blue-600 to-signal p-9 text-center text-white sm:p-12">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <RabbitMark size={40} className="mx-auto" />
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Ready to build something great?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Tell White Rabbit about your idea and we'll turn it into a plan, a timeline, and a working product.
          </p>
          <Link
            href="/contact"
            className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start a conversation
            <AiOutlineArrowRight />
          </Link>
        </Reveal>

      </div>
    </main>
  );
}
