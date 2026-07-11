import {
  Crosshair,
  Target,
  Map,
  MapPinned,
  Trophy,
  Medal,
  Users,
  User,
  Footprints,
  Gamepad2,
  History,
  Zap,
  Shield,
  Bomb,
  Flame,
  Star,
  Skull,
  Swords,
  Clock,
  Globe,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

// String -> lucide icon lookup so data (which stores icon names as strings)
// can reference icons without importing components.
const ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Target,
  Map,
  MapPinned,
  Trophy,
  Medal,
  Users,
  User,
  Footprints,
  Gamepad2,
  History,
  Zap,
  Shield,
  Bomb,
  Flame,
  Star,
  Skull,
  Swords,
  Clock,
  Globe,
  Image: ImageIcon,
};

export function getIcon(name?: string): LucideIcon {
  return (name && ICONS[name]) || ImageIcon;
}
