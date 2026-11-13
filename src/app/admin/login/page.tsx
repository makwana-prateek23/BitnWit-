'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

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
    <div className="min-h-screen bg-[#F8F7FA] text-[#171225] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Brand Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-100/40 via-purple-50/20 to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#7025B9]/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FF790E]/10 blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Mascot & Logo Brand Mark */}
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-3xl bg-white shadow-xl shadow-purple-950/5 border border-purple-100/80">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-[#271044] to-[#7025B9] p-0.5 flex items-center justify-center">
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

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#271044] font-display">
          BITnWit Admin Portal
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#FF790E]">
          INNOVATE • BUILD • SOLVE
        </p>
        <p className="mt-2 text-sm text-[#77717F]">
          Sign in to manage leads, portfolio, services and platform settings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl shadow-purple-950/5 rounded-3xl border border-purple-100/70">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in duration-200">
              <FiAlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in duration-200">
              <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-snug">{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#271044] mb-2"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="w-5 h-5" />
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
                  className="block w-full pl-11 pr-4 py-3 bg-[#F8F7FA] border border-slate-200 rounded-xl text-sm text-[#171225] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7025B9] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#271044]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-medium text-[#7025B9] hover:text-[#271044] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock className="w-5 h-5" />
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
                  className="block w-full pl-11 pr-11 py-3 bg-[#F8F7FA] border border-slate-200 rounded-xl text-sm text-[#171225] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7025B9] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#7025B9] focus:ring-[#7025B9] border-slate-300 transition"
                />
                <span className="text-xs font-medium text-[#77717F]">Remember this session (30 days)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF790E] to-[#FF933B] hover:from-[#e66c0b] hover:to-[#FF790E] shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance Badge */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-[#77717F]">
            <FiShield className="w-4 h-4 text-emerald-600" />
            <span>256-bit PBKDF2 Encrypted • HTTP-Only Session Guard</span>
          </div>
        </div>

        {/* Back to public website link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs font-medium text-[#77717F] hover:text-[#271044] transition-colors inline-flex items-center gap-1.5"
          >
            ← Return to public website
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <h3 className="text-lg font-bold text-[#271044] flex items-center gap-2">
              <FiShield className="w-5 h-5 text-[#7025B9]" />
              Password Recovery Workflow
            </h3>
            <p className="mt-3 text-sm text-[#77717F] leading-relaxed">
              For enterprise security, administrative passwords cannot be reset through an unauthenticated public email link.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-[#271044] space-y-2">
              <p className="font-semibold">Super Admin Reset Procedure:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Contact the system administrator at <span className="font-mono text-[#7025B9]">tech@bitnwit.com</span>.</li>
                <li>Or use the secure server CLI database reset utility to re-issue credentials.</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#271044] text-white text-xs font-semibold hover:bg-[#7025B9] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
