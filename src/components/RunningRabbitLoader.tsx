'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function RunningRabbitLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // When pathname changes, smoothly hide the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Intercept internal route navigation to trigger the running rabbit immediately
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external links, mailto, tel, anchors, or new tabs
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.getAttribute('target') === '_blank'
      ) {
        return;
      }

      // Normalize paths to compare
      const currentPath = pathname.replace(/\/$/, '') || '/';
      const targetPath = href.replace(/\/$/, '') || '/';

      if (currentPath !== targetPath) {
        setLoading(true);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="running-rabbit-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03081a]/90 backdrop-blur-lg select-none"
        >
          {/* Ambient Lighting Behind Rabbit */}
          <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-rabbit/30 blur-[90px]" />
          <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-signal/20 blur-[80px]" />

          <div className="relative flex flex-col items-center">
            {/* Speed streaks container */}
            <div className="relative h-28 w-48 flex items-center justify-center overflow-visible">
              {/* Animated Speed Lines (Zooming Leftwards) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="speed-line speed-line-1" />
                <span className="speed-line speed-line-2" />
                <span className="speed-line speed-line-3" />
                <span className="speed-line speed-line-4" />
              </div>

              {/* Animated Running & Leaping Rabbit */}
              <div className="running-rabbit-wrapper">
                <svg
                  width="110"
                  height="75"
                  viewBox="0 0 130 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="running-rabbit-svg filter drop-shadow-[0_10px_20px_rgba(109,31,162,0.4)]"
                >
                  {/* Fluffy Rabbit Tail */}
                  <circle cx="20" cy="52" r="8" fill="#F8FAFC" />
                  <circle cx="18" cy="50" r="5" fill="#E2E8F0" />

                  {/* Back Leg in Running Motion */}
                  <g className="rabbit-back-leg">
                    <ellipse cx="36" cy="56" rx="14" ry="9" transform="rotate(-25 36 56)" fill="#E2E8F0" />
                    <ellipse cx="24" cy="70" rx="10" ry="4" transform="rotate(20 24 70)" fill="#CBD5E1" />
                  </g>

                  {/* Main Rabbit Body (Leaping Curve) */}
                  <path
                    d="M 22 52 C 24 35, 45 32, 68 36 C 85 39, 94 48, 86 64 C 76 72, 35 70, 22 52 Z"
                    fill="#FFFFFF"
                  />

                  {/* Front Leg in Running Motion */}
                  <g className="rabbit-front-leg">
                    <ellipse cx="78" cy="58" rx="12" ry="5.5" transform="rotate(35 78 58)" fill="#FFFFFF" />
                    <ellipse cx="94" cy="68" rx="8" ry="3.5" transform="rotate(15 94 68)" fill="#F1F5F9" />
                  </g>

                  {/* Rabbit Head with White Rabbit Cheeks */}
                  <circle cx="92" cy="40" r="16" fill="#FFFFFF" />
                  <ellipse cx="98" cy="45" rx="8" ry="6" fill="#FFFFFF" />
                  <circle cx="106" cy="44" r="2.5" fill="#FF5A0A" /> {/* Cute pink/orange nose */}

                  {/* Iconic White Rabbit Glasses (Glasses Frame) */}
                  <circle cx="93" cy="39" r="6.5" stroke="#061B49" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                  <circle cx="103" cy="39" r="6" stroke="#061B49" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                  <path d="M 86 38 L 88 38" stroke="#061B49" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 99.5 39 L 97 39" stroke="#061B49" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Eyes inside glasses */}
                  <circle cx="94" cy="39" r="2.5" fill="#061B49" />
                  <circle cx="103.5" cy="39" r="2.2" fill="#061B49" />
                  <circle cx="95" cy="38" r="0.8" fill="#FFFFFF" />

                  {/* Long Ears Streaming Backwards in the Wind */}
                  <g className="rabbit-ears">
                    {/* Left Ear */}
                    <path
                      d="M 84 32 C 70 20, 48 16, 32 20 C 44 26, 62 28, 80 34 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M 80 31 C 68 22, 52 19, 38 22 C 48 26, 62 27, 76 33 Z"
                      fill="#FFDDD2"
                    />

                    {/* Right Ear (Trailing) */}
                    <path
                      d="M 86 28 C 74 14, 52 8, 36 10 C 48 17, 66 20, 82 30 Z"
                      fill="#F1F5F9"
                    />
                    <path
                      d="M 82 26 C 72 16, 56 11, 42 12 C 52 17, 66 19, 78 28 Z"
                      fill="#FFB6A3"
                    />
                  </g>
                </svg>
              </div>

              {/* Bouncing Ground Shadow */}
              <div className="rabbit-ground-shadow" />
            </div>

            {/* Brand Logo & Loading Status */}
            <div className="mt-4 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-white text-base">
                  BIT<span className="text-rabbit">n</span>WIT
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
              </div>

              {/* Glowing High-Speed Progress Bar */}
              <div className="mt-3 h-1 w-36 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full origin-left bg-gradient-to-r from-rabbit via-signal to-blue-400 rabbit-progress-bar" />
              </div>

              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200/80">
                White Rabbit is hopping...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
