'use client';

import { useState, useEffect } from 'react';
import {
  FiSave,
  FiGlobe,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiCheckCircle,
  FiShare2,
} from 'react-icons/fi';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data.settings || {});
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch (err) {
      alert('Network error while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLoadingScreen message="Retrieving website settings..." />;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#271044] font-display">
            Global Website Configuration
          </h2>
          <p className="text-xs text-[#77717F]">
            Manage public branding, contact coordinates, social channels, and WhatsApp routing
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
              <FiCheckCircle className="w-4 h-4" />
              Settings Saved!
            </span>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Identity Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiGlobe className="w-4 h-4 text-[#7025B9]" />
            <h3 className="text-sm font-bold text-[#271044] font-display">
              Brand Identity & Corporate Info
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#271044] mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={settings['site_name'] || 'BITnWit Technologies Pvt. Ltd.'}
              onChange={(e) => handleChange('site_name', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#271044] mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={settings['tagline'] || 'INNOVATE • BUILD • SOLVE'}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#271044] mb-1">
              Footer Copyright Notice
            </label>
            <input
              type="text"
              value={
                settings['copyright_text'] ||
                '© 2026 BITnWit Technologies Pvt. Ltd. All rights reserved.'
              }
              onChange={(e) => handleChange('copyright_text', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiPhone className="w-4 h-4 text-[#7025B9]" />
            <h3 className="text-sm font-bold text-[#271044] font-display">
              Contact & WhatsApp Operations
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings['contact_email'] || 'contact@bitnwit.com'}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings['contact_phone'] || '+91 89497 28810'}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                WhatsApp Routing Number (No +)
              </label>
              <input
                type="text"
                value={settings['whatsapp_number'] || '918949728810'}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={settings['working_hours'] || 'Mon - Fri: 9:30 AM - 6:30 PM IST'}
                onChange={(e) => handleChange('working_hours', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#271044] mb-1">
              Office Address
            </label>
            <input
              type="text"
              value={settings['office_address'] || 'BITnWit Technologies Pvt. Ltd., India'}
              onChange={(e) => handleChange('office_address', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>
        </div>

        {/* Social Channels */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiShare2 className="w-4 h-4 text-[#7025B9]" />
            <h3 className="text-sm font-bold text-[#271044] font-display">
              Social Media Channels & Direct Profiles
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings['social_linkedin'] || 'https://www.linkedin.com/company/bitnwit'}
                onChange={(e) => handleChange('social_linkedin', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings['social_instagram'] || 'https://www.instagram.com/bitnwit'}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={settings['social_twitter'] || 'https://twitter.com/bitnwit'}
                onChange={(e) => handleChange('social_twitter', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                GitHub Organization
              </label>
              <input
                type="url"
                value={settings['social_github'] || 'https://github.com/makwana-prateek23'}
                onChange={(e) => handleChange('social_github', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
