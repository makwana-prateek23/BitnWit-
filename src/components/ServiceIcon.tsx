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
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  app: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  ai: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  marketing: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  design: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  seo: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  code: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
  },
  branding: {
    bg: 'bg-navy/10',
    border: 'border-navy/20',
    text: 'text-navy',
    glow: 'group-hover:border-navy/40',
    accent: 'bg-navy'
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
