interface RabbitMarkProps {
  size?: number;
  className?: string;
  badge?: boolean;
}

/**
 * Placeholder mark for the White Rabbit mascot — simple line art standing in
 * for the full illustrated character until real artwork assets are supplied.
 */
export default function RabbitMark({ size = 48, className = '', badge = true }: RabbitMarkProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={badge ? '' : className}
    >
      <ellipse cx="24" cy="16" rx="5.5" ry="14" transform="rotate(-14 24 16)" fill="currentColor" />
      <ellipse cx="40" cy="16" rx="5.5" ry="14" transform="rotate(14 40 16)" fill="currentColor" />
      <circle cx="32" cy="38" r="17" fill="currentColor" />
      <circle cx="25.5" cy="36" r="5.5" fill="white" fillOpacity="0.9" />
      <circle cx="38.5" cy="36" r="5.5" fill="white" fillOpacity="0.9" />
      <circle cx="25.5" cy="36" r="2.4" fill="currentColor" />
      <circle cx="38.5" cy="36" r="2.4" fill="currentColor" />
      <path d="M31 36h2" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="44" r="1.6" fill="white" fillOpacity="0.9" />
    </svg>
  );

  if (!badge) return icon;

  return (
    <div
      className={`flex items-center justify-center rounded-3xl bg-rabbit text-white ${className}`}
      style={{ width: size * 1.4, height: size * 1.4 }}
    >
      {icon}
    </div>
  );
}
