import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '../../data/content';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedRays from '../../components/ui/AnimatedRays';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ShimmerBadge from '../../components/ui/ShimmerBadge';
import { AiOutlineArrowRight } from 'react-icons/ai';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | BITnWIT',
  description:
    'Explore BITnWIT case studies across web, mobile applications, AI, marketing, branding, and custom software.',
  alternates: { canonical: '/work' }
};

export default function WorkPage() {
  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24">
        {/* Header with Vengeance UI Animated Ambient Light Rays */}
        <header className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end overflow-hidden pt-4 pb-8">
          <AnimatedRays className="opacity-35" />
          <div className="relative z-10">
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="text-xs font-bold uppercase tracking-[0.2em]">
              Selected Work & Portfolio
            </ShimmerBadge>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] sm:text-6xl 2xl:text-7xl">
              Problems solved. Systems shipped. <span className="text-gradient">Value created.</span>
            </h1>
          </div>
          <p className="relative z-10 text-lg 2xl:text-xl leading-8 text-slate-600">
            Representative case studies across product, web, AI, marketing, brand, and custom software.
            Each one starts with the problem—not a predetermined deliverable.
          </p>
        </header>

        {/* Interactive Case Studies Grid with 3D Spotlight Cards */}
        <section className="grid gap-8 md:grid-cols-2 2xl:gap-10">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.slug}
              enableTilt={true}
              tiltIntensity={6}
              className={`group overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
              }`}
            >
              <div className="relative min-h-[320px] 2xl:min-h-[400px] overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="content-image object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={index === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 50vw, 100vw'}
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-9 2xl:p-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-rabbit">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="mt-3 text-2xl 2xl:text-3xl font-bold text-ink transition-colors group-hover:text-rabbit">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-base 2xl:text-lg leading-7 text-slate-600">
                    {project.summary}
                  </p>
                  <div className="mt-6 border-l-2 border-rabbit pl-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Primary Outcome
                    </p>
                    <p className="mt-1 text-sm 2xl:text-base font-semibold text-slate-800">
                      {project.results[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm 2xl:text-base font-bold text-rabbit hover:underline"
                  >
                    <span>Read the full case study</span>
                    <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </section>

        {/* Bottom Banner with Rocket Launch Mascot & Animated Rays */}
        <section className="relative overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 2xl:p-16">
          <AnimatedRays color="rgba(109, 31, 162, 0.45)" secondaryColor="rgba(255, 121, 14, 0.35)" className="opacity-70" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <ShimmerBadge pulseDot pulseColor="bg-emerald-400" className="border-purple-400/30 bg-purple-500/15 text-purple-200">
                Stellar Velocity & Craft
              </ShimmerBadge>
              <h2 className="mt-4 text-3xl 2xl:text-4xl font-bold text-white">
                Your challenge could be next.
              </h2>
              <p className="mt-3 text-slate-300 2xl:text-lg max-w-xl leading-relaxed">
                Tell us where you are stuck and we’ll map a practical sprint plan with senior craft, documented milestones, and zero agency fluff.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <AnimatedButton variant="secondary" className="!px-7 !py-3.5 font-bold">
                    Discuss your project
                  </AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
                <Image
                  src="/mascot-work.jpg"
                  alt="Bitty launching a rocket into space"
                  width={512}
                  height={512}
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
