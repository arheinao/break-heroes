"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Scale, Wallet, Trees, Sun } from "lucide-react";
import { originMarkets } from "@/lib/data";
import type { Destination, Priority } from "@/lib/scoring/types";
import {
  generateMonthlyWindows,
  scoreWindows,
} from "@/lib/scoring/engine";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR + 1];

const PRIORITIES = [
  { value: "balanced", icon: Scale, key: "balanced" as const },
  { value: "cheapest", icon: Wallet, key: "cheapest" as const },
  { value: "least-crowded", icon: Trees, key: "lessCrowded" as const },
  { value: "best-weather", icon: Sun, key: "bestWeather" as const },
];

export default function DestinationRecommender({
  destination,
}: {
  destination: Destination;
}) {
  const t = useTranslations("recommender");
  const tp = useTranslations("priority");
  const tScoring = useTranslations("scoring");
  const [priority, setPriority] = useState<Priority>("balanced");
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [originCode, setOriginCode] = useState<string>("GB");

  const origin = useMemo(
    () => originMarkets.find((o) => o.code === originCode) ?? null,
    [originCode],
  );

  const results = useMemo(() => {
    const windows = generateMonthlyWindows(year);
    return scoreWindows(windows, destination, origin, priority, tScoring);
  }, [destination, origin, priority, year, tScoring]);

  const top = results.slice(0, 3);
  const bottom = results.slice(-2).reverse();

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{t("title")}</h3>
        <span className="text-xs font-mono text-muted-foreground">
          {t("liveRanking")}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("travelingFrom")}
          </span>
          <select
            value={originCode}
            onChange={(e) => setOriginCode(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {originMarkets.map((o) => (
              <option key={o.code} value={o.code}>
                {o.flag} {o.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("year")}
          </span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("priority")}
          </span>
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            {PRIORITIES.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value as Priority)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    priority === p.value
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                  {tp(p.key)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-success mb-3">
          {t("bestWindows")}
        </h4>
        <div className="space-y-2">
          {top.map((r) => (
            <ResultMini key={r.window.label} result={r} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-danger mb-3">
          {t("avoid")}
        </h4>
        <div className="space-y-2">
          {bottom.map((r) => (
            <ResultMini key={r.window.label} result={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultMini({
  result,
}: {
  result: ReturnType<typeof scoreWindows>[number];
}) {
  const accent =
    result.recommendation === "recommend"
      ? "text-[rgb(20_83_45)] bg-success/10"
      : result.recommendation === "avoid"
        ? "text-[rgb(127_29_29)] bg-danger/10"
        : "text-[rgb(113_63_18)] bg-warning/10";

  return (
    <div className="rounded-lg bg-muted/40 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{result.window.label}</span>
        <span
          className={`inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${accent}`}
        >
          {result.overall}/100
        </span>
      </div>
      {result.explanation[0] && (
        <p className="mt-1.5 text-xs text-muted-foreground leading-snug line-clamp-2">
          {result.explanation[0].text}
        </p>
      )}
    </div>
  );
}
