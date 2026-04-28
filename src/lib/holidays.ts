import precomputed from "@/data/precomputed/public-holidays.json";

export interface PrecomputedHoliday {
  key: string;
  name: string;
  date: string;
  type: string;
  impactHint: "severe" | "high" | "medium" | "low";
}

interface PrecomputedData {
  generatedAt: string;
  years: number[];
  countries: Record<string, Record<string, PrecomputedHoliday[]>>;
}

const data = precomputed as unknown as PrecomputedData;

export function getPublicHolidays(
  countryCode: string,
  year: number,
): PrecomputedHoliday[] {
  return data.countries[countryCode]?.[String(year)] ?? [];
}

export function getHolidaysInRange(
  countryCode: string,
  start: string,
  end: string,
): PrecomputedHoliday[] {
  const startYear = Number(start.slice(0, 4));
  const endYear = Number(end.slice(0, 4));
  const out: PrecomputedHoliday[] = [];
  for (let y = startYear; y <= endYear; y++) {
    const list = getPublicHolidays(countryCode, y);
    for (const h of list) {
      if (h.date >= start && h.date <= end) out.push(h);
    }
  }
  return out;
}

export const supportedYears = data.years;
export const generatedAt = data.generatedAt;
