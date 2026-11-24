'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  FiGrid,
  FiInbox,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiMessageSquare,
  FiImage,
  FiUsers,
  FiSettings,
  FiSearch,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiExternalLink,
  FiX,
} from 'react-icons/fi';
import NeuBadge from '../ui/NeuBadge';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  newLeadsCount?: number;
  userRole?: string;
}

export const navItems = [
  { label: 'Overview', href: '/admin', icon: FiGrid },
  { label: 'Leads & CRM', href: '/admin/leads', icon: FiInbox, badgeKey: 'leads' },
  { label: 'Services', href: '/admin/services', icon: FiLayers },
  { label: 'Portfolio', href: '/admin/projects', icon: FiBriefcase },
  { label: 'Blog Posts', href: '/admin/blogs', icon: FiFileText },
  { label: 'Testimonials', href: '/admin/testimonials', icon: FiMessageSquare },
  { label: 'Media Library', href: '/admin/media', icon: FiImage },
  { label: 'Team Members', href: '/admin/team', icon: FiUsers },
  { label: 'Website Settings', href: '/admin/settings', icon: FiSettings },
  { label: 'SEO Management', href: '/admin/seo', icon: FiSearch },
  { label: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 },
  { label: 'My Profile', href: '/admin/profile', icon: FiUser },
];

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
  newLeadsCount = 0,
}: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out of the admin panel?')) {
      try {
        await fetch('/api/admin/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
      } catch {
        window.location.href = '/admin/login';
      }
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-neu-surface border-r border-neu-border text-neu-text transition-colors duration-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neu-border">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden neu-raised p-1 flex items-center justify-center shrink-0">
            <Image
              src="/bitty-mascot.png"
              alt="Bitty — Mascot"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-neu-text group-hover:text-neu-purple transition-colors">
              BITnWIT
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-neu-purple">
              Admin Console
            </span>
          </div>
        </Link>

        {mobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-lg neu-raised text-neu-textSec hover:text-neu-text"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5" aria-label="Admin Sections">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const showBadge = item.badgeKey === 'leads' && newLeadsCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 select-none ${
                isActive
                  ? 'neu-pressed text-neu-purple shadow-inner font-extrabold'
                  : 'text-neu-textSec hover:text-neu-text hover:neu-raised'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isActive ? 'text-neu-purple' : 'text-neu-textSec'} />
                <span>{item.label}</span>
              </div>

              {showBadge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red text-[10px] font-extrabold text-white shadow-sm">
                  {newLeadsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-neu-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-neu-textSec hover:text-neu-text hover:neu-raised transition-all"
        >
          <span className="flex items-center gap-2">
            <FiExternalLink size={14} />
            <span>View Live Website</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-neu-purple">PROD</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <FiLogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex flex-col w-72 max-w-[85vw] h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
