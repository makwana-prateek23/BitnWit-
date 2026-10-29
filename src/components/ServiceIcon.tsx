import {
  LuGlobe,
  LuSmartphone,
  LuBot,
  LuMegaphone,
  LuPalette,
  LuTrendingUp,
  LuCode,
  LuCrown
} from 'react-icons/lu';

export type ServiceIconName =
  | 'marketing'
  | 'web'
  | 'app'
  | 'design'
  | 'seo'
  | 'branding'
  | 'code'
  | 'ai';

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
  size?: number;
}

const icons: Record<
  ServiceIconName,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  marketing: LuMegaphone,
  web: LuGlobe,
  app: LuSmartphone,
  ai: LuBot,
  design: LuPalette,
  seo: LuTrendingUp,
  code: LuCode,
  branding: LuCrown,
};

export const serviceTheme: Record<
  ServiceIconName,
  {
    bg: string;
    border: string;
    text: string;
    glow: string;
    accent: string;
  }
> = {
  web: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    text: 'text-sky-600',
    glow: 'group-hover:shadow-sky-500/20',
    accent: 'from-sky-500 to-blue-600'
  },
  app: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-600',
    glow: 'group-hover:shadow-indigo-500/20',
    accent: 'from-indigo-500 to-purple-600'
  },
  ai: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-600',
    glow: 'group-hover:shadow-purple-500/20',
    accent: 'from-purple-500 to-pink-600'
  },
  marketing: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-600',
    glow: 'group-hover:shadow-rose-500/20',
    accent: 'from-rose-500 to-orange-500'
  },
  design: {
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20',
    text: 'text-fuchsia-600',
    glow: 'group-hover:shadow-fuchsia-500/20',
    accent: 'from-fuchsia-500 to-purple-600'
  },
  seo: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-600',
    glow: 'group-hover:shadow-emerald-500/20',
    accent: 'from-emerald-500 to-teal-600'
  },
  code: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    text: 'text-slate-800',
    glow: 'group-hover:shadow-slate-500/20',
    accent: 'from-slate-700 to-slate-900'
  },
  branding: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-600',
    glow: 'group-hover:shadow-amber-500/20',
    accent: 'from-amber-500 to-orange-600'
  }
};

export default function ServiceIcon({
  name,
  className = '',
  size = 22
}: ServiceIconProps) {
  const Icon = icons[name] ?? LuCode;
  return <Icon className={className} size={size} />;
}
