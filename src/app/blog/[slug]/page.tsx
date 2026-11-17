import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPost, posts } from '../../../data/content';
import NeuSurface from '../../../components/ui/NeuSurface';
import NeuCard from '../../../components/ui/NeuCard';
import NeuBadge from '../../../components/ui/NeuBadge';
import NeuButton from '../../../components/ui/NeuButton';
import { LuClock, LuArrowLeft, LuSparkles } from 'react-icons/lu';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findPost(params.slug);
  return post
    ? {
        title: `${post.title} | BITnWIT Insights`,
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
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <article className="mx-auto w-full max-w-[1200px] space-y-12 2xl:space-y-16">

        {/* ARTICLE HEADER */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-14 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <NeuBadge color="purple" variant="recessed">
              {post.category}
            </NeuBadge>
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neu-textSec">
              <LuClock size={13} />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl 2xl:text-5xl text-neu-text leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-xs font-mono font-bold uppercase tracking-wider text-neu-textSec">
            Published {post.date} by BITnWIT Engineering
          </p>

          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-neu-textSec">
            {post.excerpt}
          </p>

          <div>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-purple hover:underline">
              <LuArrowLeft size={13} />
              <span>Back to all insights</span>
            </Link>
          </div>
        </section>

        {/* VISUAL SHOWCASE */}
        <NeuSurface variant="raised-lg" className="p-3 sm:p-5 rounded-[2.5rem] overflow-hidden">
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden rounded-[2rem] bg-neu-surfaceSec">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </NeuSurface>

        {/* ARTICLE BODY */}
        <NeuCard variant="raised" className="p-8 sm:p-14 2xl:p-16 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-neu-text">
                {section.heading}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-neu-textSec">
                {section.body}
              </p>
            </section>
          ))}

          {/* BOTTOM INLINE BANNER */}
          <div className="neu-recessed rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-lg text-neu-text">Have a project where this thinking could help?</p>
              <p className="text-xs sm:text-sm text-neu-textSec">Discuss architecture, scope, and roadmap directly with our tech leads.</p>
            </div>
            <Link href="/contact">
              <NeuButton variant="purple" size="md">
                Talk to BITnWIT →
              </NeuButton>
            </Link>
          </div>
        </NeuCard>

      </article>
    </main>
  );
}
