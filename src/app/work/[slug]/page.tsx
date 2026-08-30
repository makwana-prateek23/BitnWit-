import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findProject, projects } from '../../../data/content';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const project = findProject(params.slug); return project ? { title: project.title, description: project.summary, alternates: { canonical: `/work/${project.slug}` }, openGraph: { title: project.title, description: project.summary, images: [{ url: project.image, alt: project.imageAlt }] } } : {}; }

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug); if (!project) notFound();
  return <main className="site-page min-h-screen px-6 py-10 text-ink"><article className="mx-auto max-w-6xl space-y-10">
    <header className="rounded-3xl bg-white p-8 shadow-sm sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">{project.category} · {project.year}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">{project.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{project.summary}</p><div className="mt-6 flex flex-wrap gap-2">{project.services.map((item) => <span key={item} className="rounded-full bg-cloud px-4 py-2 text-sm font-medium text-slate-700">{item}</span>)}</div>{'liveUrl' in project && project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-xl bg-rabbit px-5 py-3 text-sm font-semibold text-white">View live project ↗</a>}</header>
    <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-cloud"><Image src={project.image} alt={project.imageAlt} fill priority className="object-cover" sizes="100vw" /></div>
    <section className="grid gap-6 md:grid-cols-2"><div className="rounded-3xl bg-white p-8"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-rabbit">The challenge</p><p className="mt-4 text-lg leading-8 text-slate-700">{project.challenge}</p></div><div className="rounded-3xl bg-white p-8"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-rabbit">The solution</p><p className="mt-4 text-lg leading-8 text-slate-700">{project.solution}</p></div></section>
    <section className="rounded-3xl bg-ink p-8 text-white sm:p-10"><h2 className="text-3xl font-bold text-white">What changed</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{project.results.map((result) => <div key={result} className="rounded-2xl bg-white/10 p-5"><span className="text-rabbit">✓</span><p className="mt-3 leading-7">{result}</p></div>)}</div><Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">Build something like this →</Link></section>
  </article></main>;
}
