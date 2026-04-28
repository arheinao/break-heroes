import postsRaw from "@/data/beevago-posts.json";

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

export const beevagoPosts = postsRaw as unknown as BeevagoPost[];

export function postsForCity(citySlug: string, limit = 4): BeevagoPost[] {
  return beevagoPosts
    .filter((p) => p.destinations.includes(citySlug))
    .slice(0, limit);
}

export function postsForCountryCode(
  countryCode: string,
  limit = 6
): BeevagoPost[] {
  return beevagoPosts
    .filter((p) => p.countryCodes.includes(countryCode))
    .slice(0, limit);
}
