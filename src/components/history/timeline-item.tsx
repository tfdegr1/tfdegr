import {
  ACCENT_HEX,
  localize,
  type Locale,
  type LocalizedText,
} from "@/lib/types";
import type { HistoryEvent } from "@/lib/data/history";
import { accentVar, cn } from "@/lib/utils";
import { HudPanel } from "@/components/hud-panel";
import { Tag } from "@/components/tag";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";

/**
 * One node on the HISTORY timeline.
 *
 * Mobile: content sits right of a glowing left rail.
 * Desktop (lg+): the rail moves to the center and cards alternate sides.
 */
export function TimelineItem({
  event,
  eraLabel,
  locale,
  side,
  delay = 0,
}: {
  event: HistoryEvent;
  eraLabel: LocalizedText;
  locale: Locale;
  side: "left" | "right";
  delay?: number;
}) {
  const isLeft = side === "left";

  return (
    <li className="relative pl-10 sm:pl-12 lg:pl-0" style={accentVar(ACCENT_HEX.violet)}>
      {/* Node: rotated diamond sitting on the rail */}
      <span
        aria-hidden
        className="neon-ring absolute left-3 top-2 z-10 flex h-3.5 w-3.5 -translate-x-1/2 rotate-45 items-center justify-center border border-accent bg-bg lg:left-1/2"
      >
        <span className="pulse-accent h-1 w-1 bg-accent" />
      </span>

      {/* Connector tick: rail -> card (mobile) */}
      <span
        aria-hidden
        className="absolute left-3 top-[15px] h-px w-5 bg-[color-mix(in_srgb,var(--accent)_40%,transparent)] lg:hidden"
      />
      {/* Connector tick: rail -> card (desktop, direction depends on side) */}
      <span
        aria-hidden
        className={cn(
          "absolute top-[15px] hidden h-px w-10 lg:block",
          isLeft
            ? "right-1/2 mr-2 bg-linear-to-l from-[color-mix(in_srgb,var(--accent)_60%,transparent)] to-transparent"
            : "left-1/2 ml-2 bg-linear-to-r from-[color-mix(in_srgb,var(--accent)_60%,transparent)] to-transparent",
        )}
      />

      <Reveal
        delay={delay}
        className={cn("lg:w-[calc(50%-2.75rem)]", !isLeft && "lg:ml-auto")}
      >
        {/* Year row */}
        <div
          className={cn(
            "flex flex-wrap items-baseline gap-x-3 gap-y-1",
            isLeft && "lg:flex-row-reverse",
          )}
        >
          <span className="neon-text font-display text-2xl font-bold tabular-nums text-accent md:text-3xl">
            {event.year}
          </span>
          {event.date && (
            <span className="font-mono text-xs tabular-nums tracking-widest text-muted">
              [{event.date}]
            </span>
          )}
          <Tag accent="violet">{localize(eraLabel, locale)}</Tag>
        </div>

        {/* Event card */}
        <HudPanel
          accent="violet"
          glow={false}
          className="mt-3 p-4 transition-shadow duration-300 hover:neon-box md:p-5"
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted/80">
            LOG // {event.id}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold tracking-wide text-ink">
            {localize(event.title, locale)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {localize(event.description, locale)}
          </p>
          {event.media && (
            <MediaPlaceholder
              media={event.media}
              locale={locale}
              className="mt-4"
            />
          )}
        </HudPanel>
      </Reveal>
    </li>
  );
}
