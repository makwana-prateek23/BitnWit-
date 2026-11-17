import type { Metadata } from 'next';
import Image from 'next/image';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlinePhone, AiOutlineWhatsApp } from 'react-icons/ai';
import WhatsAppContactForm from '../../components/WhatsAppContactForm';
import TalkToRabbitButton from '../../components/TalkToRabbitButton';
import NeuSurface from '../../components/ui/NeuSurface';
import NeuCard from '../../components/ui/NeuCard';
import NeuBadge from '../../components/ui/NeuBadge';
import NeuButton from '../../components/ui/NeuButton';
import { contactTeam as team } from '../../data/content';
import { LuSparkles, LuClock, LuGlobe, LuShieldCheck } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Contact BITnWIT | Start a Project',
  description:
    'Start a web, app, AI, design, or digital growth project with BITnWIT. Available across India and internationally.',
  alternates: { canonical: '/contact' }
};

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sandeep-kumar-0766b7249', icon: AiFillLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/bitnwit.in', icon: AiFillInstagram },
  { name: 'GitHub', href: 'https://github.com/Sandeep1-dev', icon: AiFillGithub }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 2xl:px-16 lg:py-12 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1720px] space-y-16 lg:space-y-24">

        {/* HERO SECTION */}
        <section className="neu-raised rounded-[2.5rem] 2xl:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 2xl:p-20 grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center overflow-hidden">
          <div className="space-y-6">
            <NeuBadge color="purple" variant="recessed" pulseDot>
              Contact BITnWIT
            </NeuBadge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-neu-text leading-[1.08]">
              Let’s start with an honest <span className="text-gradient">conversation.</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-neu-textSec leading-relaxed">
              Based in India and operating Pan-India and internationally. Call our technical founders directly or submit your project brief below to receive an architectural estimate.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="https://wa.me/918949728810" target="_blank" rel="noreferrer">
                <NeuButton variant="purple" size="lg" icon={<AiOutlineWhatsApp size={18} />}>
                  Chat on WhatsApp
                </NeuButton>
              </a>

              <TalkToRabbitButton className="inline-flex">
                <NeuButton variant="default" size="lg" icon={<LuSparkles size={16} />}>
                  Talk to Bitty AI
                </NeuButton>
              </TalkToRabbitButton>
            </div>
          </div>

          {/* Bitty Mascot Assistant Card */}
          <div className="relative">
            <NeuSurface variant="raised-lg" className="p-8 rounded-[2rem] text-center space-y-3">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-2xl">
                <Image
                  src="/mascot-contact.jpg"
                  alt="Bitty AI Assistant ready to help"
                  width={280}
                  height={280}
                  className="h-full w-full object-contain"
                />
              </div>

              <NeuBadge color="yellow" variant="recessed">
                Instant AI Guidance
              </NeuBadge>
              <h2 className="text-lg font-bold text-neu-text">Prefer a quick inquiry?</h2>
              <p className="text-xs text-neu-textSec">
                Bitty can answer questions about budgets, timelines, and sprint scopes right now.
              </p>
              <div className="pt-2">
                <TalkToRabbitButton className="inline-flex">
                  <NeuButton variant="default" size="sm">
                    Open Bitty Chat →
                  </NeuButton>
                </TalkToRabbitButton>
              </div>
            </NeuSurface>
          </div>
        </section>

        {/* DIRECT LEADERSHIP CARDS */}
        <section className="space-y-6">
          <div className="max-w-xl space-y-2">
            <NeuBadge color="maroon" variant="recessed">
              Direct Contact
            </NeuBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neu-text tracking-tight">
              Connect Directly With Technical Leadership
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {team.map((person) => (
              <NeuCard key={person.name} variant="raised" className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl neu-recessed font-extrabold text-lg text-neu-purple">
                  {person.initials}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-neu-text">{person.name}</h3>
                    <span className="text-xs font-semibold text-neu-purple px-2 py-0.5 rounded neu-recessed">
                      {person.role}
                    </span>
                  </div>
                  <p className="text-xs text-neu-textSec">
                    {person.specialties.join(' · ')}
                  </p>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-neu-text hover:text-neu-purple transition-colors pt-1"
                  >
                    <AiOutlinePhone size={14} className="text-neu-purple" />
                    <span>{person.phone}</span>
                  </a>
                </div>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* MAIN CONTACT FORM & ASIDE LAYOUT */}
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <aside className="space-y-6">
            <NeuCard variant="raised" className="space-y-4">
              <NeuBadge color="purple" variant="recessed">
                Operating Hours
              </NeuBadge>
              <h3 className="text-xl font-bold text-neu-text">
                India · Remote-First Studio
              </h3>
              <p className="text-xs sm:text-sm text-neu-textSec leading-relaxed">
                Serving clients across India and international time zones through structured remote collaboration.
              </p>
              <div className="p-4 rounded-xl neu-recessed text-xs space-y-1 font-semibold text-neu-text">
                <p>🗓 Monday – Saturday</p>
                <p className="text-neu-textSec">9:00 AM – 7:00 PM IST (Global overlap by appointment)</p>
              </div>
            </NeuCard>

            <NeuCard variant="raised" className="space-y-4">
              <h3 className="font-bold text-base text-neu-text">Connect Socially</h3>
              <div className="flex gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl neu-raised text-lg text-neu-textSec hover:text-neu-purple transition-all duration-200 hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </NeuCard>
          </aside>

          {/* Contact Form in Raised Neumorphic Card */}
          <NeuCard variant="raised" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neu-border pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neu-text">Submit Project Brief</h2>
                <p className="text-xs text-neu-textSec mt-1">Guaranteed response and scope estimation within 24 hours</p>
              </div>
              <NeuBadge color="green" variant="recessed" pulseDot>
                Free Discovery Call Included
              </NeuBadge>
            </div>

            <WhatsAppContactForm />
          </NeuCard>
        </div>

      </div>
    </main>
  );
}
