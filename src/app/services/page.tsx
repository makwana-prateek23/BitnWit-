import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../data/content';

export default function ServicesPage() {
  return <main className="site-page min-h-screen px-6 py-10 text-ink"><div className="mx-auto max-w-6xl space-y-10">
    <section className="rounded-3xl bg-white p-10 shadow-sm"><p className="text-sm uppercase tracking-[0.4em] text-slate-500">Services</p><h1 className="mt-4 text-4xl font-bold">What BITnWIT builds</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">A complete set of digital services designed to help ambitious businesses launch faster and grow smarter.</p></section>
    <section className="grid gap-6 md:grid-cols-2">{services.map((service) => <article key={service.slug} className="group overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:border-rabbit/80 hover:shadow-xl"><div className="relative aspect-[16/9] overflow-hidden bg-cloud"><Image src={service.image} alt={service.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" /></div><div className="p-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-rabbit">{service.eyebrow}</p><h2 className="mt-2 text-2xl font-semibold">{service.title}</h2><p className="mt-4 leading-7 text-slate-700">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm font-semibold text-rabbit hover:text-blue-600">Learn more →</Link></div></article>)}</section>
  </div></main>;
}
