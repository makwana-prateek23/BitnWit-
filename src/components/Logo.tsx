import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  withTagline?: boolean;
  className?: string;
}

export default function Logo({ withTagline = false, className = '' }: LogoProps) {
  return (
    <Link href="/" aria-label="BITnWIT home" className={`inline-flex flex-col ${className}`}>
      <Image src="/bitnwit-logo.png" alt="BITnWIT" width={190} height={76} priority className="h-10 w-auto object-contain object-left" />
      {withTagline && (
        <span className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Innovate <span className="text-rabbit">• Build</span>{' '}
          <span className="text-signal">• Solve</span>
        </span>
      )}
    </Link>
  );
}
