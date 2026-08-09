import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const postData: Record<string, { title: string; content: string }> = {
  'ai-first-websites': {
    title: 'Why AI-first websites matter in 2026',
    content: 'AI-first websites make visitor interactions feel more helpful, reduce friction, and move leads toward action. This post explores why the right chat and content tools matter for service brands.'
  },
  'lean-branding': {
    title: 'Building a lean digital brand with BITnWIT',
    content: 'A lean brand system puts the right visuals in place, keeps copy focused, and makes every page feel consistent without overengineering the build.'
  }
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = postData[params.slug];
  if (!post) {
    notFound();
  }

  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-4xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">{post.content}</p>
        </section>
      </div>
    </main>
  );
}
