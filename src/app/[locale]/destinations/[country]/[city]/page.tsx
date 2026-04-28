import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  beevagoDestinations,
  findBeevagoCity,
  classifyMonths,
  cityAsDestination,
  MONTHS,
} from "@/lib/beevago";
import { findDestination, localizedDestination } from "@/lib/data";
import { buildAlternates, JsonLd, SITE_BASE } from "@/lib/seo";
import UpcomingHolidays from "@/components/UpcomingHolidays";
import DestinationRecommender from "../DestinationRecommender";
import BeevagoPosts from "@/components/BeevagoPosts";
import { postsForCity, postsForCountryCode } from "@/lib/beevago-posts";

export async function generateStaticParams() {
  return beevagoDestinations.map((d) => ({
    country: d.countrySlug,
    city: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; city: string }>;
}): Promise<Metadata> {
  const { locale, country, city } = await params;
  const destination = findBeevagoCity(country, city);
  if (!destination) return {};
  const t = await getTranslations({ locale, namespace: "cityPage" });
  return {
    title: t("metaTitle", {
      name: destination.name,
      country: destination.countryName,
    }),
    description: destination.description,
    alternates: buildAlternates(locale, `/destinations/${country}/${city}/`),
  };
}

export default async function CityDestinationPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; city: string }>;
}) {
  const { locale, country, city } = await params;
  setRequestLocale(locale);
  const destination = findBeevagoCity(country, city);
  if (!destination) notFound();

  const t = await getTranslations("cityPage");
  const tMonths = await getTranslations("months");
  const tSeverity = await getTranslations("severity");

  const baseCuratedCountry = findDestination(country);
  const curatedCountry = baseCuratedCountry
    ? localizedDestination(baseCuratedCountry, locale)
    : undefined;
  const monthClassification = classifyMonths(destination.visitWindows);
  const cityDestination = cityAsDestination(destination, curatedCountry);

  const cityPosts = postsForCity(destination.slug, locale, 6);
  const cityPostIds = new Set(cityPosts.map((p) => p.id));
  const countryPosts = postsForCountryCode(
    destination.countryCode,
    locale,
    8,
  ).filter((p) => !cityPostIds.has(p.id));

  const pageUrl = `${SITE_BASE}/${locale}/destinations/${country}/${city}/`;
  const cityImageUrl = destination.image
    ? `${SITE_BASE}${destination.image}`
    : undefined;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "City",
    name: destination.name,
    description: destination.description,
    url: pageUrl,
    ...(cityImageUrl && { image: cityImageUrl }),
    address: {
      "@type": "PostalAddress",
      addressCountry: destination.countryCode,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Destinations",
        item: `${SITE_BASE}/${locale}/destinations/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: destination.countryName,
        item: `${SITE_BASE}/${locale}/destinations/${country}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <div>
      <JsonLd schema={placeSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <section className="relative overflow-hidden bg-muted">
        {destination.image && (
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24 text-white">
          <Link
            href={`/destinations/${country}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
          >
            ← {destination.countryName}
          </Link>
          <div className="mt-6">
            <h1 className="font-display text-balance text-4xl sm:text-6xl font-semibold tracking-tight drop-shadow-md">
              {destination.name}
            </h1>
            <p className="mt-3 text-pretty text-lg text-white/90 max-w-xl">
              {destination.description}
            </p>
            <p className="mt-4 text-sm text-white/70">
              {t("bestTimePrefix")}{" "}
              <span className="font-medium">{destination.bestTime}</span>
              {" · "}
              {t("typicalStay", {
                min: destination.minDays,
                max: destination.maxDays,
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {t("monthlyOverview.title")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t("monthlyOverview.subtitle")}
              </p>
              <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
                {MONTHS.map((m) => {
                  const c = monthClassification[m];
                  return (
                    <div
                      key={m}
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-semibold ${
                        c === "best"
                          ? "bg-success/15 text-[rgb(20_83_45)]"
                          : c === "ok"
                            ? "bg-warning/20 text-[rgb(113_63_18)]"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tMonths(m as never)}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {t("seasons.title")}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {destination.visitWindows.map((w) => (
                  <div
                    key={w.months}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold">{w.months}</h3>
                      {w.temperature && (
                        <span className="text-xs text-muted-foreground">
                          {w.temperature}
                        </span>
                      )}
                    </div>
                    {w.localVibe && (
                      <p className="mt-2 text-sm text-foreground/80">
                        {w.localVibe}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
                      {w.crowds && (
                        <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                          {t("seasons.crowds", { value: w.crowds })}
                        </span>
                      )}
                      {w.priceLevel && (
                        <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                          {t("seasons.price", { value: w.priceLevel })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {curatedCountry && curatedCountry.majorDisruptions.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {t("majorDisruptions.title")}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t("majorDisruptions.subtitle", {
                    country: curatedCountry.name,
                  })}
                </p>
                <div className="mt-6 space-y-3">
                  {curatedCountry.majorDisruptions.map((d) => (
                    <div
                      key={d.key}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{d.name}</h3>
                        <SeverityBadge
                          severity={d.severity}
                          label={tSeverity(d.severity as never)}
                        />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {d.approxDates}
                      </p>
                      <p className="mt-3 text-sm">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {curatedCountry && curatedCountry.highlights.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {t("whatLocalsKnow.title")}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t("whatLocalsKnow.subtitle", { country: curatedCountry.name })}
                </p>
                <ul className="mt-4 space-y-3">
                  {curatedCountry.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.attractions.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {t("topExperiences.title")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {destination.attractions.slice(0, 6).map((a) => (
                    <li
                      key={a.id}
                      className="flex items-start gap-3 text-base"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <div>
                        <span className="font-medium">{a.name}</span>
                        <span className="text-muted-foreground">
                          {" — "}
                          {a.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <BeevagoPosts
              posts={cityPosts}
              title={t("readMore.city", { name: destination.name })}
              subtitle={t("readMore.citySubtitle")}
            />

            <BeevagoPosts
              posts={countryPosts}
              title={t("readMore.country", { country: destination.countryName })}
              subtitle={t("readMore.countrySubtitle", {
                country: destination.countryName,
              })}
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <DestinationRecommender destination={cityDestination} />

            <UpcomingHolidays
              countryCode={destination.countryCode}
              countryName={destination.countryName}
            />

            {curatedCountry && (
              <div className="rounded-2xl border border-border bg-muted/30 p-5">
                <h3 className="font-semibold">
                  {t("moreAbout", { country: curatedCountry.name })}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {curatedCountry.tagline}
                </p>
                <Link
                  href={`/destinations/${curatedCountry.slug}`}
                  className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  {t("readGuide", { country: curatedCountry.name })}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

function SeverityBadge({
  severity,
  label,
}: {
  severity: string;
  label: string;
}) {
  const styles: Record<string, string> = {
    severe: "bg-danger/15 text-[rgb(127_29_29)]",
    high: "bg-danger/10 text-[rgb(127_29_29)]",
    medium: "bg-warning/15 text-[rgb(113_63_18)]",
    low: "bg-muted text-muted-foreground",
    local: "bg-accent/10 text-[rgb(15_118_110)]",
    none: "bg-muted text-muted-foreground",
  };
  const cls = styles[severity] ?? "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center rounded-md ${cls} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`}
    >
      {label}
    </span>
  );
}
