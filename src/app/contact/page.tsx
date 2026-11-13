import type { Metadata } from 'next';
import Image from 'next/image';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import WhatsAppContactForm from '../../components/WhatsAppContactForm';
import TalkToRabbitButton from '../../components/TalkToRabbitButton';
import GlassHero from '../../components/ui/GlassHero';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ShimmerBadge from '../../components/ui/ShimmerBadge';
import { contactTeam as team } from '../../data/content';

export const metadata: Metadata = {
  title: 'Contact BITnWIT',
  description:
    'Start a web, app, AI, design, or digital growth project with BITnWIT. Available across India and internationally.',
  alternates: { canonical: '/contact' }
};

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sandeep-kumar-0766b7249', icon: AiFillLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/bitnwit.in', icon: AiFillInstagram },
  { name: 'GitHub', href: 'https://github.com/Sandeep1-dev', icon: AiFillGithub }
];

export default function ContactPage() {
  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-20">
        {/* Vengeance UI Glassmorphic Hero */}
        <GlassHero
          badge={
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip text-xs font-bold uppercase tracking-[0.25em]">
              Contact BITnWIT
            </ShimmerBadge>
          }
          title={
            <>
              Let’s start with a <span className="text-gradient">conversation.</span>
            </>
          }
          description="Based in India and available Pan-India and internationally. Call a team lead directly or send a project brief through WhatsApp."
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://wa.me/918949728810" target="_blank" rel="noreferrer">
                <AnimatedButton variant="glow" className="!px-7 !py-3.5 text-sm font-bold">
                  Chat on WhatsApp
                </AnimatedButton>
              </a>
              <TalkToRabbitButton className="inline-flex">
                <AnimatedButton variant="secondary" className="glass-chip !px-7 !py-3.5 text-sm font-bold">
                  Talk to White Rabbit
                </AnimatedButton>
              </TalkToRabbitButton>
            </div>
          }
          visual={
            <SpotlightCard
              enableTilt={true}
              tiltIntensity={6}
              className="glass-card rounded-3xl p-6 text-center shadow-xl"
            >
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl">
                <Image
                  src="/mascot-contact.jpg"
                  alt="Bitty AI Assistant ready to help"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-rabbit">
                Instant AI Assistant
              </p>
              <p className="mt-1 text-base font-bold text-ink">Prefer a quick chat?</p>
              <p className="mt-1 text-xs text-slate-500">
                Bitty can answer questions about budgets, timelines, and sprint scopes right now.
              </p>
              <TalkToRabbitButton className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-100 px-5 py-2.5 text-xs font-bold text-rabbit hover:bg-purple-200 transition">
                <span>Open Bitty Chat</span> →
              </TalkToRabbitButton>
            </SpotlightCard>
          }
        />

        {/* Team Leadership Direct Access Cards */}
        <section className="grid gap-6 md:grid-cols-2 2xl:gap-8">
          {team.map((person) => (
            <SpotlightCard
              key={person.name}
              enableTilt={true}
              tiltIntensity={5}
              className="glass-card rounded-2xl 2xl:rounded-3xl p-7 2xl:p-9 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rabbit font-bold text-white shadow-md shadow-rabbit/20">
                  {person.initials}
                </span>
                <div>
                  <h2 className="font-bold text-xl">{person.name}</h2>
                  <p className="text-sm font-semibold text-rabbit">{person.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm 2xl:text-base text-slate-600">
                {person.specialties.join(' · ')}
              </p>
              <a
                href={`tel:${person.phone.replace(/\s/g, '')}`}
                className="mt-4 inline-flex text-lg font-bold text-ink hover:text-rabbit transition-colors"
              >
                {person.phone}
              </a>
            </SpotlightCard>
          ))}
        </section>

        {/* Contact Layout: Sidebar & Form */}
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] 2xl:gap-12">
          <aside className="space-y-6">
            <div className="glass-dark rounded-2xl 2xl:rounded-3xl p-8 2xl:p-10 text-white">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-rabbit font-mono">
                Office & availability
              </p>
              <h2 className="mt-4 text-2xl 2xl:text-3xl font-bold text-white">
                India · Remote-first
              </h2>
              <p className="mt-3 text-sm 2xl:text-base leading-7 text-slate-400">
                Serving clients across India and international markets through planned remote collaboration.
              </p>
              <p className="mt-6 text-sm font-semibold text-white">Monday–Saturday</p>
              <p className="mt-1 text-sm text-slate-400">IST hours · Global overlap by appointment</p>
              <a
                href="https://wa.me/918949728810"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1EBE5D]"
              >
                Chat on WhatsApp
              </a>
            </div>

            <SpotlightCard className="glass-card rounded-2xl 2xl:rounded-3xl p-8">
              <h2 className="font-bold text-lg">Connect socially</h2>
              <div className="mt-4 flex gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/60 bg-white/80 text-xl text-slate-600 shadow-sm backdrop-blur-md transition hover:border-rabbit hover:text-rabbit hover:scale-105"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </SpotlightCard>
          </aside>

          {/* Form wrapped in glass-card */}
          <section className="glass-card rounded-[2rem] 2xl:rounded-[2.5rem] p-6 sm:p-10 2xl:p-14 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-6">
              <div>
                <p className="font-bold text-xl">Send a project brief</p>
                <p className="mt-1 text-sm text-slate-500">Your details open securely in WhatsApp</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                ● Free Consultation
              </span>
            </div>
            <WhatsAppContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
