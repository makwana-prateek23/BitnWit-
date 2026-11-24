'use client';

import React from 'react';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export default function NeuInput({
  label,
  error,
  helperText,
  icon,
  className = '',
  containerClassName = '',
  id,
  ...props
}: NeuInputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-neu-textSec">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-neu-textSec pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl neu-recessed px-4 py-3 text-sm text-neu-text placeholder:text-neu-textSec/60 focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-red transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${error ? '!ring-2 !ring-red' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-semibold text-red">{error}</span>}
      {helperText && !error && <span className="text-xs text-neu-textSec">{helperText}</span>}
    </div>
  );
}
