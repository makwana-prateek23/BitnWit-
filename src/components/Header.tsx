'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-line bg-white/85 shadow-sm shadow-slate-200/60 backdrop-blur-lg'
          : 'border-transparent bg-white/40 backdrop-blur'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-semibold transition ${
                  active ? 'text-ink' : 'text-slate-600 hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-rabbit transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center justify-center rounded-full bg-rabbit px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rabbit/20 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-rabbit/40"
          >
            Talk to White Rabbit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-cloud md:hidden"
        >
          <span className="sr-only">Menu</span>
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? '✕' : '☰'}
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-semibold transition ${
                      pathname === link.href ? 'text-rabbit' : 'text-slate-600 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-rabbit px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rabbit/20"
              >
                Talk to White Rabbit
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
