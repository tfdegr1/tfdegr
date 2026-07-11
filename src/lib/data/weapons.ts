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

export type WeaponCategory = Weapon["category"];

/** Bilingual labels for weapon categories (board-local UI copy). */
export const CATEGORY_LABEL: Record<WeaponCategory, LocalizedText> = {
  pistol: { en: "Pistol", zh: "手枪" },
  smg: { en: "SMG", zh: "冲锋枪" },
  rifle: { en: "Rifle", zh: "步枪" },
  sniper: { en: "Sniper", zh: "狙击枪" },
  heavy: { en: "Heavy", zh: "重型武器" },
  knife: { en: "Knife", zh: "刀具" },
  grenade: { en: "Grenade", zh: "投掷物" },
};

/** Bilingual labels for team availability. */
export const SIDE_LABEL: Record<Weapon["side"], LocalizedText> = {
  CT: { en: "CT only", zh: "仅 CT" },
  T: { en: "T only", zh: "仅 T" },
  both: { en: "CT + T", zh: "双方可用" },
};

/** Bilingual labels for penetration grade. */
export const PENETRATION_LABEL: Record<Weapon["penetration"], LocalizedText> = {
  low: { en: "Low", zh: "低" },
  medium: { en: "Medium", zh: "中" },
  high: { en: "High", zh: "高" },
};

/** Bilingual labels for the stat fields shown in the UI. */
export const STAT_LABEL = {
  damage: { en: "Damage", zh: "伤害" },
  fireRate: { en: "Fire rate", zh: "射速" },
  accuracy: { en: "Accuracy", zh: "精准度" },
  mobility: { en: "Mobility", zh: "机动性" },
  price: { en: "Price", zh: "价格" },
  killAward: { en: "Kill award", zh: "击杀奖励" },
  magazine: { en: "Magazine", zh: "弹匣容量" },
  penetration: { en: "Penetration", zh: "穿透力" },
  side: { en: "Side", zh: "阵营" },
  introduced: { en: "Introduced", zh: "首次登场" },
} satisfies Record<string, LocalizedText>;

/** Chart ceilings so StatBars are comparable across all weapons. */
export const STAT_MAX = {
  damage: 120, // AWP = 115
  fireRate: 900, // MP9 = 857
} as const;

const ph = (slug: string, name: string, icon: string): MediaPlaceholder => ({
  kind: "placeholder",
  label: { en: name, zh: name },
  seed: slug,
  aspect: "16/9",
  accent: "amber",
  icon,
});

const seed: Weapon[] = [
  // ── Pistols ────────────────────────────────────────────────────────────
  {
    slug: "glock-18",
    name: "Glock-18",
    category: "pistol",
    side: "T",
    price: 200,
    damage: 30,
    fireRate: 400,
    accuracy: 50,
    mobility: 95,
    magazine: 20,
    penetration: "low",
    killAward: 300,
    introduced: "CS 1.0",
    description: {
      en: "The Terrorists' spawn pistol. Weak per shot, but a 20-round magazine and lethal headshots up close make it a pistol-round staple.",
      zh: "T 阵营的出生手枪。单发伤害偏低,但 20 发弹匣与近距离致命的爆头能力,使它成为手枪局的主角。",
    },
    media: ph("glock-18", "Glock-18", "Zap"),
  },
  {
    slug: "usp-s",
    name: "USP-S",
    category: "pistol",
    side: "CT",
    price: 200,
    damage: 35,
    fireRate: 352,
    accuracy: 70,
    mobility: 95,
    magazine: 12,
    penetration: "low",
    killAward: 300,
    introduced: "CS:GO",
    description: {
      en: "The CTs' silenced starting sidearm. Quiet, precise and deadly on headshots — the surgeon's choice for pistol rounds.",
      zh: "CT 阵营的消音起始手枪。安静、精准、爆头致命,是手枪局里的外科手术刀。",
    },
    media: ph("usp-s", "USP-S", "Shield"),
  },
  {
    slug: "desert-eagle",
    name: "Desert Eagle",
    category: "pistol",
    side: "both",
    price: 700,
    damage: 53,
    fireRate: 267,
    accuracy: 62,
    mobility: 88,
    magazine: 7,
    penetration: "high",
    killAward: 300,
    introduced: "CS 1.0",
    description: {
      en: "The iconic hand cannon. One perfectly placed shot can drop a fully armored enemy — high risk, maximum style.",
      zh: "标志性的重型手炮。一发精准命中即可击倒满甲敌人 —— 高风险、高回报,也最具观赏性。",
    },
    media: ph("desert-eagle", "Desert Eagle", "Skull"),
  },
  // ── SMGs ──────────────────────────────────────────────────────────────
  {
    slug: "mp9",
    name: "MP9",
    category: "smg",
    side: "CT",
    price: 1250,
    damage: 26,
    fireRate: 857,
    accuracy: 55,
    mobility: 92,
    magazine: 30,
    penetration: "low",
    killAward: 600,
    introduced: "CS:GO",
    description: {
      en: "The CTs' rush-punishing SMG. A blistering fire rate, high mobility and a $600 kill award make it an anti-eco monster.",
      zh: "CT 阵营的速射冲锋枪。极高射速、出色机动与 $600 击杀奖励,是惩罚经济局的利器。",
    },
    media: ph("mp9", "MP9", "Zap"),
  },
  {
    slug: "mp7",
    name: "MP7",
    category: "smg",
    side: "both",
    price: 1500,
    damage: 29,
    fireRate: 750,
    accuracy: 58,
    mobility: 88,
    magazine: 30,
    penetration: "medium",
    killAward: 600,
    introduced: "CS:GO",
    description: {
      en: "A versatile SMG available to both sides, balancing damage, spray control and mobility for aggressive second rounds.",
      zh: "双方通用的多面手冲锋枪,伤害、弹道控制与机动性均衡,适合第二局的激进打法。",
    },
    media: ph("mp7", "MP7", "Zap"),
  },
  {
    slug: "p90",
    name: "P90",
    category: "smg",
    side: "both",
    price: 2350,
    damage: 26,
    fireRate: 857,
    accuracy: 52,
    mobility: 85,
    magazine: 50,
    penetration: "low",
    killAward: 300,
    introduced: "CS 1.0",
    description: {
      en: "The 50-round spray machine. Run-and-gun accuracy makes it infamous in casual play and genuinely deadly in anti-ecos.",
      zh: "50 发弹匣的扫射机器。移动射击依旧精准,在休闲局中“臭名昭著”,打经济局同样致命。",
    },
    media: ph("p90", "P90", "Swords"),
  },
  // ── Rifles ────────────────────────────────────────────────────────────
  {
    slug: "galil-ar",
    name: "Galil AR",
    category: "rifle",
    side: "T",
    price: 1800,
    damage: 30,
    fireRate: 666,
    accuracy: 62,
    mobility: 65,
    magazine: 35,
    penetration: "medium",
    killAward: 300,
    introduced: "CS 1.6",
    description: {
      en: "The Terrorists' budget rifle. A 35-round magazine and a low price make it the go-to weapon for force-buy rounds.",
      zh: "T 阵营的经济型步枪。35 发弹匣加上低廉的价格,是强起局的不二之选。",
    },
    media: ph("galil-ar", "Galil AR", "Swords"),
  },
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
    media: ph("ak-47", "AK-47", "Crosshair"),
  },
  {
    slug: "m4a4",
    name: "M4A4",
    category: "rifle",
    side: "CT",
    price: 3100,
    damage: 33,
    fireRate: 666,
    accuracy: 76,
    mobility: 68,
    magazine: 30,
    penetration: "high",
    killAward: 300,
    introduced: "CS:GO",
    description: {
      en: "The CTs' full-auto workhorse. A 30-round magazine and a forgiving spray pattern make it the default rifle for holding sites.",
      zh: "CT 阵营的全自动主力步枪。30 发弹匣与稳定的扫射弹道,是守点的默认之选。",
    },
    media: ph("m4a4", "M4A4", "Shield"),
  },
  {
    slug: "m4a1-s",
    name: "M4A1-S",
    category: "rifle",
    side: "CT",
    price: 2900,
    damage: 38,
    fireRate: 600,
    accuracy: 84,
    mobility: 68,
    magazine: 20,
    penetration: "high",
    killAward: 300,
    introduced: "CS:GO",
    description: {
      en: "The silenced counterpart to the M4A4 — quieter, more accurate at range and tracer-free, at the cost of a 20-round magazine.",
      zh: "M4A4 的消音版本 —— 更安静、远距离更精准且无曳光弹,代价是仅 20 发的弹匣。",
    },
    media: ph("m4a1-s", "M4A1-S", "Target"),
  },
  {
    slug: "aug",
    name: "AUG",
    category: "rifle",
    side: "CT",
    price: 3300,
    damage: 28,
    fireRate: 666,
    accuracy: 80,
    mobility: 62,
    magazine: 30,
    penetration: "high",
    killAward: 300,
    introduced: "CS 1.0",
    description: {
      en: "A CT bullpup rifle with a 1.5x scope. Laser-accurate when zoomed in, it briefly ruled the professional meta in 2019.",
      zh: "配备 1.5 倍镜的 CT 无托步枪。开镜后指哪打哪,曾在 2019 年短暂统治职业赛场。",
    },
    media: ph("aug", "AUG", "Target"),
  },
  // ── Snipers ───────────────────────────────────────────────────────────
  {
    slug: "ssg-08",
    name: "SSG 08",
    category: "sniper",
    side: "both",
    price: 1700,
    damage: 88,
    fireRate: 48,
    accuracy: 92,
    mobility: 85,
    magazine: 10,
    penetration: "high",
    killAward: 300,
    introduced: "CS:GO",
    description: {
      en: "The lightweight 'Scout'. Fully accurate at the peak of a jump and the most mobile sniper in the game — an eco-round legend.",
      zh: "轻量级狙击枪“鸟狙”。跳跃至最高点时依然完全精准,机动性冠绝所有狙击枪,是经济局的传奇。",
    },
    media: ph("ssg-08", "SSG 08", "Crosshair"),
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
    media: ph("awp", "AWP", "Skull"),
  },
  // ── Heavy ─────────────────────────────────────────────────────────────
  {
    slug: "nova",
    name: "Nova",
    category: "heavy",
    side: "both",
    price: 1050,
    damage: 26,
    fireRate: 68,
    accuracy: 35,
    mobility: 72,
    magazine: 8,
    penetration: "low",
    killAward: 900,
    introduced: "CS:GO",
    description: {
      en: "A pump-action shotgun with a $900 kill award. Devastating up close and a money-printer against eco rounds.",
      zh: "泵动式霰弹枪,击杀奖励高达 $900。近距离毁灭性十足,打经济局堪称印钞机。",
    },
    media: ph("nova", "Nova", "Bomb"),
  },
];

export async function getWeapons(): Promise<Weapon[]> {
  return seed;
}
export async function getWeaponBySlug(slug: string): Promise<Weapon | null> {
  return seed.find((w) => w.slug === slug) ?? null;
}
