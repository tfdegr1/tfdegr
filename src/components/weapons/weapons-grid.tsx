"use client";

import { useMemo, useState } from "react";
import { ACCENT_HEX, localize, type Locale, type LocalizedText } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import {
  CATEGORY_LABEL,
  type Weapon,
  type WeaponCategory,
} from "@/lib/data/weapons";
import { WeaponCard } from "./weapon-card";

const CATEGORY_ORDER: WeaponCategory[] = [
  "pistol",
  "smg",
  "rifle",
  "sniper",
  "heavy",
  "knife",
  "grenade",
];

const ALL_LABEL: LocalizedText = { en: "All", zh: "全部" };

type Filter = WeaponCategory | "all";

/** Client-side category filter + responsive card grid. */
export function WeaponsGrid({
  weapons,
  locale,
}: {
  weapons: Weapon[];
  locale: Locale;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => weapons.some((w) => w.category === c)),
    [weapons],
  );
  const visible =
    filter === "all" ? weapons : weapons.filter((w) => w.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Weapon category filter"
        className="flex flex-wrap gap-2"
      >
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={localize(ALL_LABEL, locale)}
          count={weapons.length}
        />
        {categories.map((c) => (
          <FilterChip
            key={c}
            active={filter === c}
            onClick={() => setFilter(c)}
            label={localize(CATEGORY_LABEL[c], locale)}
            count={weapons.filter((w) => w.category === c).length}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((w) => (
          <WeaponCard key={w.slug} weapon={w} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={accentVar(ACCENT_HEX.amber)}
      className={cn(
        "hud-corners inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-all",
        active
          ? "border-accent bg-accent-soft text-accent neon-box"
          : "hover:border-accent hover:text-accent border-edge text-muted",
      )}
    >
      {label}
      <span className="tabular-nums opacity-70">{count}</span>
    </button>
  );
}
