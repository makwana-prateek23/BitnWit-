import { notFound } from "next/navigation";
import ServiceVisual from "../../../components/ServiceVisual";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const serviceData: Record<string, { title: string; description: string }> = {
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Growth-first digital marketing that turns browsers into customers.",
  },
  "web-development": {
    title: "Web Development",
    description: "Fast, polished websites built for performance and SEO.",
  },
  "app-development": {
    title: "App Development",
    description: "Intuitive web and mobile apps designed to scale smoothly.",
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description:
      "Interfaces that feel modern, usable, and focused on conversion.",
  },
  "seo-analytics": {
    title: "SEO & Analytics",
    description:
      "Data-driven visibility and tracking that powers smarter growth.",
  },
  "branding-strategy": {
    title: "Branding & Strategy",
    description:
      "Brand systems and messaging designed to stand out and perform.",
  },
  "custom-code": {
    title: "Custom Code",
    description:
      "Tailor-made software, integrations, and custom engineering solutions.",
  },
  "ai-integration": {
    title: "AI Integration",
    description: "AI-driven workflows, automation, and smart product features.",
  },
};

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = serviceData[params.slug];
  if (!service) {
    notFound();
  }

  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Service
          </p>
          <h1 className="mt-4 text-4xl font-bold">{service.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            {service.description}
          </p>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <ServiceVisual slug={params.slug} />

          <div className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
            <h2 className="text-2xl font-semibold">What we deliver</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li>• Clear priorities for launch and scale</li>
              <li>• Simple tools that your team can use</li>
              <li>• Data-driven progress tracking</li>
              <li>• A fast handoff to growth-ready systems</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
