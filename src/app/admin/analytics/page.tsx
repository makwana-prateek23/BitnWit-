'use client';

import { useState, useEffect } from 'react';
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiPieChart,
  FiCode,
  FiCheckCircle,
  FiInfo,
  FiExternalLink,
} from 'react-icons/fi';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

interface AnalyticsData {
  metrics: {
    totalLeads: number;
    thisMonthCount: number;
    convertedCount: number;
    conversionRate: string;
  };
  topServices: Array<{ service: string; count: number }>;
  channelPreferences: Array<{ channel: string; count: number; percent: number }>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/admin/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return <AdminLoadingScreen message="Aggregating performance metrics..." />;
  }

  const metrics = data?.metrics || {
    totalLeads: 0,
    thisMonthCount: 0,
    convertedCount: 0,
    conversionRate: '0.0',
  };

  const maxServiceCount = Math.max(
    1,
    ...(data?.topServices.map((s) => s.count) || [1])
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Overview Header */}
      <div className="bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <h2 className="text-base font-bold text-[#271044] font-display">
          Inquiry Telemetry & Conversion Analytics
        </h2>
        <p className="text-xs text-[#77717F]">
          Verified engagement performance derived from CRM records and inbound communications
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm">
          <span className="text-xs font-semibold text-[#77717F]">Total Leads Received</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#271044] mt-2 font-display">
            {metrics.totalLeads}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Direct inquiries logged</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm">
          <span className="text-xs font-semibold text-[#77717F]">This Month Inflow</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#FF790E] mt-2 font-display">
            {metrics.thisMonthCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Calendar month submissions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm">
          <span className="text-xs font-semibold text-[#77717F]">Deals Converted</span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-2 font-display">
            {metrics.convertedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Signed client projects</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100/70 shadow-sm">
          <span className="text-xs font-semibold text-[#77717F]">Inquiry Conversion Rate</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#7025B9] mt-2 font-display">
            {metrics.conversionRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lead-to-client conversion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Requested Services */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#271044] font-display">
                Most Requested Service Offerings
              </h3>
              <p className="text-xs text-[#77717F]">Client demand breakdown across core capabilities</p>
            </div>
            <FiBarChart2 className="w-4 h-4 text-[#7025B9]" />
          </div>

          <div className="space-y-3 pt-2">
            {data?.topServices && data.topServices.length > 0 ? (
              data.topServices.map((item) => {
                const percent = Math.round((item.count / maxServiceCount) * 100);
                return (
                  <div key={item.service} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.service}</span>
                      <span className="font-mono text-slate-500 font-semibold">{item.count} inquiries</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#7025B9] to-[#FF790E]"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-4">No inquiry distribution available yet.</p>
            )}
          </div>
        </div>

        {/* Contact Channel Preferences */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#271044] font-display">
                Inbound Lead Channel Preferences
              </h3>
              <p className="text-xs text-[#77717F]">How potential clients initiate contact with BITnWit</p>
            </div>
            <FiPieChart className="w-4 h-4 text-[#FF790E]" />
          </div>

          <div className="space-y-4 pt-2">
            {data?.channelPreferences && data.channelPreferences.length > 0 ? (
              data.channelPreferences.map((ch) => (
                <div key={ch.channel} className="p-3.5 rounded-2xl bg-[#F8F7FA] border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 capitalize">
                      {ch.channel.toLowerCase()} Channel
                    </div>
                    <div className="text-[11px] text-slate-500">{ch.count} direct submissions</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#7025B9] font-mono">{ch.percent}%</span>
                    <div className="text-[10px] text-slate-400">of total volume</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4">No channel records available yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Google Analytics 4 & Tag Manager Integration Guide */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <FiCode className="w-4 h-4 text-[#7025B9]" />
          <h3 className="text-sm font-bold text-[#271044] font-display">
            External Telemetry: Google Analytics 4 (GA4) Integration Guide
          </h3>
        </div>

        <p className="text-xs text-[#77717F] leading-relaxed">
          To track real-time website visitors, page bounce rates, geographical traffic, and device breakdowns, integrate Google Analytics 4:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
            <h4 className="font-bold text-[#271044] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#7025B9] text-white flex items-center justify-center text-[10px]">1</span>
              Add Environment Variable in Vercel
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Create a Measurement ID in Google Analytics (e.g., <code className="font-mono bg-white px-1.5 py-0.5 rounded text-purple-900">G-XXXXXXXXXX</code>) and add it to your environment variables:
            </p>
            <pre className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
              NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 space-y-2">
            <h4 className="font-bold text-[#271044] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#FF790E] text-white flex items-center justify-center text-[10px]">2</span>
              Public Sitemap & Google Search Console
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Your website automatically compiles and serves dynamic XML sitemaps and robots configuration at:
            </p>
            <div className="space-y-1">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="text-[#7025B9] hover:underline font-mono text-[11px] flex items-center gap-1"
              >
                <span>https://www.bitnwit.com/sitemap.xml</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="text-[#7025B9] hover:underline font-mono text-[11px] flex items-center gap-1"
              >
                <span>https://www.bitnwit.com/robots.txt</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
