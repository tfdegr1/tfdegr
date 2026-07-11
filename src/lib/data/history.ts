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
  {
    id: "beta-1999",
    year: 1999,
    date: "1999-06",
    era: "beta",
    title: { en: "Counter-Strike Beta 1.0", zh: "反恐精英 Beta 1.0" },
    description: {
      en: "Minh 'Gooseman' Le and Jess Cliffe release the first beta of a Half-Life mod that would change gaming forever.",
      zh: "Minh 'Gooseman' Le 与 Jess Cliffe 发布这款 Half-Life mod 的首个测试版,从此改变游戏史。",
    },
  },
  {
    id: "cs2-2023",
    year: 2023,
    date: "2023-09",
    era: "cs2",
    title: { en: "Counter-Strike 2 launches", zh: "反恐精英 2 正式发布" },
    description: {
      en: "Built on Source 2, CS2 replaces CS:GO with sub-tick updates, dynamic smokes and remastered maps.",
      zh: "基于 Source 2 引擎,CS2 取代 CS:GO,带来子刻更新、动态烟雾与重制地图。",
    },
  },
];

export async function getHistoryEvents(): Promise<HistoryEvent[]> {
  return [...seed].sort((a, b) => a.year - b.year);
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
