import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '../../data/content';

export const metadata: Metadata = { title: 'Insights', description: 'Practical BITnWIT insights about AI, websites, product strategy, branding, and digital growth.', alternates: { canonical: '/blog' } };

export default function BlogPage() {
  return <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16"><div className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16"><section className="rounded-3xl 2xl:rounded-[2.5rem] bg-white p-10 2xl:p-14 shadow-sm"><p className="text-sm uppercase tracking-[0.4em] text-slate-500">Blog</p><h1 className="mt-4 text-4xl font-bold sm:text-5xl 2xl:text-6xl">Insights for smarter digital growth</h1><p className="mt-6 max-w-4xl text-lg 2xl:text-xl leading-8 text-slate-700">Practical ideas on web strategy, AI, branding, and growth for ambitious teams.</p></section><section className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3 2xl:gap-10">{posts.map((post) => <article key={post.slug} className="group overflow-hidden rounded-3xl 2xl:rounded-[2.5rem] border border-line bg-white transition hover:-translate-y-1 hover:border-rabbit/80 hover:shadow-xl"><div className="relative aspect-[16/9] overflow-hidden bg-cloud"><Image src={post.image} alt={post.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" /></div><div className="p-8 2xl:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-rabbit">{post.category} · {post.readTime}</p><h2 className="mt-2 text-2xl font-semibold">{post.title}</h2><p className="mt-3 text-base leading-7 text-slate-600">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-rabbit">Read article →</Link></div></article>)}</section></div></main>;
}
