import type { LocalizedText, MediaPlaceholder, YouTubeRef } from "@/lib/types";
import { DATA_SOURCE, supaAll, supaOne } from "../supabase";

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

/** Bilingual labels for map types (board-local copy, not global messages). */
export const MAP_TYPE_LABELS: Record<CSMap["type"], LocalizedText> = {
  defusal: { en: "Defusal", zh: "爆破模式" },
  hostage: { en: "Hostage", zh: "人质解救" },
  wingman: { en: "Wingman", zh: "搭档模式" },
  "arms-race": { en: "Arms Race", zh: "军备竞赛" },
  "danger-zone": { en: "Danger Zone", zh: "头号特训" },
};

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
    callouts: [
      {
        name: "Long A",
        area: {
          en: "The long open lane running toward A site",
          zh: "通往 A 点的开阔长道（A 大）",
        },
      },
      {
        name: "Catwalk",
        area: {
          en: "Elevated short path from mid toward A site",
          zh: "从中路通向 A 点的高台小道（A 小）",
        },
      },
      {
        name: "Mid Doors",
        area: {
          en: "The double doors in the middle of the map",
          zh: "地图中央的双开门（中门）",
        },
      },
      {
        name: "B Tunnels",
        area: {
          en: "Underground tunnels leading into B site",
          zh: "通往 B 点的地下通道（B 洞）",
        },
      },
      {
        name: "Xbox",
        area: {
          en: "The crate where mid crosses onto catwalk",
          zh: "中路与 A 小交汇处的箱子（天车箱）",
        },
      },
    ],
    description: {
      en: "The most iconic map in Counter-Strike history — a sun-baked, three-lane classic where Long A duels and B-tunnel rushes have raged since 2001. Its simple geometry makes it the purest test of aim and timing in the game.",
      zh: "反恐精英史上最具标志性的地图——烈日下的三线经典。自 2001 年起，A 大对枪与 B 洞冲锋从未停歇；极简的结构使它成为对枪法与时机最纯粹的考验。",
    },
    media: ph("de_dust2", { en: "Dust II", zh: "炙热沙城 II" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "TY0r1ShcDt0",
      title: { en: "Dust II — CS2 full map tour", zh: "炙热沙城 II — CS2 地图概览" },
    },
  },
  {
    slug: "de_mirage",
    name: "Mirage",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2013,
    activeDuty: true,
    callouts: [
      {
        name: "A Ramp",
        area: {
          en: "The T-side ramp entrance onto A site",
          zh: "T 方进入 A 点的斜坡（A 坡）",
        },
      },
      {
        name: "Palace",
        area: {
          en: "The balcony overlooking A site from T apartments",
          zh: "俯瞰 A 点的皇宫阳台（皇宫）",
        },
      },
      {
        name: "Window",
        area: {
          en: "The sniper window watching mid from CT side",
          zh: "CT 方监视中路的狙击手窗口（窗口）",
        },
      },
      {
        name: "Connector",
        area: {
          en: "The passage linking mid to A-site jungle",
          zh: "连接中路与 A 点丛林的通道（连接口）",
        },
      },
      {
        name: "B Apartments",
        area: {
          en: "The T-side apartment block leading into B site",
          zh: "通往 B 点的公寓楼（B 公寓）",
        },
      },
    ],
    description: {
      en: "A balanced competitive staple set in a Moroccan town, built around mid control and fast rotations. Smoking off Window and Connector is among the first utility every player learns.",
      zh: "以摩洛哥小镇为背景的竞技常青树，核心在于中路控制与快速转点。封窗口与连接口的烟雾弹几乎是每位玩家最先学会的道具。",
    },
    media: ph("de_mirage", { en: "Mirage", zh: "荒漠迷城" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "n8T3yFZMZdY",
      title: { en: "Mirage — CS2 full map tour", zh: "荒漠迷城 — CS2 地图概览" },
    },
  },
  {
    slug: "de_inferno",
    name: "Inferno",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 1999,
    activeDuty: true,
    callouts: [
      {
        name: "Banana",
        area: {
          en: "The curved lane from T side up to B site",
          zh: "从 T 方通往 B 点的弯道（香蕉道）",
        },
      },
      {
        name: "Apartments",
        area: {
          en: "The apartment complex on the way to A short",
          zh: "通往 A 小的公寓建筑群（公寓）",
        },
      },
      {
        name: "Pit",
        area: {
          en: "The sunken position at the edge of A site",
          zh: "A 点边缘的下沉阵位（坑）",
        },
      },
      {
        name: "Library",
        area: {
          en: "The book-lined room overlooking A site",
          zh: "俯瞰 A 点的图书室（图书馆）",
        },
      },
      {
        name: "Mid",
        area: {
          en: "The central street between second mid and A",
          zh: "连接二中路与 A 区的中央街道（中路）",
        },
      },
    ],
    description: {
      en: "A tight Italian village where utility is king. Control of Banana and the apartments decides most rounds, and late-round retakes on its cramped sites have produced legendary moments.",
      zh: "狭窄的意大利小镇，道具运用至上。香蕉道与公寓的控制权决定了大多数回合，而狭小包点上的残局回防更是名场面频出。",
    },
    media: ph("de_inferno", { en: "Inferno", zh: "炼狱小镇" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "1JO3e-lNno4",
      title: {
        en: "Inferno — CS2 cinematic map tour",
        zh: "炼狱小镇 — CS2 地图概览",
      },
    },
  },
  {
    slug: "de_nuke",
    name: "Nuke",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 1999,
    activeDuty: true,
    callouts: [
      {
        name: "Ramp",
        area: {
          en: "The sloped hallway leading down toward B site",
          zh: "通往下层 B 点的斜坡通道（斜坡）",
        },
      },
      {
        name: "Heaven",
        area: {
          en: "The elevated CT platform overlooking A site",
          zh: "俯瞰 A 点的 CT 高台（天堂）",
        },
      },
      {
        name: "Hell",
        area: {
          en: "The area directly underneath Heaven on A site",
          zh: "A 点天堂正下方的区域（地狱）",
        },
      },
      {
        name: "Secret",
        area: {
          en: "The hidden corridor connecting outside to B site",
          zh: "连接外场与 B 点的隐蔽通道（秘密通道）",
        },
      },
      {
        name: "Outside",
        area: {
          en: "The large open yard flanking the facility",
          zh: "核电站外的大片开阔地（外场）",
        },
      },
    ],
    description: {
      en: "A nuclear power plant fought across two vertical levels. Sound cues travel through floors, rotations are the fastest in the pool, and CT-sided setups make every T round a puzzle to solve.",
      zh: "在核电站上下两层展开攻防的地图。脚步声穿透楼层，转点速度全图池最快，偏向 CT 的防守布置让 T 方每一回合都像在解谜。",
    },
    media: ph("de_nuke", { en: "Nuke", zh: "核子危机" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "wzbfPDgN5lo",
      title: { en: "Nuke — CS2 full map tour", zh: "核子危机 — CS2 地图概览" },
    },
  },
  {
    slug: "de_overpass",
    name: "Overpass",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2013,
    activeDuty: false,
    callouts: [
      {
        name: "Monster",
        area: {
          en: "The sewer tunnel exit opening onto B site",
          zh: "通向 B 点的下水道出口（怪物洞）",
        },
      },
      {
        name: "Bathrooms",
        area: {
          en: "The public toilets connecting party to A site",
          zh: "连接聚会区与 A 点的公共厕所（厕所）",
        },
      },
      {
        name: "Heaven",
        area: {
          en: "The CT platform above B site",
          zh: "B 点上方的 CT 平台（天堂）",
        },
      },
      {
        name: "Long A",
        area: {
          en: "The long approach along the park toward A site",
          zh: "沿公园通向 A 点的长道（A 大）",
        },
      },
      {
        name: "Fountain",
        area: {
          en: "The park fountain near T spawn",
          zh: "T 出生点附近的公园喷泉（喷泉）",
        },
      },
    ],
    description: {
      en: "A Berlin park and canal system layered over a highway overpass. Long-range skirmishes above, sewer ambushes below — a map that rewards deep utility knowledge and patient defaults.",
      zh: "柏林的公园与运河横跨在高速立交之上。上层是远距离对枪，下层是下水道伏击——这张图偏爱道具功底扎实、节奏沉稳的队伍。",
    },
    media: ph("de_overpass", { en: "Overpass", zh: "死亡游乐园" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "P4N1saVuiQ4",
      title: {
        en: "Overpass — CS2 full map tour",
        zh: "死亡游乐园 — CS2 地图概览",
      },
    },
  },
  {
    slug: "de_ancient",
    name: "Ancient",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2021,
    activeDuty: true,
    callouts: [
      {
        name: "Donut",
        area: {
          en: "The small round room on the way to A site",
          zh: "通往 A 点的环形小房间（甜甜圈）",
        },
      },
      {
        name: "Cave",
        area: {
          en: "The dark cave passage toward B site",
          zh: "通往 B 点的黑暗洞穴（洞穴）",
        },
      },
      {
        name: "Elbow",
        area: {
          en: "The bent corridor joining mid and B ramp",
          zh: "连接中路与 B 坡的转角通道（拐角）",
        },
      },
      {
        name: "Temple",
        area: {
          en: "The ruined temple structure in upper mid",
          zh: "中路上方的神庙废墟（神庙）",
        },
      },
      {
        name: "Mid",
        area: {
          en: "The central jungle path splitting to both sites",
          zh: "通向两个包点的中央丛林小径（中路）",
        },
      },
    ],
    description: {
      en: "A Mayan ruin deep in the jungle, promoted to the map pool in 2021 to replace Train. Tight choke points and long rotation paths put a premium on map control and disciplined utility.",
      zh: "深藏丛林中的玛雅遗迹，2021 年进入竞技图池以取代列车停放站。狭窄的隘口与漫长的转点路线让地图控制与道具纪律尤为关键。",
    },
    media: ph("de_ancient", { en: "Ancient", zh: "远古遗迹" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "LAtJJP93Ogo",
      title: { en: "Ancient — CS2 full map tour", zh: "远古遗迹 — CS2 地图概览" },
    },
  },
  {
    slug: "de_vertigo",
    name: "Vertigo",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2012,
    activeDuty: false,
    callouts: [
      {
        name: "A Ramp",
        area: {
          en: "The wide concrete ramp rising into A site",
          zh: "通往 A 点的宽阔水泥坡道（A 坡）",
        },
      },
      {
        name: "Ladder",
        area: {
          en: "The ladder-room shortcut between the two levels",
          zh: "连接上下两层的爬梯间（梯子间）",
        },
      },
      {
        name: "Mid",
        area: {
          en: "The exposed central walkway high above the city",
          zh: "高悬于城市上空的中央通道（中路）",
        },
      },
      {
        name: "B Stairs",
        area: {
          en: "The staircase from T spawn up to B site",
          zh: "从 T 出生点通往 B 点的楼梯（B 楼梯）",
        },
      },
      {
        name: "Scaffold",
        area: {
          en: "The scaffolding ledge along the tower's edge",
          zh: "沿大厦边缘搭设的脚手架（脚手架）",
        },
      },
    ],
    description: {
      en: "A skyscraper under construction high above the city. Verticality, narrow ramps and lightning-fast A executes made it one of the most divisive maps ever placed in active duty.",
      zh: "一座悬于城市上空的在建摩天大楼。垂直落差、狭窄坡道与闪电般的 A 点强攻，使它成为现役图池史上争议最大的地图之一。",
    },
    media: ph("de_vertigo", { en: "Vertigo", zh: "殒命大厦" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "-Xs9XKaFaUY",
      title: { en: "Vertigo — CS2 full map tour", zh: "殒命大厦 — CS2 地图概览" },
    },
  },
  {
    slug: "de_anubis",
    name: "Anubis",
    type: "defusal",
    bombsites: ["A", "B"],
    releaseYear: 2020,
    activeDuty: true,
    callouts: [
      {
        name: "Mid",
        area: {
          en: "The broad temple courtyard at the map's center",
          zh: "地图中央的开阔神庙庭院（中路）",
        },
      },
      {
        name: "Canal",
        area: {
          en: "The waterway cutting between mid and B site",
          zh: "贯穿中路与 B 区之间的水道（运河）",
        },
      },
      {
        name: "Palace",
        area: {
          en: "The ornate hall on the approach to A site",
          zh: "通向 A 点途中的华丽宫殿（宫殿）",
        },
      },
      {
        name: "Connector",
        area: {
          en: "The passage linking mid to the A site",
          zh: "连接中路与 A 点的通道（连接口）",
        },
      },
      {
        name: "Street",
        area: {
          en: "The long outer street running toward B site",
          zh: "通向 B 点的外围长街（大街）",
        },
      },
    ],
    description: {
      en: "A community-made map set along the Nile that leapt into the active duty pool in 2022. Water routes, a tight mid and flexible split attacks give it a fast, fluid meta.",
      zh: "以尼罗河畔为背景的社区地图，2022 年跻身现役图池。水道、紧凑的中路与灵活的分推打法带来快速流畅的战术节奏。",
    },
    media: ph("de_anubis", { en: "Anubis", zh: "阿努比斯" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "7bpo25-9WiM",
      title: { en: "Anubis — CS2 full map tour", zh: "阿努比斯 — CS2 地图概览" },
    },
  },
  {
    slug: "cs_office",
    name: "Office",
    type: "hostage",
    releaseYear: 1999,
    activeDuty: false,
    callouts: [
      {
        name: "Long Hall",
        area: {
          en: "The main corridor stretching across the offices",
          zh: "贯穿办公区的主走廊（长廊）",
        },
      },
      {
        name: "Garage",
        area: {
          en: "The underground parking connected to the back",
          zh: "连接后区的地下车库（车库）",
        },
      },
      {
        name: "Paper Room",
        area: {
          en: "The copy room stacked with paper crates",
          zh: "堆满纸箱的复印室（纸房）",
        },
      },
      {
        name: "Snow",
        area: {
          en: "The snow-covered courtyard outside the building",
          zh: "办公楼外的积雪庭院（雪地）",
        },
      },
      {
        name: "Hostage Room",
        area: {
          en: "The back office where the hostages are held",
          zh: "关押人质的后侧办公室（人质房）",
        },
      },
    ],
    description: {
      en: "The definitive hostage rescue map — a snowbound office complex held by terrorists since the earliest days of Counter-Strike. CTs push the long hall and garage to reach the hostages.",
      zh: "人质解救模式的代表作——自反恐精英最早期便被恐怖分子占据的雪中办公楼。CT 需推进长廊与车库，才能接近并救出人质。",
    },
    media: ph("cs_office", { en: "Office", zh: "办公大楼" }),
    overviewVideo: {
      kind: "youtube",
      videoId: "ptDxL5GGOZg",
      title: { en: "Office — CS2 full map tour", zh: "办公大楼 — CS2 地图概览" },
    },
  },
];

const withArt = (m: CSMap): CSMap => ({
  ...m,
  media: { ...m.media, art: "map" },
});

export async function getMaps(): Promise<CSMap[]> {
  if (DATA_SOURCE === "supabase") return supaAll<CSMap>("maps");
  return seed.map(withArt);
}
export async function getMapBySlug(slug: string): Promise<CSMap | null> {
  if (DATA_SOURCE === "supabase") return supaOne<CSMap>("maps", "slug", slug);
  const m = seed.find((m) => m.slug === slug);
  return m ? withArt(m) : null;
}
