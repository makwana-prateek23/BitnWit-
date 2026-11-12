import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '../../data/content';

export const metadata: Metadata = { title: 'Our Work & Case Studies', description: 'Explore BITnWIT case studies across web, mobile applications, AI, marketing, branding, and custom software.', alternates: { canonical: '/work' } };

export default function WorkPage() {
  return <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16"><div className="mx-auto w-full max-w-[1720px] space-y-16 2xl:space-y-24"><header className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><span className="eyebrow">Selected work</span><h1 className="mt-6 text-4xl font-extrabold tracking-[-.04em] sm:text-6xl 2xl:text-7xl">Problems solved. Systems shipped. <span className="text-gradient">Value created.</span></h1></div><p className="text-lg 2xl:text-xl leading-8 text-slate-600">Representative case studies across product, web, AI, marketing, brand, and custom software. Each one starts with the problem—not a predetermined deliverable.</p></header><section className="grid gap-8 md:grid-cols-2 2xl:gap-10">{projects.map((project, index) => <article key={project.slug} className={`surface-card group overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}><div className="relative min-h-[320px] 2xl:min-h-[400px] overflow-hidden"><Image src={project.image} alt={project.imageAlt} fill className="content-image object-cover group-hover:scale-105" sizes={index === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 50vw, 100vw'} /></div><div className="p-7 sm:p-9 2xl:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-rabbit">{project.category} · {project.year}</p><h2 className="mt-3 text-2xl 2xl:text-3xl font-bold">{project.title}</h2><p className="mt-4 text-base 2xl:text-lg leading-7 text-slate-600">{project.summary}</p><div className="mt-6 border-l-2 border-rabbit pl-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Outcome</p><p className="mt-1 text-sm 2xl:text-base font-medium text-slate-700">{project.results[0]}</p></div><Link href={`/work/${project.slug}`} className="mt-7 inline-flex text-sm 2xl:text-base font-bold text-rabbit">Read the case study →</Link></div></article>)}</section><section className="relative overflow-hidden rounded-[2rem] 2xl:rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 2xl:p-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-200">
            <span>Stellar Velocity & Craft</span>
          </div>
          <h2 className="mt-4 text-3xl 2xl:text-4xl font-bold text-white">Your challenge could be next.</h2>
          <p className="mt-3 text-slate-300 2xl:text-lg max-w-xl leading-relaxed">Tell us where you are stuck and we’ll map a practical sprint plan with senior craft, documented milestones, and zero agency fluff.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-xl bg-white px-7 py-3.5 text-sm 2xl:text-base font-bold text-ink shadow-lg transition hover:bg-slate-100">Discuss your project →</Link>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
            <Image src="/mascot-work.jpg" alt="Bitty launching a rocket into space" width={512} height={512} className="h-full w-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section></div></main>;
}
