import type { LocalizedText, MediaPlaceholder } from "@/lib/types";

export interface Player {
  slug: string;
  nickname: string;
  realName?: string;
  /** Display country name (English). */
  country: string;
  team?: string;
  role: "AWPer" | "Rifler" | "IGL" | "Support" | "Entry";
  /** Approximate career HLTV rating. */
  rating?: number;
  majorsWon?: number;
  active: boolean;
  bio: LocalizedText;
  media: MediaPlaceholder;
}

const ph = (slug: string, label: string): MediaPlaceholder => ({
  kind: "placeholder",
  label: { en: label, zh: label },
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
    country: "Ukraine",
    team: "NAVI",
    role: "AWPer",
    rating: 1.24,
    majorsWon: 1,
    active: true,
    bio: {
      en: "Widely regarded as one of the greatest players of all time and a three-time HLTV #1, known for his AWP mastery and impossible highlight plays. He finally lifted the Major trophy with NAVI at PGL Stockholm 2021.",
      zh: "公认史上最伟大的选手之一，三度 HLTV 年度第一，以出神入化的 AWP 与无数高光操作著称。2021 年斯德哥尔摩 Major，他终于随 NAVI 捧起冠军奖杯。",
    },
    media: ph("s1mple", "s1mple"),
  },
  {
    slug: "zywoo",
    nickname: "ZywOo",
    realName: "Mathieu Herbaut",
    country: "France",
    team: "Team Vitality",
    role: "AWPer",
    rating: 1.28,
    majorsWon: 1,
    active: true,
    bio: {
      en: "The French AWP prodigy who topped HLTV's world rankings three times, crowning his career by winning the BLAST.tv Austin Major 2025 with Vitality.",
      zh: "法国 AWP 天才，三度登顶 HLTV 年度第一；2025 年随 Vitality 夺得奥斯汀 Major，为生涯加冕。",
    },
    media: ph("zywoo", "ZywOo"),
  },
  {
    slug: "donk",
    nickname: "donk",
    realName: "Danil Kryshkovets",
    country: "Russia",
    team: "Team Spirit",
    role: "Entry",
    rating: 1.32,
    majorsWon: 1,
    active: true,
    bio: {
      en: "The teenage phenomenon of the CS2 era: HLTV's #1 player of 2024, whose raw aggression and absurd aim carried Team Spirit to the Shanghai Major title.",
      zh: "CS2 时代的超新星：2024 年 HLTV 年度第一，凭借极限侵略性与恐怖枪法率 Team Spirit 拿下上海 Major 冠军。",
    },
    media: ph("donk", "donk"),
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
      en: "The metronome of the legendary Astralis dynasty and a four-time Major champion, famed for flawless positioning and relentless consistency.",
      zh: "传奇 Astralis 王朝的节拍器，四届 Major 冠军，以无懈可击的站位与恒久的稳定性闻名。",
    },
    media: ph("dev1ce", "device"),
  },
  {
    slug: "niko",
    nickname: "NiKo",
    realName: "Nikola Kovač",
    country: "Bosnia and Herzegovina",
    team: "Team Falcons",
    role: "Rifler",
    rating: 1.16,
    majorsWon: 0,
    active: true,
    bio: {
      en: "One of the most gifted riflers to ever touch the game — a perennial MVP contender across mousesports, FaZe, G2 and Falcons, still chasing his first Major.",
      zh: "史上最具天赋的步枪手之一，辗转 mousesports、FaZe、G2 与 Falcons 屡获 MVP，却仍在追逐生涯首座 Major。",
    },
    media: ph("niko", "NiKo"),
  },
  {
    slug: "m0nesy",
    nickname: "m0NESY",
    realName: "Ilya Osipov",
    country: "Russia",
    team: "Team Falcons",
    role: "AWPer",
    rating: 1.21,
    majorsWon: 0,
    active: true,
    bio: {
      en: "The teenage AWP sensation who broke out at G2 before joining Falcons in 2025 — one of the fastest, flashiest snipers of the CS2 era.",
      zh: "少年成名的 AWP 天才，在 G2 一战成名后于 2025 年转会 Falcons，是 CS2 时代最快、最华丽的狙击手之一。",
    },
    media: ph("m0nesy", "m0NESY"),
  },
  {
    slug: "sh1ro",
    nickname: "sh1ro",
    realName: "Dmitry Sokolov",
    country: "Russia",
    team: "Team Spirit",
    role: "AWPer",
    rating: 1.16,
    majorsWon: 0,
    active: true,
    bio: {
      en: "An ice-cold AWPer who anchored Gambit and Cloud9 with metronomic consistency before joining Team Spirit in 2025.",
      zh: "冷静如冰的 AWP 手，先后以极其恐怖的稳定性坐镇 Gambit 与 Cloud9，2025 年加盟 Team Spirit。",
    },
    media: ph("sh1ro", "sh1ro"),
  },
  {
    slug: "electronic",
    nickname: "electroNic",
    realName: "Denis Sharipov",
    country: "Russia",
    team: "Virtus.pro",
    role: "Rifler",
    rating: 1.15,
    majorsWon: 1,
    active: true,
    bio: {
      en: "NAVI's long-time star rifler and s1mple's right hand, a Major champion at Stockholm 2021, now carrying the colors of Virtus.pro.",
      zh: "NAVI 多年的明星步枪手、s1mple 的左膀右臂，2021 斯德哥尔摩 Major 冠军成员，现效力于 Virtus.pro。",
    },
    media: ph("electronic", "electroNic"),
  },
  {
    slug: "coldzera",
    nickname: "coldzera",
    realName: "Marcelo David",
    country: "Brazil",
    role: "Rifler",
    rating: 1.14,
    majorsWon: 2,
    active: true,
    bio: {
      en: "Back-to-back Major champion and HLTV #1 in 2016 and 2017. His jumping AWP quad-kill on Mirage remains the most iconic play in CS history.",
      zh: "背靠背 Major 冠军，2016、2017 连续两年 HLTV 年度第一；Mirage 上的跳狙四杀至今仍是 CS 历史上最具标志性的操作。",
    },
    media: ph("coldzera", "coldzera"),
  },
  {
    slug: "fallen",
    nickname: "FalleN",
    realName: "Gabriel Toledo",
    country: "Brazil",
    team: "FURIA",
    role: "IGL",
    rating: 1.05,
    majorsWon: 2,
    active: true,
    bio: {
      en: "'The Professor' — the godfather of Brazilian CS, an AWPing in-game leader who steered Luminosity/SK to two Major titles and mentored a whole generation.",
      zh: "“教授”FalleN 是巴西 CS 的教父，狙击与指挥一肩挑，率 Luminosity/SK 两夺 Major，培养了整整一代巴西选手。",
    },
    media: ph("fallen", "FalleN"),
  },
  {
    slug: "olofmeister",
    nickname: "olofmeister",
    realName: "Olof Kajbjer",
    country: "Sweden",
    role: "Rifler",
    rating: 1.1,
    majorsWon: 2,
    active: false,
    bio: {
      en: "The world's best player of 2015 and a back-to-back Major champion with fnatic — author of the legendary burning defuse on Overpass.",
      zh: "2015 年世界第一人，随 fnatic 背靠背两夺 Major，Overpass“火中拆包”名场面的缔造者。",
    },
    media: ph("olofmeister", "olofmeister"),
  },
  {
    slug: "get-right",
    nickname: "GeT_RiGhT",
    realName: "Christopher Alesund",
    country: "Sweden",
    role: "Rifler",
    rating: 1.1,
    majorsWon: 1,
    active: false,
    bio: {
      en: "The lurk pioneer of NiP's legendary 87-0 LAN squad, HLTV #1 in 2013 and 2014 and a Major champion at ESL One Cologne 2014.",
      zh: "NiP 传奇 87-0 王朝的 lurk 流派鼻祖，2013、2014 连续两年 HLTV 年度第一，2014 科隆 Major 冠军。",
    },
    media: ph("get-right", "GeT_RiGhT"),
  },
  {
    slug: "f0rest",
    nickname: "f0rest",
    realName: "Patrik Lindberg",
    country: "Sweden",
    role: "Rifler",
    rating: 1.08,
    majorsWon: 1,
    active: false,
    bio: {
      en: "A two-decade legend spanning CS 1.6 and CS:GO — the timeless rifler of fnatic and NiP, Major champion at Cologne 2014.",
      zh: "横跨 CS 1.6 与 CS:GO 的二十年常青树，fnatic 与 NiP 的永恒步枪手，2014 科隆 Major 冠军。",
    },
    media: ph("f0rest", "f0rest"),
  },
  {
    slug: "dupreeh",
    nickname: "dupreeh",
    realName: "Peter Rasmussen",
    country: "Denmark",
    role: "Entry",
    rating: 1.08,
    majorsWon: 4,
    active: false,
    bio: {
      en: "Astralis' fearless entry fragger and a four-time Major champion — one of the most decorated players in Counter-Strike history before retiring in 2025.",
      zh: "Astralis 无所畏惧的突破手，四届 Major 冠军，CS 历史上荣誉最多的选手之一，于 2025 年退役。",
    },
    media: ph("dupreeh", "dupreeh"),
  },
  {
    slug: "xyp9x",
    nickname: "Xyp9x",
    realName: "Andreas Højsleth",
    country: "Denmark",
    role: "Support",
    rating: 1.02,
    majorsWon: 4,
    active: false,
    bio: {
      en: "The 'Clutch Minister' — Astralis' support mastermind whose ice-cold late-round composure underpinned four Major victories.",
      zh: "“残局部长”Xyp9x，Astralis 的辅助大师，凭借冷静至极的残局处理支撑起四座 Major 冠军。",
    },
    media: ph("xyp9x", "Xyp9x"),
  },
];

export async function getPlayers(): Promise<Player[]> {
  return seed;
}

export async function getPlayerBySlug(slug: string): Promise<Player | null> {
  return seed.find((p) => p.slug === slug) ?? null;
}
