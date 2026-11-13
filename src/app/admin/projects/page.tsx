'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiStar,
  FiExternalLink,
  FiTag,
  FiCalendar,
  FiCheckCircle,
  FiX,
  FiBriefcase,
  FiEye,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { ProjectItem } from '@/lib/db/types';

export default function AdminProjectsPage() {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get('action');

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [showModal, setShowModal] = useState(initialAction === 'new');

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    clientName: '',
    category: 'Web Application',
    shortDescription: '',
    detailedDescription: '',
    coverImageUrl: '/work-resume-iq.png',
    galleryImageUrls: '',
    technologiesUsed: 'Next.js, TypeScript, Tailwind CSS',
    projectUrl: '',
    completionDate: new Date().toISOString().slice(0, 10),
    isFeatured: false,
    publicationStatus: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
    displayOrder: 0,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      clientName: '',
      category: 'Web Application',
      shortDescription: '',
      detailedDescription: '',
      coverImageUrl: '/work-resume-iq.png',
      galleryImageUrls: '',
      technologiesUsed: 'Next.js, TypeScript, Tailwind CSS',
      projectUrl: '',
      completionDate: new Date().toISOString().slice(0, 10),
      isFeatured: false,
      publicationStatus: 'PUBLISHED',
      displayOrder: projects.length,
    });
    setShowModal(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      slug: proj.slug,
      clientName: proj.clientName,
      category: proj.category,
      shortDescription: proj.shortDescription || proj.summary || '',
      detailedDescription: proj.detailedDescription || '',
      coverImageUrl: proj.coverImageUrl || proj.coverImage || '',
      galleryImageUrls: (proj.galleryImageUrls || proj.galleryImages || []).join(', '),
      technologiesUsed: (proj.technologiesUsed || proj.servicesTags || []).join(', '),
      projectUrl: proj.projectUrl || proj.liveUrl || '',
      completionDate: proj.completionDate || '',
      isFeatured: proj.isFeatured,
      publicationStatus: proj.publicationStatus || 'PUBLISHED',
      displayOrder: proj.displayOrder,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        galleryImageUrls: form.galleryImageUrls
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        technologiesUsed: form.technologiesUsed
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        displayOrder: Number(form.displayOrder),
      };

      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchProjects();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save project');
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleToggleFeatured = async (proj: ProjectItem) => {
    try {
      const res = await fetch(`/api/admin/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !proj.isFeatured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === proj.id ? { ...p, isFeatured: !p.isFeatured } : p))
        );
      }
    } catch (err) {
      console.error('Error toggling featured:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    categoryFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-[#271044] font-display">
              Portfolio & Case Studies ({projects.length})
            </h2>
            <p className="text-xs text-[#77717F]">
              Visual showcase of client deliverables, tech stacks, and live applications
            </p>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 ml-0 sm:ml-4"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {loading ? (
        <AdminLoadingScreen message="Loading portfolio items..." />
      ) : filteredProjects.length === 0 ? (
        <AdminEmptyState
          title="No Projects Found"
          description="Your portfolio currently has no case studies. Add your client projects to highlight your engineering capabilities."
          actionLabel="Add Project"
          onAction={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-purple-100/70 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={proj.coverImageUrl || '/work-resume-iq.png'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7025B9] text-white shadow-sm">
                      {proj.category}
                    </span>
                    {proj.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB51B] text-[#171225] flex items-center gap-1 shadow-sm">
                        <FiStar className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        proj.publicationStatus === 'PUBLISHED'
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {proj.publicationStatus}
                    </span>
                  </div>

                  {/* Client Name on Bottom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-purple-200 font-mono">
                      Client: {proj.clientName}
                    </div>
                    <div className="text-sm font-bold truncate font-display">
                      {proj.title}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-[#77717F] leading-relaxed line-clamp-2">
                    {proj.shortDescription || proj.summary}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.technologiesUsed || proj.servicesTags || []).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F8F7FA] text-slate-700 border border-slate-200 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-[#F8F7FA] border-t border-slate-100 flex items-center justify-between text-xs">
                {/* Featured Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(proj)}
                  className={`inline-flex items-center gap-1 font-semibold ${
                    proj.isFeatured ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Toggle Featured Spotlight"
                >
                  <FiStar className={`w-3.5 h-3.5 ${proj.isFeatured ? 'fill-current' : ''}`} />
                  <span>{proj.isFeatured ? 'Featured' : 'Mark Featured'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {proj.projectUrl && (
                    <a
                      href={proj.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                      title="Open Live Project"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-[#7025B9] hover:bg-purple-100/60 transition-colors"
                    title="Edit Project"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Project"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add Portfolio Project'}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ResumeIQ Enterprise Portal"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm({
                        ...form,
                        title,
                        slug: editingProject ? form.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
                    placeholder="e.g. resume-iq"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="Client or In-House"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Web App, Mobile App, AI Integration..."
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="High-level solution overview and business impact..."
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Detailed Case Study Breakdown
                </label>
                <textarea
                  rows={4}
                  placeholder="Architectural challenges, solutions implemented, benchmarks achieved..."
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="/work-resume-iq.png"
                    value={form.coverImageUrl}
                    onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Live Demo / Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://client-project.com"
                    value={form.projectUrl}
                    onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS"
                  value={form.technologiesUsed}
                  onChange={(e) => setForm({ ...form, technologiesUsed: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={form.publicationStatus}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        publicationStatus: e.target.value as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300"
                    />
                    <span className="text-xs font-semibold text-[#271044]">
                      Feature on Homepage Spotlight
                    </span>
                  </label>
                </div>
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
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
