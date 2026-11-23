import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '../../data/content';
import NeuSurface from '../../components/ui/NeuSurface';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';
import NeuButton from '../../components/ui/NeuButton';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { LuClock, LuBookOpen } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Insights & Engineering Blog | BITnWIT',
  description:
    'Practical BITnWIT insights about AI, websites, product strategy, branding, and digital growth.',
  alternates: { canonical: '/blog' }
};

export default function BlogPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 lg:space-y-24">

        {/* HERO */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 overflow-hidden space-y-6">
          <NeuBadge color="purple" variant="recessed" pulseDot>
            Editorial &amp; Engineering Insights
          </NeuBadge>

          <h1 className="font-display hero-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl text-neu-text leading-[1.08] max-w-4xl">
            Insights for smarter <span className="text-neu-purple">digital growth.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg 2xl:text-xl text-neu-textSec leading-relaxed">
            Practical strategies, architectural patterns, and honest perspectives on web engineering, AI workflow automation, branding systems, and conversion funnels for ambitious companies.
          </p>
        </section>

        {/* BLOG POSTS GRID */}
        <section className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
          {posts.map((post) => (
            <NeuCard
              key={post.slug}
              variant="raised"
              interactive
              className="flex flex-col justify-between overflow-hidden !p-0 group hover:-translate-y-1.5"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neu-surfaceSec">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute top-3 left-3">
                  <NeuBadge color="purple" variant="raised">
                    {post.category}
                  </NeuBadge>
                </div>
              </div>

              <div className="p-7 2xl:p-10 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-neu-purple">
                    <LuClock size={13} />
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl 2xl:text-2xl font-bold text-neu-text group-hover:text-neu-purple transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neu-textSec leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neu-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-purple hover:underline"
                  >
                    <span>Read Full Article</span>
                    <AiOutlineArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </NeuCard>
          ))}
        </section>

      </div>
    </main>
  );
}
