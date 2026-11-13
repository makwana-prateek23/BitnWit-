'use client';

import Image from 'next/image';

interface AdminLoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function AdminLoadingScreen({
  message = 'Loading administrative data...',
  fullScreen = false,
}: AdminLoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${
        fullScreen ? 'min-h-screen bg-[#F8F7FA]' : 'min-h-[360px]'
      }`}
    >
      <div className="relative w-20 h-20 mb-4 animate-bounce">
        <Image
          src="/bitty-mascot.png"
          alt="Bitty Loading"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
      </div>

      <div className="w-40 h-1.5 bg-purple-100 rounded-full overflow-hidden mb-3">
        <div className="w-full h-full bg-gradient-to-r from-[#7025B9] to-[#FF790E] rounded-full animate-pulse" />
      </div>

      <p className="text-xs font-semibold text-[#271044] tracking-wide uppercase font-mono">
        {message}
      </p>
    </div>
  );
}
