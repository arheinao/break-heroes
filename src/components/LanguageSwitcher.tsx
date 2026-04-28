"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const newPath = pathname.replace(/^\/(en|de|es)(?=\/|$)/, `/${next}`);
    router.push(newPath);
  }

  return (
    <label className="relative">
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={locale}
        onChange={onChange}
        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
