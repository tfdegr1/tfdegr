import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Glitchy heading. Pure CSS (server component). The text is duplicated into
 * ::before/::after via the data-text attribute (see globals.css .glitch).
 */
export function GlitchTitle({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      data-text={text}
      className={cn(
        "glitch font-display font-bold tracking-tight text-ink",
        className,
      )}
    >
      {text}
    </Tag>
  );
}
