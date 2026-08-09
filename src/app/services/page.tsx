import Link from "next/link";

const services = [
  {
    title: "Digital Marketing",
    description: "Brand growth, ads, social, and ROI-driven campaigns.",
    slug: "/services/digital-marketing",
  },
  {
    title: "Web Development",
    description: "Modern websites built for speed, SEO, and conversions.",
    slug: "/services/web-development",
  },
  {
    title: "App Development",
    description:
      "Mobile and web applications designed for usability and scale.",
    slug: "/services/app-development",
  },
  {
    title: "Custom Code",
    description:
      "Tailor-made software, integrations, and custom engineering solutions.",
    slug: "/services/custom-code",
  },
  {
    title: "AI Integration",
    description: "AI-driven workflows, automation, and smart product features.",
    slug: "/services/ai-integration",
  },
  {
    title: "UI/UX Design",
    description: "Clean interfaces and intuitive experiences for every screen.",
    slug: "/services/ui-ux-design",
  },
  {
    title: "SEO & Analytics",
    description: "Search visibility, analytics setup, and conversion tracking.",
    slug: "/services/seo-analytics",
  },
  {
    title: "Branding & Strategy",
    description: "Positioning, messaging, and creative systems that resonate.",
    slug: "/services/branding-strategy",
  },
];

export default function ServicesPage() {
  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Services
          </p>
          <h1 className="mt-4 text-4xl font-bold">What BITnWIT builds</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            A complete set of digital services designed to help ambitious
            businesses launch faster and grow smarter.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-3xl border border-line bg-white p-8 transition hover:border-rabbit/80">
              <h2 className="text-2xl font-semibold text-ink">
                {service.title}
              </h2>
              <p className="mt-4 text-slate-700 leading-7">
                {service.description}
              </p>
              <Link
                href={service.slug}
                className="mt-6 inline-flex text-sm font-semibold text-rabbit hover:text-blue-600">
                Learn more →
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
