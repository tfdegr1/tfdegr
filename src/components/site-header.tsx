"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BOARDS } from "@/config/site";
import { ACCENT_HEX } from "@/lib/types";
import { accentVar, cn } from "@/lib/utils";
import { LocaleSwitch } from "./locale-switch";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="group flex items-center font-display text-lg font-bold tracking-tight text-ink"
        >
          <span className="text-neon-cyan neon-text">CS</span>
          <span className="text-muted">://</span>
          <span className="transition-colors group-hover:text-neon-cyan">CODEX</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {BOARDS.map((b) => (
            <Link
              key={b.key}
              href={b.href}
              style={accentVar(ACCENT_HEX[b.accent])}
              className={cn(
                "hover:text-accent px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                isActive(b.href) ? "text-accent" : "text-muted",
              )}
            >
              {t(b.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("menu")}
            className="text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-edge bg-bg/95 px-4 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {BOARDS.map((b) => (
              <Link
                key={b.key}
                href={b.href}
                onClick={() => setOpen(false)}
                style={accentVar(ACCENT_HEX[b.accent])}
                className={cn(
                  "hover:text-accent px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                  isActive(b.href) ? "text-accent" : "text-muted",
                )}
              >
                {t(b.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
