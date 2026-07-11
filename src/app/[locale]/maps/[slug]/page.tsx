import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import { GlitchTitle } from "@/components/glitch-title";
import { HudPanel } from "@/components/hud-panel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { NeonButton } from "@/components/neon-button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getMapBySlug, getMaps, MAP_TYPE_LABELS } from "@/lib/data/maps";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const maps = await getMaps();
  return routing.locales.flatMap((locale) =>
    maps.map((m) => ({ locale, slug: m.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const map = await getMapBySlug(slug);
  if (!map) return {};
  return {
    title: `${map.name} · Maps`,
    description: localize(map.description, locale as Locale),
  };
}

export default async function MapDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const map = await getMapBySlug(slug);
  if (!map) notFound();

  const t = await getTranslations("common");
  const isZh = locale === "zh";
  const typeLabel = localize(MAP_TYPE_LABELS[map.type], locale);

  const meta: { label: string; value: string; accent?: boolean }[] = [
    { label: isZh ? "类型" : "TYPE", value: typeLabel },
    {
      label: isZh ? "包点" : "BOMBSITES",
      value: map.bombsites?.join(" / ") ?? "—",
    },
    {
      label: isZh ? "发布年份" : "RELEASED",
      value: String(map.releaseYear),
    },
    {
      label: isZh ? "现役状态" : "ACTIVE DUTY",
      value: map.activeDuty ? (isZh ? "现役" : "YES") : (isZh ? "非现役" : "NO"),
      accent: map.activeDuty,
    },
  ];

  return (
    <div className="relative" style={accentVar(ACCENT_HEX.cyan)}>
      {/* Hero */}
      <section className="border-b border-edge">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <NeonButton href="/maps" accent="cyan" variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            {t("back")} // MAPS
          </NeonButton>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <Reveal>
              <MediaPlaceholder media={map.media} locale={locale} />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="kicker text-accent">// MAPS / {map.slug}</p>
              <GlitchTitle
                text={map.name}
                as="h1"
                className="mt-2 text-4xl md:text-5xl"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <Tag accent="cyan">{typeLabel}</Tag>
                {map.bombsites?.map((site) => (
                  <Tag key={site} accent="cyan">
                    {isZh ? `${site} 点` : `SITE ${site}`}
                  </Tag>
                ))}
                <Tag>EST. {map.releaseYear}</Tag>
                {map.activeDuty && (
                  <Tag accent="lime">{isZh ? "现役" : "ACTIVE DUTY"}</Tag>
                )}
              </div>

              <HudPanel
                accent="cyan"
                className="mt-6 divide-y divide-edge font-mono text-sm"
              >
                {meta.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="text-[0.68rem] uppercase tracking-widest text-muted">
                      {row.label}
                    </span>
                    <span
                      className={cn(
                        "uppercase tracking-wider",
                        row.accent === false ? "text-muted" : "text-accent",
                      )}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </HudPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 md:py-16">
        <Reveal>
          <SectionHeading
            index="//01"
            title={isZh ? "地图情报" : "MAP INTEL"}
            accent="cyan"
          />
          <p className="mt-5 max-w-3xl leading-relaxed text-ink/90">
            {localize(map.description, locale)}
          </p>
        </Reveal>

        {map.callouts?.length ? (
          <Reveal>
            <SectionHeading
              index="//02"
              title={isZh ? "点位报点" : "CALLOUTS"}
              accent="cyan"
            />
            <div className="mt-6 grid gap-2 md:grid-cols-2">
              {map.callouts.map((c, i) => (
                <div
                  key={c.name}
                  className="hud-corners flex items-center gap-4 border border-edge bg-panel/60 px-4 py-3 transition-colors hover:border-accent"
                >
                  <span className="text-accent font-mono text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                    {c.name}
                  </span>
                  <span className="ml-auto text-right text-xs leading-relaxed text-muted">
                    {localize(c.area, locale)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {map.overviewVideo && (
          <Reveal>
            <SectionHeading
              index="//03"
              title={isZh ? "地图概览视频" : "OVERVIEW FEED"}
              accent="cyan"
            />
            <YouTubeEmbed
              video={map.overviewVideo}
              locale={locale}
              className="mt-6 max-w-4xl"
            />
          </Reveal>
        )}
      </section>
    </div>
  );
}
