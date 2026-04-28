import data from "@/data/precomputed/school-holidays.json";

export interface SchoolHoliday {
  key: string;
  name: string;
  start: string;
  end: string;
  calendarGroup: string | null;
  region: string | null;
  source: "schoolHolidays" | "regionalSchoolHolidays";
}

interface SchoolHolidayData {
  generatedAt: string;
  markets: Record<
    string,
    {
      schoolHolidayType: string;
      years: Record<string, SchoolHoliday[]>;
    }
  >;
}

const normalized = data as unknown as SchoolHolidayData;

export function getSchoolHolidaysInRange(
  marketCode: string,
  start: string,
  end: string,
): SchoolHoliday[] {
  const market = normalized.markets[marketCode];
  if (!market) return [];

  const startYear = Number(start.slice(0, 4));
  const endYear = Number(end.slice(0, 4));
  const out: SchoolHoliday[] = [];

  for (let y = startYear; y <= endYear; y++) {
    const list = market.years[String(y)] ?? [];
    for (const entry of list) {
      if (entry.end < start) continue;
      if (entry.start > end) continue;
      out.push(entry);
    }
  }
  return out;
}

export function hasMarket(marketCode: string): boolean {
  return Boolean(normalized.markets[marketCode]);
}

export function getMarketType(marketCode: string): string | null {
  return normalized.markets[marketCode]?.schoolHolidayType ?? null;
}
