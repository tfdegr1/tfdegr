import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  ACCENT_HEX,
  type AccentColor,
  type Locale,
  type MediaPlaceholder as MP,
} from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { MediaPlaceholder } from "./media-placeholder";

/** Versatile clickable card. Show either a `media` placeholder or an `Icon`. */
export function BoardCard({
  href,
  title,
  subtitle,
  accent = "cyan",
  Icon,
  media,
  locale,
  tags,
  index,
  className,
}: {
  href: string;
  title: string;
  subtitle?: string;
  accent?: AccentColor;
  Icon?: LucideIcon;
  media?: MP;
  locale?: Locale;
  tags?: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      style={accentVar(ACCENT_HEX[accent])}
      className={cn(
        "hud-corners group hover:border-accent hover:neon-box relative flex flex-col overflow-hidden border border-edge bg-panel/60 backdrop-blur-sm transition-all",
        className,
      )}
    >
      {media && locale ? (
        <MediaPlaceholder media={media} locale={locale} className="border-0" />
      ) : Icon ? (
        <div className="flex items-center justify-between p-5 pb-0">
          <span className="text-accent border-accent-soft bg-accent-soft flex h-12 w-12 items-center justify-center border">
            <Icon className="h-6 w-6" strokeWidth={1.4} />
          </span>
          {index && <span className="font-mono text-xs text-muted">{index}</span>}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display group-hover:text-accent text-lg font-bold uppercase tracking-wide text-ink transition-colors">
            {title}
          </h3>
          <ArrowUpRight className="group-hover:text-accent h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        {subtitle && (
          <p className="text-sm leading-relaxed text-muted">{subtitle}</p>
        )}
        {tags && <div className="mt-auto flex flex-wrap gap-1.5 pt-2">{tags}</div>}
      </div>
    </Link>
  );
}
