"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Tag } from "@/components/tag";
import type { KZMap, KZStyle, KZTier } from "@/lib/data/kz";
import {
  ACCENT_HEX,
  localize,
  type Locale,
  type LocalizedText,
} from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

const STYLES: KZStyle[] = ["KZT", "SKZ", "VNL"];

const UI: Record<"style" | "tier" | "all" | "empty", LocalizedText> = {
  style: { en: "Style", zh: "风格" },
  tier: { en: "Tier", zh: "难度" },
  all: { en: "All", zh: "全部" },
  empty: {
    en: "No maps match the current filter.",
    zh: "没有符合当前筛选条件的地图。",
  },
};

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider transition-colors",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-edge text-muted hover:border-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
        {label} //
      </span>
      {children}
    </div>
  );
}

function KZMapCard({ map, locale }: { map: KZMap; locale: Locale }) {
  return (
    <Link
      href={`/kz/${map.slug}`}
      className="hud-corners group relative flex h-full flex-col overflow-hidden border border-edge bg-panel/60 backdrop-blur-sm transition-all hover:border-accent hover:neon-box"
    >
      <MediaPlaceholder media={map.media} locale={locale} className="border-0" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-base font-bold tracking-tight text-ink transition-colors hover:text-accent">
            {map.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {localize(map.description, locale)}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <Tag accent="cyan">TIER {map.tier}</Tag>
          <Tag>{map.style}</Tag>
        </div>
      </div>
    </Link>
  );
}

/** Filterable KZ map grid (client): filter by movement style and tier. */
export function KZMapGrid({ maps, locale }: { maps: KZMap[]; locale: Locale }) {
  const t = useTranslations("common");
  const [style, setStyle] = useState<KZStyle | "ALL">("ALL");
  const [tier, setTier] = useState<KZTier | "ALL">("ALL");

  const tiers = useMemo(
    () =>
      Array.from(new Set(maps.map((m) => m.tier))).sort((a, b) => a - b),
    [maps],
  );

  const filtered = useMemo(
    () =>
      maps.filter(
        (m) =>
          (style === "ALL" || m.style === style) &&
          (tier === "ALL" || m.tier === tier),
      ),
    [maps, style, tier],
  );

  return (
    <div style={accentVar(ACCENT_HEX.cyan)} className="space-y-5">
      {/* Filter console */}
      <div className="hud-corners space-y-3 border border-edge bg-panel/40 p-4">
        <FilterRow label={localize(UI.style, locale)}>
          <FilterButton active={style === "ALL"} onClick={() => setStyle("ALL")}>
            {localize(UI.all, locale)}
          </FilterButton>
          {STYLES.map((s) => (
            <FilterButton key={s} active={style === s} onClick={() => setStyle(s)}>
              {s}
            </FilterButton>
          ))}
        </FilterRow>
        <FilterRow label={localize(UI.tier, locale)}>
          <FilterButton active={tier === "ALL"} onClick={() => setTier("ALL")}>
            {localize(UI.all, locale)}
          </FilterButton>
          {tiers.map((n) => (
            <FilterButton key={n} active={tier === n} onClick={() => setTier(n)}>
              T{n}
            </FilterButton>
          ))}
        </FilterRow>
      </div>

      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">
        <span className="text-accent">{filtered.length}</span> / {maps.length}{" "}
        {t("entries")}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <KZMapCard key={m.slug} map={m} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="hud-corners scanlines flex items-center justify-center border border-edge bg-panel/40 py-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {localize(UI.empty, locale)}
          </span>
        </div>
      )}
    </div>
  );
}
