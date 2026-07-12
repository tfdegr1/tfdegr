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

export type KZStyle = KZMap["style"];
export type KZTier = KZMap["tier"];

/** Full names of the three global movement styles. */
export const KZ_STYLE_LABELS: Record<KZStyle, string> = {
  KZT: "KZTimer",
  SKZ: "SimpleKZ",
  VNL: "Vanilla",
};

/** Community-standard difficulty names for tiers 1–7. */
export const KZ_TIER_LABELS: Record<KZTier, LocalizedText> = {
  1: { en: "Very Easy", zh: "非常简单" },
  2: { en: "Easy", zh: "简单" },
  3: { en: "Medium", zh: "中等" },
  4: { en: "Hard", zh: "困难" },
  5: { en: "Very Hard", zh: "非常困难" },
  6: { en: "Extreme", zh: "极限" },
  7: { en: "Death", zh: "死亡" },
};

const ph = (slug: string, label: LocalizedText): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "cyan",
  icon: "Footprints",
});

const wr = (name: string): YouTubeRef => ({
  kind: "youtube",
  videoId: "",
  title: {
    en: `${name} — world record run`,
    zh: `${name} — 世界纪录速通`,
  },
});

const seed: KZMap[] = [
  {
    slug: "bkz_apricity_v3",
    name: "bkz_apricity_v3",
    tier: 1,
    style: "KZT",
    description: {
      en: "A warm, sunlit block course and the go-to first map for new jumpers. Generous ledges, forgiving gaps and a smooth difficulty curve teach pre-strafe, airtime control and checkpoint discipline without punishing mistakes.",
      zh: "色调温暖的方块跳跃图,新人入门首选。落点宽裕、间距友好、难度曲线平滑,在不惩罚失误的前提下教会你预转向、滞空控制与存点习惯。",
    },
    media: ph("bkz_apricity_v3", { en: "apricity_v3", zh: "apricity_v3" }),
    recordVideo: wr("bkz_apricity_v3"),
  },
  {
    slug: "bkz_goldbhop",
    name: "bkz_goldbhop",
    tier: 2,
    style: "VNL",
    description: {
      en: "A gilded bunnyhop classic: long chains of golden blocks reward clean, rhythmic hops over raw strafe power. A favourite proving ground for Vanilla runners, where perfect jump timing is everything.",
      zh: "金光闪闪的连跳经典:成串金砖更看重干净、有节奏的起跳衔接,而非纯粹的变向能力。Vanilla 玩家的最爱试炼场,完美的起跳时机就是一切。",
    },
    media: ph("bkz_goldbhop", { en: "goldbhop", zh: "goldbhop" }),
    recordVideo: wr("bkz_goldbhop"),
  },
  {
    slug: "kz_summer",
    name: "kz_summer",
    tier: 2,
    style: "SKZ",
    description: {
      en: "A breezy seaside climb through beach huts, cliff paths and palm platforms. Relaxed pacing with a handful of spicy ledge jumps near the summit — the perfect warm-up map before a grind session.",
      zh: "清爽的海滨攀爬之旅,穿过海滩小屋、悬崖栈道与棕榈平台。整体节奏轻松,顶峰前的几个台沿跳略带辣度,是肝图前完美的热身选择。",
    },
    media: ph("kz_summer", { en: "summer", zh: "summer" }),
    recordVideo: wr("kz_summer"),
  },
  {
    slug: "kz_bhop_badges",
    name: "kz_bhop_badges",
    tier: 3,
    style: "KZT",
    description: {
      en: "The definitive bunnyhop school. Its badge-shaped platforms drill rhythm, air-strafe control and speed management — thousands of runners learned to chain hops here before touching anything harder.",
      zh: "公认的连跳教科书。徽章形状的平台专门训练节奏感、空中变向与速度管理——无数跑者在挑战更难的图之前,都是在这里学会衔接连跳的。",
    },
    media: ph("kz_bhop_badges", { en: "bhop_badges", zh: "bhop_badges" }),
    recordVideo: wr("kz_bhop_badges"),
  },
  {
    slug: "kz_ytm_forestrun",
    name: "kz_ytm_forestrun",
    tier: 3,
    style: "VNL",
    description: {
      en: "A sprint through misty woodland: log hops, rock gaps and root climbs. Mid-tier pacing with tight tree-to-tree strafes that punish overshooting — carry too much speed and the forest floor is waiting.",
      zh: "穿越雾气森林的冲刺:圆木跳、岩石间隙与树根攀爬。中等难度的节奏,树与树之间的紧凑变向对冲过头毫不留情——带速太多,等着你的就是林地。",
    },
    media: ph("kz_ytm_forestrun", { en: "forestrun", zh: "forestrun" }),
    recordVideo: wr("kz_ytm_forestrun"),
  },
  {
    slug: "kz_cluster",
    name: "kz_cluster",
    tier: 4,
    style: "KZT",
    description: {
      en: "An industrial cluster of floating platforms, catwalks and crane arms. Route-finding matters as much as execution: several shortcuts shave whole seconds but demand pixel-perfect landings over the void.",
      zh: "由悬浮平台、栈桥与吊臂组成的工业群落。找路与操作同样重要:多条捷径能省下整秒的时间,但要求在深渊之上完成像素级的落点。",
    },
    media: ph("kz_cluster", { en: "cluster", zh: "cluster" }),
    recordVideo: wr("kz_cluster"),
  },
  {
    slug: "kz_synergy_x",
    name: "kz_synergy_x",
    tier: 4,
    style: "SKZ",
    description: {
      en: "The extended cut of kz_synergy: neon-lit tech corridors chain bhop sections into vertical ladder towers. Flow-heavy design where one missed hop can unravel an entire segment of momentum.",
      zh: "kz_synergy 的加长版:霓虹科技走廊将连跳路段与垂直梯塔串联起来。极重流畅度的设计——错失一跳,就可能让整段积累的动量土崩瓦解。",
    },
    media: ph("kz_synergy_x", { en: "synergy_x", zh: "synergy_x" }),
    recordVideo: wr("kz_synergy_x"),
  },
  {
    slug: "xc_pot66_fix",
    name: "xc_pot66_fix",
    tier: 5,
    style: "VNL",
    description: {
      en: "A fixed edition of the xtreme-climb classic pot66. Brutal ledge chains, tight count-jumps and no-failsafe ladder transfers — running it on Vanilla physics only sharpens the knife.",
      zh: "极限攀爬(xc)经典 pot66 的修复版。残酷的台沿连段、苛刻的箱跳与毫无保护的梯子转移——在 Vanilla 物理下挑战,更是难上加难。",
    },
    media: ph("xc_pot66_fix", { en: "pot66_fix", zh: "pot66_fix" }),
    recordVideo: wr("xc_pot66_fix"),
  },
  {
    slug: "kz_man_akkariN",
    name: "kz_man_akkariN",
    tier: 6,
    style: "SKZ",
    description: {
      en: "akkariN's edit of the infamous kz_man: a punishing high-altitude climb mixing limit long jumps, ladder trickery and zero-margin strafes. Finishing it clean is a rite of passage for aspiring pros.",
      zh: "akkariN 改版的传奇难图 kz_man:惩罚性的高空攀爬,混合极限长跳、梯子技巧与零容错变向。干净地完成它,是每个立志高手的成人礼。",
    },
    media: ph("kz_man_akkariN", { en: "man_akkariN", zh: "man_akkariN" }),
    recordVideo: wr("kz_man_akkariN"),
  },
  {
    slug: "kz_lionharder",
    name: "kz_lionharder",
    tier: 7,
    style: "KZT",
    description: {
      en: "The 'harder' edit of kz_lionhard and a true Tier 7 endgame: frame-perfect jumps stacked back to back for the entire runtime. Merely finishing is an achievement — holding a record here is legend.",
      zh: "kz_lionhard 的强化版,真正的 Tier 7 终局考验:全程帧级精度的跳跃首尾相连。能完赛已是成就——在这里保持纪录,即为传奇。",
    },
    media: ph("kz_lionharder", { en: "lionharder", zh: "lionharder" }),
    recordVideo: wr("kz_lionharder"),
  },
];

const withArt = (m: KZMap): KZMap => ({
  ...m,
  media: { ...m.media, art: "kz" },
});

export async function getKZMaps(): Promise<KZMap[]> {
  return seed.map(withArt);
}

export async function getKZMapBySlug(slug: string): Promise<KZMap | null> {
  const m = seed.find((m) => m.slug === slug);
  return m ? withArt(m) : null;
}

/** Overview of the KZ discipline, rendered at the top of the board page. */
export async function getKZIntro(): Promise<LocalizedText> {
  return {
    en: "KZ (KreedZ, also called Climb) is Counter-Strike's movement discipline. Born on CS 1.6 climb servers and alive today across CS:GO and CS2 communities, it swaps gunfights for a race against the timer: players bunnyhop to preserve speed, air-strafe to steer and accelerate mid-flight, grind longjumps (LJ) measured to the unit, and scale ladders and ledges with surgical precision. Maps are rated from Tier 1 (very easy) to Tier 7 (death), and times are ranked per movement style — KZTimer (KZT), SimpleKZ (SKZ) and Vanilla (VNL) — with world records contested frame by frame.",
    zh: "KZ(KreedZ,又称攀爬/Climb)是反恐精英的移动竞速玩法。它诞生于 CS 1.6 的攀爬服务器,如今仍活跃在 CS:GO 与 CS2 社区。这里没有枪战,只有与计时器的赛跑:玩家用连跳(bhop)保持速度,用空中变向(strafe)在飞行中转弯加速,苦练精确到单位的长跳(LJ),再以外科手术般的精度攀越梯子与台沿。地图难度从 Tier 1(非常简单)到 Tier 7(死亡)分级,成绩按 KZTimer(KZT)、SimpleKZ(SKZ)与 Vanilla(VNL)三种移动风格分别排名,世界纪录以帧为单位被反复刷新。",
  };
}
