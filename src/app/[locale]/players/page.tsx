import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PlayerWall } from "@/components/players/player-wall";
import { getPlayers } from "@/lib/data/players";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boards" });
  return { title: t("players.title"), description: t("players.tagline") };
}

export default async function PlayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const isZh = locale === "zh";

  const t = await getTranslations("boards");
  const tc = await getTranslations("common");
  const players = await getPlayers();

  return (
    <div>
      <PageHero
        kicker="// PLAYERS"
        title={t("players.title")}
        subtitle={t("players.tagline")}
        accent="lime"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Reveal>
          <SectionHeading
            index="//01"
            title={isZh ? "选手名册" : "Roster"}
            accent="lime"
          />
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {isZh
              ? "从 1.6 到 CS2 的传奇与新星 —— 点击卡片查看选手档案。"
              : "Legends and rising stars from 1.6 to CS2 — open a card to read the full player file."}
          </p>
        </Reveal>

        <div className="mt-8">
          <PlayerWall
            players={players}
            locale={locale}
            labels={{
              all: isZh ? "全部" : "All",
              entries: tc("entries"),
              filterByRole: isZh ? "位置" : "Role",
            }}
          />
        </div>
      </section>
    </div>
  );
}
