import {
  History,
  Map as MapIcon,
  Crosshair,
  Trophy,
  Users,
  Footprints,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import type { AccentColor } from "@/lib/types";

export interface BoardDef {
  /** matches the route segment and the i18n key under `nav.*` / `boards.*` */
  key: string;
  href: string;
  accent: AccentColor;
  Icon: LucideIcon;
}

/** The 7 encyclopedia boards. Nav + homepage are driven by this list. */
export const BOARDS: BoardDef[] = [
  { key: "history", href: "/history", accent: "violet", Icon: History },
  { key: "maps", href: "/maps", accent: "cyan", Icon: MapIcon },
  { key: "weapons", href: "/weapons", accent: "amber", Icon: Crosshair },
  { key: "tournaments", href: "/tournaments", accent: "magenta", Icon: Trophy },
  { key: "players", href: "/players", accent: "lime", Icon: Users },
  { key: "kz", href: "/kz", accent: "cyan", Icon: Footprints },
  { key: "modes", href: "/modes", accent: "magenta", Icon: Gamepad2 },
];

export const SITE = {
  name: "CS://CODEX",
  repo: "https://github.com/",
  year: 2026,
};
