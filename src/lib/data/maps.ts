import type { LocalizedText, MediaPlaceholder, YouTubeRef } from "@/lib/types";

export interface CSMap {
  slug: string;
  name: string;
  type: "defusal" | "hostage" | "wingman" | "arms-race" | "danger-zone";
  bombsites?: ("A" | "B")[];
  releaseYear: number;
  activeDuty: boolean;
  callouts?: { name: string; area: LocalizedText }[];
  description: LocalizedText;
  media: MediaPlaceholder;
  overviewVideo?: YouTubeRef;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "cyan",
  icon: "Map",
});

const seed: CSMap[] = [
  {
    slug: "de_dust2",
    name: "Dust II",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2001,
    activeDuty: true,
    description: {
      en: "The most iconic map in Counter-Strike history — a sun-baked, three-lane classic.",
      zh: "反恐精英史上最具标志性的地图 —— 烈日下的三线经典。",
    },
    media: ph("de_dust2", { en: "Dust II", zh: "炙热沙城 II" }),
  },
  {
    slug: "de_mirage",
    name: "Mirage",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2013,
    activeDuty: true,
    description: {
      en: "A balanced competitive staple built around mid control and fast rotations.",
      zh: "竞技图池的常青树,核心在于中路控制与快速转点。",
    },
    media: ph("de_mirage", { en: "Mirage", zh: "幻影" }),
  },
];

export async function getMaps(): Promise<CSMap[]> {
  return seed;
}
export async function getMapBySlug(slug: string): Promise<CSMap | null> {
  return seed.find((m) => m.slug === slug) ?? null;
}
