import beevagoRaw from "@/data/beevago-destinations.json";
import type { Destination } from "@/lib/scoring/types";

export interface BeevagoVisitWindow {
  months: string;
  monthsArray: number[];
  temperature?: string;
  conditions?: string;
  rainfall?: string;
  sunnyDays?: number;
  localSeason?: string;
  bestFor?: string[];
  crowds?: string;
  priceLevel?: string;
  localVibe?: string;
}

export interface BeevagoAttraction {
  id: string;
  name: string;
  category: string;
  description: string;
  duration?: string;
  priceRange?: string;
}

export interface BeevagoIataAirport {
  code: string;
  name: string;
  primary?: boolean;
}

export interface BeevagoDestination {
  id: number;
  slug: string;
  name: string;
  countryCode: string;
  countrySlug: string;
  countryName: string;
  continent: string;
  hemisphere: string;
  image: string;
  description: string;
  bestTime: string;
  minDays: number;
  maxDays: number;
  iataCity: string;
  iataAirports: BeevagoIataAirport[];
  visitWindows: BeevagoVisitWindow[];
  attractions: BeevagoAttraction[];
}

export const beevagoDestinations =
  beevagoRaw as unknown as BeevagoDestination[];

export function findBeevagoCity(
  countrySlug: string,
  citySlug: string
): BeevagoDestination | undefined {
  return beevagoDestinations.find(
    (d) => d.countrySlug === countrySlug && d.slug === citySlug
  );
}

export function citiesForCountry(countrySlug: string): BeevagoDestination[] {
  return beevagoDestinations.filter((d) => d.countrySlug === countrySlug);
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const PLEASANT_CONDITIONS = new Set([
  "warm-pleasant",
  "warm-sunny",
  "mild-pleasant",
]);

const HARSH_CONDITIONS = new Set([
  "cool-rainy",
  "cool-damp",
  "freezing",
  "hot-humid",
  "very-hot",
  "monsoon",
]);

export type MonthClassification = "best" | "ok" | "poor";

export function classifyMonths(
  windows: BeevagoVisitWindow[]
): Record<string, MonthClassification> {
  const collected: Record<string, MonthClassification[]> = {};
  for (const w of windows) {
    const cls = classifyWindow(w);
    for (const m of w.monthsArray ?? []) {
      const label = MONTH_LABELS[m - 1];
      if (!label) continue;
      (collected[label] ??= []).push(cls);
    }
  }
  const result: Record<string, MonthClassification> = {};
  for (const label of MONTH_LABELS) {
    const cs = collected[label];
    if (!cs || cs.length === 0) {
      result[label] = "poor";
      continue;
    }
    result[label] = cs.reduce((acc, c) => (rank(c) > rank(acc) ? c : acc));
  }
  return result;
}

function classifyWindow(w: BeevagoVisitWindow): MonthClassification {
  const pleasant = w.conditions ? PLEASANT_CONDITIONS.has(w.conditions) : false;
  const harsh = w.conditions ? HARSH_CONDITIONS.has(w.conditions) : false;
  const peakCrowd = w.crowds === "very-high";
  const peakPrice = w.priceLevel === "very-high";

  if (pleasant && !peakCrowd) return "best";
  if (harsh || (peakCrowd && peakPrice)) return "poor";
  return "ok";
}

function rank(c: MonthClassification): number {
  if (c === "best") return 2;
  if (c === "ok") return 1;
  return 0;
}

export const MONTHS = MONTH_LABELS;

export function bucketMonths(
  classification: Record<string, MonthClassification>
): { best: string[]; ok: string[]; poor: string[] } {
  const best: string[] = [];
  const ok: string[] = [];
  const poor: string[] = [];
  for (const m of MONTH_LABELS) {
    const c = classification[m];
    if (c === "best") best.push(m);
    else if (c === "ok") ok.push(m);
    else poor.push(m);
  }
  return { best, ok, poor };
}

export function cityAsDestination(
  city: BeevagoDestination,
  curatedCountry: Destination | undefined
): Destination {
  const classification = classifyMonths(city.visitWindows);
  const { best, ok, poor } = bucketMonths(classification);

  return {
    slug: `${city.countrySlug}/${city.slug}`,
    name: city.name,
    flag: curatedCountry?.flag ?? "",
    countryCode: city.countryCode,
    tagline: city.description,
    gradient: curatedCountry?.gradient ?? ["#fef3c7", "#fde68a"],
    bestMonths: best,
    okMonths: ok,
    poorMonths: poor,
    majorDisruptions: curatedCountry?.majorDisruptions ?? [],
    weather: curatedCountry?.weather ?? { summary: "" },
    highlights: curatedCountry?.highlights ?? [],
  };
}

