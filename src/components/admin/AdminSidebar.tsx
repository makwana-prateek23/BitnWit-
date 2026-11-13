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

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  newLeadsCount?: number;
  userRole?: string;
}

export const navItems = [
  { label: 'Overview', href: '/admin', icon: FiGrid },
  { label: 'Leads & Inquiries', href: '/admin/leads', icon: FiInbox, badgeKey: 'leads' },
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
    <div className="flex flex-col h-full bg-[#271044] text-white">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-purple-900/60">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-white/10 group-hover:border-[#FF790E] transition-colors">
            <Image
              src="/bitty-mascot.png"
              alt="BITnWit Bitty Mascot"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-bold tracking-tight text-base font-display text-white group-hover:text-[#FF790E] transition-colors flex items-center gap-1.5">
              <span>BITnWit</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#FF790E] text-white tracking-widest">
                Admin
              </span>
            </div>
            <p className="text-[10px] text-purple-300/70 font-mono tracking-wider">
              v2.4 • SECURE PORTAL
            </p>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 text-purple-300 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1 scrollbar-thin scrollbar-thumb-purple-900/50">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-purple-300/60 font-mono">
          Core Operations
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#7025B9] to-[#8C3BE0] text-white shadow-lg shadow-purple-950/40'
                  : 'text-purple-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#FFB51B]' : 'text-purple-300/70'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badgeKey === 'leads' && newLeadsCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#FF790E] text-white shadow-sm">
                  {newLeadsCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Utility Actions */}
      <div className="p-4 border-t border-purple-900/60 space-y-2 bg-[#1f0c36]/40">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-purple-200/80 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FiExternalLink className="w-4 h-4 text-purple-400" />
            <span>View Public Website</span>
          </div>
          <span className="text-[10px] text-purple-400 font-mono">↗</span>
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
        >
          <FiLogOut className="w-4 h-4 text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-purple-950/20 shadow-xl z-20">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex flex-col w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
