import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPost, posts } from '../../../data/content';

export const dynamicParams = false;
export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const post = findPost(params.slug); return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.imageAlt }] } } : {}; }

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug); if (!post) notFound();
  return <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16"><article className="mx-auto w-full max-w-[1400px] space-y-12 2xl:space-y-16">
    <header className="rounded-3xl 2xl:rounded-[2.5rem] bg-white p-8 text-center shadow-sm sm:p-12 2xl:p-16"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-rabbit">{post.category}</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold sm:text-5xl 2xl:text-6xl">{post.title}</h1><p className="mt-5 text-sm text-slate-500">{post.date} · {post.readTime}</p><p className="mx-auto mt-6 max-w-3xl text-lg 2xl:text-xl leading-8 text-slate-700">{post.excerpt}</p></header>
    <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden rounded-3xl 2xl:rounded-[2.5rem] bg-cloud"><Image src={post.image} alt={post.imageAlt} fill priority className="object-cover" sizes="100vw" /></div>
    <div className="rounded-3xl 2xl:rounded-[2.5rem] bg-white p-8 sm:p-12 2xl:p-16">{post.sections.map((section) => <section key={section.heading} className="not-first:mt-10"><h2 className="text-2xl 2xl:text-3xl font-bold">{section.heading}</h2><p className="mt-4 text-lg 2xl:text-xl leading-8 text-slate-700">{section.body}</p></section>)}<div className="mt-12 rounded-2xl bg-cloud p-6 2xl:p-8"><p className="font-semibold 2xl:text-lg">Have a project where this thinking could help?</p><Link href="/contact" className="mt-3 inline-flex text-sm 2xl:text-base font-semibold text-rabbit">Talk to BITnWIT →</Link></div></div>
  </article></main>;
}
