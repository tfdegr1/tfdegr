import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Tag } from "@/components/tag";
import { TournamentExplorer } from "@/components/tournaments/tournament-explorer";
import { formatPrize, getTournaments } from "@/lib/data/tournaments";
import type { Locale } from "@/lib/types";

export default async function TournamentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const isZh = locale === "zh";

  const t = await getTranslations("boards");
  const tournaments = await getTournaments(); // already sorted by year desc

  const majors = tournaments.filter((tt) => tt.isMajor).length;
  const totalPrize = tournaments.reduce((sum, tt) => sum + tt.prizePool, 0);

  return (
    <div>
      <PageHero
        kicker="// TOURNAMENTS"
        accent="magenta"
        title={t("tournaments.title")}
        subtitle={t("tournaments.tagline")}
      >
        <div className="flex flex-wrap gap-2">
          <Tag accent="magenta" className="tabular-nums">
            {String(tournaments.length).padStart(2, "0")}{" "}
            {isZh ? "场赛事" : "EVENTS"}
          </Tag>
          <Tag accent="magenta" className="tabular-nums">
            {String(majors).padStart(2, "0")} MAJOR
          </Tag>
          <Tag className="tabular-nums">
            {formatPrize(totalPrize)} {isZh ? "累计奖金" : "TOTAL PRIZE"}
          </Tag>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <TournamentExplorer tournaments={tournaments} locale={locale} />
      </section>
    </div>
  );
}
