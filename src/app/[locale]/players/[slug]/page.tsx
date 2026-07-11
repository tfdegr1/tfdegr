import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Crosshair, Star, User, Users } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { localize, type Locale } from "@/lib/types";
import { getPlayerBySlug, getPlayers } from "@/lib/data/players";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { HudPanel } from "@/components/hud-panel";
import { GlitchTitle } from "@/components/glitch-title";
import { Tag } from "@/components/tag";
import { StatBar } from "@/components/stat-bar";
import { SectionHeading } from "@/components/section-heading";
import { NeonButton } from "@/components/neon-button";
import { Reveal } from "@/components/reveal";

export async function generateStaticParams() {
  const players = await getPlayers();
  return routing.locales.flatMap((locale) =>
    players.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const player = await getPlayerBySlug(slug);
  if (!player) return {};
  return {
    title: `${player.nickname} // PLAYERS`,
    description: localize(player.bio, locale as Locale),
  };
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const isZh = locale === "zh";

  const player = await getPlayerBySlug(slug);
  if (!player) notFound();

  const t = await getTranslations("boards");
  const tc = await getTranslations("common");

  const statusLabel = player.active
    ? isZh
      ? "现役"
      : "Active"
    : isZh
      ? "退役"
      : "Retired";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
        <Link
          href="/players"
          className="transition-colors hover:text-neon-lime"
        >
          // {t("players.title")}
        </Link>
        <span>/</span>
        <span className="text-neon-lime">{player.nickname}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* Portrait + HUD stat tiles */}
        <div className="space-y-4">
          <Reveal>
            <MediaPlaceholder media={player.media} locale={locale} />
          </Reveal>

          <Reveal delay={0.1}>
            <HudPanel accent="lime" glow={false}>
              <div className="grid grid-cols-3 divide-x divide-edge text-center">
                <div className="px-2 py-4">
                  <div className="font-display text-accent text-2xl font-bold tabular-nums">
                    {player.rating !== undefined
                      ? player.rating.toFixed(2)
                      : "—"}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                    {isZh ? "评分" : "Rating"}
                  </div>
                </div>
                <div className="px-2 py-4">
                  <div className="font-display text-accent flex items-center justify-center gap-1.5 text-2xl font-bold tabular-nums">
                    <Star className="h-4 w-4" strokeWidth={1.5} />
                    {player.majorsWon ?? 0}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                    {isZh ? "Major 冠军" : "Majors"}
                  </div>
                </div>
                <div className="px-2 py-4">
                  <div
                    className={`font-display text-2xl font-bold uppercase ${
                      player.active ? "text-accent" : "text-muted"
                    }`}
                  >
                    {statusLabel}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                    {isZh ? "状态" : "Status"}
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-edge p-4">
                {player.rating !== undefined && (
                  <StatBar
                    label={isZh ? "HLTV 评分" : "HLTV Rating"}
                    value={player.rating}
                    max={1.5}
                    accent="lime"
                  />
                )}
                <StatBar
                  label={isZh ? "Major 冠军" : "Majors won"}
                  value={player.majorsWon ?? 0}
                  max={5}
                  accent="lime"
                />
              </div>
            </HudPanel>
          </Reveal>
        </div>

        {/* Player file */}
        <Reveal delay={0.05}>
          <HudPanel accent="lime" className="h-full p-6 md:p-8">
            <p className="kicker text-accent mb-3">// PLAYER FILE</p>
            <GlitchTitle
              text={player.nickname}
              as="h1"
              className="text-3xl md:text-5xl"
            />
            {player.realName && (
              <p className="mt-2 text-muted">{player.realName}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Tag accent="lime">
                <Crosshair className="h-3 w-3" strokeWidth={1.5} />
                {player.role}
              </Tag>
              {player.team && (
                <Tag>
                  <Users className="h-3 w-3" strokeWidth={1.5} />
                  {player.team}
                </Tag>
              )}
              <Tag>{player.country}</Tag>
              <Tag accent={player.active ? "lime" : undefined}>
                {statusLabel}
              </Tag>
            </div>

            {/* Dossier rows */}
            <dl className="mt-8 grid gap-x-8 gap-y-4 font-mono text-sm sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-4 border-b border-edge/60 pb-2">
                <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {isZh ? "姓名" : "Name"}
                </dt>
                <dd className="text-right text-ink">{player.realName ?? "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge/60 pb-2">
                <dt className="text-[0.7rem] uppercase tracking-widest text-muted">
                  {isZh ? "国家" : "Country"}
                </dt>
                <dd className="text-right text-ink">{player.country}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge/60 pb-2">
                <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {isZh ? "战队" : "Team"}
                </dt>
                <dd className="text-right text-ink">{player.team ?? "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-edge/60 pb-2">
                <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  <Crosshair className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {isZh ? "位置" : "Role"}
                </dt>
                <dd className="text-accent text-right">{player.role}</dd>
              </div>
            </dl>

            {/* Bio */}
            <div className="mt-10">
              <SectionHeading
                index="//01"
                title={isZh ? "档案简介" : "Biography"}
                accent="lime"
              />
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                {localize(player.bio, locale)}
              </p>
            </div>

            <div className="mt-10">
              <NeonButton href="/players" accent="lime" variant="ghost">
                &lt;- {tc("back")}
              </NeonButton>
            </div>
          </HudPanel>
        </Reveal>
      </div>
    </div>
  );
}
