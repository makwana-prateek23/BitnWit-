import Link from 'next/link';

const projects = [
  { title: 'Launch-ready service website', slug: '/work/service-website' },
  { title: 'App concept MVP', slug: '/work/app-concept' }
];

export default function WorkPage() {
  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Work</p>
          <h1 className="mt-4 text-4xl font-bold">Portfolio and case studies</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            A collection of recent work and sample projects that show what BITnWIT can build.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-3xl border border-line bg-white p-8 transition hover:border-rabbit/80">
              <h2 className="text-2xl font-semibold text-ink">{project.title}</h2>
              <Link href={project.slug} className="mt-6 inline-flex text-sm font-semibold text-rabbit hover:text-blue-600">
                View case study →
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
