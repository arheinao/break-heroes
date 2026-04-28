import destinationsRaw from "@/data/destinations.json";
import autoDestinationsRaw from "@/data/auto-destinations.json";
import destinationsDeRaw from "@/data/destinations.de.json";
import destinationsEsRaw from "@/data/destinations.es.json";
import originMarketsRaw from "@/data/origin-markets.json";
import autoOriginMarketsRaw from "@/data/auto-origin-markets.json";
import type { Destination, Disruption, OriginMarket } from "@/lib/scoring/types";

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

interface DisruptionTranslation {
  name?: string;
  approxDates?: string;
  note?: string;
}

interface DestinationTranslation {
  tagline?: string;
  weather?: { summary?: string };
  highlights?: string[];
  majorDisruptions?: Record<string, DisruptionTranslation>;
}

const TRANSLATIONS: Record<string, Record<string, DestinationTranslation>> = {
  de: destinationsDeRaw as Record<string, DestinationTranslation>,
  es: destinationsEsRaw as Record<string, DestinationTranslation>,
};

export function findDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function findOriginMarket(code: string): OriginMarket | undefined {
  return originMarkets.find((o) => o.code === code);
}

function localizedCountryName(
  countryCode: string,
  fallback: string,
  locale: string,
): string {
  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(countryCode) ??
      fallback
    );
  } catch {
    return fallback;
  }
}

export function localizedDestination(
  destination: Destination,
  locale: string,
): Destination {
  if (locale === "en") return destination;
  const name = localizedCountryName(
    destination.countryCode,
    destination.name,
    locale,
  );
  const t = TRANSLATIONS[locale]?.[destination.slug];
  if (!t) return { ...destination, name };

  const localizedDisruptions: Disruption[] = destination.majorDisruptions.map(
    (d) => {
      const td = t.majorDisruptions?.[d.key];
      if (!td) return d;
      return {
        ...d,
        name: td.name ?? d.name,
        approxDates: td.approxDates ?? d.approxDates,
        note: td.note ?? d.note,
      };
    },
  );

  return {
    ...destination,
    name,
    tagline: t.tagline ?? destination.tagline,
    highlights: t.highlights ?? destination.highlights,
    weather: {
      ...destination.weather,
      summary: t.weather?.summary ?? destination.weather.summary,
    },
    majorDisruptions: localizedDisruptions,
  };
}
