import rules from "@/data/timing-rules.json";
import type {
  Destination,
  LayerResult,
  Reason,
  Translator,
  TravelWindow,
} from "./types";
import { getHolidaysInRange } from "@/lib/holidays";

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function scoreDestinationDisruption(
  window: TravelWindow,
  destination: Destination,
  t: Translator,
): LayerResult {
  const reasons: Reason[] = [];
  let maxImpact = 0;

  for (const dis of destination.majorDisruptions) {
    const overlaps = disruptionOverlapsWindow(dis.approxDates, window);
    if (!overlaps) continue;

    const impact = rules.severityScores[dis.severity] ?? 0;
    if (impact > maxImpact) maxImpact = impact;
    reasons.push({
      tone: "negative",
      text: t("disruptionLine", { name: dis.name, note: dis.note }),
    });
  }

  const exactHolidays = getHolidaysInRange(
    destination.countryCode,
    window.start,
    window.end,
  );

  if (exactHolidays.length) {
    const highImpact = exactHolidays.filter(
      (h) => h.impactHint === "high" || h.impactHint === "severe",
    );
    if (highImpact.length) {
      const names = highImpact.slice(0, 3).map((h) => h.name).join(", ");
      reasons.push({
        tone: "negative",
        text: t("destLocalHolidaysHigh", { names }),
      });
      const holidayImpact = rules.severityScores.medium;
      if (holidayImpact > maxImpact) maxImpact = holidayImpact;
    } else if (exactHolidays.length >= 3) {
      reasons.push({
        tone: "neutral",
        text: t("destLocalHolidaysMild", { count: exactHolidays.length }),
      });
    }
  }

  const score = 100 - maxImpact;

  if (!reasons.length) {
    reasons.push({ tone: "positive", text: t("noLocalDisruptions") });
  }

  return { score, reasons };
}

function disruptionOverlapsWindow(
  approxDates: string,
  window: TravelWindow,
): boolean {
  const months = extractMonthsFromText(approxDates);
  if (!months.length) return false;

  const windowMonths = monthsInWindow(window);
  return months.some((m) => windowMonths.includes(m));
}

function extractMonthsFromText(text: string): number[] {
  const found = new Set<number>();
  const lower = text.toLowerCase();
  MONTH_SHORT.forEach((name, idx) => {
    if (lower.includes(name.toLowerCase())) found.add(idx);
  });
  return [...found];
}

function monthsInWindow(window: TravelWindow): number[] {
  const s = new Date(window.start);
  const e = new Date(window.end);
  const months = new Set<number>();
  const cur = new Date(s.getFullYear(), s.getMonth(), 1);
  while (cur <= e) {
    months.add(cur.getMonth());
    cur.setMonth(cur.getMonth() + 1);
  }
  return [...months];
}
