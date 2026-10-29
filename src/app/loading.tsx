import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03081a]/92 backdrop-blur-xl select-none">
      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-rabbit/25 blur-[100px]" />
      <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-signal/20 blur-[90px]" />

      {/* Central Face Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Spinning Radiant Halo Ring around Face */}
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full bg-gradient-to-tr from-rabbit via-signal to-blue-500 opacity-75 blur-xs animate-spin [animation-duration:2.4s]"
          />
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full bg-[#03081a]"
          />

          {/* Glowing Medallion with White Rabbit Face */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl rabbit-face-bob">
            <Image
              src="/icon.png"
              alt="White Rabbit mascot face"
              width={90}
              height={90}
              priority
              className="h-20 w-20 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            />

            {/* Active Online Pulse Dot */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#03081a] bg-emerald-500" />
            </span>
          </div>
        </div>

        {/* Brand Logo & Smooth Status Indicator */}
        <div className="mt-6 flex flex-col items-center">
          <span className="font-extrabold tracking-wider text-white text-base">
            BIT<span className="text-rabbit">n</span>WIT
          </span>

          <div className="mt-3 h-1 w-36 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left bg-gradient-to-r from-rabbit via-signal to-blue-400 rabbit-progress-bar" />
          </div>

          <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-200/80">
            Hopping to page...
          </p>
        </div>
      </div>
    </div>
  );
}
