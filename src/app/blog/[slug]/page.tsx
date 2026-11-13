import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPost, posts } from '../../../data/content';
import AnimatedRays from '../../../components/ui/AnimatedRays';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import ShimmerBadge from '../../../components/ui/ShimmerBadge';

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findPost(params.slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
          type: 'article',
          title: post.title,
          description: post.excerpt,
          images: [{ url: post.image, alt: post.imageAlt }]
        }
      }
    : {};
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) notFound();

  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <article className="mx-auto w-full max-w-[1400px] space-y-12 2xl:space-y-16">
        {/* Vengeance UI Glassmorphic Header */}
        <header className="glass-hero relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 text-center sm:p-12 2xl:p-16">
          <AnimatedRays className="opacity-55" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />
          
          <div className="relative z-10 flex flex-col items-center">
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip mb-5 text-xs font-bold uppercase tracking-[0.25em]">
              {post.category}
            </ShimmerBadge>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl 2xl:text-6xl text-ink">
              {post.title}
            </h1>
            <p className="mt-5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              {post.date} · {post.readTime}
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-lg 2xl:text-xl leading-8 text-slate-700">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Visual Showcase */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] border border-white/60 bg-slate-100 shadow-xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Article Body in Glass Card */}
        <div className="glass-card rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 2xl:p-16 shadow-xl">
          {post.sections.map((section) => (
            <section key={section.heading} className="not-first:mt-10">
              <h2 className="text-2xl 2xl:text-3xl font-bold text-ink">{section.heading}</h2>
              <p className="mt-4 text-lg 2xl:text-xl leading-8 text-slate-700">{section.body}</p>
            </section>
          ))}
          <div className="glass-chip mt-12 rounded-2xl p-6 2xl:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg text-ink">Have a project where this thinking could help?</p>
              <p className="text-sm text-slate-600 mt-1">Discuss architecture and roadmap directly with our tech team.</p>
            </div>
            <Link href="/contact">
              <AnimatedButton variant="glow" className="shrink-0 font-bold">
                Talk to BITnWIT
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
