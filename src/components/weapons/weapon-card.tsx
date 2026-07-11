import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { StatBar } from "@/components/stat-bar";
import { Tag } from "@/components/tag";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import {
  CATEGORY_LABEL,
  SIDE_LABEL,
  STAT_LABEL,
  STAT_MAX,
  type Weapon,
} from "@/lib/data/weapons";

/** Grid card for one weapon: media, name, category, price + two stat bars. */
export function WeaponCard({
  weapon,
  locale,
  className,
}: {
  weapon: Weapon;
  locale: Locale;
  className?: string;
}) {
  return (
    <Link
      href={`/weapons/${weapon.slug}`}
      style={accentVar(ACCENT_HEX.amber)}
      className={cn(
        "hud-corners group hover:border-accent hover:neon-box relative flex h-full flex-col overflow-hidden border border-edge bg-panel/60 backdrop-blur-sm transition-all",
        className,
      )}
    >
      <MediaPlaceholder media={weapon.media} locale={locale} className="border-0" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display group-hover:text-accent text-lg font-bold uppercase tracking-wide text-ink transition-colors">
            {weapon.name}
          </h3>
          <ArrowUpRight className="group-hover:text-accent h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Tag accent="amber">{localize(CATEGORY_LABEL[weapon.category], locale)}</Tag>
          <Tag>{localize(SIDE_LABEL[weapon.side], locale)}</Tag>
          <span className="text-accent ml-auto font-mono text-sm font-semibold tabular-nums">
            ${weapon.price.toLocaleString("en-US")}
          </span>
        </div>

        <div className="mt-auto space-y-2 pt-1">
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
        </div>
      </div>
    </Link>
  );
}
