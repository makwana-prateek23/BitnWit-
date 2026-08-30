import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findPost, posts } from '../../../data/content';

export const dynamicParams = false;
export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug); if (!post) notFound();
  return <main className="site-page min-h-screen px-6 py-10 text-ink"><article className="mx-auto max-w-5xl space-y-10">
    <header className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-rabbit">{post.category}</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">{post.title}</h1><p className="mt-5 text-sm text-slate-500">{post.date} · {post.readTime}</p><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-700">{post.excerpt}</p></header>
    <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-cloud"><Image src={post.image} alt={post.imageAlt} fill priority className="object-cover" sizes="100vw" /></div>
    <div className="rounded-3xl bg-white p-8 sm:p-12">{post.sections.map((section) => <section key={section.heading} className="not-first:mt-10"><h2 className="text-2xl font-bold">{section.heading}</h2><p className="mt-4 text-lg leading-8 text-slate-700">{section.body}</p></section>)}<div className="mt-12 rounded-2xl bg-cloud p-6"><p className="font-semibold">Have a project where this thinking could help?</p><Link href="/contact" className="mt-3 inline-flex text-sm font-semibold text-rabbit">Talk to BITnWIT →</Link></div></div>
  </article></main>;
}
