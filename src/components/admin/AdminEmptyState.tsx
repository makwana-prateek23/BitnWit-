'use client';

import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';

interface AdminEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export default function AdminEmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 sm:p-14 text-center rounded-3xl bg-white border border-purple-100/80 shadow-sm max-w-xl mx-auto my-8">
      <div className="relative w-24 h-24 mb-4 p-2 rounded-2xl bg-purple-50/60 border border-purple-100">
        <Image
          src="/bitty-mascot.png"
          alt="Bitty Mascot"
          width={88}
          height={88}
          className="object-contain"
        />
      </div>

      <h3 className="text-lg font-bold text-[#271044] font-display">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[#77717F] max-w-md leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        <div className="mt-6">
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF790E] to-[#FF933B] hover:from-[#e66c0b] hover:to-[#FF790E] shadow-md shadow-orange-500/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>{actionLabel}</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF790E] to-[#FF933B] hover:from-[#e66c0b] hover:to-[#FF790E] shadow-md shadow-orange-500/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              <span>{actionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
