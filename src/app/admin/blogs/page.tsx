'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiUser,
  FiTag,
  FiSearch,
  FiX,
  FiClock,
  FiCheckCircle,
  FiFileText,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { BlogPost, BlogStatus } from '@/lib/db/types';

export default function AdminBlogsPage() {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get('action');

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(initialAction === 'new');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '/bitnwit-brand-asset-board.png',
    category: 'Engineering & SaaS',
    tags: 'Next.js, Architecture, Cloud',
    authorName: 'BITnWit Engineering',
    readingTime: '5 min read',
    status: 'PUBLISHED' as BlogStatus,
    metaTitle: '',
    metaDescription: '',
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImageUrl: '/bitnwit-brand-asset-board.png',
      category: 'Engineering & SaaS',
      tags: 'Next.js, Architecture, Cloud',
      authorName: 'BITnWit Engineering',
      readingTime: '5 min read',
      status: 'PUBLISHED',
      metaTitle: '',
      metaDescription: '',
    });
    setActiveTab('content');
    setShowModal(true);
  };

  const openEditModal = (p: BlogPost) => {
    setEditingPost(p);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content || p.contentMarkdown || '',
      coverImageUrl: p.coverImageUrl || p.coverImage || '',
      category: p.category,
      tags: (p.tags || []).join(', '),
      authorName: p.authorName,
      readingTime: p.readingTime || p.readTime || '5 min read',
      status: p.status,
      metaTitle: p.metaTitle || p.title,
      metaDescription: p.metaDescription || p.excerpt,
    });
    setActiveTab('content');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || form.excerpt,
      };

      const url = editingPost ? `/api/admin/blogs/${editingPost.id}` : '/api/admin/blogs';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchPosts();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save blog post');
      }
    } catch (err) {
      alert('Error saving blog post');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Statuses ({posts.length})</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {loading ? (
        <AdminLoadingScreen message="Loading blog publications..." />
      ) : filteredPosts.length === 0 ? (
        <AdminEmptyState
          title="No Blog Posts"
          description="Your editorial catalog is currently empty. Publish insights to boost your organic reach and technical authority."
          actionLabel="Write First Post"
          onAction={openCreateModal}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-purple-100/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F7FA] border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category & Tags</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Read Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-slate-900 line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {post.excerpt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 font-semibold text-[10px] border border-purple-100">
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {post.authorName}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                      {post.readingTime || post.readTime}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          post.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : post.status === 'SCHEDULED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 inline-block"
                        title="Preview Public Article"
                      >
                        <FiEye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 rounded-lg text-[#7025B9] hover:bg-purple-50 inline-block"
                        title="Edit Article"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 inline-block"
                        title="Delete Article"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Write / Edit Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#271044] font-display">
                {editingPost ? `Edit Article: ${editingPost.title}` : 'Compose New Article'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 mt-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-[#7025B9] text-[#7025B9]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Article Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'seo'
                    ? 'border-[#7025B9] text-[#7025B9]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                SEO & Metadata
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-[#7025B9] text-[#7025B9]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Live Markdown Preview
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              {activeTab === 'content' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#271044] mb-1">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Scaling Next.js 14 in Production"
                        value={form.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setForm({
                            ...form,
                            title,
                            slug: editingPost ? form.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
                        placeholder="e.g. scaling-nextjs-14"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#271044] mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#271044] mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={form.authorName}
                        onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#271044] mb-1">
                        Publication Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            status: e.target.value as 'PUBLISHED' | 'DRAFT' | 'SCHEDULED',
                          })
                        }
                        className="w-full px-3 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                      >
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                        <option value="SCHEDULED">Scheduled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#271044] mb-1">
                      Short Excerpt (Teaser) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Summary snippet displayed on blog index..."
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#271044] mb-1">
                      Article Body (Markdown) *
                    </label>
                    <textarea
                      rows={10}
                      required
                      placeholder="Write your article in standard markdown (# Headings, **bold**, code blocks)..."
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#271044] mb-1">
                      Meta Title (Google SERP Title)
                    </label>
                    <input
                      type="text"
                      placeholder="60 characters recommended"
                      value={form.metaTitle}
                      onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#271044] mb-1">
                      Meta Description (Search Snippet)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="150-160 characters recommended description for search engines..."
                      value={form.metaDescription}
                      onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#271044] mb-1">
                      Cover / OG Social Image
                    </label>
                    <input
                      type="text"
                      value={form.coverImageUrl}
                      onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="p-6 rounded-2xl bg-[#F8F7FA] border border-slate-200 min-h-[300px] prose prose-sm max-w-none">
                  <h1>{form.title || 'Untitled Article'}</h1>
                  <p className="lead italic text-slate-600">{form.excerpt}</p>
                  <hr />
                  <div className="whitespace-pre-wrap font-sans text-slate-800">
                    {form.content || 'Article content will render here in real time.'}
                  </div>
                </div>
              )}

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
                  {editingPost ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
