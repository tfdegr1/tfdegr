import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

/** Labeled 0–max stat bar with neon fill. */
export function StatBar({
  label,
  value,
  max = 100,
  accent = "cyan",
  unit = "",
  className,
}: {
  label: string;
  value: number;
  max?: number;
  accent?: AccentColor;
  unit?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={accentVar(ACCENT_HEX[accent])} className={cn("space-y-1", className)}>
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="uppercase tracking-wider text-muted">{label}</span>
        <span className="text-accent tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden bg-edge/60">
        <div className="bg-accent neon-ring h-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
