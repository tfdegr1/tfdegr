"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ACCENT_HEX, type AccentColor } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  accent?: AccentColor;
  variant?: "solid" | "ghost";
  className?: string;
  children: ReactNode;
};

/** Angular neon button; renders a locale-aware Link when `href` is given. */
export function NeonButton({
  href,
  onClick,
  accent = "cyan",
  variant = "ghost",
  className,
  children,
}: Props) {
  const cls = cn(
    "hud-corners group inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all",
    variant === "solid"
      ? "bg-accent border-accent text-bg neon-ring hover:brightness-110"
      : "text-accent border-accent-soft bg-accent-soft hover:bg-accent-softer hover:border-accent",
    className,
  );
  const style = accentVar(ACCENT_HEX[accent]);

  if (href) {
    return (
      <Link href={href} style={style} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} style={style} className={cls}>
      {children}
    </button>
  );
}
