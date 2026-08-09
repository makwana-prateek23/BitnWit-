import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="site-page min-h-screen py-20 px-6 text-ink">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-16 text-center shadow-sm shadow-slate-200/50">
        <div className="text-7xl">🐇</div>
        <h1 className="mt-8 text-4xl font-bold">404 — White Rabbit got lost</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The page you’re looking for isn’t here. Let’s hop back to the homepage and find the right path.
        </p>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-rabbit px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
          Back to home
        </Link>
      </div>
    </main>
  );
}
