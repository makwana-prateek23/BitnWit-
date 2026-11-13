'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiX,
  FiMessageSquare,
  FiUser,
  FiSend,
  FiTag,
  FiDollarSign,
  FiBriefcase,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { Lead, LeadStatus } from '@/lib/db/types';

const statusConfig: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: { label: 'New', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  CONTACTED: { label: 'Contacted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  QUALIFIED: { label: 'Qualified', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  PROPOSAL_SENT: { label: 'Proposal Sent', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  NEGOTIATION: { label: 'Negotiation', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  CONVERTED: { label: 'Converted', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  LOST: { label: 'Lost', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
};

const serviceOptions = [
  'All Services',
  'Web Development',
  'App Development',
  'UI/UX Design',
  'Digital Marketing',
  'SEO & Analytics',
  'Custom Code',
  'AI Integration',
  'Branding & Strategy',
  'General Inquiry',
];

export default function AdminLeadsPage() {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get('action');
  const initialLeadId = searchParams.get('id');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('All Services');

  // Modals & Drawers
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(initialAction === 'new');
  const [showEditModal, setShowEditModal] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    interestedService: 'Web Development',
    projectBudget: '₹50,000 - ₹1,00,000',
    message: '',
    leadSource: 'MANUAL' as const,
    status: 'NEW' as LeadStatus,
    assignedTeamMember: '',
    followUpDate: '',
  });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (serviceFilter !== 'All Services') params.set('service', serviceFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.items);
        setTotalCount(data.totalCount);

        // If an initial lead ID was in query params, open its drawer
        if (initialLeadId && !selectedLead) {
          const found = data.items.find((l: Lead) => l.id === initialLeadId);
          if (found) setSelectedLead(found);
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, serviceFilter, initialLeadId, selectedLead]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Create Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm),
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewLeadForm({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          interestedService: 'Web Development',
          projectBudget: '₹50,000 - ₹1,00,000',
          message: '',
          leadSource: 'MANUAL',
          status: 'NEW',
          assignedTeamMember: '',
          followUpDate: '',
        });
        fetchLeads();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create lead');
      }
    } catch (err) {
      alert('Error creating lead');
    }
  };

  // Update Status / Assignment directly
  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const { lead: updated } = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
        if (selectedLead?.id === id) {
          setSelectedLead(updated);
        }
      }
    } catch (err) {
      console.error('Error updating lead:', err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete lead for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  // Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteContent.trim()) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNoteContent }),
      });

      if (res.ok) {
        const { note } = await res.json();
        const updatedLead = {
          ...selectedLead,
          notes: [...(selectedLead.notes || []), note],
        };
        setSelectedLead(updatedLead);
        setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
        setNewNoteContent('');
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
          >
            <option value="ALL">All Statuses ({totalCount})</option>
            {Object.keys(statusConfig).map((st) => (
              <option key={st} value={st}>
                {statusConfig[st as LeadStatus].label}
              </option>
            ))}
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
          >
            {serviceOptions.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>

          {/* CSV Export */}
          <a
            href="/api/admin/leads?export=csv"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-sm"
          >
            <FiDownload className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </a>

          {/* Add Lead Button */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Main Leads Table */}
      {loading ? (
        <AdminLoadingScreen message="Retrieving client inquiries..." />
      ) : leads.length === 0 ? (
        <AdminEmptyState
          title="No Leads Found"
          description={
            search || statusFilter !== 'ALL' || serviceFilter !== 'All Services'
              ? 'No client inquiries match the current search or filters. Try adjusting your criteria.'
              : 'Your CRM pipeline is currently clear. Website contact submissions and manual inquiries will populate here.'
          }
          actionLabel="Add First Lead"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-purple-100/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F7FA] border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Contact & Client</th>
                  <th className="py-3 px-4">Service & Budget</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Date Received</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => {
                  const badge = statusConfig[lead.status] || statusConfig.NEW;
                  const dateStr = new Date(lead.dateReceived || lead.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-purple-50/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{lead.fullName}</span>
                          {lead.companyName && (
                            <span className="text-[10px] font-normal text-slate-500 px-1.5 py-0.5 rounded bg-slate-100">
                              {lead.companyName}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                          {lead.email && <span>{lead.email}</span>}
                          {lead.phone && <span>• {lead.phone}</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {lead.interestedService || lead.serviceInterest}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {lead.projectBudget || lead.budgetRange || 'Flexible'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {lead.leadSource}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {dateStr}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        {lead.assignedTeamMember ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-900 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                            <FiUser className="w-3 h-3 text-purple-600" />
                            {lead.assignedTeamMember}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Unassigned</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </span>
                      </td>

                      <td
                        className="py-3.5 px-4 text-right space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg text-[#7025B9] hover:bg-purple-50 transition-colors"
                          title="Open CRM Drawer"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Lead"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Slide-over CRM Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedLead(null)}
          />

          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#F8F7FA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                  CRM Detail File • ID #{selectedLead.id.slice(-6)}
                </span>
                <h2 className="text-xl font-bold text-[#271044] font-display mt-0.5">
                  {selectedLead.fullName}
                </h2>
                {selectedLead.companyName && (
                  <p className="text-xs text-slate-500">{selectedLead.companyName}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status and Assignment Quick Controls */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div>
                  <label className="block text-[11px] font-semibold text-[#271044] mb-1">
                    Pipeline Status
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      handleUpdateLead(selectedLead.id, {
                        status: e.target.value as LeadStatus,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    {Object.keys(statusConfig).map((st) => (
                      <option key={st} value={st}>
                        {statusConfig[st as LeadStatus].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#271044] mb-1">
                    Assignee
                  </label>
                  <input
                    type="text"
                    placeholder="Team member name"
                    value={selectedLead.assignedTeamMember || ''}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        assignedTeamMember: e.target.value,
                      })
                    }
                    onBlur={() =>
                      handleUpdateLead(selectedLead.id, {
                        assignedTeamMember: selectedLead.assignedTeamMember,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Client Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FiMail className="w-3.5 h-3.5" /> Email
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 truncate">
                      {selectedLead.email || 'N/A'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FiPhone className="w-3.5 h-3.5" /> Phone
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 truncate">
                      {selectedLead.phone || 'N/A'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FiBriefcase className="w-3.5 h-3.5" /> Service
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 truncate">
                      {selectedLead.interestedService || selectedLead.serviceInterest}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FiDollarSign className="w-3.5 h-3.5" /> Budget
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 truncate">
                      {selectedLead.projectBudget || selectedLead.budgetRange || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Client Message
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message || 'No written message provided.'}
                </div>
              </div>

              {/* Internal Notes Chronology */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FiMessageSquare className="w-3.5 h-3.5 text-[#7025B9]" />
                    Internal CRM Notes ({selectedLead.notes?.length || 0})
                  </h4>
                </div>

                {/* Notes Stream */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-purple-700 font-semibold">
                          <span>{note.authorName}</span>
                          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-700">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No internal notes recorded for this lead yet.
                    </p>
                  )}
                </div>

                {/* Add Note Input */}
                <form onSubmit={handleAddNote} className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Add an internal follow-up note..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNoteContent.trim()}
                    className="px-3 py-2 bg-[#7025B9] text-white rounded-xl text-xs font-semibold hover:bg-[#271044] transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <FiSend className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLead.id, selectedLead.fullName)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#271044] text-white rounded-xl text-xs font-semibold hover:bg-[#7025B9] transition-colors"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Create Lead Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                Create New Client Lead
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newLeadForm.fullName}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={newLeadForm.email}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newLeadForm.phone}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Brand"
                    value={newLeadForm.companyName}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, companyName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Service Interested
                  </label>
                  <select
                    value={newLeadForm.interestedService}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, interestedService: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  >
                    {serviceOptions.filter((s) => s !== 'All Services').map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="₹50,000 - ₹1,00,000"
                    value={newLeadForm.projectBudget}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, projectBudget: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271044] mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        status: e.target.value as LeadStatus,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                  >
                    {Object.keys(statusConfig).map((st) => (
                      <option key={st} value={st}>
                        {statusConfig[st as LeadStatus].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271044] mb-1">
                  Project Notes / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail client specifications, project scope or timeline..."
                  value={newLeadForm.message}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FF790E] hover:bg-[#e66c0b] text-white text-xs font-semibold shadow-md shadow-orange-500/20"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
