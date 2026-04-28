import type {
  Destination,
  LayerResult,
  Reason,
  Translator,
  TravelWindow,
} from "./types";

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function scoreSeasonality(
  window: TravelWindow,
  destination: Destination,
  t: Translator,
): LayerResult {
  const windowMonthShorts = monthShortsInWindow(window);

  let score = 50;
  const reasons: Reason[] = [];

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
    reasons.push({
      tone: "positive",
      text: t("seasonBest", {
        months: bestHits.join(", "),
        name: destination.name,
      }),
    });
  } else if (okHits.length) {
    score = 65;
    reasons.push({
      tone: "neutral",
      text: t("seasonShoulder", { months: okHits.join(", ") }),
    });
  } else if (poorHits.length) {
    score = 25;
    reasons.push({
      tone: "negative",
      text: t("seasonOff", {
        months: poorHits.join(", "),
        name: destination.name,
      }),
    });
  }

  if (destination.weather.rainy) {
    const rainyHit = windowMonthShorts.some((m) =>
      destination.weather.rainy!.includes(m),
    );
    if (rainyHit) {
      score = Math.max(score - 10, 15);
      reasons.push({ tone: "negative", text: t("rainy") });
    }
  }

  if (destination.weather.typhoon) {
    const typhoonHit = windowMonthShorts.some((m) =>
      destination.weather.typhoon!.includes(m),
    );
    if (typhoonHit) {
      score = Math.max(score - 20, 10);
      reasons.push({ tone: "negative", text: t("typhoon") });
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
