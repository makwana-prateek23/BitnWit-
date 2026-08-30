import Link from 'next/link';
import MascotImage from '../../components/MascotImage';

const values = [
  { number: '01', title: 'Clarity over complexity', copy: 'Straight answers, focused scopes, and decisions your whole team can understand.' },
  { number: '02', title: 'Ship with confidence', copy: 'Small, visible iterations that reduce risk and keep momentum high.' },
  { number: '03', title: 'Built to compound', copy: 'Reusable systems and solid foundations that get more valuable as you grow.' }
];

export default function AboutPage() {
  return <main className="site-page min-h-screen px-6 py-16 text-ink"><div className="mx-auto max-w-6xl space-y-20">
    <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-rabbit" />About BITnWIT</span><h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] sm:text-6xl">A senior digital team for ideas that need to <span className="text-gradient">move.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">We combine product thinking, design, engineering, growth, and practical AI to help ambitious teams go from uncertainty to a working digital product.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-rabbit">Work with us →</Link><Link href="/work" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold transition hover:border-rabbit/40">See our work</Link></div></div><div className="surface-card relative overflow-hidden rounded-[2rem] p-5"><div className="absolute inset-x-8 top-8 h-36 rounded-full bg-rabbit/15 blur-3xl" /><MascotImage className="max-h-[440px]" /></div></section>
    <section><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-rabbit">How we think</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Agency craft. Product-team speed.</h2></div><div className="mt-9 grid gap-5 md:grid-cols-3">{values.map((value) => <article key={value.number} className="surface-card rounded-2xl p-7"><span className="text-xs font-bold text-rabbit">{value.number}</span><h3 className="mt-8 text-xl font-bold">{value.title}</h3><p className="mt-3 leading-7 text-slate-600">{value.copy}</p></article>)}</div></section>
    <section className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-2"><div className="p-8 sm:p-12"><p className="text-sm font-semibold uppercase tracking-[.25em] text-rabbit">Why White Rabbit?</p><h2 className="mt-4 text-3xl font-bold text-white">A helpful guide, not another chatbot.</h2></div><div className="border-white/10 p-8 text-lg leading-8 text-slate-300 sm:border-l sm:p-12">White Rabbit represents how we work: curious, quick, and precise. It guides customers toward the right service and keeps complicated technology approachable.</div></section>
  </div></main>;
}
