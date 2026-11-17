import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import MascotImage from '../../components/MascotImage';
import NeuSurface from '../../components/ui/NeuSurface';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';
import NeuButton from '../../components/ui/NeuButton';
import { team } from '../../data/content';
import { AiOutlineCheckCircle, AiOutlinePhone, AiOutlineArrowRight } from 'react-icons/ai';
import { LuCompass, LuLayers, LuSparkles, LuGlobe, LuCpu, LuShield } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'About Us | BITnWIT',
  description:
    'Meet BITnWIT, our leadership, approach, and remote-first process for delivering digital projects across India and worldwide.',
  alternates: { canonical: '/about' }
};

const principles = [
  {
    title: 'Clarity over complexity',
    copy: 'We turn broad business goals into clear sprint priorities, practical scopes, and architectural decisions everyone can understand.'
  },
  {
    title: 'Senior attention',
    copy: 'Strategy, design, and engineering stay close together, with direct access to the technical founders doing the work.'
  },
  {
    title: 'Visible progress',
    copy: 'Work moves in focused iterations with deployable staging builds, so you can review and adjust before expensive assumptions compound.'
  },
  {
    title: 'Built for momentum',
    copy: 'We create clean, modular, reusable code foundations that help your team launch today and scale smoothly tomorrow.'
  }
];

const processSteps = [
  { step: '01', title: 'Discover', copy: 'Goals, audience research, technical constraints, and measurable success metrics.' },
  { step: '02', title: 'Define', copy: 'Architecture blueprints, priorities, milestone scope, and sprint roadmap.' },
  { step: '03', title: 'Design & Build', copy: 'Collaborative two-week sprints with visible staging deployments and tests.' },
  { step: '04', title: 'Launch & Scale', copy: 'Production deployment, Core Web Vitals optimization, and post-launch analytics tuning.' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 lg:px-12 2xl:px-16 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24">

        {/* HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center overflow-hidden">
          <div className="space-y-6">
            <NeuBadge color="purple" variant="recessed" pulseDot>
              About BITnWIT Technologies
            </NeuBadge>

            <h1 className="font-display hero-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-neu-text leading-[1.1]">
              A digital engineering partner built for <span className="text-gradient">forward motion.</span>
            </h1>

            <p className="text-lg lg:text-xl text-neu-textSec leading-relaxed max-w-2xl">
              BITnWIT combines product strategy, design systems, software engineering, and practical AI automation. Headquartered in India and working with founders and growing teams globally—from first concept to launch and scale.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <NeuButton variant="purple" size="lg">
                  Work With Us →
                </NeuButton>
              </Link>
              <Link href="/work">
                <NeuButton variant="default" size="lg">
                  Explore Selected Work
                </NeuButton>
              </Link>
            </div>
          </div>

          {/* Mascot Showcase Card */}
          <div className="relative">
            <NeuSurface variant="raised-lg" className="p-8 rounded-[2rem] text-center">
              <div className="mb-4">
                <NeuBadge color="yellow" variant="recessed">
                  Bitty · Mascot &amp; AI Guide
                </NeuBadge>
              </div>
              <MascotImage
                src="/mascot-about.jpg"
                alt="Bitty ideating with tablet and lightbulb"
                className="max-h-[380px] lg:max-h-[440px] rounded-2xl mx-auto"
              />
              <p className="mt-4 text-xs font-semibold text-neu-textSec">
                "We innovate with purpose, build with precision, and solve with empathy."
              </p>
            </NeuSurface>
          </div>
        </section>

        {/* OPERATING PRINCIPLES */}
        <section className="space-y-8">
          <div>
            <NeuBadge color="maroon" variant="recessed">
              Why Choose BITnWIT
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
              Small enough to care. Experienced enough to deliver.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((item, i) => (
              <NeuCard key={item.title} variant="raised" className="space-y-3">
                <span className="font-mono text-xs font-bold text-neu-purple px-2.5 py-1 rounded-md neu-recessed inline-block">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold text-neu-text">{item.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-neu-textSec">{item.copy}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* HOW WE WORK (METHODOLOGY) */}
        <section className="space-y-8">
          <div>
            <NeuBadge color="purple" variant="recessed">
              Our Methodology
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
              One transparent process from discovery to outcome.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <NeuCard key={item.step} variant="raised" className="space-y-3">
                <span className="font-mono text-xs font-bold text-neu-purple px-2.5 py-1 rounded-md neu-recessed inline-block">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-neu-text">{item.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neu-textSec">{item.copy}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <NeuBadge color="yellow" variant="recessed">
                Engineering Leadership
              </NeuBadge>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
                The practitioners behind the work.
              </h2>
            </div>
            <p className="text-sm text-neu-textSec max-w-md">
              Direct technical collaboration without the dilution of non-technical middlemen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {team.map((person) => (
              <NeuCard key={person.name} variant="raised" className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="h-16 w-16 rounded-2xl neu-recessed flex items-center justify-center text-xl font-extrabold text-neu-purple shrink-0">
                  {person.initials}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-neu-text">{person.name}</h3>
                    <NeuBadge color="purple" variant="recessed">
                      {person.role}
                    </NeuBadge>
                  </div>

                  <p className="text-xs sm:text-sm text-neu-textSec">
                    {person.specialties.join(' • ')}
                  </p>

                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-text hover:text-neu-purple transition-colors pt-1"
                  >
                    <AiOutlinePhone size={13} className="text-neu-purple" />
                    <span>{person.phone}</span>
                  </a>
                </div>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* PAN-INDIA & GLOBAL REACH */}
        <section className="neu-raised rounded-[2.5rem] p-8 sm:p-12 lg:p-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <NeuBadge color="green" variant="recessed">
              Pan-India • Global-Ready
            </NeuBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neu-text">
              Great software engineering does not depend on a pin code.
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl neu-recessed text-sm sm:text-base leading-relaxed text-neu-textSec space-y-4">
            <p>
              Our remote-first delivery model supports client teams across India and international markets. Clear asynchronous updates, daily communication on private Slack or WhatsApp channels, and weekly milestone staging reviews ensure you are never in the dark.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg neu-raised text-xs font-bold text-neu-text">
                ✓ Async Pull Requests
              </span>
              <span className="px-3 py-1 rounded-lg neu-raised text-xs font-bold text-neu-text">
                ✓ Timezone Overlap Hours
              </span>
              <span className="px-3 py-1 rounded-lg neu-raised text-xs font-bold text-neu-text">
                ✓ Staging Previews on Vercel
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
