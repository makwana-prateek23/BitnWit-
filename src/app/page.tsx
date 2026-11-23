import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineArrowRight,
  AiOutlineBulb,
  AiOutlineCheckCircle,
  AiOutlineCode,
  AiOutlineCompass,
  AiOutlineRocket,
  AiOutlineThunderbolt,
  AiFillStar,
  AiOutlineSafety
} from 'react-icons/ai';
import { LuLayers, LuSparkles, LuCheck, LuArrowUpRight, LuCpu, LuGlobe, LuShield } from 'react-icons/lu';
import MascotImage from '../components/MascotImage';
import RabbitMark from '../components/RabbitMark';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import ServiceIcon, { ServiceIconName, serviceTheme } from '../components/ServiceIcon';
import TalkToRabbitButton from '../components/TalkToRabbitButton';
import NeuSurface from '../components/ui/NeuSurface';
import NeuButton from '../components/ui/NeuButton';
import NeuCard from '../components/ui/NeuCard';
import NeuBadge from '../components/ui/NeuBadge';
import ExpandableBentoGrid from '../components/ui/ExpandableBentoGrid';
import ServicesFaqAccordion from '../components/ServicesFaqAccordion';
import NeuTiltCard from '../components/ui/NeuTiltCard';
import { projects } from '../data/content';

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
    description: 'Fast, conversion-tuned web platforms engineered with Next.js 14 and sub-second performance.'
  },
  {
    title: 'Mobile App Development',
    slug: '/services/app-development',
    icon: 'app',
    description: 'Cross-platform iOS and Android products built with Flutter & React Native for fluid UX.'
  },
  {
    title: 'Custom Code & Backends',
    slug: '/services/custom-code',
    icon: 'code',
    description: 'Robust REST/GraphQL APIs, distributed data pipelines, and microservices tailored to your logic.'
  },
  {
    title: 'AI Workflows & LLM Integration',
    slug: '/services/ai-integration',
    icon: 'ai',
    description: 'Autonomous customer agents, internal RAG pipelines, and conversational assistants that ship fast.'
  },
  {
    title: 'UI/UX & Product Design',
    slug: '/services/ui-ux-design',
    icon: 'design',
    description: 'Design systems, interactive prototypes, and conversion paths crafted for effortless usability.'
  },
  {
    title: 'SEO & Technical Analytics',
    slug: '/services/seo-analytics',
    icon: 'seo',
    description: 'Search visibility optimization, Core Web Vitals audits, and event tracking that uncovers revenue.'
  },
  {
    title: 'Digital Marketing & Growth',
    slug: '/services/digital-marketing',
    icon: 'marketing',
    description: 'Performance funnels, customer acquisition experiments, and organic growth infrastructure.'
  },
  {
    title: 'Branding & Strategic Identity',
    slug: '/services/branding-strategy',
    icon: 'branding',
    description: 'Cohesive brand guidelines, typography systems, positioning docs, and design collateral.'
  }
];

const marqueeItems = [
  'Next.js 14 & React 18',
  'Flutter & React Native Apps',
  'AI Assistants & Workflows',
  'Neumorphic Design Systems',
  'Enterprise Node & Python APIs',
  'Conversion Architecture',
  'Sub-Second Performance',
  'Two-Week Sprints'
];

const process = [
  {
    icon: AiOutlineCompass,
    title: 'Discover & Scope',
    copy: 'We unpack business goals, map user journeys, and establish sprint deliverables within 48 hours.'
  },
  {
    icon: AiOutlineCode,
    title: 'Design & Prototype',
    copy: 'Clickable interactive wireframes and component systems validated with your team before engineering.'
  },
  {
    icon: AiOutlineThunderbolt,
    title: 'Build & Iterate',
    copy: 'Production-ready code with continuous bi-weekly staging builds, pull requests, and automated testing.'
  },
  {
    icon: AiOutlineRocket,
    title: 'Deploy & Scale',
    copy: 'Rigorous QA, production deployment, analytics configuration, and 30-day post-launch warranty.'
  }
];

const differentiators = [
  { icon: AiOutlineThunderbolt, title: 'Built for Speed', copy: 'Lean sprint methodology with zero agency bloat. Most projects launch within 3 to 6 weeks.' },
  { icon: AiOutlineCheckCircle, title: 'Senior Engineering', copy: 'Collaborate directly with the engineers and designers building your product, with zero account managers.' },
  { icon: LuCpu, title: 'AI-Native Workflow', copy: 'Bitty and modern AI tooling integrated into how we architect, automate, and support your systems.' },
  { icon: AiOutlineSafety, title: '100% Code Ownership', copy: 'Full ownership of all repositories, database schemas, and Figma files transferred to you.' }
];

const stats = [
  { value: 40, suffix: '+', label: 'Projects Shipped' },
  { value: 8, suffix: '', label: 'Core Disciplines' },
  { value: 98, suffix: '%', label: 'On-Time Delivery' },
  { value: 24, suffix: '/7', label: 'AI Support Guidance' }
];

const techStack = [
  { name: 'Next.js 14', category: 'Frontend' },
  { name: 'React 18', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'MongoDB Atlas', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'OpenAI API', category: 'AI & LLM' },
  { name: 'Vercel / AWS', category: 'Cloud' }
];

const testimonials = [
  {
    name: 'Aarav Mehta',
    designation: 'VP of Product',
    company: 'NexGen Mobility',
    quote: 'BITnWIT completely transformed our fleet tracking dashboard into a responsive, high-speed Next.js application. Our team velocity doubled within 3 weeks of rollout.',
    rating: 5
  },
  {
    name: 'Elena Rostova',
    designation: 'Founder & CEO',
    company: 'FinPulse Systems',
    quote: 'The White Rabbit AI assistant workflow automated 60% of our tier-1 support tickets on day one. Highly recommend their engineering team for ambitious builds.',
    rating: 5
  },
  {
    name: 'Devendra Rathore',
    designation: 'Managing Director',
    company: 'Jaipur Crafts Collective',
    quote: 'Our new e-commerce and inventory platform doubled our monthly online order conversions. Clean aesthetics, rock-solid architecture, and zero downtime.',
    rating: 5
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-20 lg:space-y-28 2xl:space-y-36">

        {/* ------------------------------------------------------------- 1. UNSLOPPED SCULPTED HERO */}
        <section className="relative neu-raised rounded-[2rem] 2xl:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 grid lg:grid-cols-[1.18fr_.82fr] lg:items-center gap-10 lg:gap-14 overflow-hidden">
          <Reveal direction="right" className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neu-purple">
              BITnWIT Studio • Engineering &amp; AI
            </p>

            <h1 className="mt-4 font-display hero-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.1] text-neu-text">
              Engineering digital products with precision, craft, and speed
            </h1>

            <p className="mt-5 max-w-xl 2xl:max-w-2xl text-lg lg:text-xl leading-relaxed text-neu-textSec">
              A modern digital engineering studio for web and mobile development, practical AI workflows, UI/UX systems, and conversion-focused growth.
            </p>

            {/* Tactile Neumorphic CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row items-stretch sm:items-center">
              <TalkToRabbitButton className="inline-flex">
                <NeuButton variant="purple" size="lg" icon={<RabbitMark size={18} />}>
                  Talk to White Rabbit
                </NeuButton>
              </TalkToRabbitButton>

              <Link href="/services">
                <NeuButton variant="default" size="lg">
                  Explore 8 Services
                </NeuButton>
              </Link>
            </div>

            {/* Quick Proof Signals */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-neu-textSec">
              {['40+ projects shipped', '98% on-time delivery', 'AI-native architecture'].map((line) => (
                <span key={line} className="inline-flex items-center gap-2">
                  <AiOutlineCheckCircle className="text-neu-purple" />
                  {line}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Hero Visual: Bitty Mascot in Tactile Neumorphic Plate */}
          <Reveal direction="left" delay={0.1} className="relative z-10">
            <NeuTiltCard maxTilt={6} scale={1.01} elevation="raised-lg" className="p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neu-border pb-4">
                <div className="flex items-center gap-3">
                  <RabbitMark size={28} />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider font-bold text-neu-purple">AI Guide</p>
                    <p className="text-base font-bold text-neu-text">Bitty the Rabbit</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-recessed text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </div>
              </div>

              <div className="py-6 relative flex flex-col items-center justify-center">
                <MascotImage
                  size={240}
                  className="mx-auto"
                />
                <span className="mt-3 text-[11px] font-medium tracking-wide text-neu-textSec">
                  Interactive guide • Tracks cursor &amp; responds to clicks
                </span>
              </div>

              <div className="p-4 rounded-xl neu-recessed text-left space-y-2 transition-all duration-200">
                <p className="text-xs font-medium text-neu-text leading-relaxed">
                  "Ready to build? Share your goals, budget, or timeline and I'll outline an actionable sprint roadmap."
                </p>
                <TalkToRabbitButton className="text-xs font-bold text-neu-purple hover:underline inline-flex items-center gap-1">
                  <span>Chat with Bitty</span>
                  <AiOutlineArrowRight size={12} />
                </TalkToRabbitButton>
              </div>
            </NeuTiltCard>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------- 2. MARQUEE TICKER */}
        <Reveal className="marquee-mask overflow-hidden rounded-full neu-recessed py-3.5">
          <div className="marquee-track flex gap-8 whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-wider text-neu-textSec">
            {marqueeItems.concat(marqueeItems).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span>{item}</span>
                <span className="text-neu-purple">•</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------------------- 3. COMPANY INTRODUCTION & MISSION */}
        <section className="grid gap-8 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5">
            <NeuBadge color="maroon" variant="recessed">
              Who We Are
            </NeuBadge>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl text-neu-text tracking-tight">
              A technology partner built for momentum.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-neu-textSec">
              BITnWIT Technologies Pvt. Ltd. combines product thinking, senior software engineering, and AI automation. We work with ambitious founders and established businesses to solve difficult operational bottlenecks and scale digital revenues.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/about">
                <NeuButton variant="purple" size="md">
                  Our Story &amp; Leadership →
                </NeuButton>
              </Link>
            </div>
          </Reveal>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="p-6 sm:p-7 space-y-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-neu-purple font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-neu-text">Direct Engineering Access</h3>
              <p className="text-sm text-neu-textSec leading-relaxed">
                Work directly with the technical founders and lead engineers who design and write your code.
              </p>
            </NeuTiltCard>

            <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="p-6 sm:p-7 space-y-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-neu-yellow font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-neu-text">Sub-Second Performance</h3>
              <p className="text-sm text-neu-textSec leading-relaxed">
                Every web platform is built for 95+ Core Web Vitals, ultra-fast render speeds, and optimal SEO discoverability.
              </p>
            </NeuTiltCard>

            <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="p-6 sm:p-7 space-y-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-[#FF790E] font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-neu-text">Practical AI Workflows</h3>
              <p className="text-sm text-neu-textSec leading-relaxed">
                We integrate realistic AI solutions that save tangible hours for your staff and automate customer service.
              </p>
            </NeuTiltCard>

            <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="p-6 sm:p-7 space-y-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-emerald-500 font-bold">
                04
              </div>
              <h3 className="text-lg font-bold text-neu-text">Transparent Milestones</h3>
              <p className="text-sm text-neu-textSec leading-relaxed">
                Clear fixed sprint pricing and bi-weekly staging builds so you know exactly what is shipping when.
              </p>
            </NeuTiltCard>
          </div>
        </section>

        {/* ------------------------------------------------------------- 4 & 5. EIGHT CORE SERVICES */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <Reveal className="max-w-3xl">
              <NeuBadge color="purple" variant="recessed">
                Core Capabilities
              </NeuBadge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-neu-text">
                Eight disciplines. One unified execution.
              </h2>
              <p className="mt-3 text-base text-neu-textSec">
                From high-conversion web applications to mobile apps and custom AI integrations, every discipline is delivered in focused sprints.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Link href="/services">
                <NeuButton variant="default" size="md">
                  View All Services &amp; Deliverables
                </NeuButton>
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
            {allServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <Link href={service.slug} className="block h-full group">
                  <NeuTiltCard
                    maxTilt={7}
                    scale={1.03}
                    elevation="raised"
                    className="flex h-full flex-col justify-between p-6 sm:p-8"
                  >
                    <div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl neu-recessed text-neu-purple group-hover:text-neu-yellow group-hover:shadow-[0_0_20px_rgba(139,124,246,0.35)] transition-all duration-300">
                        <ServiceIcon name={service.icon} size={24} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neu-textSec">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-neu-border pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-textSec group-hover:text-neu-purple transition-colors">
                        <span>Explore Service</span>
                        <AiOutlineArrowRight size={13} className="transition-transform group-hover:translate-x-1.5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-neu-textSec/50">
                        0{i + 1}
                      </span>
                    </div>
                  </NeuTiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 6. INTERACTIVE BENTO SHOWCASE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <Reveal className="max-w-3xl">
              <NeuBadge color="yellow" variant="recessed">
                Engineering Showcase
              </NeuBadge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-neu-text">
                Interactive architecture &amp; sprint deliverables.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neu-textSec">
                Click any discipline card to inspect deliverables, telemetry benchmarks, and typical sprint timelines.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Link href="/work">
                <NeuButton variant="default" size="sm">
                  View Case Studies
                </NeuButton>
              </Link>
            </Reveal>
          </div>

          <NeuSurface variant="raised" className="p-4 sm:p-8 rounded-[2rem]">
            <ExpandableBentoGrid />
          </NeuSurface>
        </section>

        {/* ------------------------------------------------------------- 7. SELECTED PROJECTS */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <Reveal className="max-w-3xl">
              <NeuBadge color="purple" variant="recessed">
                Selected Work
              </NeuBadge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-neu-text">
                Real problems solved. Systems deployed.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neu-textSec">
                Representative projects engineered for speed, utility, and business growth.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Link href="/work">
                <NeuButton variant="purple" size="md">
                  All Case Studies →
                </NeuButton>
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.slice(0, 4).map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.08}>
                <Link href={`/work/${project.slug}`} className="block group h-full">
                  <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="h-full flex flex-col justify-between overflow-hidden !p-0">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neu-surfaceSec">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 z-10">
                        <NeuBadge color="purple" variant="raised">
                          {project.category}
                        </NeuBadge>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-neu-textSec leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-neu-border">
                        {project.services.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[11px] font-semibold text-neu-textSec px-2.5 py-1 rounded-lg neu-recessed group-hover:text-neu-text transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </NeuTiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 8. HOW WE WORK (PROCESS) */}
        <section className="space-y-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <NeuBadge color="purple" variant="recessed">
              Sprint Methodology
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text">
              From discovery to production in 4 structured steps
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neu-textSec">
              No bloated estimates or opaque backlogs. We work in visible, milestone-driven sprints.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <NeuTiltCard maxTilt={6} scale={1.025} elevation="raised" className="text-center h-full flex flex-col items-center justify-between p-6 sm:p-8">
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-2xl neu-recessed flex items-center justify-center text-neu-purple group-hover:text-neu-yellow transition-colors">
                      <step.icon size={24} />
                    </div>
                    <span className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-neu-purple">
                      Step 0{i + 1}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-neu-text">{step.title}</h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-neu-textSec leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                </NeuTiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 9. WHY CHOOSE BITnWIT & STATS */}
        <section className="space-y-12">
          <Reveal className="neu-recessed rounded-[2.5rem] p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2 group cursor-default">
                <Counter value={stat.value} suffix={stat.suffix} className="text-4xl sm:text-5xl font-extrabold text-neu-purple transition-transform duration-300 group-hover:scale-110" />
                <p className="text-xs uppercase tracking-wider font-bold text-neu-textSec">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((diff, i) => (
              <Reveal key={diff.title} delay={i * 0.06}>
                <NeuTiltCard maxTilt={6} scale={1.025} elevation="raised" className="h-full p-6 sm:p-7 space-y-3">
                  <div className="h-11 w-11 rounded-xl neu-recessed flex items-center justify-center text-neu-purple">
                    <diff.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-neu-text">{diff.title}</h3>
                  <p className="text-xs sm:text-sm text-neu-textSec leading-relaxed">
                    {diff.copy}
                  </p>
                </NeuTiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 10 & 11. INDUSTRIES & COLLABORATIONS */}
        <section className="grid gap-8 lg:grid-cols-2 items-stretch">
          <Reveal className="h-full">
            <NeuTiltCard maxTilt={4} scale={1.015} elevation="raised" className="h-full flex flex-col justify-between space-y-6 p-6 sm:p-8">
              <div>
                <NeuBadge color="purple" variant="recessed">
                  Partners &amp; Audiences
                </NeuBadge>
                <h3 className="mt-3 text-2xl font-bold text-neu-text sm:text-3xl">
                  Built for teams ready to accelerate.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neu-textSec leading-relaxed">
                  From venture-backed founders building their initial MVP to established service businesses replacing legacy software, we tailor our delivery to your roadmap.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {['Founders & Startups', 'Service Businesses', 'Growing Brands', 'Global Remote Teams'].map((tag) => (
                    <div key={tag} className="p-3.5 rounded-xl neu-recessed text-center text-xs font-bold text-neu-text transition-all duration-200 hover:neu-raised">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/clients" className="inline-flex items-center gap-2 text-sm font-bold text-neu-purple hover:underline">
                <span>View Collaboration Models</span>
                <AiOutlineArrowRight size={14} />
              </Link>
            </NeuTiltCard>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <NeuTiltCard maxTilt={4} scale={1.015} elevation="raised" className="h-full flex flex-col justify-between space-y-6 p-6 sm:p-8">
              <div>
                <NeuBadge color="green" variant="recessed">
                  Pan-India • Worldwide
                </NeuBadge>
                <h3 className="mt-3 text-2xl font-bold text-neu-text sm:text-3xl">
                  Remote-first delivery across all time zones.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neu-textSec leading-relaxed">
                  Headquartered in India with remote engineering operations. We maintain structured overlap hours, async pull requests, and automated testing pipelines for coordinated international collaboration.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full neu-recessed text-xs font-bold text-neu-text">
                    🇮🇳 Pan-India Sprints
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full neu-recessed text-xs font-bold text-neu-text">
                    🌍 US / EU Timezone Overlap
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full neu-recessed text-xs font-bold text-neu-text">
                    🔒 Enterprise NDA Protection
                  </span>
                </div>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-neu-purple hover:underline">
                <span>Check Sprint Availability</span>
                <AiOutlineArrowRight size={14} />
              </Link>
            </NeuTiltCard>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------- 12. TECHNOLOGY STACK */}
        <section className="space-y-8">
          <Reveal className="text-center max-w-xl mx-auto">
            <NeuBadge color="purple" variant="recessed">
              Modern Foundations
            </NeuBadge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-neu-text">
              Battle-tested tools and languages
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neu-textSec">
              We choose frameworks that guarantee long-term maintainability, developer ergonomics, and sub-second load times.
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-4 py-2.5 rounded-xl neu-raised text-xs font-bold text-neu-text inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-neu-raised-lg hover:text-neu-purple cursor-default"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neu-purple" />
                <span>{tech.name}</span>
                <span className="text-neu-textSec/60 font-normal">({tech.category})</span>
              </span>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 13. TESTIMONIALS */}
        <section className="space-y-10">
          <Reveal className="text-center max-w-2xl mx-auto">
            <NeuBadge color="yellow" variant="recessed">
              Client Reviews
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text">
              Verified feedback from partners
            </h2>
            <p className="mt-2 text-sm text-neu-textSec">
              Genuine customer experiences across our engineering and AI sprints.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <NeuTiltCard maxTilt={5} scale={1.02} elevation="raised" className="h-full flex flex-col justify-between p-6 sm:p-8 space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3">
                      {[...Array(t.rating)].map((_, idx) => (
                        <AiFillStar key={idx} size={16} />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neu-text leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="border-t border-neu-border pt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full neu-recessed flex items-center justify-center font-bold text-xs text-neu-purple">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neu-text">{t.name}</p>
                      <p className="text-[11px] text-neu-textSec">{t.designation} · {t.company}</p>
                    </div>
                  </div>
                </NeuTiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- 14. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-8">
          <Reveal className="text-center max-w-xl mx-auto">
            <NeuBadge color="purple" variant="recessed">
              Got Questions?
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold text-neu-text">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neu-textSec">
              Everything you need to know about pricing, intellectual property, timelines, and collaboration.
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <NeuSurface variant="raised" className="p-6 sm:p-10 rounded-[2rem]">
              <ServicesFaqAccordion />
            </NeuSurface>
          </div>
        </section>

        {/* ------------------------------------------------------------- 15. FINAL CONVERSION BANNER */}
        <Reveal className="relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] neu-raised-lg p-10 sm:p-16 text-center">
          <div className="hero-blob hero-blob-blue opacity-30" aria-hidden="true" />
          <div className="hero-blob hero-blob-red opacity-20" aria-hidden="true" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl neu-raised p-2 text-center transition-transform duration-300 hover:scale-110 hover:shadow-neu-raised-lg cursor-pointer">
              <Image
                src="/icon.png"
                alt="White Rabbit mascot"
                width={64}
                height={64}
                className="h-14 w-14 object-contain"
              />
            </div>

            <NeuBadge color="green" variant="recessed" pulseDot>
              Available for New Sprints
            </NeuBadge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neu-text tracking-tight">
              Ready to build something <span className="text-neu-purple">remarkable</span>?
            </h2>

            <p className="text-base sm:text-lg text-neu-textSec leading-relaxed">
              Tell White Rabbit about your idea, or connect directly with our technical leadership. We guarantee a thoughtful response and initial architectural roadmap within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <TalkToRabbitButton className="inline-flex">
                <NeuButton variant="purple" size="lg" icon={<RabbitMark size={18} />}>
                  Talk to White Rabbit
                </NeuButton>
              </TalkToRabbitButton>

              <Link href="/contact">
                <NeuButton variant="default" size="lg">
                  Submit Project Brief →
                </NeuButton>
              </Link>
            </div>

            <div className="pt-6 border-t border-neu-border flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neu-textSec">
              <span className="inline-flex items-center gap-1.5">
                <LuCheck className="text-emerald-500" /> Direct Founder Access
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LuCheck className="text-emerald-500" /> 24-Hour Response Time
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LuCheck className="text-emerald-500" /> Transparent Sprint Deliverables
              </span>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
