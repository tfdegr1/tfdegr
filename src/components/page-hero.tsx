import type { ReactNode } from "react";
import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { GlitchTitle } from "./glitch-title";

/** Standard board page hero. */
export function PageHero({
  title,
  subtitle,
  kicker,
  accent = "cyan",
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  accent?: AccentColor;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      style={accentVar(ACCENT_HEX[accent])}
      className={cn("relative border-b border-edge", className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        {kicker && <p className="kicker text-accent mb-3">{kicker}</p>}
        <GlitchTitle
          text={title}
          as="h1"
          className="text-4xl md:text-6xl"
        />
        {subtitle && (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div className="bg-accent neon-ring absolute bottom-0 left-0 h-px w-1/3" />
    </section>
  );
}
