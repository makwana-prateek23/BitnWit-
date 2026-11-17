'use client';

import React from 'react';

export type NeuButtonVariant = 'default' | 'purple' | 'yellow' | 'maroon' | 'danger' | 'ghost';
export type NeuButtonSize = 'sm' | 'md' | 'lg';

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeuButtonVariant;
  size?: NeuButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function NeuButton({
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  active = false,
  className = '',
  children,
  disabled,
  ...props
}: NeuButtonProps) {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm font-bold rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5',
  }[size];

  const variantStyles = {
    default: active
      ? 'neu-pressed text-neu-purple'
      : 'neu-raised text-neu-text hover:text-neu-purple hover:-translate-y-0.5 hover:shadow-neu-raised-lg active:translate-y-0 active:shadow-neu-pressed',
    purple: active
      ? 'bg-gradient-to-r from-neu-purple to-purple-600 text-white shadow-inner'
      : 'bg-gradient-to-r from-neu-purple to-purple-600 text-white shadow-md hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neu-purple/30 active:translate-y-0 active:shadow-inner',
    yellow: active
      ? 'bg-neu-yellow text-slate-900 shadow-inner'
      : 'bg-neu-yellow text-slate-900 shadow-md hover:brightness-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neu-yellow/30 active:translate-y-0 active:shadow-inner',
    maroon: active
      ? 'bg-[#642E42] text-white shadow-inner'
      : 'bg-[#642E42] text-white shadow-md hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#642E42]/30 active:translate-y-0 active:shadow-inner',
    danger: active
      ? 'bg-red-600 text-white shadow-inner'
      : 'bg-red-500 text-white shadow-md hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner',
    ghost: active
      ? 'neu-pressed text-neu-purple'
      : 'bg-transparent text-neu-text hover:bg-neu-surfaceSec hover:-translate-y-0.5 active:translate-y-0 active:neu-pressed',
  }[variant];

  return (
    <button
      className={`group relative overflow-hidden inline-flex items-center justify-center transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Dynamic Specular Sheen Sweep on Cursor Hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
          <span className="relative z-10">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
