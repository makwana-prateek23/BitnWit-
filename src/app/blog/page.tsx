import Link from 'next/link';

const posts = [
  { title: 'Why AI-first websites matter in 2026', slug: '/blog/ai-first-websites' },
  { title: 'Building a lean digital brand with BITnWIT', slug: '/blog/lean-branding' }
];

export default function BlogPage() {
  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Blog</p>
          <h1 className="mt-4 text-4xl font-bold">Insights for smarter digital growth</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Articles and ideas on web strategy, AI tools, branding, and growth for small teams.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-line bg-white p-8 transition hover:border-rabbit/80">
              <h2 className="text-2xl font-semibold text-ink">{post.title}</h2>
              <Link href={post.slug} className="mt-6 inline-flex text-sm font-semibold text-rabbit hover:text-blue-600">
                Read article →
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
