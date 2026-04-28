import rules from "@/data/timing-rules.json";
import type { LayerResult, OriginMarket, TravelWindow } from "./types";
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
): LayerResult {
  if (!origin) {
    return {
      score: 65,
      reasons: ["No origin market selected — assuming average demand."],
    };
  }

  const reasons: string[] = [];
  let maxImpact = 0;

  if (hasMarket(origin.code)) {
    const schoolBreaks = getSchoolHolidaysInRange(
      origin.code,
      window.start,
      window.end,
    );

    if (schoolBreaks.length > 0) {
      const summary = summarizeSchoolBreaks(schoolBreaks);
      maxImpact = Math.max(maxImpact, summary.impactScore);
      if (summary.reason) reasons.push(summary.reason);
    }
  } else {
    // Fallback to the coarse approxMonth signal if we lack precomputed data
    const windowMonths = monthsInWindow(window);
    for (const br of origin.schoolBreaks) {
      const breakMonths = MONTH_RANGE[br.approxMonth] ?? [];
      const overlaps = breakMonths.some((m) => windowMonths.includes(m));
      if (overlaps) {
        const impact =
          rules.demandImpactScores[br.demandImpact] ?? 0;
        if (impact > maxImpact) maxImpact = impact;
        if (impact >= 45) {
          reasons.push(
            `${origin.name} ${br.name.toLowerCase()} drives outbound demand (${br.demandImpact}).`,
          );
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
    reasons.push(
      `${origin.name} public holidays during window: ${names} — long weekends pull prices up.`,
    );
    const extra = rules.demandImpactScores.medium;
    if (extra > maxImpact) maxImpact = extra;
  }

  const score = Math.max(100 - maxImpact, 5);

  if (!reasons.length) {
    reasons.push(
      `Outside major ${origin.name} school breaks — demand pressure is low.`,
    );
  }

  return { score, reasons };
}

interface BreakSummary {
  impactScore: number;
  reason: string | null;
}

/**
 * For a market with regional or calendar-group variations, count:
 *   - unique break names (e.g., "Summer Holiday") that appear
 *   - the fraction of regions/groups affected (breadth)
 *   - the longest overlap (depth)
 *
 * Then map to a single demand impact.
 * The logic stays in one place so we can tune weights without touching the
 * scoring engine orchestrator.
 */
function summarizeSchoolBreaks(breaks: {
  name: string;
  start: string;
  end: string;
  region: string | null;
  calendarGroup: string | null;
}[]): BreakSummary {
  if (breaks.length === 0) return { impactScore: 0, reason: null };

  // Distinct scopes — regions OR calendar groups
  const scopes = new Set(
    breaks.map((b) => b.region ?? b.calendarGroup ?? "national"),
  );
  const scopeCount = scopes.size;

  // Identify the longest-running break name
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
  let demandLabel: string;

  if (isSummer) {
    impactScore = rules.demandImpactScores.severe;
    demandLabel = "severe";
  } else if (isChristmas) {
    impactScore = rules.demandImpactScores.high;
    demandLabel = "high";
  } else if (isEaster) {
    impactScore = rules.demandImpactScores.high;
    demandLabel = "high";
  } else {
    impactScore = rules.demandImpactScores.medium;
    demandLabel = "medium";
  }

  // Breadth modifier: national or near-national coverage amplifies
  // If only a handful of regions overlap, reduce impact modestly
  if (scopeCount === 1) {
    impactScore = Math.round(impactScore * 0.85);
  } else if (scopeCount >= 4) {
    impactScore = Math.round(impactScore * 1.0);
  }

  const scopeNote =
    scopeCount === 1
      ? "single region on break"
      : `${scopeCount} regions/groups on break`;

  return {
    impactScore,
    reason: `${dominantName} overlap — ${scopeNote}, outbound demand ${demandLabel}.`,
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
