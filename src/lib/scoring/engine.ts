import rules from "@/data/timing-rules.json";
import type {
  Destination,
  OriginMarket,
  Priority,
  TravelWindow,
  WindowScore,
} from "./types";
import { scoreOriginPressure } from "./origin-pressure";
import { scoreDestinationDisruption } from "./destination-disruption";
import { scoreSeasonality } from "./seasonality";

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function generateMonthlyWindows(year: number): TravelWindow[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const lastDay = new Date(year, month, 0).getDate();
    const pad = (n: number) => String(n).padStart(2, "0");
    return {
      start: `${year}-${pad(month)}-01`,
      end: `${year}-${pad(month)}-${lastDay}`,
      label: `${MONTH_SHORT[i]} ${year}`,
    };
  });
}

export function scoreWindow(
  window: TravelWindow,
  destination: Destination,
  origin: OriginMarket | null,
  priority: Priority,
): WindowScore {
  const origin_ = scoreOriginPressure(window, origin);
  const destination_ = scoreDestinationDisruption(window, destination);
  const seasonality_ = scoreSeasonality(window, destination);

  const weights = rules.weights[priority];

  const overall = Math.round(
    origin_.score * weights.originPressure +
      destination_.score * weights.destinationDisruption +
      seasonality_.score * weights.seasonality,
  );

  const recommendation: WindowScore["recommendation"] =
    overall >= rules.thresholds.recommend
      ? "recommend"
      : overall >= rules.thresholds.acceptable
        ? "acceptable"
        : "avoid";

  const explanation = buildExplanation(
    origin_,
    destination_,
    seasonality_,
    recommendation,
  );

  return {
    window,
    originPressure: origin_,
    destinationDisruption: destination_,
    seasonality: seasonality_,
    overall,
    recommendation,
    explanation,
  };
}

function buildExplanation(
  origin: { score: number; reasons: string[] },
  destination: { score: number; reasons: string[] },
  seasonality: { score: number; reasons: string[] },
  recommendation: WindowScore["recommendation"],
): string[] {
  const reasons: string[] = [];
  const all = [...origin.reasons, ...destination.reasons, ...seasonality.reasons];

  if (recommendation === "recommend") {
    const positives = all.filter(
      (r) => !/avoid|peak|crowd|clos/i.test(r),
    );
    if (positives.length) reasons.push(...positives.slice(0, 3));
  } else if (recommendation === "avoid") {
    const negatives = all.filter((r) =>
      /peak|avoid|crowd|clos|spike|expensive|severe/i.test(r),
    );
    reasons.push(...negatives.slice(0, 3));
  } else {
    reasons.push(...all.slice(0, 3));
  }

  return reasons.length ? reasons : all.slice(0, 3);
}

export function scoreWindows(
  windows: TravelWindow[],
  destination: Destination,
  origin: OriginMarket | null,
  priority: Priority,
): WindowScore[] {
  return windows
    .map((w) => scoreWindow(w, destination, origin, priority))
    .sort((a, b) => b.overall - a.overall);
}
