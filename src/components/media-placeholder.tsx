import {
  ACCENT_HEX,
  localize,
  type Locale,
  type MediaPlaceholder as MP,
} from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

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

/** Programmatic, copyright-free placeholder image with a cyberpunk look. */
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
  const Icon = getIcon(media.icon);
  const label = localize(media.label, locale);

  return (
    <div
      style={accentVar(hex, {
        backgroundImage: `linear-gradient(${rot}deg, ${hex}22, transparent 60%), radial-gradient(circle at ${px}% ${py}%, ${hex}33, transparent 55%)`,
      })}
      className={cn(
        "hud-corners scanlines relative overflow-hidden border border-edge bg-panel",
        aspectClass[media.aspect ?? "16/9"],
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <Icon className="text-accent neon-text h-10 w-10" strokeWidth={1.25} />
        <span className="font-display text-lg font-semibold tracking-wide text-ink">
          {label}
        </span>
      </div>
      <span className="absolute left-2 top-2 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
        // IMG
      </span>
      <span className="text-accent pulse-accent absolute bottom-2 right-2 font-mono text-[0.6rem] uppercase tracking-widest">
        NO SIGNAL
      </span>
    </div>
  );
}
