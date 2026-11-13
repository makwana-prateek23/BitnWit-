'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiX,
  FiLayers,
  FiArrowUpRight,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { ServiceItem } from '@/lib/db/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    detailedDescription: '',
    icon: 'code',
    coverImageUrl: '/services/web-development.png',
    deliverables: '',
    benefits: '',
    ctaText: 'Build With Us',
    displayOrder: 0,
    isPublished: true,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setForm({
      title: '',
      slug: '',
      shortDescription: '',
      detailedDescription: '',
      icon: 'code',
      coverImageUrl: '/services/web-development.png',
      deliverables: '',
      benefits: '',
      ctaText: 'Build With Us',
      displayOrder: services.length,
      isPublished: true,
    });
    setShowModal(true);
  };

  const openEditModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setForm({
      title: srv.title,
      slug: srv.slug,
      shortDescription: srv.shortDescription || srv.shortDesc || '',
      detailedDescription: srv.detailedDescription || srv.detailedDesc || '',
      icon: srv.icon || srv.iconName || 'code',
      coverImageUrl: srv.coverImageUrl || '/services/web-development.png',
      deliverables: (srv.deliverables || []).join(', '),
      benefits: (srv.benefits || []).join(', '),
      ctaText: srv.ctaText || 'Build With Us',
      displayOrder: srv.displayOrder,
      isPublished: Boolean(srv.isPublished),
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        deliverables: form.deliverables
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        benefits: form.benefits
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        displayOrder: Number(form.displayOrder),
      };

      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchServices();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save service');
      }
    } catch (err) {
      alert('Error saving service');
    }
  };

  const handleTogglePublish = async (srv: ServiceItem) => {
    try {
      const res = await fetch(`/api/admin/services/${srv.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !srv.isPublished }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === srv.id ? { ...s, isPublished: !s.isPublished } : s))
        );
      }
    } catch (err) {
      console.error('Error toggling publication:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the "${title}" service?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#271044] font-display">
            Active Agency Services ({services.length})
          </h2>
          <p className="text-xs text-[#77717F]">
            Manage published solutions, descriptions, and deliverables for client websites
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {loading ? (
        <AdminLoadingScreen message="Loading service offerings..." />
      ) : services.length === 0 ? (
        <AdminEmptyState
          title="No Services Found"
          description="You currently have no services registered in the database. Add your first offering to display on the public website."
          actionLabel="Add Service"
          onAction={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between ${
                srv.isPublished
                  ? 'border-purple-100/80 shadow-sm hover:shadow-md'
                  : 'border-slate-200 bg-slate-50/50 opacity-75'
              }`}
            >
              {/* Card Top & Image */}
              <div>
                <div className="relative h-44 w-full bg-gradient-to-br from-[#271044] to-[#7025B9] overflow-hidden p-4 flex items-center justify-center">
                  {srv.coverImageUrl ? (
                    <img
                      src={srv.coverImageUrl}
                      alt={srv.title}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <FiLayers className="w-16 h-16 text-purple-300/40" />
                  )}

                  {/* Status Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                        srv.isPublished
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {srv.isPublished ? 'Published' : 'Draft / Hidden'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/40 backdrop-blur-xs text-white">
                      Order: {srv.displayOrder}
                    </span>
                  </div>

                  <a
                    href={`/services/${srv.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-white transition-colors"
                    title="Preview Public Page"
                  >
                    <FiArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-[#271044] font-display">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#77717F] leading-relaxed line-clamp-3">
                    {srv.shortDescription}
                  </p>

                  {/* Deliverables Tags */}
                  {srv.deliverables && srv.deliverables.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {srv.deliverables.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100 text-[10px] font-medium"
                        >
                          {item}
                        </span>
                      ))}
                      {srv.deliverables.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                          +{srv.deliverables.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#F8F7FA] border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(srv)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    srv.isPublished
                      ? 'text-slate-600 hover:bg-slate-200/60'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  {srv.isPublished ? (
                    <>
                      <FiEyeOff className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <FiEye className="w-3.5 h-3.5" />
                      <span>Publish</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-2 rounded-xl text-[#7025B9] hover:bg-purple-100/60 transition-colors"
                    title="Edit Service"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id, srv.title)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Service"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service Offering'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Web Development"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm({
                        ...form,
                        title,
                        slug: editingService ? form.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. web-development"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Short Description (Card Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Concise overview of what this service delivers..."
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Detailed Description (Public Page Detail)
                </label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive technical breakdown, approach, and methodologies..."
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Cover / Graphic Path
                  </label>
                  <input
                    type="text"
                    placeholder="/services/web-development.png"
                    value={form.coverImageUrl}
                    onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Display Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Deliverables (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js App, Mobile App, API Integration, Admin Dashboard"
                  value={form.deliverables}
                  onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Key Benefits (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Fast turnaround, 99.9% uptime, Full source code ownership"
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300"
                  />
                  <span className="text-xs font-medium text-[#271044]">
                    Publish live on public BITnWit website
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FF790E] hover:bg-[#e66c0b] text-white text-xs font-semibold shadow-md shadow-orange-500/20"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
