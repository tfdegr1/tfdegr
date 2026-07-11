import type { LocalizedText, MediaPlaceholder, YouTubeRef } from "@/lib/types";

export interface Tournament {
  slug: string;
  name: string;
  year: number;
  tier: "S" | "A" | "B";
  isMajor: boolean;
  location: LocalizedText;
  prizePool: number; // USD
  winner: string;
  runnerUp?: string;
  description: LocalizedText;
  media: MediaPlaceholder;
  highlightVideo?: YouTubeRef;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "magenta",
  icon: "Trophy",
});

const seed: Tournament[] = [
  {
    slug: "dreamhack-2013",
    name: "DreamHack Winter 2013",
    year: 2013,
    tier: "S",
    isMajor: true,
    location: { en: "Jönköping, Sweden", zh: "瑞典 延雪平" },
    prizePool: 250000,
    winner: "Fnatic",
    runnerUp: "NiP",
    description: {
      en: "The very first CS:GO Major, remembered for the legendary Olofmeister boost on Overpass.",
      zh: "史上首届 CS:GO Major,以 Overpass 上传奇的 Olofmeister 叠人而载入史册。",
    },
    media: ph("dreamhack-2013", { en: "DreamHack 2013", zh: "DreamHack 2013" }),
  },
  {
    slug: "pgl-copenhagen-2024",
    name: "PGL Copenhagen 2024",
    year: 2024,
    tier: "S",
    isMajor: true,
    location: { en: "Copenhagen, Denmark", zh: "丹麦 哥本哈根" },
    prizePool: 1250000,
    winner: "NAVI",
    runnerUp: "FaZe",
    description: {
      en: "The first Counter-Strike 2 Major, won by Natus Vincere.",
      zh: "首届反恐精英 2 Major,由 Natus Vincere 夺冠。",
    },
    media: ph("pgl-copenhagen-2024", { en: "PGL Copenhagen", zh: "PGL 哥本哈根" }),
  },
];

export async function getTournaments(): Promise<Tournament[]> {
  return [...seed].sort((a, b) => b.year - a.year);
}
export async function getTournamentBySlug(slug: string): Promise<Tournament | null> {
  return seed.find((t) => t.slug === slug) ?? null;
}
