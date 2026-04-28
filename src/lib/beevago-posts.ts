import postsEn from "@/data/beevago-posts.en.json";
import postsDe from "@/data/beevago-posts.de.json";
import postsEs from "@/data/beevago-posts.es.json";
import { beevagoDestinations } from "@/lib/beevago";

export interface BeevagoPost {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  image: string | null;
  destinations: string[];
  countryCodes: string[];
}

const POSTS: Record<string, BeevagoPost[]> = {
  en: postsEn as unknown as BeevagoPost[],
  de: postsDe as unknown as BeevagoPost[],
  es: postsEs as unknown as BeevagoPost[],
};

function postsFor(locale: string): BeevagoPost[] {
  return POSTS[locale] ?? POSTS.en;
}

export function postsForCity(
  citySlug: string,
  locale: string,
  limit = 4,
): BeevagoPost[] {
  return postsFor(locale)
    .filter((p) => p.destinations.includes(citySlug))
    .slice(0, limit);
}

export function postsForCountryCode(
  countryCode: string,
  locale: string,
  limit = 6,
): BeevagoPost[] {
  // Beevago tags posts inconsistently — some have country-codes set, others
  // only have city-level `destinations` tags. Union both: a post counts as
  // a match if its country-codes includes this country, OR if any of its
  // destination tags resolves to a city in this country.
  const citySlugs = new Set(
    beevagoDestinations
      .filter((c) => c.countryCode === countryCode)
      .map((c) => c.slug),
  );

  const seen = new Set<number>();
  const matched: BeevagoPost[] = [];

  for (const p of postsFor(locale)) {
    const isMatch =
      p.countryCodes.includes(countryCode) ||
      p.destinations.some((d) => citySlugs.has(d));
    if (isMatch && !seen.has(p.id)) {
      seen.add(p.id);
      matched.push(p);
    }
  }

  return matched.slice(0, limit);
}
