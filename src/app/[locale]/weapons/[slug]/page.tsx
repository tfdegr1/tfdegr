import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { GlitchTitle } from "@/components/glitch-title";
import { HudPanel } from "@/components/hud-panel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatBar } from "@/components/stat-bar";
import { Tag } from "@/components/tag";
import { localize, type Locale, type LocalizedText } from "@/lib/types";
import {
  CATEGORY_LABEL,
  PENETRATION_LABEL,
  SIDE_LABEL,
  STAT_LABEL,
  STAT_MAX,
  getWeaponBySlug,
  getWeapons,
} from "@/lib/data/weapons";

type Props = { params: Promise<{ locale: string; slug: string }> };

const INTEL_LABEL: LocalizedText = { en: "Field intel", zh: "武器简介" };
const LOADOUT_LABEL: LocalizedText = { en: "Loadout data", zh: "装备数据" };

export async function generateStaticParams() {
  const items = await getWeapons();
  return routing.locales.flatMap((l) =>
    items.map((w) => ({ locale: l, slug: w.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const weapon = await getWeaponBySlug(slug);
  return { title: weapon?.name ?? "Weapons" };
}

export default async function WeaponDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const weapon = await getWeaponBySlug(slug);
  if (!weapon) notFound();

  const tc = await getTranslations("common");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      {/* Back link */}
      <Link
        href="/weapons"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-neon-amber"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        {tc("back")} // WEAPONS
      </Link>

      {/* Header */}
      <header className="mt-6">
        <p className="kicker text-neon-amber neon-text mb-3">
          {`// WEAPONS / ${localize(CATEGORY_LABEL[weapon.category], locale).toUpperCase()}`}
        </p>
        <GlitchTitle text={weapon.name} as="h1" className="text-4xl md:text-6xl" />
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Tag accent="amber">{localize(CATEGORY_LABEL[weapon.category], locale)}</Tag>
          <Tag>{localize(SIDE_LABEL[weapon.side], locale)}</Tag>
          <Tag>
            {localize(STAT_LABEL.penetration, locale)}:{" "}
            {localize(PENETRATION_LABEL[weapon.penetration], locale)}
          </Tag>
          {weapon.introduced && (
            <Tag>
              {localize(STAT_LABEL.introduced, locale)}: {weapon.introduced}
            </Tag>
          )}
        </div>
      </header>

      {/* Media + combat stats */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <Reveal>
          <MediaPlaceholder media={weapon.media} locale={locale} />
          <div className="mt-6">
            <SectionHeading index="//01" title={localize(INTEL_LABEL, locale)} accent="amber" />
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              {localize(weapon.description, locale)}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <HudPanel accent="amber" className="p-5 md:p-6">
            <SectionHeading index="//02" title={tc("stats")} accent="amber" />
            <div className="mt-5 space-y-4">
              <StatBar
                label={localize(STAT_LABEL.damage, locale)}
                value={weapon.damage}
                max={STAT_MAX.damage}
                accent="amber"
              />
              <StatBar
                label={localize(STAT_LABEL.fireRate, locale)}
                value={weapon.fireRate}
                max={STAT_MAX.fireRate}
                accent="amber"
                unit=" RPM"
              />
              <StatBar
                label={localize(STAT_LABEL.accuracy, locale)}
                value={weapon.accuracy}
                accent="amber"
              />
              <StatBar
                label={localize(STAT_LABEL.mobility, locale)}
                value={weapon.mobility}
                accent="amber"
              />
            </div>
          </HudPanel>
        </Reveal>
      </div>

      {/* Loadout data tiles */}
      <Reveal delay={0.15} className="mt-12">
        <SectionHeading index="//03" title={localize(LOADOUT_LABEL, locale)} accent="amber" />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            label={localize(STAT_LABEL.price, locale)}
            value={`$${weapon.price.toLocaleString("en-US")}`}
          />
          <StatTile
            label={localize(STAT_LABEL.killAward, locale)}
            value={`$${weapon.killAward.toLocaleString("en-US")}`}
          />
          <StatTile
            label={localize(STAT_LABEL.magazine, locale)}
            value={`${weapon.magazine}`}
            suffix="RDS"
          />
          <StatTile
            label={localize(STAT_LABEL.penetration, locale)}
            value={localize(PENETRATION_LABEL[weapon.penetration], locale)}
          />
        </div>
      </Reveal>
    </div>
  );
}

/** Small HUD stat tile: mono label on top, big amber value below. */
function StatTile({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="hud-corners border border-edge bg-panel/60 px-4 py-4 backdrop-blur-sm">
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-bold tabular-nums text-neon-amber">
        {value}
        {suffix && (
          <span className="ml-1 align-baseline font-mono text-xs font-normal text-muted">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
