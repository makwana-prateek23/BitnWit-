import Link from 'next/link';
import type { Metadata } from 'next';
import { collaborationProfiles } from '../../data/content';
import NeuSurface from '../../components/ui/NeuSurface';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';
import NeuButton from '../../components/ui/NeuButton';
import { LuGlobe, LuUsers, LuSparkles, LuCheck } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Our Clients & Collaborations | BITnWIT',
  description:
    'See who BITnWIT supports and how we collaborate with founders, service teams, growing businesses, and global organizations.',
  alternates: { canonical: '/clients' }
};

export default function ClientsPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 lg:space-y-24">

        {/* HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 overflow-hidden space-y-6">
          <NeuBadge color="purple" variant="recessed" pulseDot>
            Client Collaborations
          </NeuBadge>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl text-neu-text leading-[1.08] max-w-4xl">
            Built around the people and teams we <span className="text-gradient">work with.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg 2xl:text-xl text-neu-textSec leading-relaxed">
            We support venture founders, service businesses, growing brands, and global engineering teams with focused sprint execution. Direct senior engineering, transparent delivery, and zero agency overhead.
          </p>

          <div className="pt-2">
            <Link href="/contact">
              <NeuButton variant="purple" size="lg">
                Start a Collaboration →
              </NeuButton>
            </Link>
          </div>
        </section>

        {/* COLLABORATION CATEGORIES IN NEUMORPHIC CARDS */}
        <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {collaborationProfiles.map((client) => (
            <NeuCard
              key={client.initials}
              variant="raised"
              interactive
              className="flex flex-col justify-between h-full space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl neu-recessed text-lg font-extrabold text-neu-purple">
                    {client.initials}
                  </div>
                  <NeuBadge color="purple" variant="recessed">
                    {client.type}
                  </NeuBadge>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                    {client.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neu-textSec">
                    {client.work}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neu-border text-xs font-semibold text-neu-text flex items-center gap-1.5">
                <LuCheck size={14} className="text-emerald-500" />
                <span>Dedicated Sprint Pods</span>
              </div>
            </NeuCard>
          ))}
        </section>

        {/* PAN-INDIA & WORLDWIDE DELIVERY */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 2xl:p-16 space-y-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <NeuBadge color="green" variant="recessed">
                Where We Collaborate
              </NeuBadge>
              <h2 className="text-3xl 2xl:text-4xl font-extrabold text-neu-text">
                Across India and around the globe.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-neu-textSec">
                Remote-first delivery gives every client a predictable operating rhythm—with daily progress check-ins, documented PRs, and overlap hours across Indian Standard Time (IST), GMT, and US time zones.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl neu-recessed p-6 sm:p-8 space-y-2 text-center">
                <p className="text-2xl 2xl:text-3xl font-extrabold text-neu-purple">🇮🇳 Pan-India</p>
                <p className="text-xs sm:text-sm text-neu-textSec">Startups &amp; enterprises nationwide</p>
              </div>

              <div className="rounded-2xl neu-recessed p-6 sm:p-8 space-y-2 text-center">
                <p className="text-2xl 2xl:text-3xl font-extrabold text-neu-yellow">🌍 Worldwide</p>
                <p className="text-xs sm:text-sm text-neu-textSec">International async-ready delivery</p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="neu-raised-lg rounded-[2.5rem] 2xl:rounded-[3.5rem] p-10 2xl:p-16 text-center max-w-4xl mx-auto space-y-6">
          <NeuBadge color="purple" variant="recessed" pulseDot>
            Next Steps
          </NeuBadge>
          <h2 className="text-3xl 2xl:text-4xl font-extrabold text-neu-text">
            Ready to explore a sprint together?
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-neu-textSec leading-relaxed">
            Tell us what business goals you are trying to achieve and we will help you map the most practical and efficient technical roadmap.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <NeuButton variant="purple" size="lg">
                Start a Conversation →
              </NeuButton>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
