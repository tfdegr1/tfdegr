import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, History } from "lucide-react";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar } from "@/lib/utils";
import { getEras, getHistoryEvents } from "@/lib/data/history";
import { PageHero } from "@/components/page-hero";
import { HudPanel } from "@/components/hud-panel";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/reveal";
import { TimelineItem } from "@/components/history/timeline-item";

const ACCENT = "violet" as const;

/** 'cs1.6' -> 'era-cs1-6' (safe HTML id / anchor). */
function eraAnchor(id: string): string {
  return `era-${id.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boards" });
  return { title: t("history.title"), description: t("history.tagline") };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations("boards");
  const tc = await getTranslations("common");
  const [events, eras] = await Promise.all([getHistoryEvents(), getEras()]);

  const firstYear = events[0]?.year;
  const lastYear = events[events.length - 1]?.year;
  const sections = eras
    .map((era) => ({
      era,
      events: events.filter((e) => e.era === era.id),
    }))
    .filter((s) => s.events.length > 0);

  return (
    <div className="relative">
      <PageHero
        kicker="// HISTORY"
        title={t("history.title")}
        subtitle={t("history.tagline")}
        accent={ACCENT}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tag accent={ACCENT}>
            <Clock className="h-3 w-3" />
            {firstYear}–{lastYear}
          </Tag>
          <Tag accent={ACCENT}>
            <History className="h-3 w-3" />
            {events.length} {tc("entries")}
          </Tag>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Era index / legend */}
        <Reveal>
          <HudPanel accent={ACCENT} className="p-4 md:px-6 md:py-5">
            <p className="kicker text-accent">{"// TIMELINE INDEX"}</p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
              {eras.map((era) => (
                <a
                  key={era.id}
                  href={`#${eraAnchor(era.id)}`}
                  className="group flex items-center gap-2.5"
                >
                  <span className="h-2 w-2 rotate-45 border border-accent bg-accent-soft transition-colors group-hover:bg-accent" />
                  <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink transition-colors group-hover:text-accent">
                    {localize(era.label, locale)}
                  </span>
                  <span className="font-mono text-[0.68rem] tabular-nums text-muted">
                    {era.years}
                  </span>
                </a>
              ))}
            </div>
          </HudPanel>
        </Reveal>

        {/* Timeline, grouped by era */}
        {sections.map(({ era, events: eraEvents }, sectionIndex) => (
          <section
            key={era.id}
            id={eraAnchor(era.id)}
            className="mt-14 scroll-mt-24 md:mt-20"
          >
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <SectionHeading
                  index={`//${String(sectionIndex + 1).padStart(2, "0")}`}
                  title={localize(era.label, locale)}
                  accent={ACCENT}
                  className="min-w-[14rem] flex-1"
                />
                <span className="font-mono text-xs tabular-nums tracking-widest text-muted">
                  [{era.years}]
                </span>
              </div>
            </Reveal>

            <ol className="relative mt-8 space-y-12 lg:mt-10 lg:space-y-16">
              {/* Glowing rail: left on mobile, center on lg+ */}
              <span
                aria-hidden
                className="absolute bottom-0 left-3 top-1 w-px -translate-x-1/2 bg-linear-to-b from-neon-violet/80 via-neon-violet/25 to-neon-violet/60 shadow-[0_0_8px_rgba(177,75,255,0.5)] lg:left-1/2"
              />
              {eraEvents.map((event, i) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  eraLabel={era.label}
                  locale={locale}
                  side={i % 2 === 0 ? "left" : "right"}
                  delay={Math.min(i * 0.06, 0.3)}
                />
              ))}
            </ol>
          </section>
        ))}

        {/* Terminator */}
        <div
          className="mt-16 flex flex-col items-center gap-3 md:mt-20"
          style={accentVar(ACCENT_HEX[ACCENT])}
        >
          <span className="pulse-accent h-3 w-3 rotate-45 border border-accent bg-accent-soft" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {`// END OF LOG — ${lastYear}+`}
          </p>
        </div>
      </div>
    </div>
  );
}
