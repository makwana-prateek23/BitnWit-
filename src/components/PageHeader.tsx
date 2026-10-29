interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="rounded-3xl 2xl:rounded-[2.5rem] bg-white p-10 2xl:p-14 shadow-sm shadow-slate-200/50">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rabbit">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl 2xl:text-6xl">{title}</h1>
      {description && <p className="mt-6 max-w-4xl text-lg 2xl:text-xl leading-8 text-slate-700">{description}</p>}
    </section>
  );
}
