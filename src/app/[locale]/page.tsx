import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, History as HistoryIcon, Database } from "lucide-react";
import { BOARDS } from "@/config/site";
import { BoardCard } from "@/components/board-card";
import { NeonButton } from "@/components/neon-button";
import { GlitchTitle } from "@/components/glitch-title";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const BOOT_LOG = [
  "> initializing tfdegr",
  "> mounting databanks .......... OK",
  "> loading eras: beta→1.6→source→csgo→cs2",
  "> render mode: CYBERPUNK",
  "> status: ONLINE",
];

const STATS = [
  { value: "07", label: { en: "Databanks", zh: "数据库板块" } },
  { value: "05", label: { en: "Eras", zh: "时代" } },
  { value: "02", label: { en: "Languages", zh: "语言" } },
  { value: "CS2", label: { en: "Latest build", zh: "最新版本" } },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tb = await getTranslations("boards");
  const isZh = locale === "zh";

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-edge">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="kicker text-neon-cyan neon-text mb-4">
              {t("heroKicker")}
            </p>
            <GlitchTitle
              text={t("heroTitle")}
              as="h1"
              className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/weapons" accent="cyan" variant="solid">
                <Database className="h-4 w-4" />
                {t("heroPrimary")}
              </NeonButton>
              <NeonButton href="/history" accent="violet" variant="ghost">
                <HistoryIcon className="h-4 w-4" />
                {t("heroSecondary")}
              </NeonButton>
            </div>
          </div>

          {/* Decorative boot-log terminal */}
          <div className="hud-corners neon-box relative hidden border border-edge bg-panel/70 p-5 font-mono text-xs backdrop-blur-sm lg:block">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-magenta" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-lime" />
              <span className="ml-2 text-muted">tfdegr@valve ~ %</span>
            </div>
            <div className="space-y-1.5">
              {BOOT_LOG.map((line, i) => (
                <p
                  key={i}
                  className={
                    i === BOOT_LOG.length - 1
                      ? "text-neon-lime"
                      : "text-neon-cyan/80"
                  }
                >
                  {line}
                </p>
              ))}
              <p className="text-ink">
                <span className="text-neon-cyan">$</span>{" "}
                <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-neon-cyan" />
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-edge bg-bg-elev/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-edge md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value} className="px-4 py-5">
                <div className="font-display text-2xl font-bold text-neon-cyan md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-muted">
                  {isZh ? s.label.zh : s.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Databanks grid */}
      <section id="databanks" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:py-20">
        <Reveal>
          <SectionHeading index="//01" title={t("boardsTitle")} accent="cyan" />
          <p className="mt-3 max-w-2xl text-sm text-muted">{t("boardsSubtitle")}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOARDS.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.05}>
              <BoardCard
                href={b.href}
                accent={b.accent}
                Icon={b.Icon}
                index={`//${String(i + 1).padStart(2, "0")}`}
                title={tb(`${b.key}.title`)}
                subtitle={tb(`${b.key}.tagline`)}
                className="h-full"
                tags={
                  <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted">
                    {b.href}
                  </span>
                }
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <NeonButton href="/history" accent="magenta" variant="ghost">
            {t("heroSecondary")}
            <ArrowRight className="h-4 w-4" />
          </NeonButton>
        </div>
      </section>
    </div>
  );
}
