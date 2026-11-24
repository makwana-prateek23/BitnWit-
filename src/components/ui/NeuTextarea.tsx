'use client';

import React from 'react';

interface NeuTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export default function NeuTextarea({
  label,
  error,
  helperText,
  className = '',
  containerClassName = '',
  id,
  rows = 4,
  ...props
}: NeuTextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={textareaId} className="text-xs font-bold uppercase tracking-wider text-neu-textSec">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full rounded-xl neu-recessed p-4 text-sm text-neu-text placeholder:text-neu-textSec/60 focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-red transition-all duration-200 resize-y ${
          error ? '!ring-2 !ring-red' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red">{error}</span>}
      {helperText && !error && <span className="text-xs text-neu-textSec">{helperText}</span>}
    </div>
  );
}
