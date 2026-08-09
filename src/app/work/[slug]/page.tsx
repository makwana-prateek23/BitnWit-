import { notFound } from 'next/navigation';

interface WorkPageProps {
  params: {
    slug: string;
  };
}

const workData: Record<string, { title: string; summary: string }> = {
  'service-website': {
    title: 'Launch-ready service website',
    summary: 'A modern marketing website built to convert visitors into clients with clear messaging and strong CTAs.'
  },
  'app-concept': {
    title: 'App concept MVP',
    summary: 'A mobile-first prototype designed to test product-market fit quickly and gather user feedback.'
  }
};

export default function WorkDetailPage({ params }: WorkPageProps) {
  const project = workData[params.slug];
  if (!project) {
    notFound();
  }

  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">{project.summary}</p>
        </section>
      </div>
    </main>
  );
}
