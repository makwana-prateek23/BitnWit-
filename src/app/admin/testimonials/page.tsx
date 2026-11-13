'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiStar,
  FiUser,
  FiCheckCircle,
  FiX,
  FiMessageSquare,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { TestimonialItem } from '@/lib/db/types';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    clientName: '',
    clientDesignation: '',
    companyName: '',
    clientPhotoUrl: '/bitty-mascot.png',
    reviewText: '',
    rating: 5,
    serviceProvided: 'Web Development',
    isFeaturedOnHomepage: true,
    displayStatus: 'VISIBLE' as 'VISIBLE' | 'HIDDEN',
    displayOrder: 0,
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      clientName: '',
      clientDesignation: 'Founder / CEO',
      companyName: '',
      clientPhotoUrl: '/bitty-mascot.png',
      reviewText: '',
      rating: 5,
      serviceProvided: 'Web Development',
      isFeaturedOnHomepage: true,
      displayStatus: 'VISIBLE',
      displayOrder: testimonials.length,
    });
    setShowModal(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setForm({
      clientName: item.clientName || '',
      clientDesignation: item.clientDesignation || item.designation || '',
      companyName: item.companyName || '',
      clientPhotoUrl: item.clientPhotoUrl || item.avatarOrLogo || '/bitty-mascot.png',
      reviewText: item.reviewText || item.content || '',
      rating: item.rating || 5,
      serviceProvided: item.serviceProvided || 'Web Development',
      isFeaturedOnHomepage: Boolean(item.isFeaturedOnHomepage),
      displayStatus: item.displayStatus || 'VISIBLE',
      displayOrder: item.displayOrder || 0,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem.id}`
        : '/api/admin/testimonials';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(false);
        fetchTestimonials();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save testimonial');
      }
    } catch (err) {
      alert('Error saving testimonial');
    }
  };

  const handleToggleFeatured = async (item: TestimonialItem) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeaturedOnHomepage: !item.isFeaturedOnHomepage }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === item.id ? { ...t, isFeaturedOnHomepage: !t.isFeaturedOnHomepage } : t
          )
        );
      }
    } catch (err) {
      console.error('Error toggling featured testimonial:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the review from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#271044] font-display">
            Client Reviews & Testimonials ({testimonials.length})
          </h2>
          <p className="text-xs text-[#77717F]">
            Manage client social proof, 5-star ratings, and featured homepage endorsements
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <AdminLoadingScreen message="Loading client reviews..." />
      ) : testimonials.length === 0 ? (
        <AdminEmptyState
          title="No Reviews Registered"
          description="Display testimonials from happy clients to establish immediate credibility."
          actionLabel="Add Review"
          onAction={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-purple-100/70 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Badges */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#FFB51B]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'fill-current text-[#FFB51B]' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.isFeaturedOnHomepage && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#7025B9] border border-purple-100">
                        Homepage
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.displayStatus === 'VISIBLE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.displayStatus}
                    </span>
                  </div>
                </div>

                {/* Review Quote */}
                <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                  &ldquo;{item.reviewText}&rdquo;
                </p>

                {/* Service Tag */}
                <div className="mt-3">
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    {item.serviceProvided}
                  </span>
                </div>
              </div>

              {/* Client Info & Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#271044] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {item.clientName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {item.clientName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {item.clientDesignation}
                      {item.companyName && ` • ${item.companyName}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(item)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isFeaturedOnHomepage
                        ? 'text-amber-500 hover:bg-amber-50'
                        : 'text-slate-400 hover:bg-slate-100'
                    }`}
                    title="Toggle Homepage Feature"
                  >
                    <FiStar className={`w-4 h-4 ${item.isFeaturedOnHomepage ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-[#7025B9] hover:bg-purple-50 transition-colors"
                    title="Edit Review"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.clientName)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Review"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                {editingItem ? 'Edit Client Testimonial' : 'Add Client Review'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Executive Officer"
                    value={form.clientDesignation}
                    onChange={(e) => setForm({ ...form, clientDesignation: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nexa Logistics"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Service Provided
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development"
                    value={form.serviceProvided}
                    onChange={(e) => setForm({ ...form, serviceProvided: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Rating (1-5 Stars)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Testimonial / Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail client feedback regarding engineering quality, timeline, and results..."
                  value={form.reviewText}
                  onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isFeaturedOnHomepage}
                    onChange={(e) => setForm({ ...form, isFeaturedOnHomepage: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300"
                  />
                  <span className="text-xs font-semibold text-[#271044]">
                    Feature on Homepage Testimonial Carousel
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
                  {editingItem ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
