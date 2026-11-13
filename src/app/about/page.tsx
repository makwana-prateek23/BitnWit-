import Link from 'next/link';
import type { Metadata } from 'next';
import MascotImage from '../../components/MascotImage';
import GlassHero from '../../components/ui/GlassHero';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ShimmerBadge from '../../components/ui/ShimmerBadge';
import { team } from '../../data/content';

export const metadata: Metadata = {
  title: 'About Us | BITnWIT',
  description:
    'Meet BITnWIT, our leadership, approach, and remote-first process for delivering digital projects across India and worldwide.',
  alternates: { canonical: '/about' }
};

const principles = [
  {
    title: 'Clarity over complexity',
    copy: 'We turn broad goals into clear priorities, practical scopes, and decisions everyone can understand.'
  },
  {
    title: 'Senior attention',
    copy: 'Strategy, design, and engineering stay close together, with direct access to the people doing the work.'
  },
  {
    title: 'Visible progress',
    copy: 'Work moves in focused iterations, so you can review, learn, and adjust before expensive assumptions compound.'
  },
  {
    title: 'Built for momentum',
    copy: 'We create reusable foundations that help teams launch today and keep improving tomorrow.'
  }
];

const process = [
  { step: '01', title: 'Discover', copy: 'Goals, users, constraints, and success measures.' },
  { step: '02', title: 'Define', copy: 'Strategy, priorities, scope, and delivery roadmap.' },
  { step: '03', title: 'Design & build', copy: 'Collaborative iterations with visible progress.' },
  { step: '04', title: 'Launch & learn', copy: 'Quality checks, measurement, and optimization.' }
];

export default function AboutPage() {
  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24">
        {/* Vengeance UI Glassmorphic Hero */}
        <GlassHero
          badge={
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip text-xs font-bold uppercase tracking-[0.25em]">
              About BITnWIT
            </ShimmerBadge>
          }
          title={
            <>
              A technology partner built for <span className="text-gradient">forward motion.</span>
            </>
          }
          description="BITnWIT combines product thinking, design, software, marketing, and practical AI. We work with founders and growing teams across India and internationally—from first idea to launch and continued growth."
          actions={
            <>
              <Link href="/contact">
                <AnimatedButton variant="primary">Work with us</AnimatedButton>
              </Link>
              <Link href="/work">
                <AnimatedButton variant="secondary" className="glass-chip">Explore work</AnimatedButton>
              </Link>
            </>
          }
          visual={
            <SpotlightCard
              enableTilt={true}
              tiltIntensity={7}
              className="glass-card relative overflow-hidden rounded-[2.5rem] p-6 2xl:p-8"
            >
              <div className="absolute inset-x-8 top-8 h-36 rounded-full bg-rabbit/20 blur-3xl" />
              <MascotImage
                src="/mascot-about.jpg"
                alt="Bitty ideating with tablet and lightbulb"
                className="max-h-[460px] 2xl:max-h-[580px] rounded-2xl"
              />
            </SpotlightCard>
          }
        />

        {/* Why Choose Us: Glass Cards Grid */}
        <section>
          <p className="text-sm font-bold uppercase tracking-[.24em] text-rabbit">Why choose us</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl 2xl:text-5xl">
            Small enough to care. Experienced enough to deliver.
          </h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 2xl:gap-8">
            {principles.map((item, i) => (
              <SpotlightCard
                key={item.title}
                enableTilt={true}
                tiltIntensity={5}
                className="glass-card rounded-2xl 2xl:rounded-3xl p-7 2xl:p-9 hover:-translate-y-1"
              >
                <span className="text-xs font-bold text-rabbit font-mono">0{i + 1}</span>
                <h3 className="mt-5 text-xl 2xl:text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-base 2xl:text-lg leading-7 text-slate-600">{item.copy}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* How We Work: Glass Dark Surface */}
        <section className="glass-dark rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 text-white sm:p-12 2xl:p-16">
          <p className="text-sm font-bold uppercase tracking-[.24em] text-rabbit">How we work</p>
          <h2 className="mt-3 text-3xl 2xl:text-4xl font-bold text-white">
            One transparent process from question to outcome.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4 2xl:gap-6">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 2xl:p-8 backdrop-blur-md transition hover:bg-white/10"
              >
                <span className="text-xs font-bold text-rabbit font-mono">{item.step}</span>
                <h3 className="mt-5 font-bold text-white text-lg 2xl:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm 2xl:text-base leading-6 text-slate-400">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership: Glass Cards */}
        <section>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.24em] text-rabbit">Leadership</p>
              <h2 className="mt-3 text-3xl 2xl:text-4xl font-bold">People behind the work.</h2>
            </div>
            <p className="max-w-md 2xl:max-w-lg text-slate-600 2xl:text-lg">
              Direct collaboration with technical leaders—without layers of account management.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:gap-8">
            {team.map((person) => (
              <SpotlightCard
                key={person.name}
                enableTilt={true}
                tiltIntensity={5}
                className="glass-card flex gap-5 rounded-2xl 2xl:rounded-3xl p-7 2xl:p-9 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rabbit text-lg font-bold text-white shadow-md shadow-rabbit/20">
                  {person.initials}
                </div>
                <div>
                  <h3 className="text-xl 2xl:text-2xl font-bold">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-rabbit">{person.role}</p>
                  <p className="mt-3 text-sm 2xl:text-base text-slate-600">
                    {person.specialties.join(' · ')}
                  </p>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="mt-4 inline-flex text-sm font-semibold text-ink hover:text-rabbit"
                  >
                    {person.phone}
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Pan-India Global Reach: Glass Hero Container */}
        <section className="glass-hero grid overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] border border-rabbit/20 lg:grid-cols-2">
          <div className="p-8 sm:p-12 2xl:p-16">
            <p className="text-sm font-bold uppercase tracking-[.24em] text-rabbit">Pan-India. Global-ready.</p>
            <h2 className="mt-4 text-3xl 2xl:text-4xl font-bold">Great work does not depend on a pin code.</h2>
          </div>
          <div className="border-rabbit/15 p-8 text-lg 2xl:text-xl leading-8 text-slate-600 lg:border-l sm:p-12 2xl:p-16 bg-white/40 backdrop-blur-md">
            Our remote-first process supports teams across India and international markets. Clear documentation, async updates, planned overlap hours, and flexible collaboration keep projects moving across locations and time zones.
          </div>
        </section>
      </div>
    </main>
  );
}
