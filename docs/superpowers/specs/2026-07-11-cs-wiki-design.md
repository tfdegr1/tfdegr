# CS 百科网站 — 设计与实现规格 (Design Spec)

- **Date:** 2026-07-11
- **Status:** Approved, in build
- **Working dir:** `D:\CS`

## 1. 目标 / Goals

一个**赛博朋克风格**的 Counter-Strike 百科网站,作为**个人技术作品集**。中英双语。涵盖 7 大板块:发展历史 / 地图 / 枪械 / 赛事 / 职业选手 / KZ / 玩法模式。范围从 CS 诞生到最新的 CS2。

**本阶段交付目标:** 一个可以在本地 `pnpm dev` 运行的完整网站 —— 7 个板块全部有页面与导航,内容可以先是占位/示例数据(便于调试),视觉精美。**不依赖 Supabase 凭据即可运行**。之后再做 Supabase 迁移与 Vercel 部署。

## 2. 决策汇总 / Decisions

| 项 | 决策 |
|---|---|
| 定位 | 个人作品 / 技术展示 |
| 语言 | 中英双语 (i18n, `en` / `zh`),默认 `en` |
| MVP | 7 板块一次性上线,内容先占位可调试 |
| 图片 | 程序化占位组件 `MediaPlaceholder`(零版权风险,后续可换真实素材) |
| 视频 | YouTube 嵌入组件 `YouTubeEmbed`(无 videoId 时降级为占位) |
| 视觉 | 赛博朋克:深色基底 + 霓虹青/品红 + 辉光/扫描线/glitch + 等宽字体 HUD |
| 后端 | 本阶段用仓库内 seed 数据;Supabase 留待迁移 |
| 部署 | Vercel + GitHub CI/CD(本阶段之后) |

## 3. 技术栈 / Stack

- **Next.js 16.2** (App Router) + **React 19.2** + **TypeScript**
- **Tailwind CSS v4**(CSS-first,`@theme`)
- **next-intl v4**(i18n routing)
- **motion**(`motion/react`,入场/交互动画)+ 大量纯 CSS 动效
- **lucide-react**(图标)
- **clsx** + **tailwind-merge**(`cn()`)
- 字体:**系统字体栈**(不使用外部字体,规避网络问题)
- 包管理:**pnpm**(已配置 `npmmirror` 镜像)

## 4. 目录结构 / Repository layout

```
src/
  app/
    [locale]/
      layout.tsx            # 根布局(html/body、NextIntlClientProvider、全局背景、Header/Footer)
      page.tsx              # 首页
      <board>/page.tsx      # 各板块列表页              ← 板块 agent 负责
      <board>/[slug]/page.tsx  # 各板块详情页(如适用)  ← 板块 agent 负责
  components/               # 共享组件(地基提供)
  components/<board>/       # 板块专属组件              ← 板块 agent 负责
  config/site.ts            # 站点配置 + 7 板块清单(地基提供)
  i18n/{routing,navigation,request}.ts
  lib/utils.ts              # cn()
  lib/types.ts              # 共享类型(地基提供)
  lib/data/index.ts         # 数据层门面(地基提供)
  lib/data/<board>.ts       # 各板块 seed + getters      ← 板块 agent 负责(地基先建 stub)
  middleware.ts
messages/{en,zh}.json       # 全局 UI 文案(地基提供)
docs/
```

**约定:** `<board>` ∈ `history | maps | weapons | tournaments | players | kz | modes`。

## 5. 数据层架构 / Data layer

**核心思想:** 内容以结构化 seed 数据写在仓库里,`lib/data/*` 暴露统一 async 接口。现在读本地 seed;将来把同一份 seed 灌进 Supabase,只需替换 getter 实现,页面代码不变。

- 所有 getter 为 `async`(为将来的 Supabase/网络请求预留)。
- `lib/data/index.ts` 汇总各板块 getter 并 re-export。
- 每个 `lib/data/<board>.ts` 自包含:类型定义 + `seed` 数组 + getters。

## 6. 共享类型契约 / Shared types (`src/lib/types.ts`)

```ts
export type Locale = 'en' | 'zh';
export const LOCALES: Locale[] = ['en', 'zh'];

/** 双语文本 */
export interface LocalizedText { en: string; zh: string; }

/** 取当前语言文本 */
export function localize(text: LocalizedText, locale: Locale): string;

/** 程序化占位图 */
export interface MediaPlaceholder {
  kind: 'placeholder';
  label: LocalizedText;                 // 占位图上显示的文字
  seed: string;                         // 决定渐变/图案的确定性种子(用 slug 即可)
  aspect?: '16/9' | '4/3' | '1/1' | '3/4' | '21/9';  // 默认 16/9
  accent?: 'cyan' | 'magenta' | 'violet' | 'lime' | 'amber';  // 默认 cyan
  icon?: string;                        // lucide 图标名(可选)
}

/** YouTube 视频引用 */
export interface YouTubeRef {
  kind: 'youtube';
  videoId: string;                      // 允许 '' → 组件降级为占位
  title: LocalizedText;
}

export type Media = MediaPlaceholder | YouTubeRef;
export type AccentColor = 'cyan' | 'magenta' | 'violet' | 'lime' | 'amber';
```

**板块 agent 若需要额外字段,只在自己的 `lib/data/<board>.ts` 内扩展本板块类型,不得修改 `lib/types.ts`。**

## 7. 各板块数据模型 / Per-board models

> 以下为**最小契约**。字段名固定;agent 可增补字段但不得删改已列字段的语义。所有面向用户的文字用 `LocalizedText`(中英都要填,内容可先简略/示例)。每板块至少 **6–10 条** 示例数据。

### weapons (`lib/data/weapons.ts`)
```ts
export interface Weapon {
  slug: string;                 // 唯一,kebab-case,如 'ak-47'
  name: string;                 // 专有名(不翻译),如 'AK-47'
  category: 'pistol' | 'smg' | 'rifle' | 'sniper' | 'heavy' | 'knife' | 'grenade';
  side: 'CT' | 'T' | 'both';
  price: number;                // $
  damage: number; fireRate: number; // rpm
  accuracy: number;             // 0–100 主观标准化
  mobility: number;             // 0–100
  magazine: number;
  penetration: 'low' | 'medium' | 'high';
  killAward: number;            // $
  description: LocalizedText;
  media: MediaPlaceholder;
  introduced?: string;          // 版本,如 'CS 1.0' / 'CS2'
}
export async function getWeapons(): Promise<Weapon[]>;
export async function getWeaponBySlug(slug: string): Promise<Weapon | null>;
```

### maps (`lib/data/maps.ts`)
```ts
export interface CSMap {
  slug: string; name: string;   // 如 'de_dust2' / 'Dust II'
  type: 'defusal' | 'hostage' | 'wingman' | 'arms-race' | 'danger-zone';
  bombsites?: ('A' | 'B')[];
  releaseYear: number;
  activeDuty: boolean;          // 是否现役图池
  callouts?: { name: string; area: LocalizedText }[];
  description: LocalizedText;
  media: MediaPlaceholder;
  overviewVideo?: YouTubeRef;
}
export async function getMaps(): Promise<CSMap[]>;
export async function getMapBySlug(slug: string): Promise<CSMap | null>;
```

### history (`lib/data/history.ts`)
```ts
export type Era = 'beta' | 'cs1.6' | 'source' | 'csgo' | 'cs2';
export interface HistoryEvent {
  id: string; year: number; date?: string;   // 'YYYY-MM'
  era: Era;
  title: LocalizedText; description: LocalizedText;
  media?: MediaPlaceholder;
}
export async function getHistoryEvents(): Promise<HistoryEvent[]>; // 建议按时间排序
export async function getEras(): Promise<{ id: Era; label: LocalizedText; years: string }[]>;
```

### tournaments (`lib/data/tournaments.ts`)
```ts
export interface Tournament {
  slug: string; name: string; year: number;
  tier: 'S' | 'A' | 'B'; isMajor: boolean;
  location: LocalizedText; prizePool: number; // USD
  winner: string; runnerUp?: string;          // 战队名
  description: LocalizedText; media: MediaPlaceholder;
  highlightVideo?: YouTubeRef;
}
export async function getTournaments(): Promise<Tournament[]>;
export async function getTournamentBySlug(slug: string): Promise<Tournament | null>;
```

### players (`lib/data/players.ts`)
```ts
export interface Player {
  slug: string; nickname: string; realName?: string;
  country: string;              // 中文/英文国名或 ISO,展示用
  team?: string;
  role: 'AWPer' | 'Rifler' | 'IGL' | 'Support' | 'Entry';
  rating?: number;              // 如 HLTV 1.xx
  majorsWon?: number; active: boolean;
  bio: LocalizedText; media: MediaPlaceholder;
}
export async function getPlayers(): Promise<Player[]>;
export async function getPlayerBySlug(slug: string): Promise<Player | null>;
```

### kz (`lib/data/kz.ts`)
```ts
export interface KZMap {
  slug: string; name: string;   // 如 'kz_bhop_badges'
  tier: 1|2|3|4|5|6|7;          // 难度
  style: 'KZT' | 'SKZ' | 'VNL';
  description: LocalizedText; media: MediaPlaceholder;
  recordVideo?: YouTubeRef;
}
export async function getKZMaps(): Promise<KZMap[]>;
export async function getKZMapBySlug(slug: string): Promise<KZMap | null>;
/** KZ 玩法概述(what is KZ),给列表页顶部用 */
export async function getKZIntro(): Promise<LocalizedText>;
```

### modes (`lib/data/modes.ts`)
```ts
export interface GameMode {
  slug: string; name: LocalizedText;
  category: 'official' | 'community';
  players: string;              // 如 '5v5'
  description: LocalizedText; howToPlay: LocalizedText;
  media: MediaPlaceholder;
}
export async function getModes(): Promise<GameMode[]>;
export async function getModeBySlug(slug: string): Promise<GameMode | null>;
```

## 8. 路由 / i18n

- 结构:`/[locale]/...`,`locale` ∈ `en|zh`,默认 `en`,前缀始终存在(`/en`, `/zh`)。
- 板块列表页:`/[locale]/<board>`;详情页:`/[locale]/<board>/[slug]`(history 无详情页,用时间轴列表即可)。
- 页面/布局的 `params` 为 **Promise**,需 `await`;静态渲染板块用 `setRequestLocale(locale)`。
- **全局 UI 文案**(导航、按钮、通用词)放 `messages/{en,zh}.json`,通过 `useTranslations` / `getTranslations` 使用。
- **板块内容/专属文案**用数据里的 `LocalizedText` + `localize(text, locale)`,**板块 agent 不修改 `messages/*.json`**(避免多 agent 冲突)。
- 链接与导航统一用 `@/i18n/navigation` 导出的 `Link`(自动带 locale)。

## 9. 设计系统 / Design system (赛博朋克)

**色板(定义于 `globals.css @theme`,生成 Tailwind 工具类):**

| Token | 值 | 工具类示例 |
|---|---|---|
| `--color-bg` | `#05060a` | `bg-bg` |
| `--color-bg-elev` | `#0a0f1a` | `bg-bg-elev` |
| `--color-panel` | `#0d1424` | `bg-panel` |
| `--color-panel-2` | `#111a2e` | `bg-panel-2` |
| `--color-edge` | `#1c2947` | `border-edge` |
| `--color-ink` | `#e2e8f5` | `text-ink` |
| `--color-muted` | `#8b9bb8` | `text-muted` |
| `--color-neon-cyan` | `#00e5ff` | `text-neon-cyan` |
| `--color-neon-magenta` | `#ff2d95` | `text-neon-magenta` |
| `--color-neon-violet` | `#b14bff` | `text-neon-violet` |
| `--color-neon-lime` | `#adff2f` | `text-neon-lime` |
| `--color-neon-amber` | `#ffb347` | `text-neon-amber` |

**字体:** `font-display`(等宽,HUD/标题)、`font-mono`(等宽标签)、`font-sans`(system-ui + CJK,正文)。

**全局效果类(`globals.css` 提供):** `.scanlines`、`.grid-bg`、`.neon-text`(文字辉光)、`.neon-box`(边框辉光)、`.glitch`(故障标题,配合 `data-text`)、`.hud-corners`(切角 HUD 边框)、自定义霓虹滚动条。

**基调:** 深色背景 + 细网格 + 扫描线;强调色以青为主、品红为辅;交互有辉光/位移;大量 `uppercase` + `tracking` + 等宽数字营造终端/HUD 感。每个板块有一个 `accent` 主色以区分。

## 10. 共享组件 API / Shared components (地基提供,板块 agent 复用)

> 板块 agent **必须复用**这些组件,不得另造重复轮子;可自由组合。

- `cn(...classes)` — `@/lib/utils`
- `<SiteHeader />` / `<SiteFooter />` — 布局已挂载,agent 无需处理
- `<PageHero title subtitle? accent? kicker? />` — 板块页头(含面包屑区)
- `<SectionHeading index? title accent? />` — 区块标题
- `<GlitchTitle text as? className? />` — glitch 大标题(服务端组件,纯 CSS)
- `<HudPanel accent? className>…</HudPanel>` — 带切角/辉光的容器面板
- `<BoardCard href title subtitle? media? accent? tags? />` — 网格卡片
- `<MediaPlaceholder media={MediaPlaceholder} locale className? />` — 占位图
- `<YouTubeEmbed video={YouTubeRef} locale />` — 视频(降级占位)
- `<StatBar label value max? accent? />` — 0–100 数据条
- `<Tag accent?>…</Tag>` — 小标签/徽章
- `<NeonButton href? onClick? accent? variant?>…</NeonButton>`
- `<Reveal>…</Reveal>` — motion 入场包装(client)

组件 props 以地基实现为准;agent 应先阅读 `src/components/*` 再使用。

## 11. 板块 Agent 契约 / Board agent contract

每个板块 agent **只能创建/修改**以下路径(其余一律不许碰):
- `src/lib/data/<board>.ts`(填充 seed + getters,实现第 7 节契约)
- `src/app/[locale]/<board>/page.tsx`(列表页)
- `src/app/[locale]/<board>/[slug]/page.tsx`(详情页,若该板块有)
- `src/components/<board>/*`(板块专属组件)

**禁止修改:** `package.json`、`next.config.ts`、`tsconfig.json`、`globals.css`、`middleware.ts`、`src/i18n/*`、`src/lib/types.ts`、`src/lib/utils.ts`、`src/lib/data/index.ts`、`src/config/site.ts`、`messages/*.json`、`src/components/*`(共享组件,只读复用)、`src/app/[locale]/layout.tsx`、`src/app/[locale]/page.tsx`。

**质量要求:**
- 复用共享组件与设计 token,保持赛博朋克一致性;用本板块 `accent` 主色。
- 列表页 + 详情页都要:响应式、`text-ink/muted` 层次、`MediaPlaceholder` 填充图位、`useTranslations` 用全局词、`localize()` 用内容文案。
- 双语内容都要填(可简略),至少 6–10 条示例数据。
- 详情页用 `generateStaticParams` 预生成 slug;`params` 记得 `await`。
- 结束前自检 `pnpm exec tsc --noEmit` 对**自己的文件**无类型错误。

## 12. 本地可运行验收标准 / Acceptance

- `pnpm install && pnpm dev` → 打开 `http://localhost:3000`(会重定向到 `/en`)。
- 赛博朋克首页;7 个板块均可从导航进入,列表页 + 详情页可浏览。
- 中英切换可用,内容随语言变化。
- 图位为占位组件,视频位为 YouTube 嵌入/占位。
- `pnpm build` 通过;控制台无致命错误。
- **不需要任何 Supabase / 外部凭据**。

## 13. 后续阶段(本次之后)/ Later

1. **Supabase 迁移:** 安装 supabase CLI → 建项目 → 按 seed 形状建表(SQL migration)→ 用脚本把 seed 灌入 → 在 `lib/data/*` 增加 supabase 后端并用开关切换。
2. **Vercel + CI/CD:** GitHub 仓库接 Vercel;配置环境变量;push `main` 自动部署,PR 预览。
