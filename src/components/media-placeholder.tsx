import {
  ACCENT_HEX,
  localize,
  type Locale,
  type MediaPlaceholder as MP,
} from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import { MediaArt } from "./media-art";

const aspectClass: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "21/9": "aspect-[21/9]",
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Programmatic, copyright-free media tile with a cyberpunk look.
 *  Renders subject-specific vector art when `media.art` is set. */
export function MediaPlaceholder({
  media,
  locale,
  className,
}: {
  media: MP;
  locale: Locale;
  className?: string;
}) {
  const accent = media.accent ?? "cyan";
  const hex = ACCENT_HEX[accent];
  const h = hash(media.seed);
  const rot = h % 360;
  const px = 15 + (h % 55);
  const py = 20 + ((h >> 3) % 50);
  const label = localize(media.label, locale);
  const Icon = getIcon(media.icon);

  return (
    <div
      style={accentVar(hex, {
        backgroundImage: `linear-gradient(${rot}deg, ${hex}1e, transparent 60%), radial-gradient(circle at ${px}% ${py}%, ${hex}2b, transparent 55%)`,
      })}
      className={cn(
        "hud-corners scanlines relative overflow-hidden border border-edge bg-panel",
        aspectClass[media.aspect ?? "16/9"],
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-30" />

      {media.art ? (
        <MediaArt
          art={media.art}
          seed={media.seed}
          accent={accent}
          label={label}
          variant={media.variant}
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <Icon className="text-accent neon-text h-10 w-10" strokeWidth={1.25} />
          <span className="font-display text-lg font-semibold tracking-wide text-ink">
            {label}
          </span>
        </div>
      )}

      <span className="absolute left-2 top-2 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
        // IMG
      </span>

      {media.art && (
        <span className="absolute bottom-2 left-2 max-w-[88%] truncate border border-edge bg-bg/70 px-1.5 py-0.5 font-mono text-[0.64rem] uppercase tracking-widest text-ink backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
