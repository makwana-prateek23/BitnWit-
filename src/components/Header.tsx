'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import SpotlightNavbar from './ui/SpotlightNavbar';
import AnimatedButton from './ui/AnimatedButton';
import RabbitMark from './RabbitMark';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Clients', href: '/clients' },
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

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-white-rabbit-chat'));
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-2 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-[1720px] items-center justify-between rounded-2xl border px-5 py-3.5 transition-all duration-300 sm:px-8 lg:px-10 ${
          scrolled
            ? 'glass-hero !bg-white/85 !border-white/90 shadow-2xl shadow-purple-900/10 backdrop-blur-2xl'
            : 'border-white/30 bg-white/45 shadow-xs backdrop-blur-lg hover:border-white/60 hover:bg-white/60'
        }`}
      >
        <Logo />

        <div className="hidden md:block">
          <SpotlightNavbar items={links} />
        </div>

        <div className="hidden md:block">
          <AnimatedButton
            onClick={handleOpenChat}
            variant="primary"
            icon={<RabbitMark size={16} />}
            className="!px-5 !py-2 text-xs font-bold"
          >
            Talk to White Rabbit
          </AnimatedButton>
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
            className="glass-card mt-2 overflow-hidden rounded-2xl border border-white/80 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
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
                      pathname === link.href ? 'text-rabbit font-bold' : 'text-slate-600 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleOpenChat();
                }}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-rabbit px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rabbit/20 transition hover:bg-purple-800"
              >
                Talk to White Rabbit
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
