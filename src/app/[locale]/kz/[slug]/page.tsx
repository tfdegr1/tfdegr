import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock, Footprints, Zap } from "lucide-react";
import { routing } from "@/i18n/routing";
import { GlitchTitle } from "@/components/glitch-title";
import { HudPanel } from "@/components/hud-panel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { NeonButton } from "@/components/neon-button";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Reveal } from "@/components/reveal";
import {
  getKZMapBySlug,
  getKZMaps,
  KZ_STYLE_LABELS,
  KZ_TIER_LABELS,
} from "@/lib/data/kz";
import {
  ACCENT_HEX,
  localize,
  type Locale,
  type LocalizedText,
} from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

const COPY: Record<
  "briefing" | "worldRecord" | "mapData" | "name" | "tier" | "difficulty" | "style" | "wrStatus" | "linked",
  LocalizedText
> = {
  briefing: { en: "Map Briefing", zh: "地图简介" },
  worldRecord: { en: "World Record", zh: "世界纪录" },
  mapData: { en: "// MAP_DATA", zh: "// 地图数据" },
  name: { en: "Name", zh: "名称" },
  tier: { en: "Tier", zh: "难度等级" },
  difficulty: { en: "Difficulty", zh: "难度评价" },
  style: { en: "Style", zh: "移动风格" },
  wrStatus: { en: "WR Uplink", zh: "纪录信号" },
  linked: { en: "Linked", zh: "已接入" },
};

export async function generateStaticParams() {
  const maps = await getKZMaps();
  return routing.locales.flatMap((locale) =>
    maps.map((m) => ({ locale, slug: m.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const map = await getKZMapBySlug(slug);
  if (!map) return {};
  return {
    title: `${map.name} · KZ`,
    description: localize(map.description, locale as Locale),
  };
}

export default async function KZMapPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const tc = await getTranslations("common");
  const map = await getKZMapBySlug(slug);
  if (!map) notFound();

  const tierLabel = localize(KZ_TIER_LABELS[map.tier], locale);

  return (
    <div>
      {/* Header */}
      <section
        style={accentVar(ACCENT_HEX.cyan)}
        className="relative border-b border-edge"
      >
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 md:pb-14">
          <NeonButton href="/kz" accent="cyan" variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4" />
            {tc("back")}
          </NeonButton>
          <p className="kicker text-accent mb-3">{`// KZ / MAP_FILE / ${map.slug}`}</p>
          <GlitchTitle
            text={map.name}
            as="h1"
            className="break-all text-3xl sm:text-4xl md:text-6xl"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <Tag accent="cyan">TIER {map.tier}</Tag>
            <Tag accent="cyan">{map.style}</Tag>
            <Tag>{tierLabel}</Tag>
            <Tag>{KZ_STYLE_LABELS[map.style]}</Tag>
          </div>
        </div>
        <div className="bg-accent neon-ring absolute bottom-0 left-0 h-px w-1/3" />
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0 space-y-10">
            <Reveal>
              <MediaPlaceholder media={map.media} locale={locale} />
            </Reveal>

            <Reveal>
              <SectionHeading
                index="//01"
                title={localize(COPY.briefing, locale)}
                accent="cyan"
              />
              <HudPanel accent="cyan" glow={false} className="mt-4 p-6">
                <p className="leading-relaxed text-ink/90">
                  {localize(map.description, locale)}
                </p>
              </HudPanel>
            </Reveal>

            {map.recordVideo && (
              <Reveal>
                <SectionHeading
                  index="//02"
                  title={localize(COPY.worldRecord, locale)}
                  accent="cyan"
                />
                <div className="mt-4">
                  <YouTubeEmbed video={map.recordVideo} locale={locale} />
                </div>
              </Reveal>
            )}
          </div>

          {/* Side data panel */}
          <div className="min-w-0">
            <Reveal>
              <HudPanel accent="cyan" className="p-6 lg:sticky lg:top-24">
                <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                  {localize(COPY.mapData, locale)}
                </h2>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                      {localize(COPY.name, locale)}
                    </dt>
                    <dd className="mt-1 break-all font-mono text-sm text-ink">
                      {map.name}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                      <Zap className="h-3.5 w-3.5" />
                      {localize(COPY.tier, locale)}
                    </dt>
                    <dd className="mt-2">
                      <div className="flex items-center gap-1.5">
                        {([1, 2, 3, 4, 5, 6, 7] as const).map((n) => (
                          <span
                            key={n}
                            className={cn(
                              "h-2 flex-1",
                              n <= map.tier
                                ? "bg-accent neon-ring"
                                : "border border-edge bg-panel-2",
                            )}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between font-mono text-[0.65rem] text-muted">
                        <span>T1</span>
                        <span className="text-accent">
                          T{map.tier} · {tierLabel}
                        </span>
                        <span>T7</span>
                      </div>
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                      <Footprints className="h-3.5 w-3.5" />
                      {localize(COPY.style, locale)}
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-ink">
                      {map.style}{" "}
                      <span className="text-muted">
                        // {KZ_STYLE_LABELS[map.style]}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                      <Clock className="h-3.5 w-3.5" />
                      {localize(COPY.wrStatus, locale)}
                    </dt>
                    <dd className="mt-1 font-mono text-sm">
                      {map.recordVideo?.videoId ? (
                        <span className="text-accent">
                          {localize(COPY.linked, locale)}
                        </span>
                      ) : (
                        <span className="pulse-accent text-accent">
                          {tc("comingSoon")}
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </HudPanel>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
