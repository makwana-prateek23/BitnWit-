import Link from 'next/link';

interface LogoProps {
  withTagline?: boolean;
  className?: string;
}

export default function Logo({ withTagline = false, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex flex-col ${className}`}>
      <span className="font-heading text-2xl font-extrabold tracking-tight text-ink">
        BIT<span className="text-signal">n</span>
        <span className="text-rabbit">WIT</span>
      </span>
      {withTagline && (
        <span className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Building <span className="text-rabbit">Intelligence</span> Through{' '}
          <span className="text-signal">Technology</span>
        </span>
      )}
    </Link>
  );
}
