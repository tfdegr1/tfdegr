"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { ACCENT_HEX, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import type { Tournament } from "@/lib/data/tournaments";
import { TournamentCard } from "./tournament-card";

function FilterChip({
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
          ? "border-accent bg-accent-soft text-accent neon-ring"
          : "hover:border-accent hover:text-accent border-edge text-muted",
      )}
    >
      {children}
    </button>
  );
}

/** Client-side filter (majors only / by year) + responsive card grid. */
export function TournamentExplorer({
  tournaments,
  locale,
}: {
  tournaments: Tournament[];
  locale: Locale;
}) {
  const [majorsOnly, setMajorsOnly] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const isZh = locale === "zh";

  const years = useMemo(
    () =>
      [...new Set(tournaments.map((t) => t.year))].sort((a, b) => b - a),
    [tournaments],
  );

  const filtered = tournaments.filter(
    (t) => (!majorsOnly || t.isMajor) && (year === null || t.year === year),
  );

  return (
    <div style={accentVar(ACCENT_HEX.magenta)}>
      {/* Filter HUD */}
      <div className="flex flex-col gap-3 border border-edge bg-panel/40 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted">
            {isZh ? "// 筛选" : "// FILTER"}
          </span>
          <FilterChip active={!majorsOnly} onClick={() => setMajorsOnly(false)}>
            {isZh ? "全部赛事" : "All events"}
          </FilterChip>
          <FilterChip active={majorsOnly} onClick={() => setMajorsOnly(true)}>
            {isZh ? "仅 Major" : "Majors only"}
          </FilterChip>
          <span className="mx-1 hidden h-4 w-px bg-edge md:inline-block" />
          <FilterChip active={year === null} onClick={() => setYear(null)}>
            {isZh ? "全部年份" : "All years"}
          </FilterChip>
          {years.map((y) => (
            <FilterChip
              key={y}
              active={year === y}
              onClick={() => setYear(year === y ? null : y)}
            >
              {y}
            </FilterChip>
          ))}
        </div>
        <p className="text-accent shrink-0 font-mono text-xs tabular-nums tracking-widest">
          {String(filtered.length).padStart(2, "0")} //{" "}
          {isZh ? "条记录" : "RECORDS"}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <Reveal key={t.slug} delay={Math.min(i, 8) * 0.04}>
              <TournamentCard tournament={t} locale={locale} className="h-full" />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="hud-corners scanlines mt-6 flex items-center justify-center border border-edge bg-panel p-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {isZh ? "无信号 // 0 条记录" : "NO SIGNAL // 0 RECORDS"}
          </span>
        </div>
      )}
    </div>
  );
}
