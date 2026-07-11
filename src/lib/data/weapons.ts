import type { LocalizedText, MediaPlaceholder } from "@/lib/types";

export interface Weapon {
  slug: string;
  name: string;
  category: "pistol" | "smg" | "rifle" | "sniper" | "heavy" | "knife" | "grenade";
  side: "CT" | "T" | "both";
  price: number;
  damage: number;
  fireRate: number; // rpm
  accuracy: number; // 0-100
  mobility: number; // 0-100
  magazine: number;
  penetration: "low" | "medium" | "high";
  killAward: number;
  description: LocalizedText;
  media: MediaPlaceholder;
  introduced?: string;
}

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "amber",
  icon: "Crosshair",
});

// Placeholder seed — expanded by the weapons board agent.
const seed: Weapon[] = [
  {
    slug: "ak-47",
    name: "AK-47",
    category: "rifle",
    side: "T",
    price: 2700,
    damage: 36,
    fireRate: 600,
    accuracy: 72,
    mobility: 65,
    magazine: 30,
    penetration: "high",
    killAward: 300,
    introduced: "CS 1.0",
    description: {
      en: "The signature Terrorist rifle. A one-shot headshot at almost any range makes it the most feared weapon in the game.",
      zh: "T 阵营的标志性步枪。几乎任何距离一枪爆头,是游戏中最令人畏惧的武器。",
    },
    media: ph("ak-47", { en: "AK-47", zh: "AK-47" }),
  },
  {
    slug: "awp",
    name: "AWP",
    category: "sniper",
    side: "both",
    price: 4750,
    damage: 115,
    fireRate: 41,
    accuracy: 99,
    mobility: 30,
    magazine: 10,
    penetration: "high",
    killAward: 100,
    introduced: "CS 1.0",
    description: {
      en: "The one-shot-kill sniper rifle that defines round economies and clutch highlights alike.",
      zh: "一枪致命的狙击步枪,既左右经济体系,也成就无数残局高光。",
    },
    media: ph("awp", { en: "AWP", zh: "AWP" }),
  },
];

export async function getWeapons(): Promise<Weapon[]> {
  return seed;
}
export async function getWeaponBySlug(slug: string): Promise<Weapon | null> {
  return seed.find((w) => w.slug === slug) ?? null;
}
