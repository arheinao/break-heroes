import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data";
import { beevagoDestinations } from "@/lib/beevago";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const BASE = "https://breakheroes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = `${BASE}/${locale}`;
    entries.push(
      { url: `${prefix}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
      { url: `${prefix}/destinations/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
      { url: `${prefix}/search/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${prefix}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
      { url: `${prefix}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
      { url: `${prefix}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    );

    for (const d of destinations) {
      entries.push({
        url: `${prefix}/destinations/${d.slug}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const c of beevagoDestinations) {
      entries.push({
        url: `${prefix}/destinations/${c.countrySlug}/${c.slug}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
