import rules from "@/data/timing-rules.json";
import type {
  Destination,
  OriginMarket,
  Priority,
  Reason,
  Translator,
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
  t: Translator,
): WindowScore {
  const origin_ = scoreOriginPressure(window, origin, t);
  const destination_ = scoreDestinationDisruption(window, destination, t);
  const seasonality_ = scoreSeasonality(window, destination, t);

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
    origin_.reasons,
    destination_.reasons,
    seasonality_.reasons,
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
  origin: Reason[],
  destination: Reason[],
  seasonality: Reason[],
  recommendation: WindowScore["recommendation"],
): Reason[] {
  const all = [...origin, ...destination, ...seasonality];

  if (recommendation === "recommend") {
    const positives = all.filter((r) => r.tone !== "negative");
    if (positives.length) return positives.slice(0, 3);
  } else if (recommendation === "avoid") {
    const negatives = all.filter((r) => r.tone === "negative");
    if (negatives.length) return negatives.slice(0, 3);
  }

  return all.slice(0, 3);
}

export function scoreWindows(
  windows: TravelWindow[],
  destination: Destination,
  origin: OriginMarket | null,
  priority: Priority,
  t: Translator,
): WindowScore[] {
  return windows
    .map((w) => scoreWindow(w, destination, origin, priority, t))
    .sort((a, b) => b.overall - a.overall);
}
