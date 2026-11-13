'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminLoadingScreen from './AdminLoadingScreen';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname?.startsWith('/admin/login');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function checkAuthAndTelemetry() {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (!res.ok) {
          router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
          return;
        }

        const data = await res.json();
        if (isMounted) {
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
          } else {
            router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
            return;
          }
        }

        // Fetch quick telemetry for leads badge
        const leadsRes = await fetch('/api/admin/leads?status=NEW&limit=1');
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          if (isMounted && typeof leadsData.totalCount === 'number') {
            setNewLeadsCount(leadsData.totalCount);
          }
        }
      } catch (err) {
        console.error('Session verify error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuthAndTelemetry();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  // If on /admin/login, render login page directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading spinner while verifying session
  if (loading) {
    return <AdminLoadingScreen fullScreen message="Securing Administrative Session..." />;
  }

  return (
    <div className="min-h-screen bg-[#F8F7FA] text-[#171225] flex flex-row font-sans selection:bg-[#7025B9] selection:text-white">
      {/* Sidebar (Desktop persistent + Mobile drawer) */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        newLeadsCount={newLeadsCount}
        userRole={adminUser?.role}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onOpenMobile={() => setMobileOpen(true)}
          adminUser={adminUser}
          newLeadsCount={newLeadsCount}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
