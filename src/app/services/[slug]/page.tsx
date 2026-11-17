import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findService, services } from '../../../data/content';
import NeuSurface from '../../../components/ui/NeuSurface';
import NeuCard from '../../../components/ui/NeuCard';
import NeuBadge from '../../../components/ui/NeuBadge';
import NeuButton from '../../../components/ui/NeuButton';
import TalkToRabbitButton from '../../../components/TalkToRabbitButton';
import {
  LuCheck,
  LuSparkles,
  LuArrowRight,
  LuLightbulb,
  LuLayers,
  LuClock,
  LuTarget
} from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineWhatsApp } from 'react-icons/ai';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = findService(params.slug);
  return service
    ? {
        title: `${service.title} | BITnWIT Services`,
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

interface ServiceDetailExtras {
  problems: string[];
  solutions: string[];
  techStack: string[];
  faqs: Array<{ question: string; answer: string }>;
  turnaround: string;
}

const serviceExtras: Record<string, ServiceDetailExtras> = {
  'web-development': {
    problems: [
      'Slow, bloated legacy websites causing high bounce rates and lost conversions.',
      'Complex monolithic systems that are brittle, difficult to update, and prone to breaking.',
      'Poor mobile responsiveness and sub-par Core Web Vitals hurting Google search rank.'
    ],
    solutions: [
      'Modern Next.js 14 App Router architecture delivering sub-second page loads.',
      'Component-driven design systems with Tailwind CSS for effortless team updates.',
      'Rigorous performance auditing guaranteeing 95+ Lighthouse and Core Web Vitals scores.'
    ],
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Vercel', 'PostgreSQL', 'MongoDB'],
    turnaround: '3–6 weeks',
    faqs: [
      {
        question: 'Do you build custom designs or use generic templates?',
        answer: 'Every website is custom engineered and designed in Figma based on your unique positioning, brand assets, and customer conversion funnels.'
      },
      {
        question: 'Will we be able to edit blog posts and page content easily?',
        answer: 'Yes! We configure our intuitive BITnWIT Admin Console or headless CMS so your non-technical team members can publish new content in minutes.'
      },
      {
        question: 'Who handles domain connection, SSL, and cloud hosting?',
        answer: 'We configure DNS records, global CDN caching, automated SSL encryption, and high-availability Vercel/AWS cloud deployment as part of the sprint.'
      }
    ]
  },
  'app-development': {
    problems: [
      'High cost and fragmented timelines when trying to build separate iOS and Android native apps.',
      'Unresponsive hybrid prototypes that feel sluggish and fail user retention tests.',
      'Unscalable backend architectures unable to handle push notifications or real-time data sync.'
    ],
    solutions: [
      'Single-codebase React Native & Flutter architecture cutting engineering costs by 40%.',
      'Native-feel 60fps animations, intuitive gesture navigation, and offline-first capabilities.',
      'Secure API backends with automated authentication, push notifications, and analytics.'
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Node.js', 'PostgreSQL', 'App Store / Play Store'],
    turnaround: '4–8 weeks',
    faqs: [
      {
        question: 'Will the app work smoothly on both iPhone and Android?',
        answer: 'Yes! We use battle-tested cross-platform frameworks compiled into native binaries, ensuring identical high performance across both ecosystems.'
      },
      {
        question: 'Do you manage Apple App Store and Google Play Store submissions?',
        answer: 'Yes. We guide you through developer account setup, test builds via TestFlight/Play Internal, and complete store submission compliance.'
      },
      {
        question: 'How do we handle app updates post-launch?',
        answer: 'We implement Over-The-Air (OTA) update pipelines where possible, allowing critical bug fixes and content updates without waiting for app store reviews.'
      }
    ]
  },
  'ai-integration': {
    problems: [
      'Customer support teams drowning in repetitive tier-1 tickets and after-hours queries.',
      'Important internal company data locked inside scattered PDFs, spreadsheets, and databases.',
      'Fear of unpredictable AI hallucinations and confidential customer data leaks.'
    ],
    solutions: [
      'Intelligent 24/7 AI agents (like Bitty) trained exclusively on your verified business data.',
      'Retrieval-Augmented Generation (RAG) search pipelines connecting your private docs to LLMs.',
      'Strict guardrails, fallback escalation rules, and data privacy firewalls.'
    ],
    techStack: ['OpenAI API', 'Anthropic Claude', 'LangChain', 'Pinecone / Vector DB', 'Python', 'Node.js'],
    turnaround: '2–5 weeks',
    faqs: [
      {
        question: 'Is our proprietary business data used to train public AI models?',
        answer: 'Never. We use enterprise API endpoints with zero data-retention agreements, ensuring your confidential data remains 100% private.'
      },
      {
        question: 'What happens if the AI assistant does not know the answer?',
        answer: 'We build structured fallback logic that gracefully collects lead details and routes the visitor directly to your human support team via WhatsApp or email.'
      },
      {
        question: 'Can the AI assistant trigger real actions like booking meetings or updating CRM?',
        answer: 'Yes. Using Function Calling and webhooks, assistants can schedule consultations, check order status, or write leads into your database.'
      }
    ]
  },
  'digital-marketing': {
    problems: [
      'Marketing ad spend burning without clear visibility into customer acquisition cost (CPA).',
      'Disconnected ad creative and poor landing page message match resulting in low conversion.',
      'Generic agency reporting focused on vanity impressions rather than paying customers.'
    ],
    solutions: [
      'Conversion-rate optimized landing pages aligned with targeted paid ad campaigns.',
      'Full-funnel Meta, Google, and LinkedIn ad structure with automated Conversion API tracking.',
      'Transparent weekly reporting tied directly to qualified inquiries and pipeline revenue.'
    ],
    techStack: ['Meta Ads Manager', 'Google Ads', 'Conversion API', 'Google Tag Manager', 'Klaviyo', 'Looker Studio'],
    turnaround: '2–4 weeks',
    faqs: [
      {
        question: 'Do you handle ad copy, visual design, and audience targeting?',
        answer: 'Yes. We deliver end-to-end campaign packages including headline copywriting, creative assets, audience segmentation, and A/B split testing.'
      },
      {
        question: 'What monthly ad budget do you recommend starting with?',
        answer: 'We work with growing companies starting from ₹30,000 to ₹3,00,000+ monthly ad spend, focusing on quick validation before aggressive scaling.'
      },
      {
        question: 'How do we track which ads actually drove closed sales?',
        answer: 'We configure server-side conversion tracking (CAPI) and UTM attribution parameters synced directly into your CRM or Google Analytics.'
      }
    ]
  },
  'ui-ux-design': {
    problems: [
      'Cluttered, confusing user interfaces driving potential buyers away from your product.',
      'Developers guessing visual layouts due to lack of production-ready design tokens.',
      'Inaccessible color contrasts and inconsistent design patterns reducing brand credibility.'
    ],
    solutions: [
      'Customer journey mapping and high-fidelity clickable prototypes in Figma.',
      'Comprehensive Neumorphic and modern design systems with reusable components and tokens.',
      'WCAG AA accessible typography and contrast ratios for seamless multi-device usage.'
    ],
    techStack: ['Figma', 'FigJam', 'Interactive Prototypes', 'Design Tokens', 'Tailwind Config', 'User Testing'],
    turnaround: '2–4 weeks',
    faqs: [
      {
        question: 'Do we get editable Figma source files?',
        answer: 'Yes! You receive complete ownership of all organized Figma files, style guides, auto-layout components, and vector assets.'
      },
      {
        question: 'Can our existing development team easily implement your designs?',
        answer: 'Absolutely. We provide design specs annotated with CSS variables, Tailwind classes, and responsive breakpoint rules for effortless handoff.'
      },
      {
        question: 'Do you create interactive prototypes we can show to investors or test with users?',
        answer: 'Yes. We build realistic, clickable Figma prototypes that look and feel like a live application for stakeholder and customer validation.'
      }
    ]
  },
  'seo-analytics': {
    problems: [
      'Competitors outranking your site on high-intent commercial keywords.',
      'Hidden technical crawl errors, broken canonical tags, and missing structured data.',
      'Analytics dashboards misconfigured and showing duplicate or inaccurate traffic numbers.'
    ],
    solutions: [
      'Comprehensive technical SEO architecture and Schema.org rich snippet integration.',
      'High-intent keyword strategy targeting buyers ready to make purchasing decisions.',
      'Clean Google Analytics 4 (GA4) event tracking setup with custom conversion goals.'
    ],
    techStack: ['Google Search Console', 'GA4', 'Schema.org', 'GTM', 'Semrush', 'Screaming Frog'],
    turnaround: '2–3 weeks',
    faqs: [
      {
        question: 'How soon can we expect organic search ranking improvements?',
        answer: 'Technical crawl fixes and indexation usually show results within 3 to 6 weeks, with compounding organic growth across 3 to 6 months.'
      },
      {
        question: 'Do you guarantee #1 ranking on Google?',
        answer: 'No ethical engineering agency guarantees specific Google rankings. We guarantee rigorous technical SEO best practices that give you the highest algorithmic advantage.'
      },
      {
        question: 'Will our existing rankings drop during a website redesign?',
        answer: 'We execute strict 301 URL redirect maps and metadata preservation checklists to protect your hard-earned SEO authority during transitions.'
      }
    ]
  },
  'custom-code': {
    problems: [
      'Off-the-shelf software tools do not fit your company’s unique business processes.',
      'Manual data copy-pasting between spreadsheets, CRMs, and inventory systems wasting hundreds of hours.',
      'Slow, unmaintained databases struggling under concurrent user loads.'
    ],
    solutions: [
      'Bespoke web applications and role-based internal dashboards tailored to your workflows.',
      'Secure REST and GraphQL APIs connecting disparate cloud systems into automated pipelines.',
      'Optimized database schemas (PostgreSQL / MongoDB) engineered for high concurrency.'
    ],
    techStack: ['Node.js', 'Python', 'TypeScript', 'Docker', 'GraphQL', 'Redis', 'PostgreSQL', 'MongoDB'],
    turnaround: '4–10 weeks',
    faqs: [
      {
        question: 'Can you integrate with our existing ERP, CRM, or accounting software?',
        answer: 'Yes. We build custom API connectors, webhooks, and background workers that synchronize data bi-directionally with your existing tools.'
      },
      {
        question: 'Is the custom software secure against cyber threats?',
        answer: 'We implement industry best practices: salted password hashing, JWT session governance, CSRF tokens, SQL/NoSQL injection protection, and rate limiting.'
      },
      {
        question: 'What documentation do you provide for our internal developers?',
        answer: 'Every custom code sprint includes interactive OpenAPI / Swagger documentation, environment configuration guides, and architecture diagrams.'
      }
    ]
  },
  'branding-strategy': {
    problems: [
      'Inconsistent visual presence across website, social media, and pitch decks confusing prospects.',
      'Generic identity that looks like every other competitor in your industry niche.',
      'Lack of clear brand messaging that articulates why a customer should choose you over alternatives.'
    ],
    solutions: [
      'Strategic market positioning, unique value propositions, and core messaging pillars.',
      'Memorable visual identity including logos, color tokens, typography, and mascot styling.',
      'Comprehensive Brand Guidelines deck ensuring consistency across digital and print touchpoints.'
    ],
    techStack: ['Brand Guidelines Deck', 'Vector Logo Assets', 'Typography Systems', 'Tone of Voice Guide', 'Social Kits'],
    turnaround: '2–3 weeks',
    faqs: [
      {
        question: 'What deliverables are included in a brand identity sprint?',
        answer: 'Primary and secondary logo marks, favicon packages, color palettes with HEX/RGB tokens, typography pairings, social media banners, and brand manual.'
      },
      {
        question: 'Can you help refine our mascot or character illustration?',
        answer: 'Yes! We specialize in character-led branding (like our own mascot Bitty) that adds memorable personality and warmth to technology brands.'
      },
      {
        question: 'Do you provide print-ready vector files?',
        answer: 'Yes. All logo assets are delivered in scalable SVG, EPS, high-res transparent PNG, and print-ready PDF formats.'
      }
    ]
  }
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = findService(params.slug);
  if (!service) notFound();

  const extras = serviceExtras[service.slug] || {
    problems: [
      'Inefficient manual processes and fragmented digital customer touchpoints.',
      'Legacy software limitations that hinder scalability and user retention.',
      'Lack of technical clarity and unaccountable agency billing.'
    ],
    solutions: [
      'Targeted, milestone-driven digital engineering and design execution.',
      'Modern tech stack engineered for sub-second performance and reliability.',
      'Direct communication with senior practitioners and fixed sprint timelines.'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Node.js'],
    turnaround: '3–6 weeks',
    faqs: [
      {
        question: 'How do we get started with this service?',
        answer: 'Reach out through our inquiry form or WhatsApp. We will schedule a free 20-minute technical discovery call to review your scope and provide a fixed milestone estimate.'
      },
      {
        question: 'What is the payment structure?',
        answer: 'We split sprint payments into clear milestone phases: deposit on kickoff, progress checkpoint on staging review, and final balance on production handoff.'
      },
      {
        question: 'Do you offer post-launch maintenance and support?',
        answer: 'Yes. We offer monthly engineering and growth retainers for continuous feature iterations, performance tuning, and technical updates.'
      }
    ]
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 lg:space-y-24">

        {/* 1. HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 overflow-hidden grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <NeuBadge color="purple" variant="recessed">
                {service.eyebrow}
              </NeuBadge>
              <NeuBadge color="yellow" variant="raised">
                ⏱ {extras.turnaround} Sprint
              </NeuBadge>
            </div>

            <h1 className="font-display hero-heading text-4xl font-extrabold tracking-tight sm:text-5xl 2xl:text-6xl text-neu-text leading-[1.1]">
              {service.title}
            </h1>

            <p className="text-lg 2xl:text-xl text-neu-textSec leading-relaxed">
              {service.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <NeuButton variant="purple" size="lg">
                  Start This Sprint →
                </NeuButton>
              </Link>
              <a
                href={`https://wa.me/918949728810?text=${encodeURIComponent(`Hi BITnWIT! I am interested in your ${service.title} sprint.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <NeuButton variant="default" size="lg" icon={<AiOutlineWhatsApp size={18} className="text-emerald-500" />}>
                  Discuss on WhatsApp
                </NeuButton>
              </a>
            </div>
          </div>

          {/* Hero Visual in Raised Surface */}
          <div className="relative">
            <NeuSurface variant="raised-lg" className="overflow-hidden rounded-[2rem] aspect-[4/3] relative">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </NeuSurface>
          </div>
        </section>

        {/* 2. PROBLEMS WE SOLVE & OUR SOLUTIONS */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Problems */}
          <NeuCard variant="raised" tilt className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-red-500">
                <FiAlertCircle size={20} />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-red-500 tracking-wider">The Bottlenecks</span>
                <h2 className="text-2xl font-bold text-neu-text">Problems We Solve</h2>
              </div>
            </div>

            <ul className="space-y-3.5 pt-2">
              {extras.problems.map((prob, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl neu-recessed text-sm text-neu-text leading-relaxed">
                  <span className="font-mono text-xs font-bold text-red-500 shrink-0 mt-0.5">✕</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </NeuCard>

          {/* Solutions */}
          <NeuCard variant="raised" tilt className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center text-emerald-500">
                <LuLightbulb size={20} />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-500 tracking-wider">Our Architectural Approach</span>
                <h2 className="text-2xl font-bold text-neu-text">The Solution We Build</h2>
              </div>
            </div>

            <ul className="space-y-3.5 pt-2">
              {extras.solutions.map((sol, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl neu-recessed text-sm text-neu-text leading-relaxed">
                  <LuCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </NeuCard>
        </section>

        {/* 3. KEY DELIVERABLES & FEATURES */}
        <section className="space-y-8">
          <div>
            <NeuBadge color="purple" variant="recessed">
              Scope &amp; Artifacts
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
              Sprint Deliverables &amp; What You Receive
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((item, idx) => (
              <NeuCard key={item} variant="raised" tilt className="space-y-3">
                <span className="font-mono text-xs font-bold text-neu-purple px-2 py-0.5 rounded neu-recessed inline-block">
                  0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-neu-text">{item}</h3>
                <p className="text-xs text-neu-textSec leading-relaxed">
                  Fully verified and tested to production standards with documentation and complete handover.
                </p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* 4. TECHNOLOGY STACK */}
        <section className="space-y-6">
          <div className="max-w-xl">
            <NeuBadge color="yellow" variant="recessed">
              Tech Stack
            </NeuBadge>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neu-text">
              Technologies &amp; Libraries Used
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {extras.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2.5 rounded-xl neu-raised text-xs font-bold text-neu-text inline-flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neu-purple" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 5. DEVELOPMENT PROCESS */}
        <section className="space-y-8">
          <div>
            <NeuBadge color="maroon" variant="recessed">
              Sprint Flow
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-neu-text tracking-tight">
              How This Sprint Progresses
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {service.process.map((step, i) => (
              <NeuCard key={step.title} variant="raised" tilt className="space-y-3">
                <div className="h-10 w-10 rounded-xl neu-recessed flex items-center justify-center font-mono font-bold text-neu-purple text-xs">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-neu-text">{step.title}</h3>
                <p className="text-sm text-neu-textSec leading-relaxed">{step.description}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* 6. DEDICATED SERVICE FAQS */}
        <section className="space-y-8">
          <div>
            <NeuBadge color="purple" variant="recessed">
              Got Questions?
            </NeuBadge>
            <h2 className="mt-3 text-3xl font-extrabold text-neu-text tracking-tight">
              Frequently Asked Questions About {service.title}
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {extras.faqs.map((faq, i) => (
              <NeuCard key={i} variant="raised" tilt className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-neu-text flex items-center gap-2.5">
                  <span className="text-neu-purple font-mono text-xs">Q{i + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-neu-textSec leading-relaxed pl-6 pt-1 border-t border-neu-border">
                  {faq.answer}
                </p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* 7. SPRINT ENQUIRY CTA */}
        <section className="neu-raised-lg rounded-[2.5rem] p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <NeuBadge color="green" variant="recessed" pulseDot>
            Sprint Kickoff
          </NeuBadge>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neu-text tracking-tight">
            Ready to start your {service.title} project?
          </h2>

          <p className="text-base text-neu-textSec max-w-2xl mx-auto leading-relaxed">
            Reach out with your goals and timeline. We will review your requirements and provide an initial architectural proposal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <NeuButton variant="purple" size="lg">
                Submit Project Brief →
              </NeuButton>
            </Link>

            <TalkToRabbitButton className="inline-flex">
              <NeuButton variant="default" size="lg" icon={<LuSparkles size={16} />}>
                Ask Bitty For Pricing
              </NeuButton>
            </TalkToRabbitButton>
          </div>
        </section>

      </div>
    </main>
  );
}
