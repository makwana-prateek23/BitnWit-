import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findService, services } from '../../../data/content';
import AnimatedRays from '../../../components/ui/AnimatedRays';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import ShimmerBadge from '../../../components/ui/ShimmerBadge';

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = findService(params.slug);
  return service
    ? {
        title: service.title,
        description: service.description,
        alternates: { canonical: `/services/${service.slug}` },
        openGraph: {
          title: service.title,
          description: service.description,
          images: [{ url: service.image, alt: service.imageAlt }]
        }
      }
    : {};
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = findService(params.slug);
  if (!service) notFound();

  return (
    <main className="site-page min-h-screen px-4 py-10 text-ink sm:px-8 lg:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1720px] space-y-12 2xl:space-y-16">
        {/* Vengeance UI Glassmorphic Hero */}
        <section className="glass-hero relative overflow-hidden rounded-[2.5rem] 2xl:rounded-[3.5rem] grid lg:grid-cols-2">
          <AnimatedRays className="opacity-55" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />
          
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 2xl:p-16">
            <ShimmerBadge pulseDot pulseColor="bg-rabbit" className="glass-chip mb-5 w-fit text-xs font-bold uppercase tracking-[0.25em]">
              {service.eyebrow}
            </ShimmerBadge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl 2xl:text-6xl text-ink">
              {service.title}
            </h1>
            <p className="mt-6 text-lg 2xl:text-xl leading-8 text-slate-700">
              {service.description}
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <AnimatedButton variant="glow" className="!px-8 !py-4 font-bold">
                  Start a project
                </AnimatedButton>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[380px] 2xl:min-h-[500px] overflow-hidden bg-slate-100">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </section>

        {/* Deliverables & Process: Glass Dark + Glass Card */}
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] 2xl:gap-12">
          <div className="glass-dark rounded-[2rem] 2xl:rounded-[2.5rem] p-8 2xl:p-12 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rabbit font-mono">
              What we deliver
            </p>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-base 2xl:text-lg">
                  <span className="text-rabbit font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-[2rem] 2xl:rounded-[2.5rem] p-8 sm:p-10 2xl:p-12 shadow-xl">
            <h2 className="text-3xl 2xl:text-4xl font-bold">How the work moves</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {service.process.map((step, index) => (
                <div key={step.title} className="glass-chip rounded-2xl p-6">
                  <span className="text-xs font-bold text-rabbit font-mono">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
