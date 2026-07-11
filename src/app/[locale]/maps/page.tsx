import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { MapGrid } from "@/components/maps/map-grid";
import { getMaps } from "@/lib/data/maps";
import type { Locale } from "@/lib/types";

export default async function MapsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations("boards");
  const maps = await getMaps();

  return (
    <div className="relative">
      <PageHero
        kicker="// MAPS"
        title={t("maps.title")}
        subtitle={t("maps.tagline")}
        accent="cyan"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Reveal>
          <MapGrid maps={maps} locale={locale} />
        </Reveal>
      </section>
    </div>
  );
}
