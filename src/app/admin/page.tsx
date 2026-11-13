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

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  CONTACTED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  QUALIFIED: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  PROPOSAL_SENT: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  NEGOTIATION: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  CONVERTED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  LOST: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
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

  const maxMonthCount = Math.max(
    1,
    ...(data?.monthlyLeads.map((m) => m.count) || [1])
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Section / Welcome Banner */}
      <div className="bg-gradient-to-r from-[#271044] via-[#431872] to-[#7025B9] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF790E]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFB51B] bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
              Operations Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              Welcome to BITnWit Command
            </h2>
            <p className="mt-1 text-sm text-purple-200 max-w-xl">
              Monitor incoming client inquiries, update project portfolios, and keep services aligned with business growth.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/leads?action=new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#FF790E] hover:bg-[#e66c0b] shadow-md shadow-orange-500/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Lead</span>
            </Link>
            <Link
              href="/admin/projects?action=new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/blogs?action=new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>New Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Core Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
        {/* Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">Total Leads</span>
            <div className="p-2 rounded-xl bg-purple-50 text-[#7025B9]">
              <FiUsers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] font-display">
            {stats.totalLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Direct client records</div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">New Inquiries</span>
            <div className="p-2 rounded-xl bg-orange-50 text-[#FF790E]">
              <FiInbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#FF790E] font-display">
            {stats.newLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Pending response</div>
        </div>

        {/* Active Projects */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">Active Projects</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FiActivity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] font-display">
            {stats.activeProjects}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Under development</div>
        </div>

        {/* Completed Projects */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">Delivered</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FiCheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] font-display">
            {stats.completedProjects}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Published portfolio</div>
        </div>

        {/* Published Blogs */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">Articles</span>
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
              <FiFileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] font-display">
            {stats.publishedBlogs}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Published posts</div>
        </div>

        {/* Total Services */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#77717F]">Services</span>
            <div className="p-2 rounded-xl bg-amber-50 text-[#FFB51B]">
              <FiLayers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] font-display">
            {stats.totalServices}
          </div>
          <div className="mt-1 text-[11px] text-[#77717F]">Active offerings</div>
        </div>
      </div>

      {/* 3. Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Leads Bar Chart (Accessible SVG) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#271044] font-display">
                Inquiry Inflow (Past 6 Months)
              </h3>
              <p className="text-xs text-[#77717F]">
                Verified inbound leads received through website and CRM
              </p>
            </div>
            <div className="p-2 rounded-xl bg-purple-50 text-[#7025B9]">
              <FiTrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-4 pt-4 border-b border-slate-100 px-2">
            {data?.monthlyLeads.map((item, idx) => {
              const heightPercent = Math.max(12, Math.round((item.count / maxMonthCount) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-xs font-bold text-[#7025B9] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#7025B9] to-[#FF790E] transition-all group-hover:brightness-110 shadow-sm"
                  />
                  <span className="text-[11px] font-semibold text-slate-500 mt-2 truncate w-full text-center">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Status Distribution Pipeline */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#271044] font-display">
                Pipeline Stages
              </h3>
              <span className="text-xs font-mono text-[#77717F]">
                {stats.totalLeads} Total
              </span>
            </div>

            <div className="space-y-3">
              {Object.entries(data?.statusDistribution || {}).map(([status, count]) => {
                const total = stats.totalLeads || 1;
                const percent = Math.round((count / total) * 100);
                const style = statusColors[status] || statusColors.NEW;

                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 capitalize">
                        {status.replace('_', ' ').toLowerCase()}
                      </span>
                      <span className="font-mono text-slate-500">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className={`h-full rounded-full ${
                          status === 'CONVERTED'
                            ? 'bg-emerald-500'
                            : status === 'NEW'
                            ? 'bg-[#FF790E]'
                            : 'bg-[#7025B9]'
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
            className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#7025B9] hover:text-[#271044] transition-colors"
          >
            <span>Open Leads CRM</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. Recent Inquiries & Projects Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Leads Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#271044] font-display">
                Latest Client Inquiries
              </h3>
              <p className="text-xs text-[#77717F]">
                Newest form submissions awaiting communication
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#7025B9] hover:text-[#271044] flex items-center gap-1"
            >
              <span>View All</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.recentLeads && data.recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentLeads.map((lead) => {
                    const badge = statusColors[lead.status] || statusColors.NEW;
                    const dateFormatted = new Date(lead.dateReceived).toLocaleDateString(
                      'en-IN',
                      { day: 'numeric', month: 'short' }
                    );

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900">{lead.fullName}</div>
                          <div className="text-[11px] text-slate-500">{lead.email}</div>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-700">
                          {lead.interestedService}
                        </td>
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                          {dateFormatted}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {lead.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/admin/leads?id=${lead.id}`}
                            className="font-semibold text-[#7025B9] hover:underline"
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
            <div className="py-10 text-center text-xs text-slate-500">
              No recent inquiries recorded yet.
            </div>
          )}
        </div>

        {/* Recent Audit & System Activity */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#271044] font-display">
                Audit Trail
              </h3>
              <FiClock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4">
              {data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((log) => {
                  const time = new Date(log.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div key={log.id} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#7025B9] mt-1.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-800 truncate">
                          {log.userName} •{' '}
                          <span className="font-mono text-[10px] text-purple-700">
                            {log.action}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {log.details}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 shrink-0">
                        {time}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  No activity recorded yet.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            All administrative actions are cryptographically logged.
          </div>
        </div>
      </div>
    </div>
  );
}
