"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ACCENT_HEX, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Tag } from "@/components/tag";
import type { Player } from "@/lib/data/players";

const ROLE_ORDER: Player["role"][] = [
  "AWPer",
  "Rifler",
  "IGL",
  "Support",
  "Entry",
];

type RoleFilter = Player["role"] | "all";

/** Filterable, responsive wall of player cards. */
export function PlayerWall({
  players,
  locale,
  labels,
}: {
  players: Player[];
  locale: Locale;
  labels: { all: string; entries: string; filterByRole: string };
}) {
  const [role, setRole] = useState<RoleFilter>("all");

  const roles = useMemo<RoleFilter[]>(
    () => ["all", ...ROLE_ORDER.filter((r) => players.some((p) => p.role === r))],
    [players],
  );
  const filtered =
    role === "all" ? players : players.filter((p) => p.role === role);

  return (
    <div style={accentVar(ACCENT_HEX.lime)}>
      {/* Role filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          {labels.filterByRole} //
        </span>
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "cursor-pointer border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider transition-all",
              role === r
                ? "border-accent bg-accent-soft text-accent neon-box"
                : "border-edge text-muted hover:border-accent hover:text-accent",
            )}
          >
            {r === "all" ? labels.all : r}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs tabular-nums text-muted">
          {String(filtered.length).padStart(2, "0")} {labels.entries}
        </span>
      </div>

      {/* Card wall */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <PlayerCard key={p.slug} player={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({ player, locale }: { player: Player; locale: Locale }) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className="hud-corners group hover:neon-box relative flex flex-col overflow-hidden border border-edge bg-panel/60 backdrop-blur-sm transition-all hover:border-accent"
    >
      <MediaPlaceholder media={player.media} locale={locale} className="border-0" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display group-hover:text-accent text-lg font-bold uppercase tracking-wide text-ink transition-colors">
            {player.nickname}
          </h3>
          {player.realName && (
            <p className="mt-0.5 text-xs text-muted">{player.realName}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Tag accent="lime">{player.role}</Tag>
          {player.team && <Tag>{player.team}</Tag>}
        </div>

        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-edge/60 pt-2 font-mono text-xs">
          <span className="truncate uppercase tracking-wider text-muted">
            {player.country}
          </span>
          {player.rating !== undefined && (
            <span className="text-accent tabular-nums">
              {player.rating.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
