import type { LocalizedText, MediaPlaceholder } from "@/lib/types";

export interface GameMode {
  slug: string;
  name: LocalizedText;
  category: "official" | "community";
  players: string; // e.g. "5v5"
  description: LocalizedText;
  howToPlay: LocalizedText;
  media: MediaPlaceholder;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "magenta",
  icon: "Gamepad2",
});

const seed: GameMode[] = [
  {
    slug: "competitive",
    name: { en: "Competitive", zh: "竞技模式" },
    category: "official",
    players: "5v5",
    description: {
      en: "The flagship ranked mode: best-of-24 rounds, full economy and skill-based matchmaking.",
      zh: "旗舰排位模式:24 回合制、完整经济系统与基于技术的匹配。",
    },
    howToPlay: {
      en: "Two teams of five alternate as Terrorists and Counter-Terrorists, planting or defusing the bomb to win rounds.",
      zh: "两支五人队伍轮流担任 T 与 CT,通过安放或拆除炸弹来赢得回合。",
    },
    media: ph("competitive", { en: "Competitive", zh: "竞技模式" }),
  },
  {
    slug: "wingman",
    name: { en: "Wingman", zh: "搭档模式" },
    category: "official",
    players: "2v2",
    description: {
      en: "A compact 2v2 mode on single-bombsite maps — fast, tactical and duo-focused.",
      zh: "单炸弹点的紧凑 2v2 模式 —— 快节奏、重战术、专注双人配合。",
    },
    howToPlay: {
      en: "Best-of-16 rounds on smaller maps with one bombsite; ideal for practising aim and clutches.",
      zh: "小地图、单炸弹点、16 回合制;非常适合练枪与残局。",
    },
    media: ph("wingman", { en: "Wingman", zh: "搭档模式" }),
  },
];

export async function getModes(): Promise<GameMode[]> {
  return seed;
}
export async function getModeBySlug(slug: string): Promise<GameMode | null> {
  return seed.find((m) => m.slug === slug) ?? null;
}
