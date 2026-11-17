'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiUsers,
  FiInbox,
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
  FiLayers,
  FiPlus,
  FiArrowRight,
  FiClock,
  FiTrendingUp,
  FiCalendar,
  FiActivity,
} from 'react-icons/fi';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import NeuSurface from '@/components/ui/NeuSurface';
import NeuTiltCard from '@/components/ui/NeuTiltCard';
import NeuButton from '@/components/ui/NeuButton';
import NeuBadge from '@/components/ui/NeuBadge';

interface OverviewData {
  stats: {
    totalLeads: number;
    newLeads: number;
    activeProjects: number;
    completedProjects: number;
    publishedBlogs: number;
    totalServices: number;
  };
  statusDistribution: Record<string, number>;
  monthlyLeads: Array<{ month: string; count: number }>;
  recentLeads: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    interestedService: string;
    dateReceived: string;
    status: string;
  }>;
  recentProjects: Array<{
    id: string;
    title: string;
    category: string;
    coverImageUrl: string;
    publicationStatus: string;
  }>;
  recentActivity: Array<{
    id: string;
    userName: string;
    action: string;
    details: string;
    createdAt: string;
  }>;
}

const statusBadgeColor: Record<string, 'yellow' | 'purple' | 'green' | 'maroon' | 'default'> = {
  NEW: 'yellow',
  CONTACTED: 'purple',
  QUALIFIED: 'purple',
  PROPOSAL_SENT: 'yellow',
  NEGOTIATION: 'purple',
  CONVERTED: 'green',
  LOST: 'default',
};

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      try {
        const res = await fetch('/api/admin/overview');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load overview:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  if (loading) {
    return <AdminLoadingScreen message="Loading live business metrics..." />;
  }

  const stats = data?.stats || {
    totalLeads: 0,
    newLeads: 0,
    activeProjects: 0,
    completedProjects: 0,
    publishedBlogs: 0,
    totalServices: 0,
  };

  const statItems = [
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      icon: FiUsers,
      sub: 'Direct client inquiries',
      color: 'text-neu-purple',
    },
    {
      label: 'New Inquiries',
      value: stats.newLeads,
      icon: FiInbox,
      sub: 'Pending initial outreach',
      color: 'text-neu-yellow',
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: FiActivity,
      sub: 'In development sprint',
      color: 'text-emerald-500',
    },
    {
      label: 'Delivered',
      value: stats.completedProjects,
      icon: FiCheckCircle,
      sub: 'Completed milestones',
      color: 'text-blue-500',
    },
    {
      label: 'Articles',
      value: stats.publishedBlogs,
      icon: FiFileText,
      sub: 'Published insights',
      color: 'text-violet-500',
    },
    {
      label: 'Services',
      value: stats.totalServices,
      icon: FiLayers,
      sub: 'Active disciplines',
      color: 'text-amber-500',
    },
  ];

  const maxMonthCount = Math.max(
    1,
    ...(data?.monthlyLeads.map((m) => m.count) || [1])
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Section / Welcome Banner in Raised Neumorphic Container */}
      <NeuSurface
        variant="raised-lg"
        className="p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-neu-surface via-neu-surface to-neu-surfaceSec border border-neu-border"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neu-purple/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <NeuBadge color="yellow" variant="recessed">
              Operations Center
            </NeuBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neu-text tracking-tight">
              Welcome to BITnWIT Command
            </h2>
            <p className="text-sm text-neu-textSec max-w-xl leading-relaxed">
              Monitor incoming client inquiries, update project portfolios, and keep services aligned with business growth.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/leads?action=new">
              <NeuButton variant="purple" size="sm" icon={<FiPlus size={16} />}>
                Add Lead
              </NeuButton>
            </Link>
            <Link href="/admin/projects?action=new">
              <NeuButton variant="default" size="sm" icon={<FiPlus size={16} />}>
                Add Project
              </NeuButton>
            </Link>
            <Link href="/admin/blogs?action=new">
              <NeuButton variant="default" size="sm" icon={<FiPlus size={16} />}>
                New Blog
              </NeuButton>
            </Link>
          </div>
        </div>
      </NeuSurface>

      {/* 2. Core Statistics Grid with 3D Cursor Tilt Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
        {statItems.map((item) => (
          <NeuTiltCard
            key={item.label}
            maxTilt={6}
            scale={1.03}
            elevation="raised"
            className="p-5 flex flex-col justify-between cursor-default group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-neu-textSec">{item.label}</span>
              <div className={`p-2 rounded-xl neu-recessed ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold text-neu-text tracking-tight group-hover:${item.color} transition-colors`}>
              {item.value}
            </div>
            <div className="mt-1 text-[11px] text-neu-textSec/80">{item.sub}</div>
          </NeuTiltCard>
        ))}
      </div>

      {/* 3. Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Leads Bar Chart in Raised Surface */}
        <NeuTiltCard
          maxTilt={3}
          scale={1.01}
          elevation="raised"
          className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neu-text">
                Inquiry Inflow (Past 6 Months)
              </h3>
              <p className="text-xs text-neu-textSec mt-1">
                Verified inbound leads received through website and CRM
              </p>
            </div>
            <div className="p-2.5 rounded-xl neu-recessed text-neu-purple">
              <FiTrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-4 pt-4 border-b border-neu-border px-2">
            {data?.monthlyLeads.map((item, idx) => {
              const heightPercent = Math.max(12, Math.round((item.count / maxMonthCount) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end cursor-pointer">
                  <span className="text-xs font-bold text-neu-purple opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-neu-purple to-purple-400 group-hover:from-neu-purple group-hover:to-neu-yellow transition-all duration-300 shadow-md"
                  />
                  <span className="text-[11px] font-semibold text-neu-textSec mt-2 truncate w-full text-center">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </NeuTiltCard>

        {/* Lead Status Distribution Pipeline */}
        <NeuTiltCard
          maxTilt={4}
          scale={1.015}
          elevation="raised"
          className="p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base sm:text-lg font-bold text-neu-text">
                Pipeline Stages
              </h3>
              <span className="text-xs font-mono font-bold text-neu-purple px-2 py-0.5 rounded neu-recessed">
                {stats.totalLeads} Total
              </span>
            </div>

            <div className="space-y-3.5">
              {Object.entries(data?.statusDistribution || {}).map(([status, count]) => {
                const total = stats.totalLeads || 1;
                const percent = Math.round((count / total) * 100);

                return (
                  <div key={status} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neu-text capitalize">
                        {status.replace('_', ' ').toLowerCase()}
                      </span>
                      <span className="font-mono text-neu-textSec">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full neu-recessed overflow-hidden p-0.5">
                      <div
                        style={{ width: `${percent}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          status === 'CONVERTED'
                            ? 'bg-emerald-500'
                            : status === 'NEW'
                            ? 'bg-neu-yellow'
                            : 'bg-neu-purple'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/admin/leads"
            className="mt-6 pt-4 border-t border-neu-border flex items-center justify-between text-xs font-bold text-neu-purple hover:underline"
          >
            <span>Open Leads CRM</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </NeuTiltCard>
      </div>

      {/* 4. Recent Inquiries & Projects Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Leads Table in Raised Container */}
        <NeuSurface
          variant="raised"
          className="lg:col-span-2 p-6 sm:p-8 rounded-3xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neu-text">
                Latest Client Inquiries
              </h3>
              <p className="text-xs text-neu-textSec mt-0.5">
                Newest form submissions awaiting communication
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-neu-purple hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.recentLeads && data.recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neu-border text-neu-textSec font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neu-border/50">
                  {data.recentLeads.map((lead) => {
                    const badgeColor = statusBadgeColor[lead.status] || 'yellow';
                    const dateFormatted = new Date(lead.dateReceived).toLocaleDateString(
                      'en-IN',
                      { day: 'numeric', month: 'short' }
                    );

                    return (
                      <tr key={lead.id} className="hover:bg-neu-surfaceSec/60 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-neu-text">{lead.fullName}</div>
                          <div className="text-[11px] text-neu-textSec">{lead.email}</div>
                        </td>
                        <td className="py-3 px-3 font-medium text-neu-text">
                          {lead.interestedService}
                        </td>
                        <td className="py-3 px-3 text-neu-textSec whitespace-nowrap">
                          {dateFormatted}
                        </td>
                        <td className="py-3 px-3">
                          <NeuBadge color={badgeColor} variant="raised" size="sm">
                            {lead.status.replace('_', ' ')}
                          </NeuBadge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/admin/leads?id=${lead.id}`}
                            className="font-bold text-neu-purple hover:underline"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-neu-textSec">
              No recent inquiries recorded yet.
            </div>
          )}
        </NeuSurface>

        {/* Recent Audit & System Activity in Raised Container */}
        <NeuSurface
          variant="raised"
          className="p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-neu-text">
                Audit Trail
              </h3>
              <div className="p-2 rounded-xl neu-recessed text-neu-purple">
                <FiClock className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4">
              {data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((log) => {
                  const time = new Date(log.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div key={log.id} className="flex items-start gap-3 text-xs p-2.5 rounded-xl neu-recessed">
                      <div className="w-2 h-2 rounded-full bg-neu-purple mt-1.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-neu-text truncate">
                          {log.userName} •{' '}
                          <span className="font-mono text-[10px] text-neu-purple">
                            {log.action}
                          </span>
                        </div>
                        <div className="text-[11px] text-neu-textSec truncate">
                          {log.details}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-neu-textSec/70 shrink-0">
                        {time}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-neu-textSec">
                  No activity recorded yet.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neu-border text-[11px] text-neu-textSec text-center">
            All administrative actions are cryptographically logged.
          </div>
        </NeuSurface>
      </div>
    </div>
  );
}
