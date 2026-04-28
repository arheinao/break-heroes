"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Scale, Wallet, Trees, Sun } from "lucide-react";
import Combobox from "@/components/Combobox";
import { destinations, originMarkets } from "@/lib/data";
import { citiesForCountry } from "@/lib/beevago";
import type { Destination, Priority } from "@/lib/scoring/types";
import {
  generateMonthlyWindows,
  scoreWindows,
} from "@/lib/scoring/engine";

const CURRENT_YEAR = new Date().getFullYear();

const PRIORITIES = [
  { value: "balanced", icon: Scale, key: "balanced" as const },
  { value: "cheapest", icon: Wallet, key: "cheapest" as const },
  { value: "least-crowded", icon: Trees, key: "lessCrowded" as const },
  { value: "best-weather", icon: Sun, key: "bestWeather" as const },
];

function Inner() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("destination") ?? destinations[0].slug;
  const initialPriority =
    (searchParams.get("priority") as Priority) ?? "balanced";

  const t = useTranslations("search");
  const tp = useTranslations("priority");
  const tCommon = useTranslations("common");
  const tScoring = useTranslations("scoring");

  const [slug, setSlug] = useState<string>(initialSlug);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const [originCode, setOriginCode] = useState<string>("GB");
  const [year, setYear] = useState<number>(CURRENT_YEAR);

  const destination = useMemo(
    () =>
      (destinations.find((d) => d.slug === slug) ?? destinations[0]) as Destination,
    [slug],
  );

  const origin = useMemo(
    () => originMarkets.find((o) => o.code === originCode) ?? null,
    [originCode],
  );

  const results = useMemo(() => {
    const windows = generateMonthlyWindows(year);
    return scoreWindows(windows, destination, origin, priority, tScoring);
  }, [destination, origin, priority, year, tScoring]);

  const recommend = results.filter((r) => r.recommendation === "recommend");
  const acceptable = results.filter((r) => r.recommendation === "acceptable");
  const avoid = results.filter((r) => r.recommendation === "avoid");

  const priorityKeyFor: Record<string, "balanced" | "cheapest" | "lessCrowded" | "bestWeather"> = {
    balanced: "balanced",
    cheapest: "cheapest",
    "least-crowded": "lessCrowded",
    "best-weather": "bestWeather",
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]">
            <Field label={t("labels.destination")}>
              <Combobox
                ariaLabel={t("labels.destination")}
                placeholder={t("placeholders.destination")}
                value={slug}
                onChange={setSlug}
                options={destinations.map((d) => ({
                  value: d.slug,
                  label: d.name,
                  flag: d.flag,
                }))}
              />
            </Field>
            <Field label={t("labels.from")}>
              <Combobox
                ariaLabel={t("labels.from")}
                placeholder={t("placeholders.from")}
                value={originCode}
                onChange={setOriginCode}
                options={originMarkets.map((o) => ({
                  value: o.code,
                  label: o.name,
                  flag: o.flag,
                }))}
              />
            </Field>
            <Field label={t("labels.year")}>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-transparent font-medium outline-none"
              >
                {[CURRENT_YEAR, CURRENT_YEAR + 1].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </Field>
            <div className="flex items-end">
              <Link
                href={`/destinations/${destination.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
              >
                {t("seePage", { name: destination.name })}
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {PRIORITIES.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value as Priority)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    priority === p.value
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                  {tp(p.key)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {t("header", {
                flag: destination.flag,
                name: destination.name,
                year,
              })}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("fromOrigin", {
                origin: `${origin?.flag ?? ""} ${origin?.name ?? ""}`.trim(),
                priority: tp(priorityKeyFor[priority]),
              })}
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {t("windowsEvaluated", { count: results.length })}
          </span>
        </div>

        {recommend.length > 0 && (
          <ResultGroup
            title={t("groups.recommend.title")}
            description={t("groups.recommend.description")}
            results={recommend}
            accent="recommend"
          />
        )}

        {acceptable.length > 0 && (
          <ResultGroup
            title={t("groups.acceptable.title")}
            description={t("groups.acceptable.description")}
            results={acceptable}
            accent="acceptable"
          />
        )}

        {avoid.length > 0 && (
          <ResultGroup
            title={t("groups.avoid.title")}
            description={t("groups.avoid.description")}
            results={avoid}
            accent="avoid"
          />
        )}

        <NextStepPanel destination={destination} />
      </section>

      <span className="hidden">{tCommon("loading")}</span>
    </div>
  );
}

function NextStepPanel({ destination }: { destination: Destination }) {
  const t = useTranslations("search.nextStep");
  const heroImage = citiesForCountry(destination.slug)[0]?.image;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid sm:grid-cols-2">
        <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[260px] bg-muted">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={destination.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(135deg, ${destination.gradient[0]}, ${destination.gradient[1]})`,
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
          <span className="absolute left-4 top-4 text-2xl drop-shadow-md">
            {destination.flag}
          </span>
        </div>
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("title", { name: destination.name })}
          </h2>
          {destination.tagline && (
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {destination.tagline}
            </p>
          )}
          <Link
            href={`/destinations/${destination.slug}`}
            className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("cta", { name: destination.name })}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ResultGroup({
  title,
  description,
  results,
  accent,
}: {
  title: string;
  description: string;
  results: ReturnType<typeof scoreWindows>;
  accent: "recommend" | "acceptable" | "avoid";
}) {
  return (
    <div className="mb-10">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold tracking-tight flex items-center gap-2">
          <AccentDot accent={accent} />
          {title}
          <span className="text-sm font-normal text-muted-foreground">
            · {results.length}
          </span>
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r) => (
          <ResultCard key={r.window.label} result={r} />
        ))}
      </div>
    </div>
  );
}

function AccentDot({ accent }: { accent: string }) {
  const color = {
    recommend: "bg-success",
    acceptable: "bg-warning",
    avoid: "bg-danger",
  }[accent];
  return <span className={`h-2.5 w-2.5 rounded-full ${color}`} />;
}

function ResultCard({
  result,
}: {
  result: ReturnType<typeof scoreWindows>[number];
}) {
  const t = useTranslations("search.card");
  const labelMap = {
    recommend: t("best"),
    acceptable: t("ok"),
    avoid: t("avoid"),
  } as const;
  const styleMap = {
    recommend: { bg: "bg-success/10", text: "text-[rgb(20_83_45)]" },
    acceptable: { bg: "bg-warning/15", text: "text-[rgb(113_63_18)]" },
    avoid: { bg: "bg-danger/10", text: "text-[rgb(127_29_29)]" },
  } as const;
  const badge = styleMap[result.recommendation];
  const label = labelMap[result.recommendation];

  return (
    <article className="rounded-xl border border-border bg-card p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badge.bg} ${badge.text}`}
        >
          {label}
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          {result.overall}/100
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
        {result.window.label}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {result.explanation.slice(0, 3).map((reason, i) => (
          <li
            key={i}
            className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
          >
            <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40 flex-shrink-0" />
            {reason.text}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SearchClient() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-muted-foreground">Loading…</div>
      }
    >
      <Inner />
    </Suspense>
  );
}
