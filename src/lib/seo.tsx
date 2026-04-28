import { routing } from "@/i18n/routing";

export const SITE_BASE = "https://breakheroes.com";

/**
 * Build canonical + hreflang alternates for a given page.
 *
 * @param locale Current page locale (e.g. "en")
 * @param pathWithoutLocale Path with leading + trailing slash, no locale prefix
 *                          e.g. "/destinations/japan/", "/about/", "/"
 */
export function buildAlternates(
  locale: string,
  pathWithoutLocale: string,
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_BASE}/${l}${pathWithoutLocale}`;
  }
  languages["x-default"] = `${SITE_BASE}/${routing.defaultLocale}${pathWithoutLocale}`;
  return {
    canonical: `${SITE_BASE}/${locale}${pathWithoutLocale}`,
    languages,
  };
}

/**
 * Inline JSON-LD schema rendering.
 * Place inside the page's JSX tree.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
