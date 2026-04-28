export type Priority =
  | "balanced"
  | "cheapest"
  | "least-crowded"
  | "best-weather";

export type Severity = "severe" | "high" | "medium" | "low" | "local" | "none";

export type DemandImpact = "severe" | "high" | "medium" | "low" | "none";

export interface TravelWindow {
  start: string;
  end: string;
  label?: string;
}

export interface Reason {
  tone: "positive" | "negative" | "neutral";
  text: string;
}

export interface LayerResult {
  score: number;
  reasons: Reason[];
}

export interface WindowScore {
  window: TravelWindow;
  originPressure: LayerResult;
  destinationDisruption: LayerResult;
  seasonality: LayerResult;
  overall: number;
  recommendation: "recommend" | "acceptable" | "avoid";
  explanation: Reason[];
}

export type Translator = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export interface Destination {
  slug: string;
  name: string;
  flag: string;
  countryCode: string;
  tagline: string;
  gradient: string[];
  bestMonths: string[];
  okMonths: string[];
  poorMonths: string[];
  majorDisruptions: Disruption[];
  weather: {
    summary: string;
    rainy?: string[];
    typhoon?: string[];
  };
  highlights: string[];
  auto?: boolean;
}

export interface Disruption {
  key: string;
  name: string;
  approxDates: string;
  severity: Severity;
  note: string;
}

export interface OriginMarket {
  code: string;
  name: string;
  flag: string;
  schoolBreaks: {
    key: string;
    name: string;
    approxMonth: string;
    demandImpact: DemandImpact;
  }[];
  auto?: boolean;
}
