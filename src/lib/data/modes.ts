import type { LocalizedText, MediaPlaceholder } from "@/lib/types";
import { DATA_SOURCE, supaAll, supaOne } from "../supabase";

export interface GameMode {
  slug: string;
  name: LocalizedText;
  category: "official" | "community";
  players: string; // e.g. "5v5"
  description: LocalizedText;
  howToPlay: LocalizedText;
  media: MediaPlaceholder;
}

const ph = (
  slug: string,
  label: LocalizedText,
  icon: "Gamepad2" | "Swords" | "Bomb" | "Target" | "Flame" = "Gamepad2",
): MediaPlaceholder => ({
  kind: "placeholder",
  label,
  seed: slug,
  aspect: "16/9",
  accent: "magenta",
  icon,
});

const seed: GameMode[] = [
  // ---------------------------------------------------------------- official
  {
    slug: "premier",
    name: { en: "Premier", zh: "Premier 天梯" },
    category: "official",
    players: "5v5",
    description: {
      en: "CS2's pinnacle ranked experience: 5v5 bomb defusal on the Active Duty map pool with a pick/ban veto phase, a visible CS Rating and regional & global leaderboards.",
      zh: "CS2 的最高阶排位体验:在现役地图池上进行 5v5 爆破对抗,赛前有地图 Pick/Ban 环节,并以可见的 CS Rating 分数参与地区与全球排行榜。",
    },
    howToPlay: {
      en: "Queue with a full team or solo, then vote to ban and pick maps before the match. Rounds follow MR12 rules — first team to 13 wins, with overtime on a 12:12 tie. Winning raises your CS Rating; losing costs points, so consistency across the whole map pool matters.",
      zh: "可以五人组队或单排进入队列,开赛前双方轮流禁选地图。比赛采用 MR12 赛制 —— 先拿下 13 回合者获胜,12:12 平局进入加时。胜利提升 CS Rating,失利则扣分,因此需要在整个地图池中保持稳定发挥。",
    },
    media: ph("premier", { en: "Premier", zh: "Premier 天梯" }, "Swords"),
  },
  {
    slug: "competitive",
    name: { en: "Competitive", zh: "竞技模式" },
    category: "official",
    players: "5v5",
    description: {
      en: "The classic ranked mode: 5v5 bomb defusal (or hostage rescue) with the full buy economy, friendly fire and per-map Skill Group ranks in CS2.",
      zh: "经典排位模式:5v5 爆破(或人质解救),拥有完整购买经济与友军伤害;在 CS2 中每张地图拥有独立的技能组段位。",
    },
    howToPlay: {
      en: "Two teams of five alternate as Terrorists and Counter-Terrorists. Win rounds by planting or defusing the bomb, eliminating the enemy team, or running down the clock. Matches use MR12 — first to 13 rounds — and managing money between rounds is as important as aim.",
      zh: "两支五人队伍轮流担任 T 与 CT。通过安放或拆除炸弹、歼灭敌方全员或拖满回合时间来赢下回合。比赛采用 MR12 赛制,先取得 13 回合获胜;回合间的经济运营与枪法同样重要。",
    },
    media: ph("competitive", { en: "Competitive", zh: "竞技模式" }, "Bomb"),
  },
  {
    slug: "wingman",
    name: { en: "Wingman", zh: "搭档模式" },
    category: "official",
    players: "2v2",
    description: {
      en: "A compact 2v2 bomb-defusal mode on small single-bombsite maps — fast, tactical and duo-focused, with its own Skill Group ladder.",
      zh: "在小型单炸弹点地图上进行的紧凑 2v2 爆破模式 —— 快节奏、重战术、专注双人配合,并拥有独立的段位系统。",
    },
    howToPlay: {
      en: "You and a partner face another duo over a maximum of 16 rounds (MR8, first to 9). Shorter round timers and a single bombsite force constant duels — ideal for practising aim, trades and clutch situations.",
      zh: "你与一名搭档对抗另一组双人队伍,最多进行 16 回合(MR8,先拿 9 回合获胜)。更短的回合时间与唯一的炸弹点带来持续对枪 —— 非常适合练习枪法、补枪与残局处理。",
    },
    media: ph("wingman", { en: "Wingman", zh: "搭档模式" }, "Swords"),
  },
  {
    slug: "casual",
    name: { en: "Casual", zh: "休闲模式" },
    category: "official",
    players: "10v10",
    description: {
      en: "Low-pressure bomb defusal and hostage rescue for big lobbies: no friendly fire, free armor and defuse kits, and a relaxed economy. The classic warm-up before ranked.",
      zh: "面向大型房间的轻松爆破与人质玩法:无友军伤害,免费护甲与拆弹器,经济系统宽松。排位前热身的经典选择。",
    },
    howToPlay: {
      en: "Join mid-match at any time and pick a side — up to 10 players per team. Objectives are the same as Competitive, but shorter matches, extra starting money and no team damage keep it friendly. Spectate freely after death and swap teams between rounds.",
      zh: "随时可以中途加入并选择阵营,每队最多 10 人。目标与竞技模式相同,但比赛更短、初始金钱更多、无队友伤害,氛围更轻松。阵亡后可自由观战,回合间也可以更换阵营。",
    },
    media: ph("casual", { en: "Casual", zh: "休闲模式" }, "Gamepad2"),
  },
  {
    slug: "deathmatch",
    name: { en: "Deathmatch", zh: "死亡竞赛" },
    category: "official",
    players: "FFA",
    description: {
      en: "Instant-respawn, score-attack aim training: buy any weapon at any time, chase bonus-weapon multipliers and rack up points before the timer expires.",
      zh: "即死即复活的计分对抗与练枪场:随时购买任意武器,追逐奖励武器加成,在计时结束前尽可能取得高分。",
    },
    howToPlay: {
      en: "Everyone fights for themselves in a 10-minute free-for-all. Kills award points based on the weapon used, and periodic bonus weapons grant extra score. Respawns are instant and armor is free — perfect for warming up spray control and crosshair placement.",
      zh: "所有玩家在 10 分钟的混战中各自为战。击杀根据所用武器计分,周期性的奖励武器可获得额外分数。即时复活、免费护甲 —— 是热身压枪与预瞄的完美选择。",
    },
    media: ph("deathmatch", { en: "Deathmatch", zh: "死亡竞赛" }, "Target"),
  },
  {
    slug: "arms-race",
    name: { en: "Arms Race", zh: "军备竞赛" },
    category: "official",
    players: "FFA",
    description: {
      en: "The gun-progression race born from the legendary Gun Game mod: every kill upgrades your weapon, and the first player to score a golden knife kill wins.",
      zh: "源自传奇 Gun Game 模组的武器升级竞赛:每次击杀都会升级你的武器,率先用黄金刀完成击杀的玩家获胜。",
    },
    howToPlay: {
      en: "Spawn instantly and fight on tight maps like Baggage and Shoots. Each kill advances you to the next weapon in a fixed ladder; getting knifed sets you back a level. Clear the whole ladder, then land the final golden knife kill to take the match.",
      zh: "在 Baggage、Shoots 等紧凑地图上即时复活、持续交火。每次击杀让你沿固定武器序列升级;被刀则会降一级。打通整条武器链后,用最终的黄金刀完成击杀即可赢下比赛。",
    },
    media: ph("arms-race", { en: "Arms Race", zh: "军备竞赛" }, "Flame"),
  },
  {
    slug: "demolition",
    name: { en: "Demolition", zh: "拆除模式" },
    category: "official",
    players: "5v5",
    description: {
      en: "CS:GO's hybrid of defusal and gun progression: no buy menu — you earn the next weapon in the sequence by scoring a kill each round, on compact single-bombsite maps like Lake and Safehouse.",
      zh: "CS:GO 中融合爆破与武器升级的玩法:没有购买菜单 —— 每回合完成击杀即可在下一回合获得序列中的下一把武器,地图为 Lake、Safehouse 等紧凑的单炸弹点地图。",
    },
    howToPlay: {
      en: "Standard plant-or-defuse objectives over two ten-round halves, but your loadout is dictated by performance: kill at least one enemy in a round to progress from rifles down through pistols. Bonus grenades reward multi-kills. Retired when CS2 replaced CS:GO.",
      zh: "在两个 10 回合的半场中执行标准的下包/拆包目标,但装备由表现决定:回合内至少击杀一名敌人,武器才会从步枪一路推进到手枪。多杀可获得奖励手雷。该模式随 CS2 取代 CS:GO 而下线。",
    },
    media: ph("demolition", { en: "Demolition", zh: "拆除模式" }, "Bomb"),
  },
  {
    slug: "danger-zone",
    name: { en: "Danger Zone", zh: "头号特训" },
    category: "official",
    players: "up to 18",
    description: {
      en: "CS:GO's fast battle royale (2018–2023): up to 18 players drop onto Blacksite, Sirocco or Frostbite, scavenging weapons and cash while the zone shrinks.",
      zh: "CS:GO 的快节奏大逃杀(2018–2023):最多 18 名玩家空降 Blacksite、Sirocco 或 Frostbite,一边搜集武器与现金,一边应对不断收缩的安全区。",
    },
    howToPlay: {
      en: "Play solo, in duos or trios. Use the tablet to track deliveries and enemy zones, complete missions for cash, and order equipment by drone. Health regenerates slowly and every bullet counts — be the last squad standing to win. Removed with the launch of CS2.",
      zh: "支持单人、双人或三人小队。使用平板追踪空投与敌情区域,完成任务赚取现金,并通过无人机订购装备。生命缓慢回复、每发子弹都至关重要 —— 活到最后即为胜利。该模式随 CS2 上线而移除。",
    },
    media: ph("danger-zone", { en: "Danger Zone", zh: "头号特训" }, "Flame"),
  },
  {
    slug: "guardian",
    name: { en: "Guardian", zh: "守护者" },
    category: "official",
    players: "2P co-op",
    description: {
      en: "The co-op mission mode from CS:GO's Operations: you and a friend hold a bombsite against escalating waves of bots while completing weapon-specific objectives.",
      zh: "CS:GO 行动(Operation)中的合作任务模式:你与一名好友驻守炸弹点,抵御一波波不断增强的 BOT 进攻,并完成指定武器的击杀目标。",
    },
    howToPlay: {
      en: "Two players defend against waves of Terrorist bots trying to plant the bomb. Each mission requires kills with a specific weapon (for example, 20 AWP kills); dying or letting the bomb detonate resets the wave. Featured in Operation missions from Bloodhound through Broken Fang.",
      zh: "两名玩家防守试图下包的恐怖分子 BOT 波次。每个任务要求使用指定武器完成击杀(例如 20 次 AWP 击杀);阵亡或炸弹爆炸都会重置当前波次。该玩法出现在从“猎犬行动”到“狂牙行动”的历次行动任务中。",
    },
    media: ph("guardian", { en: "Guardian", zh: "守护者" }, "Target"),
  },
  // -------------------------------------------------------------- community
  {
    slug: "retakes",
    name: { en: "Retakes", zh: "重夺模式" },
    category: "community",
    players: "3v4",
    description: {
      en: "Born on community servers and later adopted officially in Operation Broken Fang: every round is a post-plant scenario where CTs must retake a bombsite from entrenched Ts.",
      zh: "诞生于社区服务器、后在“狂牙行动”中被官方收编:每一回合都是下包后的残局 —— CT 必须从据守的 T 手中夺回炸弹点。",
    },
    howToPlay: {
      en: "Rounds start with the bomb already planted: three Terrorists defend the site while four Counter-Terrorists spawn around it and push in. Pick a loadout card instead of buying, then defuse the bomb or hold until detonation. The fastest way to drill post-plant execution and site retakes.",
      zh: "回合开始时炸弹已被安放:三名 T 据守包点,四名 CT 在四周刷新并发起进攻。用选择装备卡代替购买,随后拆除炸弹或守到爆炸。这是练习下包后残局与回防包点的最高效方式。",
    },
    media: ph("retakes", { en: "Retakes", zh: "重夺模式" }, "Bomb"),
  },
  {
    slug: "surf",
    name: { en: "Surf", zh: "滑翔 Surf" },
    category: "community",
    players: "up to 64",
    description: {
      en: "An iconic community movement discipline: glide along angled ramps to build enormous speed, chaining slopes and airstrafes across gravity-defying maps.",
      zh: "标志性的社区身法玩法:沿倾斜坡面滑行积累惊人速度,在反重力般的地图中衔接坡道与空中变向。",
    },
    howToPlay: {
      en: "Hold strafe keys into a ramp's surface — never press forward — and steer with the mouse to gain speed. Skill surf maps are staged obstacle courses raced against the clock; combat surf servers mix surfing with gunfights. Found on community servers, from CS:Source to CS2.",
      zh: "身体贴向坡面按住侧向移动键 —— 切勿按前进键 —— 并用鼠标控制方向来加速。技巧滑翔地图是计时闯关的障碍赛;战斗滑翔服务器则把滑翔与枪战结合。从 CS:Source 到 CS2 的社区服务器中都能找到它。",
    },
    media: ph("surf", { en: "Surf", zh: "滑翔 Surf" }, "Gamepad2"),
  },
  {
    slug: "zombie-escape",
    name: { en: "Zombie Escape", zh: "僵尸逃亡" },
    category: "community",
    players: "up to 64",
    description: {
      en: "A beloved community mod where dozens of humans sprint through scripted set-piece maps toward an escape point while an ever-growing zombie horde hunts them down.",
      zh: "深受喜爱的社区模组:数十名人类在充满机关演出的地图中冲向撤离点,而不断壮大的僵尸大军在身后穷追不舍。",
    },
    howToPlay: {
      en: "At round start a few players are infected as zombies; a knife hit converts humans to the horde. Survivors must hold chokepoints, trigger map events and reach the escape vehicle before the timer ends. Teamwork and crowd control beat raw aim on ze_ maps.",
      zh: "回合开始时少数玩家被感染为僵尸;僵尸挥刀命中即可将人类拉入尸潮。幸存者需要驻守要道、触发地图机关,并在时限内抵达撤离载具。在 ze_ 地图上,团队协作与控场远比枪法重要。",
    },
    media: ph("zombie-escape", { en: "Zombie Escape", zh: "僵尸逃亡" }, "Flame"),
  },
];

const withArt = (m: GameMode): GameMode => ({
  ...m,
  media: { ...m.media, art: "mode" },
});

export async function getModes(): Promise<GameMode[]> {
  if (DATA_SOURCE === "supabase") return supaAll<GameMode>("game_modes");
  return seed.map(withArt);
}
export async function getModeBySlug(slug: string): Promise<GameMode | null> {
  if (DATA_SOURCE === "supabase") return supaOne<GameMode>("game_modes", "slug", slug);
  const m = seed.find((m) => m.slug === slug);
  return m ? withArt(m) : null;
}
