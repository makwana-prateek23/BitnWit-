interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rabbit">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-bold">{title}</h1>
      {description && <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>}
    </section>
  );
}
