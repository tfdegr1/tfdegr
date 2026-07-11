import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { WeaponsGrid } from "@/components/weapons/weapons-grid";
import { getWeapons } from "@/lib/data/weapons";
import type { Locale } from "@/lib/types";

export default async function WeaponsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations("boards");
  const tc = await getTranslations("common");
  const weapons = await getWeapons();

  return (
    <div>
      <PageHero
        title={t("weapons.title")}
        subtitle={t("weapons.tagline")}
        kicker="// WEAPONS"
        accent="amber"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-neon-amber neon-text tabular-nums">
            {String(weapons.length).padStart(2, "0")}
          </span>{" "}
          {tc("entries")} · {"$"}200 – {"$"}4,750
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <WeaponsGrid weapons={weapons} locale={locale} />
      </section>
    </div>
  );
}
