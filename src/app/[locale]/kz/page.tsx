import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Flame, Footprints, Zap, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { HudPanel } from "@/components/hud-panel";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { KZMapGrid } from "@/components/kz/kz-map-grid";
import { getKZIntro, getKZMaps } from "@/lib/data/kz";
import { localize, type Locale, type LocalizedText } from "@/lib/types";

const COPY: Record<"whatIsKz" | "mapDatabase", LocalizedText> = {
  whatIsKz: { en: "// WHAT IS KZ", zh: "// 什么是 KZ" },
  mapDatabase: { en: "Map Database", zh: "地图数据库" },
};

const TECHNIQUES: {
  key: string;
  Icon: LucideIcon;
  name: LocalizedText;
  desc: LocalizedText;
}[] = [
  {
    key: "bhop",
    Icon: Zap,
    name: { en: "Bunnyhop", zh: "连跳 (Bhop)" },
    desc: {
      en: "Chain jumps on landing to preserve and build speed.",
      zh: "落地瞬间衔接起跳,保持并累积速度。",
    },
  },
  {
    key: "strafe",
    Icon: Flame,
    name: { en: "Air-Strafe", zh: "空中变向" },
    desc: {
      en: "Sync mouse and A/D keys to steer and accelerate mid-air.",
      zh: "鼠标与 A/D 键同步,在空中转向并加速。",
    },
  },
  {
    key: "lj",
    Icon: Footprints,
    name: { en: "Longjump (LJ)", zh: "长跳 (LJ)" },
    desc: {
      en: "Pre-strafe plus perfect strafes for maximum jump distance.",
      zh: "预转向加完美空中变向,追求极限跳跃距离。",
    },
  },
  {
    key: "timer",
    Icon: Clock,
    name: { en: "Timer & Records", zh: "计时与纪录" },
    desc: {
      en: "Checkpoint timers, global ranks and contested world records.",
      zh: "存点计时、全球排名与激烈争夺的世界纪录。",
    },
  },
];

export default async function KZPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations("boards");
  const [intro, maps] = await Promise.all([getKZIntro(), getKZMaps()]);

  return (
    <div>
      <PageHero
        kicker="// KZ"
        accent="cyan"
        title={t("kz.title")}
        subtitle={t("kz.tagline")}
      />

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 md:py-16">
        {/* Discipline explainer */}
        <Reveal>
          <HudPanel accent="cyan" className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="border-accent-soft bg-accent-soft text-accent flex h-10 w-10 shrink-0 items-center justify-center border">
                <Footprints className="h-5 w-5" strokeWidth={1.4} />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {localize(COPY.whatIsKz, locale)}
              </p>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink/90 md:text-base">
              {localize(intro, locale)}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TECHNIQUES.map((tech) => (
                <div
                  key={tech.key}
                  className="border border-edge bg-bg-elev/40 p-4"
                >
                  <tech.Icon
                    className="text-accent h-5 w-5"
                    strokeWidth={1.4}
                  />
                  <p className="font-display mt-2 text-sm font-bold uppercase tracking-wide text-ink">
                    {localize(tech.name, locale)}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {localize(tech.desc, locale)}
                  </p>
                </div>
              ))}
            </div>
          </HudPanel>
        </Reveal>

        {/* Map database */}
        <div>
          <Reveal>
            <SectionHeading
              index="//01"
              title={localize(COPY.mapDatabase, locale)}
              accent="cyan"
            />
          </Reveal>
          <div className="mt-6">
            <KZMapGrid maps={maps} locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
