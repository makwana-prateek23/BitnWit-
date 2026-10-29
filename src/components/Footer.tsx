'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineArrowRight
} from 'react-icons/ai';
import { LuArrowUp, LuCopy, LuCheck, LuSparkles } from 'react-icons/lu';
import TalkToRabbitButton from './TalkToRabbitButton';

const engineeringServices = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Mobile App Development', href: '/services/app-development' },
  { label: 'AI Integration & Automation', href: '/services/ai-integration' },
  { label: 'Custom Engineering & APIs', href: '/services/custom-code' }
];

const growthServices = [
  { label: 'Digital Marketing & Growth', href: '/services/digital-marketing' },
  { label: 'UI/UX & Product Design', href: '/services/ui-ux-design' },
  { label: 'SEO & Growth Analytics', href: '/services/seo-analytics' },
  { label: 'Branding & Strategy', href: '/services/branding-strategy' }
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Selected Work & Case Studies', href: '/work' },
  { label: 'Clients & Collaborations', href: '/clients' },
  { label: 'Insights & Blog', href: '/blog' },
  { label: 'Contact & Sprints', href: '/contact' }
];

const socials = [
  { icon: AiFillInstagram, href: 'https://www.instagram.com/bitnwit.in', label: 'Instagram' },
  { icon: AiFillLinkedin, href: 'https://www.linkedin.com/in/sandeep-kumar-0766b7249', label: 'LinkedIn' },
  { icon: AiFillGithub, href: 'https://github.com/Sandeep1-dev', label: 'GitHub' }
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('Sanbook1.0.0.0@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden bg-[#040c22] text-white border-t border-white/10">
      {/* Subtle Ambient Glow Behind Footer */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-rabbit/15 blur-[120px]" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1720px] px-6 pb-14 pt-18 sm:px-8 lg:px-12 2xl:px-16">
        {/* ------------------------------------------------------------- MAIN 4-COLUMN PREMIUM GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 2xl:gap-16">
          {/* Brand & Studio Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex rounded-xl bg-white p-2.5 shadow-md">
                <Image
                  src="/bitnwit-logo-transparent.png"
                  alt="BITnWIT"
                  width={1919}
                  height={820}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Innovate <span className="text-rabbit">• Build</span>{' '}
                <span className="text-signal">• Solve</span>
              </p>

              <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-slate-400">
                A modern digital engineering and growth studio. We design and ship high-performance web applications, mobile platforms, practical AI integrations, and conversion systems.
              </p>

              {/* Quick Connect Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://wa.me/918949728810?text=Hi%20BITnWIT!%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <AiOutlineWhatsApp size={15} className="text-emerald-400" />
                  <span>WhatsApp Studio</span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <LuCheck size={14} className="text-emerald-400" />
                      <span className="text-emerald-300">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <LuCopy size={14} className="text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-purple-600/20 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Engineering & AI (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Engineering &amp; AI
            </p>
            <ul className="mt-4 space-y-2.5">
              {engineeringServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rabbit transition-all duration-300 group-hover:w-full" />
                    </span>
                    <AiOutlineArrowRight className="text-[10px] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-rabbit" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Design & Growth (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Design &amp; Growth
            </p>
            <ul className="mt-4 space-y-2.5">
              {growthServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                    </span>
                    <AiOutlineArrowRight className="text-[10px] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-signal" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Assistant (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                Company
              </p>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-white"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Assistant Quick Trigger */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <TalkToRabbitButton className="group inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 transition-colors hover:text-white">
                <LuSparkles size={13} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Talk to White Rabbit</span>
              </TalkToRabbitButton>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- BOTTOM META BAR */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 text-center sm:text-left">
            <p>© {new Date().getFullYear()} BITnWIT Technologies. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-slate-500">Building Intelligence Through Technology</p>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Pan-India &amp; Global Remote
            </span>

            {/* Interactive Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <span>Back to top</span>
              <LuArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
