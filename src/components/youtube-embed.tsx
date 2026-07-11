"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { localize, type Locale, type YouTubeRef } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Lite YouTube embed: shows a thumbnail, loads the iframe on click.
 *  Degrades to a "coming soon" placeholder when videoId is empty. */
export function YouTubeEmbed({
  video,
  locale,
  className,
}: {
  video: YouTubeRef;
  locale: Locale;
  className?: string;
}) {
  const [play, setPlay] = useState(false);
  const t = useTranslations("common");
  const title = localize(video.title, locale);

  if (!video.videoId) {
    return (
      <div
        className={cn(
          "hud-corners scanlines relative flex aspect-video items-center justify-center border border-edge bg-panel",
          className,
        )}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {t("comingSoon")}
        </span>
      </div>
    );
  }

  const thumb = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <div
      className={cn(
        "hud-corners relative aspect-video overflow-hidden border border-edge bg-panel",
        className,
      )}
    >
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={t("play")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            className="h-full w-full object-cover opacity-60 transition group-hover:opacity-90"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="neon-ring flex h-16 w-16 items-center justify-center border border-neon-cyan bg-bg/60 text-neon-cyan transition group-hover:scale-110">
              <Play className="h-6 w-6" />
            </span>
          </span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-ink">
            {t("watchOnYoutube")}
          </span>
        </button>
      )}
    </div>
  );
}
