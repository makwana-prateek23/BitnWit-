import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '../../data/content';
import NeuSurface from '../../components/ui/NeuSurface';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';
import NeuButton from '../../components/ui/NeuButton';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { LuCheck, LuSparkles } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | BITnWIT',
  description:
    'Explore BITnWIT case studies across web, mobile applications, AI, marketing, branding, and custom software.',
  alternates: { canonical: '/work' }
};

export default function WorkPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 lg:space-y-24">

        {/* HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end overflow-hidden">
          <div className="space-y-5">
            <NeuBadge color="purple" variant="recessed" pulseDot>
              Selected Work &amp; Portfolio
            </NeuBadge>
            <h1 className="font-display hero-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl text-neu-text leading-[1.08]">
              Problems solved. Systems shipped. <span className="text-gradient">Value created.</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg 2xl:text-xl leading-relaxed text-neu-textSec">
            Representative case studies across product development, web platforms, AI workflows, and custom engineering. Each one starts with a clear operational challenge—not a predetermined deliverable.
          </p>
        </section>

        {/* CASE STUDIES GRID */}
        <section className="grid gap-8 md:grid-cols-2 2xl:gap-10">
          {projects.map((project, index) => (
            <NeuCard
              key={project.slug}
              variant="raised"
              interactive
              className={`flex flex-col justify-between overflow-hidden !p-0 group hover:-translate-y-1.5 ${
                index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
              }`}
            >
              <div className="relative min-h-[300px] 2xl:min-h-[400px] overflow-hidden bg-neu-surfaceSec">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={index === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 50vw, 100vw'}
                />
                <div className="absolute top-4 left-4">
                  <NeuBadge color="purple" variant="raised">
                    {project.category}
                  </NeuBadge>
                </div>
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-9 2xl:p-12 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-mono font-bold uppercase tracking-widest text-neu-purple">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-neu-textSec">
                    {project.summary}
                  </p>

                  {/* Primary Outcome */}
                  <div className="p-4 rounded-xl neu-recessed border-l-4 border-neu-purple space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neu-purple">
                      Primary Outcome
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-neu-text">
                      {project.results[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neu-border flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-neu-purple hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <AiOutlineArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="font-mono text-xs font-bold text-neu-textSec/50">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </NeuCard>
          ))}
        </section>

        {/* BOTTOM CALL TO ACTION WITH ROCKET MASCOT */}
        <section className="neu-raised-lg rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-14 overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <NeuBadge color="green" variant="recessed" pulseDot>
                Stellar Sprint Velocity
              </NeuBadge>
              <h2 className="text-3xl 2xl:text-4xl font-extrabold text-neu-text">
                Your technical challenge could be next.
              </h2>
              <p className="text-sm sm:text-base text-neu-textSec max-w-xl leading-relaxed">
                Tell us where your team is stuck and we will map a practical sprint plan with senior engineering craft, documented milestones, and zero agency fluff.
              </p>
              <div className="pt-3">
                <Link href="/contact">
                  <NeuButton variant="purple" size="lg">
                    Discuss Your Project →
                  </NeuButton>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <NeuSurface variant="raised" className="p-3 rounded-3xl">
                <Image
                  src="/mascot-work.jpg"
                  alt="Bitty launching a rocket into space"
                  width={320}
                  height={320}
                  className="h-44 w-44 sm:h-52 sm:w-52 object-cover rounded-2xl"
                />
              </NeuSurface>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
