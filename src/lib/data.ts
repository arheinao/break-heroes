import destinationsRaw from "@/data/destinations.json";
import autoDestinationsRaw from "@/data/auto-destinations.json";
import originMarketsRaw from "@/data/origin-markets.json";
import autoOriginMarketsRaw from "@/data/auto-origin-markets.json";
import type { Destination, OriginMarket } from "@/lib/scoring/types";

const curated = destinationsRaw as unknown as Destination[];
const auto = autoDestinationsRaw as unknown as Destination[];
const curatedSlugs = new Set(curated.map((d) => d.slug));

export const destinations: Destination[] = [
  ...curated,
  ...auto.filter((d) => !curatedSlugs.has(d.slug)),
];

const curatedOrigins = originMarketsRaw as unknown as OriginMarket[];
const autoOrigins = autoOriginMarketsRaw as unknown as OriginMarket[];
const curatedOriginCodes = new Set(curatedOrigins.map((o) => o.code));

export const originMarkets: OriginMarket[] = [
  ...curatedOrigins,
  ...autoOrigins.filter((o) => !curatedOriginCodes.has(o.code)),
];

export function findDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function findOriginMarket(code: string): OriginMarket | undefined {
  return originMarkets.find((o) => o.code === code);
}
