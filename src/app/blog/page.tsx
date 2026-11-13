import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import GlassHero from '../../components/ui/GlassHero';
import SpotlightCard from '../../components/ui/SpotlightCard';
import ShimmerBadge from '../../components/ui/ShimmerBadge';
import { posts } from '../../data/content';
import { AiOutlineArrowRight } from 'react-icons/ai';

export const metadata: Metadata = {
  title: 'Insights & Engineering Blog | BITnWIT',
  description:
    'Practical BITnWIT insights about AI, websites, product strategy, branding, and digital growth.',
  alternates: { canonical: '/blog' }
};

export default function BlogPage() {
  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16">
        {/* Vengeance UI Glassmorphic Hero */}
        <GlassHero
          badge={
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip text-xs font-bold uppercase tracking-[0.25em]">
              Editorial & Engineering Insights
            </ShimmerBadge>
          }
          title={
            <>
              Insights for smarter <span className="text-gradient">digital growth.</span>
            </>
          }
          description="Practical strategies, architectural patterns, and honest perspectives on web engineering, AI automation, branding, and growth for ambitious companies."
        />

        {/* Blog Posts in 3D Spotlight Glass Cards */}
        <section className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3 2xl:gap-10">
          {posts.map((post) => (
            <SpotlightCard
              key={post.slug}
              enableTilt={true}
              tiltIntensity={5}
              className="glass-card group overflow-hidden rounded-3xl 2xl:rounded-[2.5rem] transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-7 2xl:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-rabbit">
                    {post.readTime}
                  </p>
                  <h2 className="mt-2 text-xl 2xl:text-2xl font-bold text-ink transition-colors group-hover:text-rabbit">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm 2xl:text-base leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs 2xl:text-sm font-bold text-rabbit hover:underline"
                  >
                    <span>Read article</span>
                    <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </section>
      </div>
    </main>
  );
}
