'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import NeuSurface from '@/components/ui/NeuSurface';
import NeuButton from '@/components/ui/NeuButton';
import NeuInput from '@/components/ui/NeuInput';
import NeuThemeToggle from '@/components/ui/NeuThemeToggle';
import NeuBadge from '@/components/ui/NeuBadge';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Login failed. Please verify your credentials.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Authentication successful! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 700);
    } catch {
      setErrorMessage('Network error occurred. Please verify your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neu-bg text-neu-text flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-admin transition-colors duration-300">
      {/* Top Controls */}
      <div className="absolute top-6 right-6">
        <NeuThemeToggle showLabel />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Mascot & Logo Brand Mark */}
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-3xl neu-raised">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden neu-recessed p-1 flex items-center justify-center">
            <Image
              src="/bitty-mascot.png"
              alt="Bitty — BITnWit Mascot"
              width={52}
              height={52}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neu-text">
          BITnWit Admin Portal
        </h1>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neu-purple">
          INNOVATE • BUILD • SOLVE
        </p>
        <p className="mt-2 text-xs sm:text-sm text-neu-textSec">
          Sign in to manage leads, portfolio, services, and website telemetry.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <NeuSurface variant="raised-lg" className="py-8 px-6 sm:px-10 rounded-[2.5rem]">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="leading-snug">{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-neu-textSec mb-2"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neu-textSec">
                  <FiMail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bitnwit.com"
                  className="block w-full pl-10 pr-4 py-3 neu-recessed rounded-xl text-sm text-neu-text placeholder:text-neu-textSec/50 focus:outline-none focus:ring-2 focus:ring-neu-purple transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-neu-textSec"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-neu-purple hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neu-textSec">
                  <FiLock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-3 neu-recessed rounded-xl text-sm text-neu-text placeholder:text-neu-textSec/50 focus:outline-none focus:ring-2 focus:ring-neu-purple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neu-textSec hover:text-neu-text"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neu-textSec">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded neu-recessed text-neu-purple focus:ring-neu-purple border-none"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <div className="pt-2">
              <NeuButton
                type="submit"
                variant="purple"
                size="lg"
                loading={isLoading}
                className="w-full justify-center shadow-lg"
              >
                Sign In to Console
              </NeuButton>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-neu-border text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neu-textSec">
              <FiLock size={12} className="text-neu-purple" />
              <span>256-bit encrypted administrative session · IP logged</span>
            </span>
          </div>
        </NeuSurface>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <NeuSurface variant="raised-lg" className="max-w-md w-full p-6 sm:p-8 rounded-[2rem] space-y-4">
            <h2 className="text-lg font-bold text-neu-text">Reset Password</h2>
            <p className="text-xs sm:text-sm text-neu-textSec leading-relaxed">
              For security governance, administrative credentials can be rotated via the server CLI script or through an existing Super Admin account in the Admin Profile section.
            </p>
            <div className="p-3.5 rounded-xl neu-recessed text-xs font-mono text-neu-purple">
              node scripts/create-admin.mjs
            </div>
            <div className="pt-2 flex justify-end">
              <NeuButton variant="default" size="sm" onClick={() => setShowForgotModal(false)}>
                Close
              </NeuButton>
            </div>
          </NeuSurface>
        </div>
      )}
    </div>
  );
}
