'use client';

import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiSave,
  FiGlobe,
  FiShare2,
  FiCheckCircle,
  FiTag,
  FiImage,
} from 'react-icons/fi';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { SeoMetadata } from '@/lib/db/types';

const defaultPages = [
  { route: '/', name: 'Homepage (/) ' },
  { route: '/services', name: 'Services Directory (/services)' },
  { route: '/work', name: 'Portfolio / Projects (/work)' },
  { route: '/about', name: 'About BITnWit (/about)' },
  { route: '/contact', name: 'Contact & Inquiries (/contact)' },
  { route: '/blog', name: 'Insights & Blog (/blog)' },
];

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoMetadata[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active Page Form
  const [form, setForm] = useState({
    pageRoute: '/',
    pageTitle: 'BITnWit Technologies | Digital Solutions & Engineering',
    metaDescription:
      'Premier digital growth and software engineering agency in India. We build high-performance web applications, mobile apps, and custom software.',
    focusKeywords: 'web development, mobile app development, UI/UX, software engineering, India',
    canonicalUrl: 'https://www.bitnwit.com/',
    ogTitle: 'BITnWit Technologies | INNOVATE • BUILD • SOLVE',
    ogDescription:
      'Empowering SMBs and enterprises with world-class digital engineering and scalable SaaS solutions.',
    ogImageUrl: '/og-image.jpg',
    noIndex: false,
  });

  const fetchSeo = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/seo');
      if (res.ok) {
        const data = await res.json();
        setSeoList(data.seoList || []);

        const current = data.seoList?.find((s: SeoMetadata) => s.pageRoute === selectedRoute);
        if (current) {
          setForm({
            pageRoute: current.pageRoute,
            pageTitle: current.pageTitle || current.metaTitle || '',
            metaDescription: current.metaDescription || '',
            focusKeywords: (current.focusKeywords || []).join(', '),
            canonicalUrl: current.canonicalUrl || '',
            ogTitle: current.ogTitle || current.metaTitle || '',
            ogDescription: current.ogDescription || current.metaDescription || '',
            ogImageUrl: current.ogImageUrl || '/og-image.jpg',
            noIndex: Boolean(current.noIndex),
          });
        }
      }
    } catch (err) {
      console.error('Error fetching SEO:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleSelectRoute = (route: string) => {
    setSelectedRoute(route);
    const existing = seoList.find((s) => s.pageRoute === route);
    if (existing) {
      setForm({
        pageRoute: existing.pageRoute,
        pageTitle: existing.pageTitle || existing.metaTitle || '',
        metaDescription: existing.metaDescription || '',
        focusKeywords: (existing.focusKeywords || []).join(', '),
        canonicalUrl: existing.canonicalUrl || '',
        ogTitle: existing.ogTitle || existing.metaTitle || '',
        ogDescription: existing.ogDescription || existing.metaDescription || '',
        ogImageUrl: existing.ogImageUrl || '/og-image.jpg',
        noIndex: Boolean(existing.noIndex),
      });
    } else {
      // Defaults for new route
      setForm({
        pageRoute: route,
        pageTitle: `BITnWit Technologies | ${route.replace('/', '').toUpperCase() || 'Home'}`,
        metaDescription: `Discover professional digital services and solutions by BITnWit Technologies.`,
        focusKeywords: 'bitnwit, digital engineering, web services',
        canonicalUrl: `https://www.bitnwit.com${route}`,
        ogTitle: `BITnWit Technologies`,
        ogDescription: `Innovate • Build • Solve with BITnWit.`,
        ogImageUrl: '/og-image.jpg',
        noIndex: false,
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const payload = {
        ...form,
        focusKeywords: form.focusKeywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      };

      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchSeo();
      } else {
        alert('Failed to save SEO metadata');
      }
    } catch (err) {
      alert('Network error while saving SEO');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLoadingScreen message="Loading SEO configurations..." />;
  }

  return (
    <div className="space-y-6">
      {/* Top Controls Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#271044] font-display">
            Search Engine & Social Metadata
          </h2>
          <p className="text-xs text-[#77717F]">
            Optimize SERP rankings, search snippets, OpenGraph previews, and indexing instructions
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
              <FiCheckCircle className="w-4 h-4" />
              SEO Updated!
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Page SEO'}</span>
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap gap-2">
        {defaultPages.map((p) => (
          <button
            key={p.route}
            type="button"
            onClick={() => handleSelectRoute(p.route)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              selectedRoute === p.route
                ? 'bg-[#7025B9] text-white shadow-md shadow-purple-950/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Core Search Engine Tags
            </h3>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#271044]">
                  Page Meta Title *
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {form.pageTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                required
                value={form.pageTitle}
                onChange={(e) => setForm({ ...form, pageTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#271044]">
                  Meta Description *
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {form.metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Focus Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={form.focusKeywords}
                onChange={(e) => setForm({ ...form, focusKeywords: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Canonical URL
              </label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.noIndex}
                  onChange={(e) => setForm({ ...form, noIndex: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-rose-700">
                  Block search engine indexing (noindex, nofollow)
                </span>
              </label>
            </div>
          </div>

          {/* Social Graph Configuration */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Open Graph & Social Share Preview
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                OG Social Title
              </label>
              <input
                type="text"
                value={form.ogTitle}
                onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                OG Social Description
              </label>
              <textarea
                rows={2}
                value={form.ogDescription}
                onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                OG Social Image URL
              </label>
              <input
                type="text"
                value={form.ogImageUrl}
                onChange={(e) => setForm({ ...form, ogImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>
          </div>
        </form>

        {/* Right: Live SERP & Social Previews */}
        <div className="space-y-6">
          {/* Google Search Snippet Simulation */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FiSearch className="w-3.5 h-3.5" />
              <span>Google Desktop SERP Simulation</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-1 font-sans">
              <div className="flex items-center gap-2 text-xs text-[#202124]">
                <div className="w-4 h-4 rounded-full bg-[#271044] text-[9px] text-white flex items-center justify-center font-bold">
                  B
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium leading-none text-[#202124]">
                    BITnWit Technologies
                  </span>
                  <span className="text-[11px] text-[#4d5156] leading-none mt-0.5">
                    {form.canonicalUrl}
                  </span>
                </div>
              </div>

              <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer pt-1 line-clamp-1">
                {form.pageTitle || 'Title not set'}
              </div>

              <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                {form.metaDescription || 'No description configured.'}
              </div>
            </div>
          </div>

          {/* Social Sharing Card Simulation */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FiShare2 className="w-3.5 h-3.5" />
              <span>LinkedIn / Twitter Social Card Simulation</span>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              <div className="relative h-44 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {form.ogImageUrl ? (
                  <img
                    src={form.ogImageUrl}
                    alt="Social Card Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiImage className="w-12 h-12 text-slate-600" />
                )}
              </div>

              <div className="p-4 space-y-1 bg-[#F8F7FA]">
                <span className="text-[10px] uppercase font-mono text-slate-500">
                  bitnwit.com
                </span>
                <div className="text-sm font-bold text-slate-900 line-clamp-1">
                  {form.ogTitle || form.pageTitle}
                </div>
                <div className="text-xs text-slate-600 line-clamp-2">
                  {form.ogDescription || form.metaDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
