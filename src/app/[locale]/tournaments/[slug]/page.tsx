import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe, Medal, Star, Trophy } from "lucide-react";
import { routing } from "@/i18n/routing";
import { GlitchTitle } from "@/components/glitch-title";
import { HudPanel } from "@/components/hud-panel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { NeonButton } from "@/components/neon-button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { YouTubeEmbed } from "@/components/youtube-embed";
import {
  formatPrize,
  getTournamentBySlug,
  getTournaments,
} from "@/lib/data/tournaments";
import { ACCENT_HEX, localize, type Locale } from "@/lib/types";
import { accentVar } from "@/lib/utils";

export async function generateStaticParams() {
  const tournaments = await getTournaments();
  return routing.locales.flatMap((locale) =>
    tournaments.map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tournament = await getTournamentBySlug(slug);
  if (!tournament) return {};
  return {
    title: tournament.name,
    description: localize(tournament.description, locale as Locale),
  };
}

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const isZh = locale === "zh";

  const tournament = await getTournamentBySlug(slug);
  if (!tournament) notFound();

  const t = await getTranslations("common");

  const stats = [
    {
      key: "prize",
      label: isZh ? "总奖金" : "Prize Pool",
      value: formatPrize(tournament.prizePool),
      Icon: Star,
    },
    {
      key: "winner",
      label: isZh ? "冠军" : "Champion",
      value: tournament.winner,
      Icon: Trophy,
    },
    {
      key: "runnerUp",
      label: isZh ? "亚军" : "Runner-up",
      value: tournament.runnerUp ?? "—",
      Icon: Medal,
    },
  ];

  return (
    <div style={accentVar(ACCENT_HEX.magenta)}>
      {/* Hero */}
      <section className="relative border-b border-edge">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="kicker text-accent">
              // TOURNAMENTS / {tournament.year}
            </p>
            <NeonButton href="/tournaments" accent="magenta">
              « {t("back")}
            </NeonButton>
          </div>

          <Reveal className="mt-6">
            <MediaPlaceholder
              media={{ ...tournament.media, aspect: "21/9" }}
              locale={locale}
            />
          </Reveal>

          <GlitchTitle
            text={tournament.name}
            as="h1"
            className="mt-8 text-3xl sm:text-4xl md:text-5xl"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag className="tabular-nums">{tournament.year}</Tag>
            <Tag>TIER {tournament.tier}</Tag>
            {tournament.isMajor && <Tag accent="magenta">MAJOR</Tag>}
            <Tag>
              <Globe className="h-3 w-3" strokeWidth={1.6} />
              {localize(tournament.location, locale)}
            </Tag>
          </div>
        </div>
        <div className="bg-accent neon-ring absolute bottom-0 left-0 h-px w-1/3" />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* HUD stat tiles */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ key, label, value, Icon }) => (
              <HudPanel key={key} accent="magenta" className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                      {label}
                    </p>
                    <p className="font-display mt-2 truncate text-xl font-bold tabular-nums text-ink md:text-2xl">
                      {value}
                    </p>
                  </div>
                  <span className="text-accent border-accent-soft bg-accent-soft flex h-10 w-10 shrink-0 items-center justify-center border">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                </div>
              </HudPanel>
            ))}
          </div>
        </Reveal>

        {/* Briefing */}
        <Reveal className="mt-12">
          <SectionHeading
            index="//01"
            accent="magenta"
            title={isZh ? "赛事简报" : "Briefing"}
          />
          <HudPanel accent="magenta" glow={false} className="mt-6 p-6">
            <p className="max-w-3xl leading-relaxed text-muted">
              {localize(tournament.description, locale)}
            </p>
          </HudPanel>
        </Reveal>

        {/* Highlights */}
        {tournament.highlightVideo && (
          <Reveal className="mt-12">
            <SectionHeading
              index="//02"
              accent="magenta"
              title={isZh ? "高光回放" : "Highlights"}
            />
            <div className="mt-6">
              <YouTubeEmbed video={tournament.highlightVideo} locale={locale} />
              <p className="mt-2 font-mono text-xs text-muted">
                {localize(tournament.highlightVideo.title, locale)}
              </p>
            </div>
          </Reveal>
        )}

        {/* Back */}
        <div className="mt-14 flex justify-center">
          <NeonButton href="/tournaments" accent="magenta" variant="solid">
            « {t("back")}
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
