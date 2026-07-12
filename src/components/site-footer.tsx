import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BOARDS, SITE } from "@/config/site";

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="relative border-t border-edge bg-bg-elev/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[2fr_3fr]">
        <div>
          <div className="font-display text-lg font-bold text-ink">
            <span className="text-neon-cyan">TF</span>DEGR
          </div>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted">
            {t("footer.disclaimer")}
          </p>
        </div>
        <div>
          <p className="kicker mb-3 text-muted">{t("footer.sections")}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BOARDS.map((b) => (
              <Link
                key={b.key}
                href={b.href}
                className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-neon-cyan"
              >
                {t(`nav.${b.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-edge px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 font-mono text-[0.68rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {SITE.year} {t("site.name")}
          </span>
          <span>{t("footer.builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
