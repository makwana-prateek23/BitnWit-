import Link from 'next/link';
import type { Metadata } from 'next';
import GlassHero from '../../components/ui/GlassHero';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ShimmerBadge from '../../components/ui/ShimmerBadge';
import { collaborationProfiles } from '../../data/content';

export const metadata: Metadata = {
  title: 'Our Clients & Collaborations | BITnWIT',
  description:
    'See who BITnWIT supports and how we collaborate with founders, service teams, growing businesses, and global organizations.',
  alternates: { canonical: '/clients' }
};

export default function ClientsPage() {
  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24">
        {/* Vengeance UI Glassmorphic Hero */}
        <GlassHero
          badge={
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip text-xs font-bold uppercase tracking-[0.25em]">
              Our Collaborations
            </ShimmerBadge>
          }
          title={
            <>
              Built around the people we <span className="text-gradient">work with.</span>
            </>
          }
          description="We support founders, service businesses, growing teams, and remote organizations with focused digital delivery. Client names and logos will be published here when sharing approval is available."
          actions={
            <Link href="/contact">
              <AnimatedButton variant="primary">Start a project</AnimatedButton>
            </Link>
          }
        />

        {/* Client Collaboration Profiles in Glass Cards */}
        <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 2xl:gap-8">
          {collaborationProfiles.map((client) => (
            <SpotlightCard
              key={client.initials}
              enableTilt={true}
              tiltIntensity={5}
              className="glass-card flex gap-5 rounded-[2rem] p-7 sm:p-9 2xl:p-10 hover:-translate-y-1"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rabbit to-blue-600 text-lg font-extrabold text-white shadow-md shadow-rabbit/20">
                {client.initials}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-rabbit font-mono">
                  {client.type}
                </p>
                <h2 className="mt-2 text-xl 2xl:text-2xl font-bold">{client.name}</h2>
                <p className="mt-3 text-sm 2xl:text-base leading-7 text-slate-600">
                  {client.work}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </section>

        {/* Worldwide Delivery: Glass Dark Section */}
        <section className="glass-dark rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 text-white sm:p-12 2xl:p-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.24em] text-rabbit font-mono">
                Where we collaborate
              </p>
              <h2 className="mt-3 text-3xl 2xl:text-4xl font-bold text-white">
                Across India and around the world.
              </h2>
              <p className="mt-4 text-base 2xl:text-lg leading-7 text-slate-400">
                Remote-first delivery gives every client a clear operating rhythm, whether the team is in one city or spread across countries.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 2xl:p-8 backdrop-blur-md">
                <p className="text-2xl 2xl:text-3xl font-bold text-white">Pan-India</p>
                <p className="mt-1 text-sm 2xl:text-base text-slate-400">Flexible nationwide delivery</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 2xl:p-8 backdrop-blur-md">
                <p className="text-2xl 2xl:text-3xl font-bold text-white">Worldwide</p>
                <p className="mt-1 text-sm 2xl:text-base text-slate-400">International collaboration ready</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action in Glass Container */}
        <section className="glass-hero rounded-[2.5rem] 2xl:rounded-[3.5rem] p-10 2xl:p-16 text-center">
          <h2 className="text-3xl 2xl:text-4xl font-bold">Want to work together?</h2>
          <p className="mx-auto mt-3 max-w-xl 2xl:max-w-2xl text-base 2xl:text-lg text-slate-600">
            Tell us what you are trying to achieve and we’ll help identify the strongest next step.
          </p>
          <div className="mt-7 flex justify-center">
            <Link href="/contact">
              <AnimatedButton variant="glow" className="!px-8 !py-4 font-bold">
                Start a conversation
              </AnimatedButton>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
