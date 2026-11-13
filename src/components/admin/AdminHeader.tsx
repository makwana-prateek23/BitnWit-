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
    subtitle: 'Inquiry conversion rates and performance tracking',
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
      now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
  }, []);

  const meta = titlesByPath[pathname] || {
    title: 'Admin Console',
    subtitle: 'BITnWit Technologies Platform',
  };

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-purple-100/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Trigger & Page Heading */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={onOpenMobile}
          className="md:hidden p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Open mobile menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-[#271044] truncate font-display">
            {meta.title}
          </h1>
          <p className="hidden sm:block text-xs text-[#77717F] truncate">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Date, Quick Actions, Profile Pill */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Date Display */}
        {currentDate && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F7FA] border border-slate-200/60 text-xs font-medium text-slate-600">
            <FiCalendar className="w-3.5 h-3.5 text-[#7025B9]" />
            <span>{currentDate}</span>
          </div>
        )}

        {/* Quick Lead Button */}
        <Link
          href="/admin/leads?action=new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF790E] to-[#FF933B] hover:from-[#e66c0b] hover:to-[#FF790E] shadow-sm transition-all"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>New Lead</span>
        </Link>

        {/* Leads Notification Icon */}
        <Link
          href="/admin/leads"
          className="relative p-2 rounded-xl text-slate-600 hover:text-[#271044] hover:bg-slate-100 transition-colors"
          title={`${newLeadsCount} uncontacted leads`}
        >
          <FiBell className="w-4 h-4" />
          {newLeadsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF790E] ring-2 ring-white animate-pulse" />
          )}
        </Link>

        {/* Profile Pill */}
        <Link
          href="/admin/profile"
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-2xl bg-[#F8F7FA] hover:bg-purple-50/60 border border-slate-200/80 transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#271044] to-[#7025B9] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-[#171225] group-hover:text-[#7025B9] transition-colors leading-tight">
              {adminUser?.name || 'Administrator'}
            </div>
            <div className="text-[10px] text-[#77717F] font-mono leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{adminUser?.role || 'SUPER_ADMIN'}</span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
