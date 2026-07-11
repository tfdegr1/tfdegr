"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { BoardCard } from "@/components/board-card";
import { Tag } from "@/components/tag";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { MAP_TYPE_LABELS, type CSMap } from "@/lib/data/maps";

type TypeFilter = "all" | CSMap["type"];

const ALL_LABEL = { en: "All", zh: "全部" };
const ACTIVE_DUTY_LABEL = { en: "Active Duty", zh: "现役" };

/** Filterable map card grid (client: holds the type-filter state). */
export function MapGrid({ maps, locale }: { maps: CSMap[]; locale: Locale }) {
  const t = useTranslations("common");
  const [filter, setFilter] = useState<TypeFilter>("all");

  const types = useMemo<TypeFilter[]>(
    () => ["all", ...Array.from(new Set(maps.map((m) => m.type)))],
    [maps],
  );
  const filtered =
    filter === "all" ? maps : maps.filter((m) => m.type === filter);

  return (
    <div style={accentVar(ACCENT_HEX.cyan)}>
      {/* Type filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          // FILTER:
        </span>
        {types.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setFilter(tf)}
            aria-pressed={filter === tf}
            className={cn(
              "hud-corners border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest transition-all",
              filter === tf
                ? "text-accent border-accent bg-accent-soft neon-box"
                : "border-edge text-muted hover:border-accent-soft hover:text-ink",
            )}
          >
            {tf === "all"
              ? localize(ALL_LABEL, locale)
              : localize(MAP_TYPE_LABELS[tf], locale)}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs tabular-nums text-muted">
          {String(filtered.length).padStart(2, "0")} {t("entries")}
        </span>
      </div>

      {/* Card grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <BoardCard
            key={m.slug}
            href={`/maps/${m.slug}`}
            title={m.name}
            subtitle={localize(m.description, locale)}
            accent="cyan"
            media={m.media}
            locale={locale}
            className="h-full"
            tags={
              <>
                <Tag accent="cyan">{localize(MAP_TYPE_LABELS[m.type], locale)}</Tag>
                {m.activeDuty && (
                  <Tag accent="lime">{localize(ACTIVE_DUTY_LABEL, locale)}</Tag>
                )}
                <Tag>{m.releaseYear}</Tag>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}
