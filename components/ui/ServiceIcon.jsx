import {
  Monitor,
  CodeXml,
  ShoppingBag,
  Blocks,
  Layers,
  Rocket,
  RefreshCw,
  Frame,
  PenTool,
  Palette,
  Shapes,
  Megaphone,
  Search,
  Wrench,
} from "lucide-react";

const icons = {
  monitor: Monitor,
  code: CodeXml,
  bag: ShoppingBag,
  blocks: Blocks,
  layers: Layers,
  rocket: Rocket,
  refresh: RefreshCw,
  frame: Frame,
  pen: PenTool,
  palette: Palette,
  shapes: Shapes,
  megaphone: Megaphone,
  search: Search,
  wrench: Wrench,
};

export default function ServiceIcon({ name, className = "size-5", strokeWidth = 1.6 }) {
  const Icon = icons[name] ?? Shapes;
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
