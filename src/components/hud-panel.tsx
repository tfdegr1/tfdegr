import type { ReactNode } from "react";
import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

/** Angular, glowing HUD panel container. */
export function HudPanel({
  accent = "cyan",
  glow = true,
  className,
  children,
}: {
  accent?: AccentColor;
  glow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={accentVar(ACCENT_HEX[accent])}
      className={cn(
        "hud-corners relative border border-edge bg-panel/70 backdrop-blur-sm",
        glow && "neon-box",
        className,
      )}
    >
      {children}
    </div>
  );
}
