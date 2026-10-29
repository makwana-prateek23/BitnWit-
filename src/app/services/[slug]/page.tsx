import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findService, services } from '../../../data/content';

export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const service = findService(params.slug); return service ? { title: service.title, description: service.description, alternates: { canonical: `/services/${service.slug}` }, openGraph: { title: service.title, description: service.description, images: [{ url: service.image, alt: service.imageAlt }] } } : {}; }

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = findService(params.slug); if (!service) notFound();
  return <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16"><div className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16">
    <section className="grid overflow-hidden rounded-3xl 2xl:rounded-[2.5rem] bg-white shadow-sm lg:grid-cols-2"><div className="flex flex-col justify-center p-8 sm:p-12 2xl:p-16"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-rabbit">{service.eyebrow}</p><h1 className="mt-4 text-4xl font-bold sm:text-5xl 2xl:text-6xl">{service.title}</h1><p className="mt-6 text-lg 2xl:text-xl leading-8 text-slate-700">{service.description}</p><Link href="/contact" className="mt-8 w-fit rounded-full bg-rabbit px-7 py-3.5 text-sm 2xl:text-base font-semibold text-white">Start a project →</Link></div><div className="relative min-h-[380px] 2xl:min-h-[500px] bg-cloud"><Image src={service.image} alt={service.imageAlt} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div></section>
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] 2xl:gap-12"><div className="rounded-3xl 2xl:rounded-[2.5rem] bg-ink p-8 2xl:p-12 text-white"><p className="text-sm uppercase tracking-[0.3em] text-slate-400">What we deliver</p><ul className="mt-6 space-y-4">{service.deliverables.map((item) => <li key={item} className="flex gap-3 text-base 2xl:text-lg"><span className="text-rabbit font-bold">✓</span><span>{item}</span></li>)}</ul></div><div className="rounded-3xl 2xl:rounded-[2.5rem] bg-white p-8 sm:p-10 2xl:p-12"><h2 className="text-3xl 2xl:text-4xl font-bold">How the work moves</h2><div className="mt-8 grid gap-5 sm:grid-cols-3">{service.process.map((step, index) => <div key={step.title} className="rounded-2xl bg-cloud p-6"><span className="text-xs font-bold text-rabbit">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p></div>)}</div></div></section>
  </div></main>;
}
