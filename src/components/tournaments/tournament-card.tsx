import { Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Tag } from "@/components/tag";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { formatPrize, type Tournament } from "@/lib/data/tournaments";

/** Grid card for one tournament, linking to its detail page. */
export function TournamentCard({
  tournament,
  locale,
  className,
}: {
  tournament: Tournament;
  locale: Locale;
  className?: string;
}) {
  return (
    <Link
      href={`/tournaments/${tournament.slug}`}
      style={accentVar(ACCENT_HEX.magenta)}
      className={cn(
        "hud-corners group hover:border-accent hover:neon-box relative flex flex-col overflow-hidden border border-edge bg-panel/60 backdrop-blur-sm transition-all",
        className,
      )}
    >
      <MediaPlaceholder
        media={tournament.media}
        locale={locale}
        className="border-0"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display group-hover:text-accent text-lg font-bold uppercase tracking-wide text-ink transition-colors">
          {tournament.name}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          <Tag className="tabular-nums">{tournament.year}</Tag>
          <Tag>TIER {tournament.tier}</Tag>
          {tournament.isMajor && <Tag accent="magenta">MAJOR</Tag>}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {localize(tournament.description, locale)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-edge pt-3">
          <span className="flex min-w-0 items-center gap-1.5 text-sm text-ink">
            <Trophy className="text-accent h-4 w-4 shrink-0" strokeWidth={1.6} />
            <span className="truncate">{tournament.winner}</span>
          </span>
          <span className="text-accent font-mono text-sm tabular-nums">
            {formatPrize(tournament.prizePool)}
          </span>
        </div>
      </div>
    </Link>
  );
}
