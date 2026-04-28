import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  beevagoDestinations,
  findBeevagoCity,
  classifyMonths,
  cityAsDestination,
  MONTHS,
} from "@/lib/beevago";
import { findDestination } from "@/lib/data";
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
  params: Promise<{ country: string; city: string }>;
}): Promise<Metadata> {
  const { country, city } = await params;
  const destination = findBeevagoCity(country, city);
  if (!destination) return {};
  return {
    title: `Best time to visit ${destination.name}, ${destination.countryName}`,
    description: destination.description,
  };
}

export default async function CityDestinationPage({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}) {
  const { country, city } = await params;
  const destination = findBeevagoCity(country, city);
  if (!destination) notFound();

  const curatedCountry = findDestination(country);
  const monthClassification = classifyMonths(destination.visitWindows);
  const cityDestination = cityAsDestination(destination, curatedCountry);

  const cityPosts = postsForCity(destination.slug, 6);
  const cityPostIds = new Set(cityPosts.map((p) => p.id));
  const countryPosts = postsForCountryCode(destination.countryCode, 8).filter(
    (p) => !cityPostIds.has(p.id)
  );

  return (
    <div>
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
              Best time: <span className="font-medium">{destination.bestTime}</span>
              {" · "}
              Typical stay: {destination.minDays}–{destination.maxDays} days
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Monthly overview
              </h2>
              <p className="mt-2 text-muted-foreground">
                Each month classified using local weather, crowds, and prices.
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
                      {m}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Seasons
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
                          Crowds: {w.crowds}
                        </span>
                      )}
                      {w.priceLevel && (
                        <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                          Price: {w.priceLevel}
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
                  Major disruptions
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Country-wide events that reshape any trip to {curatedCountry.name}.
                </p>
                <div className="mt-6 space-y-3">
                  {curatedCountry.majorDisruptions.map((d) => (
                    <div
                      key={d.key}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{d.name}</h3>
                        <SeverityBadge severity={d.severity} />
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
                  What locals know
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Insider context for {curatedCountry.name} that shapes the best time to visit.
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
                  Top experiences
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
              title={`Read more about ${destination.name}`}
              subtitle="Guides and tips from the Beevago blog."
            />

            <BeevagoPosts
              posts={countryPosts}
              title={`More from ${destination.countryName}`}
              subtitle={`Other Beevago guides across ${destination.countryName}.`}
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
                <h3 className="font-semibold">More about {curatedCountry.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {curatedCountry.tagline}
                </p>
                <Link
                  href={`/destinations/${curatedCountry.slug}`}
                  className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  Read the {curatedCountry.name} guide →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
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
      {severity}
    </span>
  );
}
