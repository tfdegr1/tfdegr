import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackgroundFX } from "@/components/background-fx";
import "../globals.css";

// ISR: pages are prerendered, then re-fetched from the data source (Supabase)
// at most once per minute — so content edits go live without a redeploy.
export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "TFDEGR — Counter-Strike Encyclopedia",
    template: "%s · TFDEGR",
  },
  description:
    "A cyberpunk encyclopedia of Counter-Strike: history, maps, weapons, tournaments, players, KZ and game modes — from 1.6 to CS2.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BackgroundFX />
          <SiteHeader />
          <main className="relative flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
