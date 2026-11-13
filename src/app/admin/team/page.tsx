'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUser,
  FiShield,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiCheckCircle,
  FiX,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { TeamMember, AdminRole } from '@/lib/db/types';

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: '',
    designation: '',
    department: 'Engineering',
    bio: '',
    profileImageUrl: '/bitty-mascot.png',
    linkedin: '',
    github: '',
    twitter: '',
    adminAccessRole: 'NONE' as AdminRole | 'NONE',
    displayOrder: 0,
    isActive: true,
    isVisibleOnWebsite: true,
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setForm({
      fullName: '',
      designation: '',
      department: 'Engineering',
      bio: '',
      profileImageUrl: '/bitty-mascot.png',
      linkedin: '',
      github: '',
      twitter: '',
      adminAccessRole: 'NONE',
      displayOrder: members.length,
      isActive: true,
      isVisibleOnWebsite: true,
    });
    setShowModal(true);
  };

  const openEditModal = (m: TeamMember) => {
    setEditingMember(m);
    setForm({
      fullName: m.fullName || m.name || '',
      designation: m.designation || m.role || '',
      department: m.department || 'Engineering',
      bio: m.bio || '',
      profileImageUrl: m.profileImageUrl || m.avatarUrl || '/bitty-mascot.png',
      linkedin: m.socialLinks?.linkedin || '',
      github: m.socialLinks?.github || '',
      twitter: m.socialLinks?.twitter || '',
      adminAccessRole: m.adminAccessRole || 'NONE',
      displayOrder: m.displayOrder || 0,
      isActive: Boolean(m.isActive),
      isVisibleOnWebsite: Boolean(m.isVisibleOnWebsite),
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: form.fullName,
        designation: form.designation,
        department: form.department,
        bio: form.bio,
        profileImageUrl: form.profileImageUrl,
        socialLinks: {
          linkedin: form.linkedin || undefined,
          github: form.github || undefined,
          twitter: form.twitter || undefined,
        },
        adminAccessRole: form.adminAccessRole,
        displayOrder: Number(form.displayOrder),
        isActive: form.isActive,
        isVisibleOnWebsite: form.isVisibleOnWebsite,
      };

      const url = editingMember ? `/api/admin/team/${editingMember.id}` : '/api/admin/team';
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchMembers();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save team member');
      }
    } catch (err) {
      alert('Error saving team member');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove team member "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete member');
      }
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#271044] font-display">
            Staff & Team Management ({members.length} Members)
          </h2>
          <p className="text-xs text-[#77717F]">
            Configure administrative permissions, staff roles, and public leadership profiles
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {loading ? (
        <AdminLoadingScreen message="Loading staff directory..." />
      ) : members.length === 0 ? (
        <AdminEmptyState
          title="No Team Members Found"
          description="Register company executives and engineers to manage roles and present your team to prospects."
          actionLabel="Add Member"
          onAction={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-3xl border border-purple-100/70 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#271044] to-[#7025B9] p-0.5 overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={m.profileImageUrl || '/bitty-mascot.png'}
                      alt={m.fullName}
                      className="w-full h-full object-contain rounded-2xl bg-white"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate font-display">
                      {m.fullName}
                    </h3>
                    <p className="text-xs text-[#7025B9] font-medium truncate">
                      {m.designation}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {m.department}
                    </span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-[#77717F] leading-relaxed line-clamp-2">
                  {m.bio || 'Core member of the BITnWit engineering and product delivery team.'}
                </p>

                {/* Role Pill & Visibility Status */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.adminAccessRole === 'SUPER_ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : m.adminAccessRole === 'ADMIN'
                        ? 'bg-blue-100 text-blue-800'
                        : m.adminAccessRole === 'EDITOR'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <FiShield className="w-3 h-3" />
                    <span>Role: {m.adminAccessRole}</span>
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      m.isVisibleOnWebsite
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {m.isVisibleOnWebsite ? 'Public Profile' : 'Internal Only'}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {/* Social links */}
                <div className="flex items-center gap-2 text-slate-400">
                  {m.socialLinks?.linkedin && (
                    <a
                      href={m.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600"
                    >
                      <FiLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {m.socialLinks?.github && (
                    <a
                      href={m.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-slate-900"
                    >
                      <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  {m.socialLinks?.twitter && (
                    <a
                      href={m.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-sky-500"
                    >
                      <FiTwitter className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(m)}
                    className="p-1.5 rounded-lg text-[#7025B9] hover:bg-purple-50 transition-colors"
                    title="Edit Member"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.fullName || m.name || 'member')}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Member"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Team Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                {editingMember ? 'Edit Staff Profile' : 'Add Team Member'}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prateek Makwana"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder & Tech Lead"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Admin Access Permission
                </label>
                <select
                  value={form.adminAccessRole}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      adminAccessRole: e.target.value as AdminRole | 'NONE',
                    })
                  }
                  className="w-full px-3 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                >
                  <option value="NONE">No Portal Access (Public Team Only)</option>
                  <option value="EDITOR">Editor (Can edit blogs & portfolio)</option>
                  <option value="ADMIN">Admin (Full operations access)</option>
                  <option value="SUPER_ADMIN">Super Admin (Unrestricted root access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Bio / Responsibilities
                </label>
                <textarea
                  rows={3}
                  placeholder="Professional background and technical leadership focus..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isVisibleOnWebsite}
                    onChange={(e) => setForm({ ...form, isVisibleOnWebsite: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300"
                  />
                  <span className="text-xs font-semibold text-[#271044]">
                    Visible on Public About Page
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300"
                  />
                  <span className="text-xs font-semibold text-[#271044]">
                    Active Employee Status
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
                  {editingMember ? 'Save Changes' : 'Add Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
