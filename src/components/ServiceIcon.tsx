import {
  AiOutlineMobile,
  AiOutlineLaptop,
  AiOutlineBulb,
  AiOutlineSearch,
  AiOutlineTrademark,
  AiOutlineRobot,
  AiOutlineCode,
} from "react-icons/ai";

export type ServiceIconName =
  | "marketing"
  | "web"
  | "app"
  | "design"
  | "seo"
  | "branding"
  | "code"
  | "ai";

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

const icons: Record<
  ServiceIconName,
  React.ComponentType<{ className?: string }>
> = {
  marketing: AiOutlineSearch,
  web: AiOutlineLaptop,
  app: AiOutlineMobile,
  design: AiOutlineBulb,
  seo: AiOutlineSearch,
  branding: AiOutlineTrademark,
  code: AiOutlineCode,
  ai: AiOutlineRobot,
};

export default function ServiceIcon({
  name,
  className = "",
}: ServiceIconProps) {
  const Icon = icons[name];
  return <Icon className={className} />;
}
