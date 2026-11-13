'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiKey,
} from 'react-icons/fi';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

interface AdminProfileData {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit Name State
  const [name, setName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/admin/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
          setName(data.user.name);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingName(true);
    setNameSuccess(false);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
        setNameSuccess(true);
        setTimeout(() => setNameSuccess(false), 3000);
      } else {
        alert('Failed to update name');
      }
    } catch {
      alert('Error saving name');
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError('New password and confirmation do not match.');
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setPwdSuccess('Your administrative password has been updated securely.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPwdError(data.error || 'Failed to update password');
      }
    } catch {
      setPwdError('Network error while updating password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return <AdminLoadingScreen message="Loading administrative profile..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-purple-100/70 shadow-sm">
        <h2 className="text-base font-bold text-[#271044] font-display">
          Administrative Account & Security
        </h2>
        <p className="text-xs text-[#77717F]">
          Manage authentication credentials, profile identifiers, and active session cryptographic security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#271044] to-[#7025B9] p-1 flex items-center justify-center shadow-md">
              <Image
                src="/bitty-mascot.png"
                alt="Admin Profile"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {profile?.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">{profile?.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#7025B9] border border-purple-100">
                  {profile?.role}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Root Session
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateName} className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Display Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
                <button
                  type="submit"
                  disabled={savingName || name === profile?.name}
                  className="px-4 py-2.5 bg-[#7025B9] hover:bg-[#271044] text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition-colors"
                >
                  {savingName ? 'Saving...' : 'Update'}
                </button>
              </div>
              {nameSuccess && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                  <FiCheckCircle className="w-3.5 h-3.5" /> Name updated successfully!
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Registered Email (Immutable)
              </label>
              <input
                type="email"
                disabled
                value={profile?.email || ''}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  Account Created
                </span>
                <span className="font-semibold text-slate-700 mt-0.5 block">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  Last Authenticated
                </span>
                <span className="font-semibold text-slate-700 mt-0.5 block">
                  {profile?.lastLoginAt
                    ? new Date(profile.lastLoginAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'short',
                      })
                    : 'Current session'}
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Password Security Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100/70 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiKey className="w-4 h-4 text-[#7025B9]" />
            <h3 className="text-sm font-bold text-[#271044] font-display">
              Change Security Password
            </h3>
          </div>

          {pwdError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{pwdError}</span>
            </div>
          )}

          {pwdSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{pwdSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 pr-10 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrent ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                New Password (min 8 chars) *
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 pr-10 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#271044] mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F8F7FA] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7025B9]"
              />
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF790E] to-[#FF933B] hover:from-[#e66c0b] hover:to-[#FF790E] text-white text-xs font-semibold shadow-md shadow-orange-500/20 disabled:opacity-50 transition-all"
            >
              <span>{changingPassword ? 'Updating Security...' : 'Update Password'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
            <FiShield className="w-4 h-4 text-emerald-600" />
            <span>PBKDF2 Salted Key Derivation • 100,000 Iterations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
