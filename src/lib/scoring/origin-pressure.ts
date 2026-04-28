import rules from "@/data/timing-rules.json";
import type {
  LayerResult,
  OriginMarket,
  Reason,
  Translator,
  TravelWindow,
} from "./types";
import { getHolidaysInRange } from "@/lib/holidays";
import {
  getSchoolHolidaysInRange,
  hasMarket,
} from "@/lib/school-holidays";

const MONTH_RANGE: Record<string, number[]> = {
  "Dec-Jan": [11, 0],
  "Jan-Feb": [0, 1],
  "Mar-Apr": [2, 3],
  "Feb-Mar": [1, 2],
  "Apr-May": [3, 4],
  "May-Jun": [4, 5],
  "Jul-Aug": [6, 7],
  "Jun-Aug": [5, 6, 7],
  "Jun-Sep": [5, 6, 7, 8],
  "Jul-Sep": [6, 7, 8],
  "Oct-Nov": [9, 10],
  Jan: [0],
  Feb: [1],
  Mar: [2],
  Apr: [3],
  May: [4],
  Jun: [5],
  Jul: [6],
  Aug: [7],
  Sep: [8],
  Oct: [9],
  Nov: [10],
  Dec: [11],
};

export function scoreOriginPressure(
  window: TravelWindow,
  origin: OriginMarket | null,
  t: Translator,
): LayerResult {
  if (!origin) {
    return {
      score: 65,
      reasons: [{ tone: "neutral", text: t("noOrigin") }],
    };
  }

  const reasons: Reason[] = [];
  let maxImpact = 0;

  if (hasMarket(origin.code)) {
    const schoolBreaks = getSchoolHolidaysInRange(
      origin.code,
      window.start,
      window.end,
    );

    if (schoolBreaks.length > 0) {
      const summary = summarizeSchoolBreaks(schoolBreaks, t);
      maxImpact = Math.max(maxImpact, summary.impactScore);
      if (summary.reason) reasons.push(summary.reason);
    }
  } else {
    const windowMonths = monthsInWindow(window);
    for (const br of origin.schoolBreaks) {
      const breakMonths = MONTH_RANGE[br.approxMonth] ?? [];
      const overlaps = breakMonths.some((m) => windowMonths.includes(m));
      if (overlaps) {
        const impact = rules.demandImpactScores[br.demandImpact] ?? 0;
        if (impact > maxImpact) maxImpact = impact;
        if (impact >= 45) {
          reasons.push({
            tone: "negative",
            text: t("schoolBreakDrives", {
              origin: origin.name,
              breakName: br.name.toLowerCase(),
              impact: t(`demand.${br.demandImpact}`),
            }),
          });
        }
      }
    }
  }

  const originHolidays = getHolidaysInRange(
    origin.code,
    window.start,
    window.end,
  );
  const highImpactHolidays = originHolidays.filter(
    (h) => h.impactHint === "high" || h.impactHint === "severe",
  );

  if (highImpactHolidays.length > 0) {
    const names = highImpactHolidays.slice(0, 2).map((h) => h.name).join(", ");
    reasons.push({
      tone: "negative",
      text: t("originPublicHolidays", { origin: origin.name, names }),
    });
    const extra = rules.demandImpactScores.medium;
    if (extra > maxImpact) maxImpact = extra;
  }

  const score = Math.max(100 - maxImpact, 5);

  if (!reasons.length) {
    reasons.push({
      tone: "positive",
      text: t("outsideSchoolBreaks", { origin: origin.name }),
    });
  }

  return { score, reasons };
}

interface BreakSummary {
  impactScore: number;
  reason: Reason | null;
}

function summarizeSchoolBreaks(
  breaks: {
    name: string;
    start: string;
    end: string;
    region: string | null;
    calendarGroup: string | null;
  }[],
  t: Translator,
): BreakSummary {
  if (breaks.length === 0) return { impactScore: 0, reason: null };

  const scopes = new Set(
    breaks.map((b) => b.region ?? b.calendarGroup ?? "national"),
  );
  const scopeCount = scopes.size;

  const byName = new Map<string, number>();
  for (const b of breaks) {
    byName.set(b.name, (byName.get(b.name) ?? 0) + 1);
  }
  const dominant = [...byName.entries()].sort((a, b) => b[1] - a[1])[0];
  const dominantName = dominant?.[0] ?? breaks[0].name;

  const isSummer = /summer/i.test(dominantName);
  const isChristmas = /christmas|winter/i.test(dominantName);
  const isEaster = /easter|spring/i.test(dominantName);

  let impactScore: number;
  let demandKey: "severe" | "high" | "medium";

  if (isSummer) {
    impactScore = rules.demandImpactScores.severe;
    demandKey = "severe";
  } else if (isChristmas) {
    impactScore = rules.demandImpactScores.high;
    demandKey = "high";
  } else if (isEaster) {
    impactScore = rules.demandImpactScores.high;
    demandKey = "high";
  } else {
    impactScore = rules.demandImpactScores.medium;
    demandKey = "medium";
  }

  if (scopeCount === 1) {
    impactScore = Math.round(impactScore * 0.85);
  } else if (scopeCount >= 4) {
    impactScore = Math.round(impactScore * 1.0);
  }

  const scopeNote =
    scopeCount === 1
      ? t("scopeNote.single")
      : t("scopeNote.multiple", { count: scopeCount });

  return {
    impactScore,
    reason: {
      tone: "negative",
      text: t("schoolBreakSummary", {
        breakName: dominantName,
        scopeNote,
        demandLabel: t(`demand.${demandKey}`),
      }),
    },
  };
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
