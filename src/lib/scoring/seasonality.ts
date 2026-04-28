import type { Destination, LayerResult, TravelWindow } from "./types";

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function scoreSeasonality(
  window: TravelWindow,
  destination: Destination,
): LayerResult {
  const windowMonthShorts = monthShortsInWindow(window);

  let score = 50;
  const reasons: string[] = [];

  const bestHits = windowMonthShorts.filter((m) =>
    destination.bestMonths.includes(m),
  );
  const okHits = windowMonthShorts.filter((m) =>
    destination.okMonths.includes(m),
  );
  const poorHits = windowMonthShorts.filter((m) =>
    destination.poorMonths.includes(m),
  );

  if (bestHits.length) {
    score = 90;
    reasons.push(
      `${bestHits.join(", ")} is a best-season window for ${destination.name}.`,
    );
  } else if (okHits.length) {
    score = 65;
    reasons.push(`${okHits.join(", ")} is an acceptable shoulder window.`);
  } else if (poorHits.length) {
    score = 25;
    reasons.push(
      `${poorHits.join(", ")} falls outside ${destination.name}'s ideal season.`,
    );
  }

  if (destination.weather.rainy) {
    const rainyHit = windowMonthShorts.some((m) =>
      destination.weather.rainy!.includes(m),
    );
    if (rainyHit) {
      score = Math.max(score - 10, 15);
      reasons.push("Rainy season overlap — expect showers.");
    }
  }

  if (destination.weather.typhoon) {
    const typhoonHit = windowMonthShorts.some((m) =>
      destination.weather.typhoon!.includes(m),
    );
    if (typhoonHit) {
      score = Math.max(score - 20, 10);
      reasons.push("Typhoon season — travel disruption possible.");
    }
  }

  return { score, reasons };
}

function monthShortsInWindow(window: TravelWindow): string[] {
  const s = new Date(window.start);
  const e = new Date(window.end);
  const out: string[] = [];
  const cur = new Date(s.getFullYear(), s.getMonth(), 1);
  while (cur <= e) {
    out.push(MONTH_SHORT[cur.getMonth()]);
    cur.setMonth(cur.getMonth() + 1);
  }
  return out;
}
