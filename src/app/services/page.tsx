import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '../../data/content';

export const metadata: Metadata = { title: 'Digital Services', description: 'Explore BITnWIT web development, app development, AI integration, UI/UX, SEO, marketing, branding, and custom software services.', alternates: { canonical: '/services' } };

const phases = [
  { step: '01', title: 'Understand the opportunity', copy: 'We clarify the audience, business goal, constraints, and the result worth pursuing.' },
  { step: '02', title: 'Shape the right solution', copy: 'We turn insights into a focused strategy, user journey, and practical delivery plan.' },
  { step: '03', title: 'Create and validate', copy: 'Design, content, and technology come together in visible iterations you can review.' },
  { step: '04', title: 'Launch and improve', copy: 'We ship, measure real behavior, and prioritize the improvements that create value.' }
];

export default function ServicesPage() {
  return <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16"><div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24">
    <header className="max-w-4xl 2xl:max-w-5xl"><span className="eyebrow">What we make possible</span><h1 className="mt-6 text-4xl font-extrabold tracking-[-.04em] sm:text-6xl 2xl:text-7xl">From business challenge to <span className="text-gradient">working result.</span></h1><p className="mt-6 max-w-3xl 2xl:max-w-4xl text-lg 2xl:text-xl leading-8 text-slate-600">We do more than deliver a list of services. We find the right action, build the right system, and connect every decision to an outcome your team can use.</p></header>
    <section className="space-y-8">{services.map((service, index) => <article key={service.slug} className="surface-card group grid overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] lg:grid-cols-2"><div className={`relative min-h-[340px] 2xl:min-h-[420px] overflow-hidden ${index % 2 ? 'lg:order-2' : ''}`}><Image src={service.image} alt={service.imageAlt} fill className="content-image object-cover group-hover:scale-105" sizes="(min-width:1024px) 50vw, 100vw" /><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm backdrop-blur">0{index + 1}</span></div><div className="flex flex-col justify-center p-7 sm:p-10 2xl:p-14"><p className="text-xs font-bold uppercase tracking-[.22em] text-rabbit">{service.eyebrow}</p><h2 className="mt-3 text-3xl 2xl:text-4xl font-bold">{service.title}</h2><p className="mt-4 text-base 2xl:text-lg leading-relaxed text-slate-600">{service.description}</p><div className="mt-6 grid gap-2.5 sm:grid-cols-2">{service.deliverables.slice(0, 4).map(item => <p key={item} className="flex gap-2 text-sm 2xl:text-base text-slate-700"><span className="text-rabbit font-bold">✓</span>{item}</p>)}</div><Link href={`/services/${service.slug}`} className="mt-8 inline-flex w-fit items-center rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-rabbit">See how we help →</Link></div></article>)}</section>
    <section className="rounded-[2rem] bg-ink p-8 text-white sm:p-12"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.24em] text-rabbit">One connected process</p><h2 className="mt-3 text-3xl font-bold text-white">Clear action at every stage.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-4">{phases.map(phase => <div key={phase.step} className="rounded-2xl border border-white/10 bg-white/5 p-6"><span className="text-xs font-bold text-rabbit">{phase.step}</span><h3 className="mt-5 font-bold text-white">{phase.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{phase.copy}</p></div>)}</div></section>
    <section className="surface-card flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:p-10"><div><h2 className="text-2xl font-bold">Not sure which service fits?</h2><p className="mt-2 text-slate-600">Bring us the problem. We’ll help define the right starting point.</p></div><Link href="/contact" className="shrink-0 rounded-xl bg-rabbit px-6 py-3 text-sm font-semibold text-white">Start a conversation →</Link></section>
  </div></main>;
}
