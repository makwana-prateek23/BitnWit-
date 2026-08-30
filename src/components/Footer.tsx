import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlineArrowRight } from 'react-icons/ai';
import RabbitMark from './RabbitMark';

const columns = [
  {
    heading: 'Services',
    links: [
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'App Development', href: '/services/app-development' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

const socials = [
  { icon: AiFillInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: AiFillLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: AiFillGithub, href: 'https://github.com', label: 'GitHub' }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-rabbit/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Got a project in mind?</p>
            <p className="mt-1 text-sm text-slate-400">Let&apos;s turn it into a focused plan.</p>
          </div>
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start a conversation
            <AiOutlineArrowRight />
          </Link>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <RabbitMark size={28} />
              <span className="font-heading text-2xl font-extrabold tracking-tight">
                BIT<span className="text-signal">n</span>
                <span className="text-rabbit">WIT</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-lg font-semibold leading-8 text-slate-200">
              We <span className="text-rabbit">build</span>. We <span className="text-signal">think</span>. We{' '}
              <span className="text-rabbit">create</span>. We <span className="text-signal">grow</span>.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:-translate-y-0.5 hover:border-rabbit hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{column.heading}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white">
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-rabbit transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BITnWIT. All rights reserved.</p>
          <p>Building Intelligence Through Technology</p>
        </div>
      </div>
    </footer>
  );
}
