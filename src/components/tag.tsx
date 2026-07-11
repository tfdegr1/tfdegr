import type { ReactNode } from "react";
import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

/** Small monospace pill / badge. */
export function Tag({
  accent,
  className,
  children,
}: {
  accent?: AccentColor;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      style={accent ? accentVar(ACCENT_HEX[accent]) : undefined}
      className={cn(
        "inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider",
        accent
          ? "text-accent border-accent-soft bg-accent-soft"
          : "border-edge text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
