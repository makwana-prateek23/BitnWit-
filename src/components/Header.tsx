'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import RabbitMark from './RabbitMark';
import NeuThemeToggle from './ui/NeuThemeToggle';
import NeuButton from './ui/NeuButton';

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

  // Prevent Header from rendering inside /admin console
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-white-rabbit-chat'));
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-[1720px] items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 sm:px-8 lg:px-10 ${
          scrolled ? 'neu-raised-lg backdrop-blur-md' : 'neu-raised'
        }`}
      >
        <Logo />

        {/* Desktop Nav Items with Neumorphic Tactile States */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl neu-recessed" aria-label="Main Navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'neu-raised text-navy shadow-sm'
                    : 'text-neu-textSec hover:text-navy hover:bg-neu-surface/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Switcher & White Rabbit Action */}
        <div className="hidden md:flex items-center gap-3">
          <NeuThemeToggle />

          <NeuButton
            onClick={handleOpenChat}
            variant="purple"
            size="sm"
            icon={<RabbitMark size={16} />}
            className="!px-4 !py-2 text-xs font-bold shadow-md"
          >
            Talk to White Rabbit
          </NeuButton>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <NeuThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl neu-raised text-neu-text transition-all duration-200 active:neu-pressed"
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {open ? '✕' : '☰'}
            </motion.span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="mt-3 overflow-hidden rounded-2xl neu-raised p-5 md:hidden"
          >
            <div className="flex flex-col gap-2.5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'neu-pressed text-neu-purple'
                        : 'text-neu-textSec hover:text-neu-text hover:bg-neu-surfaceSec'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <NeuButton
                onClick={() => {
                  setOpen(false);
                  handleOpenChat();
                }}
                variant="purple"
                size="md"
                icon={<RabbitMark size={18} />}
                className="mt-2 w-full justify-center shadow-md"
              >
                Talk to White Rabbit
              </NeuButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
