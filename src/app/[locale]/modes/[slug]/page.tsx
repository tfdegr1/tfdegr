import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import {
  ACCENT_HEX,
  localize,
  type Locale,
  type LocalizedText,
} from "@/lib/types";
import { accentVar } from "@/lib/utils";
import { getModeBySlug, getModes } from "@/lib/data/modes";
import { GlitchTitle } from "@/components/glitch-title";
import { HudPanel } from "@/components/hud-panel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { NeonButton } from "@/components/neon-button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Board-local copy (board agents must not touch messages/*.json).
const LABELS: Record<string, LocalizedText> = {
  briefing: { en: "Briefing", zh: "模式简介" },
  howToPlay: { en: "How to Play", zh: "玩法说明" },
  modeData: { en: "Mode Data", zh: "模式数据" },
  category: { en: "Category", zh: "类别" },
  players: { en: "Players", zh: "人数" },
  official: { en: "Official", zh: "官方" },
  community: { en: "Community", zh: "社区" },
};

export async function generateStaticParams() {
  const modes = await getModes();
  return routing.locales.flatMap((locale) =>
    modes.map((mode) => ({ locale, slug: mode.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const mode = await getModeBySlug(slug);
  if (!mode) return {};
  return {
    title: localize(mode.name, locale as Locale),
    description: localize(mode.description, locale as Locale),
  };
}

export default async function ModeDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("common");
  const mode = await getModeBySlug(slug);
  if (!mode) notFound();

  const name = localize(mode.name, locale);

  return (
    <article
      style={accentVar(ACCENT_HEX.magenta)}
      className="mx-auto max-w-6xl px-4 py-10 md:py-14"
    >
      <NeonButton href="/modes" accent="magenta">
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("back")}
      </NeonButton>

      {/* Header */}
      <header className="mt-8">
        <p className="kicker text-accent mb-3">
          {"// MODES / "}
          {mode.slug.toUpperCase().replace(/-/g, "_")}
        </p>
        <GlitchTitle text={name} as="h1" className="text-4xl md:text-6xl" />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Tag accent="magenta">{localize(LABELS[mode.category], locale)}</Tag>
          <Tag>{mode.players}</Tag>
          <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
            ID:{mode.slug}
          </span>
        </div>
      </header>

      {/* Big media */}
      <Reveal className="mt-8">
        <MediaPlaceholder
          media={{ ...mode.media, aspect: "21/9" }}
          locale={locale}
        />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_290px]">
        <div className="space-y-12">
          {/* Briefing */}
          <Reveal>
            <section>
              <SectionHeading
                index="01"
                title={localize(LABELS.briefing, locale)}
                accent="magenta"
              />
              <p className="mt-5 max-w-3xl leading-relaxed text-muted">
                {localize(mode.description, locale)}
              </p>
            </section>
          </Reveal>

          {/* How to play */}
          <Reveal delay={0.1}>
            <section>
              <SectionHeading
                index="02"
                title={localize(LABELS.howToPlay, locale)}
                accent="magenta"
              />
              <HudPanel accent="magenta" className="mt-5 p-6 md:p-8">
                <p className="kicker text-accent mb-4">// TACTICAL BRIEF</p>
                <p className="leading-relaxed text-ink">
                  {localize(mode.howToPlay, locale)}
                </p>
              </HudPanel>
            </section>
          </Reveal>
        </div>

        {/* Side data panel */}
        <Reveal delay={0.15} className="lg:sticky lg:top-24 lg:self-start">
          <HudPanel accent="magenta" glow={false} className="p-5">
            <p className="kicker text-accent mb-4">
              {"// "}
              {localize(LABELS.modeData, locale)}
            </p>
            <dl className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {localize(LABELS.category, locale)}
                </dt>
                <dd className="text-accent uppercase">
                  {localize(LABELS[mode.category], locale)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-edge pb-3">
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {localize(LABELS.players, locale)}
                </dt>
                <dd className="uppercase text-ink">{mode.players}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  SLUG
                </dt>
                <dd className="text-ink">{mode.slug}</dd>
              </div>
            </dl>
          </HudPanel>
        </Reveal>
      </div>
    </article>
  );
}
