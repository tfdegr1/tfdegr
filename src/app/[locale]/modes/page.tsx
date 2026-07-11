import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localize, type Locale, type LocalizedText } from "@/lib/types";
import { getModes, type GameMode } from "@/lib/data/modes";
import { PageHero } from "@/components/page-hero";
import { BoardCard } from "@/components/board-card";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/reveal";

type Props = { params: Promise<{ locale: string }> };

// Board-local copy (board agents must not touch messages/*.json).
const CATEGORY_LABEL: Record<GameMode["category"], LocalizedText> = {
  official: { en: "Official", zh: "官方" },
  community: { en: "Community", zh: "社区" },
};
const SECTION_TITLE: Record<GameMode["category"], LocalizedText> = {
  official: { en: "Official Matchmaking", zh: "官方匹配玩法" },
  community: { en: "Community Servers", zh: "社区服务器玩法" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boards" });
  return { title: t("modes.title"), description: t("modes.tagline") };
}

function ModeGrid({ modes, locale }: { modes: GameMode[]; locale: Locale }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {modes.map((mode, i) => (
        <Reveal key={mode.slug} delay={Math.min(i * 0.06, 0.3)} className="flex">
          <BoardCard
            href={`/modes/${mode.slug}`}
            title={localize(mode.name, locale)}
            subtitle={localize(mode.description, locale)}
            accent="magenta"
            media={mode.media}
            locale={locale}
            className="flex-1"
            tags={
              <>
                <Tag accent="magenta">
                  {localize(CATEGORY_LABEL[mode.category], locale)}
                </Tag>
                <Tag>{mode.players}</Tag>
              </>
            }
          />
        </Reveal>
      ))}
    </div>
  );
}

export default async function ModesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("boards");
  const tCommon = await getTranslations("common");
  const modes = await getModes();

  const groups: { category: GameMode["category"]; items: GameMode[] }[] = (
    ["official", "community"] as const
  ).map((category) => ({
    category,
    items: modes.filter((m) => m.category === category),
  }));

  return (
    <>
      <PageHero
        kicker="// MODES"
        title={t("modes.title")}
        subtitle={t("modes.tagline")}
        accent="magenta"
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 md:py-16">
        {groups.map(({ category, items }, gi) => (
          <section key={category}>
            <SectionHeading
              index={`0${gi + 1}`}
              title={localize(SECTION_TITLE[category], locale)}
              accent="magenta"
            />
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
              {String(items.length).padStart(2, "0")} {tCommon("entries")}
            </p>
            <div className="mt-6">
              <ModeGrid modes={items} locale={locale} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
