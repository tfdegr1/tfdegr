import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

/** Section header: index chip + title + trailing rule. */
export function SectionHeading({
  index,
  title,
  accent = "cyan",
  className,
}: {
  index?: string;
  title: string;
  accent?: AccentColor;
  className?: string;
}) {
  return (
    <div
      style={accentVar(ACCENT_HEX[accent])}
      className={cn("flex items-center gap-4", className)}
    >
      {index && (
        <span className="text-accent font-mono text-sm tabular-nums">{index}</span>
      )}
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">
        {title}
      </h2>
      <span className="bg-accent/40 h-px flex-1" />
    </div>
  );
}
