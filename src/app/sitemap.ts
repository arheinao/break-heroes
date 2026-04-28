import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data";

export const dynamic = "force-static";

const BASE = "https://breakheroes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/destinations/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/search/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const destinationEntries: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE}/destinations/${d.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...destinationEntries];
}
