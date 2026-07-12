import type { LocalizedText, MediaPlaceholder } from "@/lib/types";

export type Era = "beta" | "cs1.6" | "source" | "csgo" | "cs2";

export interface HistoryEvent {
  id: string;
  year: number;
  date?: string; // 'YYYY-MM'
  era: Era;
  title: LocalizedText;
  description: LocalizedText;
  media?: MediaPlaceholder;
}

const seed: HistoryEvent[] = [
  // ------------------------------------------------------------------ beta
  {
    id: "beta-1-0",
    year: 1999,
    date: "1999-06",
    era: "beta",
    title: { en: "Counter-Strike Beta 1.0", zh: "《反恐精英》Beta 1.0" },
    description: {
      en: "On June 19, 1999, Minh 'Gooseman' Le and Jess Cliffe release the first public beta of their Half-Life mod. Terrorists versus Counter-Terrorists, round-based play and an in-game economy — the DNA of everything to come.",
      zh: "1999 年 6 月 19 日,Minh“Gooseman”Le 与 Jess Cliffe 发布了这款 Half-Life mod 的首个公开测试版。恐怖分子对抗反恐精英、回合制对局与局内经济系统 —— 此后一切的基因就此写下。",
    },
    media: {
      kind: "placeholder",
      label: { en: "BETA 1.0 // 1999", zh: "BETA 1.0 // 1999" },
      seed: "history-beta-1999",
      aspect: "21/9",
      accent: "violet",
      icon: "History",
    },
  },
  {
    id: "valve-acquisition",
    year: 2000,
    date: "2000-04",
    era: "beta",
    title: { en: "Valve acquires Counter-Strike", zh: "Valve 收购《反恐精英》" },
    description: {
      en: "Valve buys the rights to Counter-Strike and hires its creators. The most popular Half-Life mod graduates from community project to official Valve title.",
      zh: "Valve 买下《反恐精英》的版权并聘请两位作者。这款最受欢迎的 Half-Life mod 从社区项目正式升格为 Valve 官方作品。",
    },
  },

  // ---------------------------------------------------------------- cs1.6
  {
    id: "cs-1-0-retail",
    year: 2000,
    date: "2000-11",
    era: "cs1.6",
    title: {
      en: "Counter-Strike 1.0 retail release",
      zh: "《反恐精英》1.0 零售版发售",
    },
    description: {
      en: "In November 2000 Counter-Strike 1.0 ships as a boxed retail game published by Sierra. The free mod becomes a standalone product — and keeps its community patches coming.",
      zh: "2000 年 11 月,《反恐精英》1.0 以盒装零售形式由 Sierra 发行。免费 mod 正式成为独立商品,同时更新补丁仍源源不断。",
    },
  },
  {
    id: "cpl-winter-2001",
    year: 2001,
    date: "2001-12",
    era: "cs1.6",
    title: {
      en: "Ninjas in Pyjamas win CPL Winter 2001",
      zh: "NiP 夺得 CPL 2001 冬季赛冠军",
    },
    description: {
      en: "At the CPL World Championship in Dallas, the original Ninjas in Pyjamas — led by HeatoN and Potti — take the title in front of the world, cementing Counter-Strike as a premier esport.",
      zh: "在达拉斯举行的 CPL 世界锦标赛上,HeatoN 与 Potti 领衔的初代 Ninjas in Pyjamas 夺得冠军,奠定了《反恐精英》顶级电竞项目的地位。",
    },
  },
  {
    id: "steam-cs-1-6",
    year: 2003,
    date: "2003-09",
    era: "cs1.6",
    title: {
      en: "Steam launches — CS 1.6 goes digital",
      zh: "Steam 上线 —— CS 1.6 走向数字化",
    },
    description: {
      en: "Valve launches Steam in September 2003 with Counter-Strike 1.6, released earlier that year, as its flagship. The definitive version of classic CS reaches millions and stays competitive for a decade.",
      zh: "2003 年 9 月,Valve 推出 Steam 平台,以同年早些时候发布的 CS 1.6 作为旗舰游戏。经典 CS 的最终形态触达数百万玩家,竞技生命延续十余年。",
    },
    media: {
      kind: "placeholder",
      label: { en: "STEAM // CS 1.6", zh: "STEAM // CS 1.6" },
      seed: "history-steam-2003",
      aspect: "21/9",
      accent: "violet",
      icon: "Zap",
    },
  },
  {
    id: "condition-zero",
    year: 2004,
    date: "2004-03",
    era: "cs1.6",
    title: {
      en: "Counter-Strike: Condition Zero",
      zh: "《反恐精英:零点行动》",
    },
    description: {
      en: "After a long development that passed through several studios, Condition Zero arrives with refreshed visuals, smarter bots and a single-player mission mode — a curiosity beside 1.6's competitive dominance.",
      zh: "历经多家工作室接手的漫长开发,《零点行动》终于发售,带来更新的画面、更聪明的 bot 与单人任务模式 —— 但在 1.6 的竞技统治面前始终只是配角。",
    },
  },

  // ---------------------------------------------------------------- source
  {
    id: "cs-source",
    year: 2004,
    date: "2004-11",
    era: "source",
    title: { en: "Counter-Strike: Source", zh: "《反恐精英:起源》" },
    description: {
      en: "Counter-Strike is rebuilt on the new Source engine alongside Half-Life 2, with modern physics and remade maps. The community splits: casual players embrace it while much of the pro scene stays loyal to 1.6.",
      zh: "《反恐精英》随《半条命 2》一同重制于全新 Source 引擎,带来现代物理效果与重制地图。社区就此分裂:休闲玩家拥抱新作,而职业圈大多仍忠于 1.6。",
    },
    media: {
      kind: "placeholder",
      label: { en: "SOURCE ENGINE // 2004", zh: "SOURCE 引擎 // 2004" },
      seed: "history-source-2004",
      aspect: "21/9",
      accent: "violet",
      icon: "Zap",
    },
  },
  {
    id: "css-engine-update",
    year: 2010,
    date: "2010-06",
    era: "source",
    title: {
      en: "CS:S major engine update",
      zh: "CS:S 引擎大更新",
    },
    description: {
      en: "In June 2010 Counter-Strike: Source is ported to a newer Source engine branch, adding 144 achievements, detailed lifetime stats and Mac support — a late renaissance for the game.",
      zh: "2010 年 6 月,《反恐精英:起源》移植到更新的 Source 引擎分支,加入 144 个成就、详尽的生涯数据统计与 Mac 支持,迎来一波迟到的复兴。",
    },
  },

  // ----------------------------------------------------------------- csgo
  {
    id: "csgo-launch",
    year: 2012,
    date: "2012-08",
    era: "csgo",
    title: {
      en: "Counter-Strike: Global Offensive launches",
      zh: "《反恐精英:全球攻势》发售",
    },
    description: {
      en: "On August 21, 2012, CS:GO launches on PC, Mac and consoles for $14.99, finally reuniting the 1.6 and Source communities under one competitive title.",
      zh: "2012 年 8 月 21 日,CS:GO 以 14.99 美元登陆 PC、Mac 与主机平台,终于把 1.6 与 Source 两大阵营重新统一在同一款竞技作品之下。",
    },
    media: {
      kind: "placeholder",
      label: { en: "CS:GO // 2012", zh: "CS:GO // 2012" },
      seed: "history-csgo-2012",
      aspect: "21/9",
      accent: "violet",
      icon: "Star",
    },
  },
  {
    id: "arms-deal",
    year: 2013,
    date: "2013-08",
    era: "csgo",
    title: { en: "The Arms Deal Update", zh: "「军火交易」更新" },
    description: {
      en: "Weapon skins and cases arrive in August 2013. The Arms Deal update spawns a huge virtual economy and transforms how Counter-Strike is played, watched and traded.",
      zh: "2013 年 8 月,武器皮肤与武器箱登场。「军火交易」更新催生了庞大的虚拟经济,彻底改变了《反恐精英》被游玩、观看与交易的方式。",
    },
  },
  {
    id: "first-major",
    year: 2013,
    date: "2013-11",
    era: "csgo",
    title: {
      en: "First Major: DreamHack Winter 2013",
      zh: "首届 Major:DreamHack 2013 冬季赛",
    },
    description: {
      en: "Valve sponsors its first $250,000 Major in Jönköping, Sweden. Fnatic defeat Ninjas in Pyjamas in an all-Swedish final, and the Major era begins.",
      zh: "Valve 在瑞典延雪平赞助了首届总奖金 25 万美元的 Major。Fnatic 在瑞典内战决赛中击败 NiP,Major 时代由此开启。",
    },
    media: {
      kind: "placeholder",
      label: { en: "DREAMHACK WINTER 2013", zh: "DREAMHACK 2013 冬季赛" },
      seed: "history-major-2013",
      aspect: "21/9",
      accent: "violet",
      icon: "Star",
    },
  },
  {
    id: "mlg-columbus",
    year: 2016,
    date: "2016-04",
    era: "csgo",
    title: {
      en: "MLG Columbus: first $1,000,000 Major",
      zh: "MLG 哥伦布:首个百万美元 Major",
    },
    description: {
      en: "The first Major on North American soil raises the prize pool to $1,000,000. Luminosity Gaming's Brazilian squad, led by FalleN, take the title over Natus Vincere.",
      zh: "首次落地北美的 Major 将奖金池提升至 100 万美元。FalleN 领军的 Luminosity 巴西阵容击败 NAVI 捧起冠军。",
    },
  },
  {
    id: "f2p-danger-zone",
    year: 2018,
    date: "2018-12",
    era: "csgo",
    title: {
      en: "Free to play + Danger Zone",
      zh: "免费游玩 + 「头号特训」",
    },
    description: {
      en: "In December 2018 CS:GO goes free-to-play and ships Danger Zone, its own take on battle royale, bringing a massive new wave of players into the ecosystem.",
      zh: "2018 年 12 月,CS:GO 转为免费游玩,并推出自家的大逃杀模式「头号特训」,为生态注入海量新玩家。",
    },
  },
  {
    id: "astralis-dynasty",
    year: 2019,
    date: "2019-09",
    era: "csgo",
    title: { en: "The Astralis dynasty", zh: "Astralis 王朝" },
    description: {
      en: "With victory at StarLadder Berlin 2019, Astralis claim a third consecutive Major and a fourth overall — the greatest dynasty Counter-Strike has seen, built on utility mastery and discipline.",
      zh: "凭借 StarLadder 2019 柏林 Major 的胜利,Astralis 完成 Major 三连冠、总计四冠 —— 以道具运用与纪律铸就《反恐精英》史上最伟大的王朝。",
    },
  },
  {
    id: "pgl-stockholm",
    year: 2021,
    date: "2021-11",
    era: "csgo",
    title: { en: "PGL Major Stockholm", zh: "PGL 斯德哥尔摩 Major" },
    description: {
      en: "After two years without a Major, LAN Counter-Strike returns to a roaring arena and a record $2,000,000 prize pool. Natus Vincere and s1mple go through without dropping a single map.",
      zh: "在 Major 停摆两年后,线下赛回归座无虚席的球馆,总奖金达到创纪录的 200 万美元。NAVI 与 s1mple 一图未失夺冠。",
    },
    media: {
      kind: "placeholder",
      label: { en: "PGL MAJOR STOCKHOLM", zh: "PGL 斯德哥尔摩 MAJOR" },
      seed: "history-stockholm-2021",
      aspect: "21/9",
      accent: "violet",
      icon: "Star",
    },
  },

  // ------------------------------------------------------------------ cs2
  {
    id: "cs2-announced",
    year: 2023,
    date: "2023-03",
    era: "cs2",
    title: { en: "Counter-Strike 2 announced", zh: "《反恐精英 2》公布" },
    description: {
      en: "On March 22, 2023, Valve confirms the long-rumoured Source 2 upgrade and opens a limited test: sub-tick updates, volumetric smokes and rebuilt maps.",
      zh: "2023 年 3 月 22 日,Valve 证实传闻已久的 Source 2 升级并开启限量测试:亚 tick 更新、体积烟雾与重制地图。",
    },
  },
  {
    id: "cs2-launch",
    year: 2023,
    date: "2023-09",
    era: "cs2",
    title: {
      en: "CS2 launches — CS:GO retires",
      zh: "CS2 发布,CS:GO 退役",
    },
    description: {
      en: "On September 27, 2023, Counter-Strike 2 replaces CS:GO as a free upgrade, closing an eleven-year chapter and starting the next one on Source 2.",
      zh: "2023 年 9 月 27 日,《反恐精英 2》以免费升级的形式取代 CS:GO,为十一年的篇章画上句号,并在 Source 2 引擎上开启新纪元。",
    },
    media: {
      kind: "placeholder",
      label: { en: "CS2 // SOURCE 2", zh: "CS2 // SOURCE 2" },
      seed: "history-cs2-2023",
      aspect: "21/9",
      accent: "violet",
      icon: "Zap",
    },
  },
  {
    id: "first-cs2-major",
    year: 2024,
    date: "2024-03",
    era: "cs2",
    title: {
      en: "First CS2 Major: PGL Copenhagen",
      zh: "首届 CS2 Major:PGL 哥本哈根",
    },
    description: {
      en: "The Major era continues on Counter-Strike 2. In Copenhagen, Natus Vincere defeat FaZe Clan in the final to lift the first trophy of the new game.",
      zh: "Major 时代在《反恐精英 2》上延续。哥本哈根决赛中,NAVI 击败 FaZe,捧起新作的第一座奖杯。",
    },
  },
];

/** All events, sorted chronologically (year, then month when present). */
export async function getHistoryEvents(): Promise<HistoryEvent[]> {
  return [...seed]
    .sort(
      (a, b) =>
        a.year - b.year ||
        (a.date ?? `${a.year}`).localeCompare(b.date ?? `${b.year}`),
    )
    .map((e) =>
      e.media ? { ...e, media: { ...e.media, art: "history" as const } } : e,
    );
}

export async function getEras(): Promise<
  { id: Era; label: LocalizedText; years: string }[]
> {
  return [
    { id: "beta", label: { en: "Beta", zh: "测试版" }, years: "1999–2000" },
    { id: "cs1.6", label: { en: "CS 1.6", zh: "CS 1.6" }, years: "2000–2012" },
    { id: "source", label: { en: "Source", zh: "起源" }, years: "2004–2012" },
    { id: "csgo", label: { en: "CS:GO", zh: "CS:GO" }, years: "2012–2023" },
    { id: "cs2", label: { en: "CS2", zh: "CS2" }, years: "2023–present" },
  ];
}
