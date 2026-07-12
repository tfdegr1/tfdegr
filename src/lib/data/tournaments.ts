import type { LocalizedText, MediaPlaceholder, YouTubeRef } from "@/lib/types";
import { DATA_SOURCE, supaAll, supaOne } from "../supabase";

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

/** Format a USD prize pool like "$1,250,000". */
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export function formatPrize(amount: number): string {
  return usd.format(amount);
}

const ph = (
  slug: string,
  label: LocalizedText,
  icon: "Trophy" | "Medal" | "Star" | "Globe" = "Trophy",
): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "magenta",
  icon,
  image: `/tournaments/${slug}.png`,
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
    runnerUp: "Ninjas in Pyjamas",
    description: {
      en: "The first CS:GO Major ever. In an all-Swedish grand final in Jönköping, underdogs Fnatic upset home favourites Ninjas in Pyjamas 2-1 to lift the inaugural trophy.",
      zh: "史上首届 CS:GO Major。在延雪平的瑞典内战决赛中,不被看好的 Fnatic 以 2-1 爆冷击败主场热门 NiP,捧起首座 Major 奖杯。",
    },
    media: ph("dreamhack-2013", { en: "DreamHack 2013", zh: "DreamHack 2013" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "_cAjCxeYbaI",
      title: {
        en: "DreamHack Winter 2013 — Grand Final Highlights",
        zh: "DreamHack Winter 2013 — 总决赛集锦",
      },
    },
  },
  {
    slug: "esl-one-cologne-2014",
    name: "ESL One Cologne 2014",
    year: 2014,
    tier: "S",
    isMajor: true,
    location: { en: "Cologne, Germany", zh: "德国 科隆" },
    prizePool: 250000,
    winner: "Ninjas in Pyjamas",
    runnerUp: "Fnatic",
    description: {
      en: "After heartbreak in two straight Major finals, Ninjas in Pyjamas finally lifted the trophy in the LANXESS Arena, beating Fnatic 2-1 in a Swedish rematch.",
      zh: "在连续两届 Major 决赛饮恨之后,NiP 终于在科隆 LANXESS 竞技场捧杯,瑞典内战中以 2-1 复仇 Fnatic。",
    },
    media: ph("esl-one-cologne-2014", { en: "Cologne 2014", zh: "科隆 2014" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "-5laY7bjono",
      title: {
        en: "ESL One Cologne 2014 — Grand Final (ESL Classics)",
        zh: "ESL One 科隆 2014 — 总决赛（ESL 经典重播）",
      },
    },
  },
  {
    slug: "esl-one-cologne-2015",
    name: "ESL One Cologne 2015",
    year: 2015,
    tier: "S",
    isMajor: true,
    location: { en: "Cologne, Germany", zh: "德国 科隆" },
    prizePool: 250000,
    winner: "Fnatic",
    runnerUp: "Team EnVyUs",
    description: {
      en: "Fnatic confirmed themselves as the team of the era, sweeping Team EnVyUs 2-0 behind a peak olofmeister to claim their second Major title.",
      zh: "Fnatic 以 2-0 横扫 Team EnVyUs,巅峰期的 olofmeister 领衔拿下队史第二座 Major,坐实了那个时代第一战队的名号。",
    },
    media: ph("esl-one-cologne-2015", { en: "Cologne 2015", zh: "科隆 2015" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "02I5vVxlJhU",
      title: {
        en: "ESL One Cologne 2015 — Grand Final, Map 1 (Dust II)",
        zh: "ESL One 科隆 2015 — 总决赛 第一图（炙热沙城 II）",
      },
    },
  },
  {
    slug: "dreamhack-malmo-2016",
    name: "DreamHack Masters Malmö 2016",
    year: 2016,
    tier: "A",
    isMajor: false,
    location: { en: "Malmö, Sweden", zh: "瑞典 马尔默" },
    prizePool: 250000,
    winner: "Ninjas in Pyjamas",
    runnerUp: "Natus Vincere",
    description: {
      en: "A star-studded arena event in NiP's backyard. The Ninjas beat Natus Vincere 2-1 in the final — one of the last big trophies for the classic Swedish lineup.",
      zh: "NiP 家门口群星云集的场馆赛。NiP 决赛 2-1 击败 Natus Vincere,为经典瑞典阵容拿下最后几座重量级奖杯之一。",
    },
    media: ph(
      "dreamhack-malmo-2016",
      { en: "Malmö 2016", zh: "马尔默 2016" },
      "Medal",
    ),
    highlightVideo: {
      kind: "youtube",
      videoId: "9KRVuTgyy44",
      title: {
        en: "DreamHack Masters Malmö 2016 — Grand Final, Map 1 (Dust II)",
        zh: "DreamHack 马尔默 2016 — 总决赛 第一图（炙热沙城 II）",
      },
    },
  },
  {
    slug: "mlg-columbus-2016",
    name: "MLG Columbus 2016",
    year: 2016,
    tier: "S",
    isMajor: true,
    location: { en: "Columbus, USA", zh: "美国 哥伦布" },
    prizePool: 1000000,
    winner: "Luminosity",
    runnerUp: "Natus Vincere",
    description: {
      en: "The first Major on North American soil and the first with a $1,000,000 prize pool. Luminosity beat Natus Vincere 2-0, while coldzera's jumping AWP quad-kill on Mirage became the most famous play in CS history.",
      zh: "首个在北美举办、也是首个奖金达到 100 万美元的 Major。Luminosity 决赛 2-0 击败 Natus Vincere;coldzera 在 Mirage 的跳狙四杀成为 CS 历史上最著名的操作。",
    },
    media: ph("mlg-columbus-2016", { en: "MLG Columbus", zh: "MLG 哥伦布" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "7nWxZin959o",
      title: {
        en: "MLG Columbus 2016 — Grand Final",
        zh: "MLG 哥伦布 2016 — 总决赛",
      },
    },
  },
  {
    slug: "esl-one-cologne-2016",
    name: "ESL One Cologne 2016",
    year: 2016,
    tier: "S",
    isMajor: true,
    location: { en: "Cologne, Germany", zh: "德国 科隆" },
    prizePool: 1000000,
    winner: "SK Gaming",
    runnerUp: "Team Liquid",
    description: {
      en: "The Brazilian core went back-to-back: now under the SK Gaming banner, they beat Team Liquid 2-0 in Cologne to defend their Major crown.",
      zh: "巴西班底完成卫冕:转投 SK Gaming 旗下后,他们在科隆决赛 2-0 击败 Team Liquid,成功卫冕 Major 冠军。",
    },
    media: ph("esl-one-cologne-2016", { en: "Cologne 2016", zh: "科隆 2016" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "AK5RY8W-AcM",
      title: {
        en: "ESL One Cologne 2016 — Grand Final, Map 1 (Train)",
        zh: "ESL One 科隆 2016 — 总决赛 第一图（列车停放站）",
      },
    },
  },
  {
    slug: "eleague-atlanta-2017",
    name: "ELEAGUE Major: Atlanta 2017",
    year: 2017,
    tier: "S",
    isMajor: true,
    location: { en: "Atlanta, USA", zh: "美国 亚特兰大" },
    prizePool: 1000000,
    winner: "Astralis",
    runnerUp: "Virtus.pro",
    description: {
      en: "Astralis came back from a map down to edge Virtus.pro 2-1 in a razor-thin grand final — the first of four Major titles for the Danish dynasty.",
      zh: "Astralis 决赛让一追二、以 2-1 险胜 Virtus.pro —— 丹麦王朝四座 Major 中的第一座。",
    },
    media: ph("eleague-atlanta-2017", {
      en: "ELEAGUE Atlanta",
      zh: "ELEAGUE 亚特兰大",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "jlefQHEPiuk",
      title: {
        en: "ELEAGUE Major: Atlanta 2017 — Grand Final Highlights",
        zh: "ELEAGUE 亚特兰大 2017 — 总决赛集锦",
      },
    },
  },
  {
    slug: "eleague-boston-2018",
    name: "ELEAGUE Major: Boston 2018",
    year: 2018,
    tier: "S",
    isMajor: true,
    location: { en: "Boston, USA", zh: "美国 波士顿" },
    prizePool: 1000000,
    winner: "Cloud9",
    runnerUp: "FaZe Clan",
    description: {
      en: "Cloud9 stunned FaZe Clan 2-1 with a double-overtime win on Inferno to become the first North American team to win a Major, in front of a deafening Boston crowd.",
      zh: "Cloud9 在 Inferno 的双加时中 2-1 掀翻 FaZe Clan,成为首支夺得 Major 的北美战队,波士顿主场的呐喊震耳欲聋。",
    },
    media: ph("eleague-boston-2018", {
      en: "ELEAGUE Boston",
      zh: "ELEAGUE 波士顿",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "_PAdiVL0abs",
      title: {
        en: "ELEAGUE Major: Boston 2018 — Cloud9's Historic Major Win",
        zh: "ELEAGUE 波士顿 2018 — Cloud9 历史性夺冠",
      },
    },
  },
  {
    slug: "faceit-london-2018",
    name: "FACEIT Major: London 2018",
    year: 2018,
    tier: "S",
    isMajor: true,
    location: { en: "London, United Kingdom", zh: "英国 伦敦" },
    prizePool: 1000000,
    winner: "Astralis",
    runnerUp: "Natus Vincere",
    description: {
      en: "Astralis defeated Natus Vincere 2-0 at Wembley to claim their second Major — the start of a run of three consecutive Major titles.",
      zh: "Astralis 在温布利决赛 2-0 击败 Natus Vincere,夺得队史第二座 Major,自此开启 Major 三连冠。",
    },
    media: ph("faceit-london-2018", {
      en: "FACEIT London",
      zh: "FACEIT 伦敦",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "z7IDPdmYw0A",
      title: {
        en: "FACEIT Major: London 2018 — Grand Final, Map 1 (Nuke)",
        zh: "FACEIT 伦敦 2018 — 总决赛 第一图（核子危机）",
      },
    },
  },
  {
    slug: "iem-katowice-2019",
    name: "IEM Katowice 2019",
    year: 2019,
    tier: "S",
    isMajor: true,
    location: { en: "Katowice, Poland", zh: "波兰 卡托维兹" },
    prizePool: 1000000,
    winner: "Astralis",
    runnerUp: "ENCE",
    description: {
      en: "Astralis dismantled surprise finalists ENCE 2-0 in the Spodek arena, kicking off the most dominant calendar year any Counter-Strike team has ever had.",
      zh: "Astralis 在 Spodek 体育馆决赛 2-0 击溃黑马 ENCE,开启了 CS 历史上最具统治力的一个年度。",
    },
    media: ph("iem-katowice-2019", {
      en: "IEM Katowice 2019",
      zh: "IEM 卡托维兹 2019",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "kgitmggEgrA",
      title: {
        en: "IEM Katowice 2019 — Grand Final, Map 1 (Train)",
        zh: "IEM 卡托维兹 2019 — 总决赛 第一图（列车停放站）",
      },
    },
  },
  {
    slug: "starladder-berlin-2019",
    name: "StarLadder Berlin 2019",
    year: 2019,
    tier: "S",
    isMajor: true,
    location: { en: "Berlin, Germany", zh: "德国 柏林" },
    prizePool: 1000000,
    winner: "Astralis",
    runnerUp: "AVANGAR",
    description: {
      en: "A 2-0 win over AVANGAR gave Astralis a record fourth Major title — their third in a row — cementing the greatest era CS:GO had ever seen.",
      zh: "决赛 2-0 击败 AVANGAR,Astralis 拿下创纪录的第四座 Major(同时完成三连冠),铸就 CS:GO 史上最伟大的王朝。",
    },
    media: ph("starladder-berlin-2019", {
      en: "StarLadder Berlin",
      zh: "StarLadder 柏林",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "c2uQV59-tbI",
      title: {
        en: "StarLadder Berlin 2019 — Grand Final, Map 1 (Inferno)",
        zh: "StarLadder 柏林 2019 — 总决赛 第一图（炼狱小镇）",
      },
    },
  },
  {
    slug: "iem-katowice-2020",
    name: "IEM Katowice 2020",
    year: 2020,
    tier: "S",
    isMajor: false,
    location: { en: "Katowice, Poland", zh: "波兰 卡托维兹" },
    prizePool: 500000,
    winner: "Natus Vincere",
    runnerUp: "G2 Esports",
    description: {
      en: "Played in a hauntingly empty Spodek after COVID-19 forced the doors shut, Natus Vincere swept G2 Esports 3-0 behind an unstoppable s1mple.",
      zh: "受新冠疫情影响,Spodek 体育馆空场作赛。Natus Vincere 决赛 3-0 横扫 G2 Esports,s1mple 势不可挡。",
    },
    media: ph(
      "iem-katowice-2020",
      { en: "IEM Katowice 2020", zh: "IEM 卡托维兹 2020" },
      "Star",
    ),
    highlightVideo: {
      kind: "youtube",
      videoId: "NOuvxSHu74o",
      title: {
        en: "IEM Katowice 2020 — Grand Final, Map 1 (Nuke)",
        zh: "IEM 卡托维兹 2020 — 总决赛 第一图（核子危机）",
      },
    },
  },
  {
    slug: "iem-cologne-2021",
    name: "IEM Cologne 2021",
    year: 2021,
    tier: "S",
    isMajor: false,
    location: { en: "Cologne, Germany", zh: "德国 科隆" },
    prizePool: 1000000,
    winner: "Natus Vincere",
    runnerUp: "G2 Esports",
    description: {
      en: "The first top-tier LAN after more than a year of online play. Natus Vincere beat G2 Esports 3-0 in the final — a preview of their Stockholm triumph.",
      zh: "线上时代结束后的首个顶级线下赛。Natus Vincere 决赛 3-0 击败 G2 Esports,为斯德哥尔摩的登顶埋下伏笔。",
    },
    media: ph(
      "iem-cologne-2021",
      { en: "IEM Cologne 2021", zh: "IEM 科隆 2021" },
      "Star",
    ),
    highlightVideo: {
      kind: "youtube",
      videoId: "qbhh37rhltQ",
      title: {
        en: "IEM Cologne 2021 — Grand Final Highlights",
        zh: "IEM 科隆 2021 — 总决赛集锦",
      },
    },
  },
  {
    slug: "pgl-stockholm-2021",
    name: "PGL Major Stockholm 2021",
    year: 2021,
    tier: "S",
    isMajor: true,
    location: { en: "Stockholm, Sweden", zh: "瑞典 斯德哥尔摩" },
    prizePool: 2000000,
    winner: "Natus Vincere",
    runnerUp: "G2 Esports",
    description: {
      en: "The first Major after a two-year pandemic gap, and the first with a $2,000,000 prize pool. Natus Vincere beat G2 Esports 2-0 and won the whole event without dropping a single map — s1mple finally had his Major.",
      zh: "疫情中断两年后的首个 Major,奖金池首次达到 200 万美元。Natus Vincere 决赛 2-0 击败 G2 Esports,全程一图未失夺冠,s1mple 终圆 Major 之梦。",
    },
    media: ph("pgl-stockholm-2021", {
      en: "PGL Stockholm",
      zh: "PGL 斯德哥尔摩",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "LG2GZUSWfQU",
      title: {
        en: "PGL Major Stockholm 2021 — Grand Final Highlights (Map 2, Nuke)",
        zh: "PGL 斯德哥尔摩 2021 — 总决赛集锦（第二图 核子危机）",
      },
    },
  },
  {
    slug: "pgl-antwerp-2022",
    name: "PGL Major Antwerp 2022",
    year: 2022,
    tier: "S",
    isMajor: true,
    location: { en: "Antwerp, Belgium", zh: "比利时 安特卫普" },
    prizePool: 1000000,
    winner: "FaZe Clan",
    runnerUp: "Natus Vincere",
    description: {
      en: "FaZe Clan beat Natus Vincere 2-0 in Antwerp to become the first fully international roster to win a Major, with karrigan lifting the trophy at last.",
      zh: "FaZe Clan 在安特卫普决赛 2-0 击败 Natus Vincere,成为首支夺得 Major 的多国混编战队,karrigan 终于圆梦捧杯。",
    },
    media: ph("pgl-antwerp-2022", { en: "PGL Antwerp", zh: "PGL 安特卫普" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "MsfC8T5JR4I",
      title: {
        en: "PGL Major Antwerp 2022 — Grand Final Best Moments",
        zh: "PGL 安特卫普 2022 — 总决赛集锦",
      },
    },
  },
  {
    slug: "iem-rio-2022",
    name: "IEM Rio Major 2022",
    year: 2022,
    tier: "S",
    isMajor: true,
    location: { en: "Rio de Janeiro, Brazil", zh: "巴西 里约热内卢" },
    prizePool: 1250000,
    winner: "Outsiders",
    runnerUp: "Heroic",
    description: {
      en: "The first Major held in Brazil. In front of a carnival crowd in Rio, Outsiders swept Heroic 2-0 as Jame claimed the MVP medal.",
      zh: "首个在巴西举办的 Major。在里约狂欢节般的观众面前,Outsiders 决赛 2-0 横扫 Heroic,Jame 荣膺 MVP。",
    },
    media: ph("iem-rio-2022", { en: "IEM Rio", zh: "IEM 里约" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "765wGvTk33U",
      title: {
        en: "IEM Rio Major 2022 — Grand Final Highlights",
        zh: "IEM 里约 Major 2022 — 总决赛集锦",
      },
    },
  },
  {
    slug: "blast-paris-2023",
    name: "BLAST.tv Paris Major 2023",
    year: 2023,
    tier: "S",
    isMajor: true,
    location: { en: "Paris, France", zh: "法国 巴黎" },
    prizePool: 1250000,
    winner: "Team Vitality",
    runnerUp: "GamerLegion",
    description: {
      en: "The final CS:GO Major. Team Vitality beat GamerLegion 2-0 in Paris as hometown hero ZywOo took MVP honours and closed out the CS:GO era.",
      zh: "CS:GO 时代的最后一届 Major。Team Vitality 在巴黎决赛 2-0 击败 GamerLegion,主场英雄 ZywOo 荣膺 MVP,为 CS:GO 画上句号。",
    },
    media: ph("blast-paris-2023", { en: "BLAST Paris", zh: "BLAST 巴黎" }),
    highlightVideo: {
      kind: "youtube",
      videoId: "y6Y0l1Y-PTo",
      title: {
        en: "BLAST.tv Paris Major 2023 — Grand Final",
        zh: "BLAST 巴黎 Major 2023 — 总决赛",
      },
    },
  },
  {
    slug: "pgl-copenhagen-2024",
    name: "PGL Copenhagen 2024",
    year: 2024,
    tier: "S",
    isMajor: true,
    location: { en: "Copenhagen, Denmark", zh: "丹麦 哥本哈根" },
    prizePool: 1250000,
    winner: "Natus Vincere",
    runnerUp: "FaZe Clan",
    description: {
      en: "The first Counter-Strike 2 Major. Natus Vincere beat FaZe Clan 2-1 in Copenhagen's Royal Arena, giving the rebuilt roster its second Major title.",
      zh: "首届反恐精英 2 Major。Natus Vincere 在哥本哈根皇家竞技场决赛 2-1 击败 FaZe Clan,重组后的阵容拿下队史第二座 Major。",
    },
    media: ph("pgl-copenhagen-2024", {
      en: "PGL Copenhagen",
      zh: "PGL 哥本哈根",
    }),
    highlightVideo: {
      kind: "youtube",
      videoId: "09N-bQbLrx8",
      title: {
        en: "PGL Copenhagen 2024 — Grand Final, Map 1 (Ancient)",
        zh: "PGL 哥本哈根 2024 — 总决赛 第一图（远古遗迹）",
      },
    },
  },
];

const withArt = (t: Tournament): Tournament => ({
  ...t,
  media: { ...t.media, art: "tournament" },
});

export async function getTournaments(): Promise<Tournament[]> {
  if (DATA_SOURCE === "supabase")
    return supaAll<Tournament>("tournaments", { column: "year", ascending: false });
  return [...seed].sort((a, b) => b.year - a.year).map(withArt);
}
export async function getTournamentBySlug(
  slug: string,
): Promise<Tournament | null> {
  if (DATA_SOURCE === "supabase")
    return supaOne<Tournament>("tournaments", "slug", slug);
  const t = seed.find((t) => t.slug === slug);
  return t ? withArt(t) : null;
}
