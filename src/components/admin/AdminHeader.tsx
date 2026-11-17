'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiMenu,
  FiCalendar,
  FiPlus,
  FiUser,
  FiBell,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';
import NeuThemeToggle from '../ui/NeuThemeToggle';
import NeuBadge from '../ui/NeuBadge';

interface HeaderProps {
  onOpenMobile: () => void;
  adminUser?: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatarUrl?: string;
  } | null;
  newLeadsCount?: number;
}

const titlesByPath: Record<string, { title: string; subtitle: string }> = {
  '/admin': {
    title: 'Overview Dashboard',
    subtitle: 'Real-time telemetry, lead pipeline and content management',
  },
  '/admin/leads': {
    title: 'Leads & Inquiries CRM',
    subtitle: 'Manage client inquiries, follow-ups, and project proposals',
  },
  '/admin/services': {
    title: 'Services Management',
    subtitle: 'Configure public agency service offerings and deliverables',
  },
  '/admin/projects': {
    title: 'Portfolio & Projects',
    subtitle: 'Showcase completed client solutions, case studies and tech stacks',
  },
  '/admin/blogs': {
    title: 'Blog Management',
    subtitle: 'Author, edit and publish tech insights and company updates',
  },
  '/admin/testimonials': {
    title: 'Client Testimonials',
    subtitle: 'Manage verified client reviews and social endorsements',
  },
  '/admin/media': {
    title: 'Media Library',
    subtitle: 'Upload and organize brand assets, mascot files, and project images',
  },
  '/admin/team': {
    title: 'Team Management',
    subtitle: 'Manage staff profiles and administrative access roles',
  },
  '/admin/settings': {
    title: 'Website Settings',
    subtitle: 'Contact numbers, office address, and social links',
  },
  '/admin/seo': {
    title: 'SEO & Metadata',
    subtitle: 'Page titles, search descriptions and OpenGraph social previews',
  },
  '/admin/analytics': {
    title: 'Website Analytics',
    subtitle: 'Visitor telemetry and Google Analytics 4 integration',
  },
  '/admin/profile': {
    title: 'Admin Profile',
    subtitle: 'Manage credentials, security sessions, and administrative settings',
  },
};

export default function AdminHeader({
  onOpenMobile,
  adminUser,
  newLeadsCount = 0,
}: HeaderProps) {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, []);

  const pageInfo = titlesByPath[pathname] || {
    title: 'Admin Console',
    subtitle: 'BITnWit Technologies Administration',
  };

  return (
    <header className="sticky top-0 z-20 bg-neu-surface/90 backdrop-blur-md border-b border-neu-border px-4 sm:px-8 py-3.5 transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left Side: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobile}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl neu-raised text-neu-text transition hover:text-neu-purple"
            aria-label="Open sidebar navigation"
          >
            <FiMenu size={20} />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-neu-text tracking-tight">
              {pageInfo.title}
            </h1>
            <p className="hidden sm:block text-xs text-neu-textSec">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Theme Toggle, Date & Admin User Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NeuThemeToggle />

          {/* Date Chip */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-recessed text-xs font-semibold text-neu-textSec">
            <FiCalendar size={13} className="text-neu-purple" />
            <span>{currentDate || 'Today'}</span>
          </div>

          {/* Notification / Leads Indicator */}
          {newLeadsCount > 0 && (
            <Link
              href="/admin/leads"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-recessed text-xs font-bold text-orange-600 dark:text-orange-400 hover:neu-raised transition-all"
            >
              <FiBell size={13} className="animate-bounce" />
              <span>{newLeadsCount} New</span>
            </Link>
          )}

          {/* Admin Profile Pill */}
          <Link
            href="/admin/profile"
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl neu-raised hover:neu-raised-lg transition-all"
          >
            <div className="h-7 w-7 rounded-xl neu-recessed flex items-center justify-center text-neu-purple font-bold text-xs">
              {(adminUser?.name || 'Admin').slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-neu-text leading-tight">
                {adminUser?.name || 'Administrator'}
              </span>
              <span className="block text-[10px] font-mono text-neu-purple">
                {adminUser?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
