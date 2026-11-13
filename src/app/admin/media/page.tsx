'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiUploadCloud,
  FiSearch,
  FiCopy,
  FiCheck,
  FiTrash2,
  FiFolder,
  FiFile,
  FiImage,
  FiFileText,
  FiX,
} from 'react-icons/fi';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';
import { MediaFile, MediaFolder } from '@/lib/db/types';

const folders: { key: string; label: string }[] = [
  { key: 'ALL', label: 'All Files' },
  { key: 'BRAND', label: 'Brand Assets' },
  { key: 'MASCOT', label: 'Mascot Files' },
  { key: 'ILLUSTRATIONS', label: 'Illustrations' },
  { key: 'PORTFOLIO', label: 'Portfolio Images' },
  { key: 'BLOG', label: 'Blog Media' },
  { key: 'SERVICES', label: 'Service Graphics' },
  { key: 'DOCS', label: 'Documents' },
];

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadFolder, setUploadFolder] = useState<MediaFolder>('BRAND');

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedFolder !== 'ALL') params.set('folder', selectedFolder);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [selectedFolder, search]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', uploadFolder);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchFiles();
      } else {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      }
    } catch (err) {
      alert('Network error while uploading');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone & Header */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#271044] font-display">
              Media Asset Repository ({files.length} Assets)
            </h2>
            <p className="text-xs text-[#77717F]">
              Centralized storage for company branding, mascot files, and web assets
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Target Folder Selector for Upload */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Destination:</span>
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value as MediaFolder)}
                className="px-3 py-1.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                {folders
                  .filter((f) => f.key !== 'ALL')
                  .map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
              </select>
            </div>

            {/* Direct Upload Button */}
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF790E] hover:bg-[#e66c0b] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/20 cursor-pointer transition-all">
              <FiUploadCloud className="w-4 h-4" />
              <span>{uploading ? 'Uploading...' : 'Upload Media Asset'}</span>
              <input
                type="file"
                className="hidden"
                disabled={uploading}
                onChange={handleFileUpload}
                accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
              />
            </label>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Folder Pills */}
          <div className="flex flex-wrap gap-1.5">
            {folders.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedFolder(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFolder === f.key
                    ? 'bg-[#7025B9] text-white shadow-sm'
                    : 'bg-[#F8F7FA] text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Files */}
      {loading ? (
        <AdminLoadingScreen message="Indexing media library..." />
      ) : files.length === 0 ? (
        <AdminEmptyState
          title="No Media Files"
          description="No uploaded assets found matching the selected folder or search query."
          actionLabel="Upload Media File"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => {
            const isImage = file.mimeType.startsWith('image/');
            const isCopied = copiedId === file.id;

            return (
              <div
                key={file.id}
                className="bg-white rounded-2xl border border-purple-100/70 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Media Preview Box */}
                <div className="relative h-32 w-full bg-[#F8F7FA] flex items-center justify-center p-2 overflow-hidden border-b border-slate-100">
                  {isImage ? (
                    <img
                      src={file.url || file.fileUrl}
                      alt={file.name || file.filename || 'asset'}
                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <FiFileText className="w-12 h-12 text-slate-400" />
                  )}

                  {/* Folder Tag */}
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white uppercase tracking-wider">
                    {file.folder}
                  </span>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3">
                  <div className="text-xs font-semibold text-slate-900 truncate" title={file.name || file.filename}>
                    {file.name || file.filename}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {formatFileSize(file.sizeBytes || file.fileSizeBytes || 0)}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(file.url || file.fileUrl || '', file.id)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                        isCopied ? 'text-emerald-600' : 'text-[#7025B9] hover:underline'
                      }`}
                      title="Copy Public URL"
                    >
                      {isCopied ? (
                        <>
                          <FiCheck className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(file.id, file.name || file.filename || 'file')}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete File"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
