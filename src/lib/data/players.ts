import type { LocalizedText, MediaPlaceholder } from "@/lib/types";

export interface Player {
  slug: string;
  nickname: string;
  realName?: string;
  country: string;
  team?: string;
  role: "AWPer" | "Rifler" | "IGL" | "Support" | "Entry";
  rating?: number;
  majorsWon?: number;
  active: boolean;
  bio: LocalizedText;
  media: MediaPlaceholder;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "3/4",
  accent: "lime",
  icon: "User",
});

const seed: Player[] = [
  {
    slug: "s1mple",
    nickname: "s1mple",
    realName: "Oleksandr Kostyliev",
    country: { en: "Ukraine", zh: "乌克兰" }.en,
    team: "NAVI",
    role: "AWPer",
    rating: 1.24,
    majorsWon: 1,
    active: true,
    bio: {
      en: "Widely regarded as one of the greatest players of all time, known for his AWP mastery and highlight plays.",
      zh: "公认史上最伟大的选手之一,以出神入化的 AWP 与无数高光操作著称。",
    },
    media: ph("s1mple", { en: "s1mple", zh: "s1mple" }),
  },
  {
    slug: "dev1ce",
    nickname: "device",
    realName: "Nicolai Reedtz",
    country: "Denmark",
    team: "Astralis",
    role: "AWPer",
    rating: 1.16,
    majorsWon: 4,
    active: true,
    bio: {
      en: "The metronome of the legendary Astralis dynasty, a four-time Major champion.",
      zh: "传奇 Astralis 王朝的节拍器,四届 Major 冠军。",
    },
    media: ph("dev1ce", { en: "device", zh: "device" }),
  },
];

export async function getPlayers(): Promise<Player[]> {
  return seed;
}
export async function getPlayerBySlug(slug: string): Promise<Player | null> {
  return seed.find((p) => p.slug === slug) ?? null;
}
