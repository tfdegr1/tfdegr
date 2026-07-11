"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { en: "EN", zh: "中" };

/** Toggle between locales, preserving the current path. */
export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center border border-edge font-mono text-xs",
        className,
      )}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={l === locale}
          className={cn(
            "px-2.5 py-1 uppercase tracking-wider transition-colors",
            l === locale
              ? "bg-neon-cyan text-bg"
              : "text-muted hover:text-ink",
          )}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
