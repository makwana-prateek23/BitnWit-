import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findProject, projects } from '../../../data/content';
import NeuSurface from '../../../components/ui/NeuSurface';
import NeuCard from '../../../components/ui/NeuCard';
import NeuBadge from '../../../components/ui/NeuBadge';
import NeuButton from '../../../components/ui/NeuButton';
import { LuCheck, LuArrowRight, LuExternalLink, LuLayers, LuTarget } from 'react-icons/lu';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findProject(params.slug);
  return project
    ? {
        title: `${project.title} | BITnWIT Case Study`,
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
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <article className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16">

        {/* HEADER SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 2xl:p-16 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <NeuBadge color="purple" variant="recessed">
              {project.category} · {project.year}
            </NeuBadge>
            <Link href="/work" className="text-xs font-bold text-neu-purple hover:underline">
              ← Back to All Case Studies
            </Link>
          </div>

          <h1 className="font-display hero-heading max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl 2xl:text-6xl text-neu-text leading-[1.1]">
            {project.title}
          </h1>

          <p className="max-w-4xl text-lg 2xl:text-xl leading-relaxed text-neu-textSec">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.services.map((item) => (
              <span
                key={item}
                className="neu-recessed rounded-xl px-3.5 py-1.5 text-xs font-bold text-neu-text"
              >
                {item}
              </span>
            ))}
          </div>

          {'liveUrl' in project && project.liveUrl && (
            <div className="pt-3">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <NeuButton variant="purple" size="md" icon={<LuExternalLink size={16} />}>
                  View Live Application ↗
                </NeuButton>
              </a>
            </div>
          )}
        </section>

        {/* VISUAL SHOWCASE IN RAISED PLATE */}
        <NeuSurface variant="raised-lg" className="overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] p-3 sm:p-5">
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden rounded-[2rem] bg-neu-surfaceSec">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </NeuSurface>

        {/* THE CHALLENGE & THE SOLUTION */}
        <section className="grid gap-8 md:grid-cols-2">
          <NeuCard variant="raised" className="space-y-4 border-l-4 border-red-500">
            <NeuBadge color="maroon" variant="recessed">
              The Challenge
            </NeuBadge>
            <h2 className="text-2xl font-bold text-neu-text">The Operational Bottleneck</h2>
            <p className="text-base sm:text-lg leading-relaxed text-neu-textSec">
              {project.challenge}
            </p>
          </NeuCard>

          <NeuCard variant="raised" className="space-y-4 border-l-4 border-emerald-500">
            <NeuBadge color="green" variant="recessed">
              The Solution
            </NeuBadge>
            <h2 className="text-2xl font-bold text-neu-text">The Architecture Deployed</h2>
            <p className="text-base sm:text-lg leading-relaxed text-neu-textSec">
              {project.solution}
            </p>
          </NeuCard>
        </section>

        {/* RESULTS & OUTCOMES */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 2xl:p-16 space-y-8">
          <div>
            <NeuBadge color="yellow" variant="recessed">
              Impact &amp; Metrics
            </NeuBadge>
            <h2 className="mt-2 text-3xl 2xl:text-4xl font-extrabold text-neu-text">
              What Changed Post-Deployment
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {project.results.map((result, i) => (
              <div key={result} className="rounded-2xl neu-recessed p-6 space-y-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  ✓
                </span>
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-neu-text">
                  {result}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link href="/contact">
              <NeuButton variant="purple" size="lg">
                Build Something Similar →
              </NeuButton>
            </Link>
            <Link href="/work">
              <NeuButton variant="default" size="lg">
                Browse More Work
              </NeuButton>
            </Link>
          </div>
        </section>

      </article>
    </main>
  );
}
