import type { LocalizedText, MediaPlaceholder, YouTubeRef } from "@/lib/types";

export interface KZMap {
  slug: string;
  name: string;
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  style: "KZT" | "SKZ" | "VNL";
  description: LocalizedText;
  media: MediaPlaceholder;
  recordVideo?: YouTubeRef;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "cyan",
  icon: "Footprints",
});

const seed: KZMap[] = [
  {
    slug: "kz_bhop_badges",
    name: "kz_bhop_badges",
    tier: 3,
    style: "KZT",
    description: {
      en: "A classic bunny-hop map that teaches rhythm, air-strafe control and speed management.",
      zh: "经典连跳图,训练节奏感、空中转向控制与速度管理。",
    },
    media: ph("kz_bhop_badges", { en: "bhop_badges", zh: "bhop_badges" }),
  },
  {
    slug: "kz_man_akkariN",
    name: "kz_man_akkariN",
    tier: 5,
    style: "SKZ",
    description: {
      en: "A demanding climb map mixing long jumps, ladders and precise strafes.",
      zh: "高难度攀爬图,混合长距离跳跃、梯子与精准转向。",
    },
    media: ph("kz_man_akkariN", { en: "akkariN", zh: "akkariN" }),
  },
];

export async function getKZMaps(): Promise<KZMap[]> {
  return seed;
}
export async function getKZMapBySlug(slug: string): Promise<KZMap | null> {
  return seed.find((m) => m.slug === slug) ?? null;
}
export async function getKZIntro(): Promise<LocalizedText> {
  return {
    en: "KZ (Climb / KreedZ) is a community movement discipline where players use bunny-hopping, strafing and jump techniques to clear obstacle courses as fast as possible.",
    zh: "KZ(攀爬 / KreedZ)是一种社区移动玩法,玩家运用连跳、急停转向与跳跃技巧,以最快速度通过障碍关卡。",
  };
}
