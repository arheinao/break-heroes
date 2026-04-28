import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { destinations, localizedDestination } from "@/lib/data";
import { buildAlternates, JsonLd, SITE_BASE } from "@/lib/seo";
import DestinationRecommender from "./DestinationRecommender";
import UpcomingHolidays from "@/components/UpcomingHolidays";
import BeevagoPosts from "@/components/BeevagoPosts";
import CountryCities from "@/components/CountryCities";
import { postsForCountryCode } from "@/lib/beevago-posts";
import { citiesForCountry } from "@/lib/beevago";

export async function generateStaticParams() {
  return destinations.map((d) => ({ country: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale, country } = await params;
  const base = destinations.find((d) => d.slug === country);
  if (!base) return {};
  const destination = localizedDestination(base, locale);
  const t = await getTranslations({ locale, namespace: "countryPage" });
  return {
    title: t("metaTitle", { name: destination.name }),
    description: destination.tagline,
    alternates: buildAlternates(locale, `/destinations/${country}/`),
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const baseDestination = destinations.find((d) => d.slug === country);

  if (!baseDestination) notFound();

  const destination = localizedDestination(baseDestination, locale);

  const t = await getTranslations("countryPage");
  const tMonths = await getTranslations("months");
  const tSeverity = await getTranslations("severity");
  const tPosts = await getTranslations("countryPage.readMore");

  const posts = postsForCountryCode(destination.countryCode, locale, 6);
  const cities = citiesForCountry(country);

  const pageUrl = `${SITE_BASE}/${locale}/destinations/${country}/`;
  const heroImage = cities[0]?.image
    ? `${SITE_BASE}${cities[0].image}`
    : undefined;

  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.tagline,
    url: pageUrl,
    ...(heroImage && { image: heroImage }),
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
        name: destination.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <div>
      <JsonLd schema={destinationSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${destination.gradient[0]}, ${destination.gradient[1]})`,
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
          >
            {t("back")}
          </Link>
          <div className="mt-6 flex items-center gap-6">
            <span className="text-7xl sm:text-8xl drop-shadow-md">
              {destination.flag}
            </span>
            <div>
              <h1 className="font-display text-balance text-4xl sm:text-6xl font-semibold tracking-tight">
                {destination.name}
              </h1>
              <p className="mt-3 text-pretty text-lg text-foreground/80 max-w-xl">
                {destination.tagline}
              </p>
            </div>
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
                  const classification = destination.bestMonths.includes(m)
                    ? "best"
                    : destination.okMonths.includes(m)
                      ? "ok"
                      : "poor";
                  return (
                    <div
                      key={m}
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-semibold ${
                        classification === "best"
                          ? "bg-success/15 text-[rgb(20_83_45)]"
                          : classification === "ok"
                            ? "bg-warning/20 text-[rgb(113_63_18)]"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tMonths(m as never)}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <LegendDot
                  color="bg-success"
                  label={t("monthlyOverview.legend.best")}
                />
                <LegendDot
                  color="bg-warning"
                  label={t("monthlyOverview.legend.ok")}
                />
                <LegendDot
                  color="bg-muted-foreground/50"
                  label={t("monthlyOverview.legend.avoid")}
                />
              </div>
            </div>

            <CountryCities countryName={destination.name} cities={cities} />

            {destination.majorDisruptions.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {t("majorDisruptions.title")}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t("majorDisruptions.subtitle")}
                </p>
                <div className="mt-6 space-y-3">
                  {destination.majorDisruptions.map((d) => (
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

            {destination.highlights.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {t("whatLocalsKnow.title")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {destination.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <BeevagoPosts
              posts={posts}
              title={tPosts("title", { name: destination.name })}
              subtitle={tPosts("subtitle")}
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <DestinationRecommender destination={destination} />

            <UpcomingHolidays
              countryCode={destination.countryCode}
              countryName={destination.name}
            />

            {destination.weather.summary && (
              <div className="rounded-2xl border border-border bg-muted/30 p-5">
                <h3 className="font-semibold">{t("weather.title")}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {destination.weather.summary}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function SeverityBadge({
  severity,
  label,
}: {
  severity: string;
  label: string;
}) {
  const styles =
    {
      severe: "bg-danger/15 text-[rgb(127_29_29)]",
      high: "bg-danger/10 text-[rgb(127_29_29)]",
      medium: "bg-warning/15 text-[rgb(113_63_18)]",
      low: "bg-muted text-muted-foreground",
      local: "bg-accent/10 text-[rgb(15_118_110)]",
      none: "bg-muted text-muted-foreground",
    }[severity] ?? "bg-muted text-muted-foreground";

  return (
    <span
      className={`inline-flex items-center rounded-md ${styles} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`}
    >
      {label}
    </span>
  );
}
