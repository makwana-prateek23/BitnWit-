import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="site-page min-h-screen py-16 px-6 text-ink flex items-center justify-center">
      <div className="mx-auto max-w-xl rounded-3xl 2xl:rounded-[2.5rem] border border-[#E8E2D8] bg-white p-8 sm:p-12 text-center shadow-xl shadow-slate-900/5">
        <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-2xl">
          <Image
            src="/mascot-404.jpg"
            alt="Bitty looking puzzled — Page Not Found"
            width={512}
            height={512}
            priority
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold text-rabbit">
          <span>Error 404 • Missing Page</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">Bitty couldn’t find that page</h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
          The link you followed might be broken, moved, or deleted. Let’s head back to familiar ground.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-shine inline-flex items-center justify-center rounded-full bg-rabbit px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rabbit/20 transition hover:bg-purple-800"
          >
            Back to Homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-line bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  );
}
