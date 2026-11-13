import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findProject, projects } from '../../../data/content';
import AnimatedRays from '../../../components/ui/AnimatedRays';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import ShimmerBadge from '../../../components/ui/ShimmerBadge';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findProject(params.slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}` },
        openGraph: {
          title: project.title,
          description: project.summary,
          images: [{ url: project.image, alt: project.imageAlt }]
        }
      }
    : {};
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) notFound();

  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <article className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16">
        {/* Vengeance UI Glassmorphic Header */}
        <header className="glass-hero relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 2xl:p-16">
          <AnimatedRays className="opacity-55" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />
          
          <div className="relative z-10">
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip mb-5 w-fit text-xs font-bold uppercase tracking-[0.25em]">
              {project.category} · {project.year}
            </ShimmerBadge>
            <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl 2xl:text-6xl text-ink">
              {project.title}
            </h1>
            <p className="mt-6 max-w-4xl text-lg 2xl:text-xl leading-8 text-slate-700">
              {project.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((item) => (
                <span
                  key={item}
                  className="glass-chip rounded-full px-4 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
            {'liveUrl' in project && project.liveUrl && (
              <div className="mt-8">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <AnimatedButton variant="glow" className="!px-7 !py-3.5 font-bold">
                    View live project ↗
                  </AnimatedButton>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Project Visual Showcase */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] border border-white/60 bg-slate-100 shadow-xl">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* The Challenge & The Solution in Glass Cards */}
        <section className="grid gap-8 md:grid-cols-2 2xl:gap-10">
          <div className="glass-card rounded-[2rem] 2xl:rounded-[2.5rem] p-8 2xl:p-12 shadow-lg">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-rabbit">
              The challenge
            </p>
            <p className="mt-4 text-lg 2xl:text-xl leading-8 text-slate-700">
              {project.challenge}
            </p>
          </div>
          <div className="glass-card rounded-[2rem] 2xl:rounded-[2.5rem] p-8 2xl:p-12 shadow-lg">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-rabbit">
              The solution
            </p>
            <p className="mt-4 text-lg 2xl:text-xl leading-8 text-slate-700">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Results Banner in Glass Dark */}
        <section className="glass-dark rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 text-white sm:p-12 2xl:p-16">
          <h2 className="text-3xl 2xl:text-4xl font-bold text-white">What changed</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {project.results.map((result) => (
              <div key={result} className="rounded-2xl border border-white/10 bg-white/5 p-6 2xl:p-8 backdrop-blur-md">
                <span className="text-rabbit font-bold">✓</span>
                <p className="mt-3 text-base 2xl:text-lg leading-7 text-slate-200">{result}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <AnimatedButton variant="secondary" className="!px-7 !py-3.5 font-bold">
                Build something like this →
              </AnimatedButton>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
