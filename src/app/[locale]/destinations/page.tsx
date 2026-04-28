import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { destinations, localizedDestination } from "@/lib/data";
import { citiesForCountry } from "@/lib/beevago";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinationsIndex" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/destinations/"),
  };
}

export default async function DestinationsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("destinationsIndex");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {t("eyebrow")}
        </span>
        <h1 className="mt-3 font-display text-balance text-4xl sm:text-5xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((raw) => {
          const d = localizedDestination(raw, locale);
          const heroImage = citiesForCountry(d.slug)[0]?.image;
          return (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-float transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={d.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})`,
                    }}
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
                <span className="absolute left-3 top-3 text-2xl drop-shadow-md">
                  {d.flag}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  {d.name}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {d.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {d.bestMonths.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center rounded-md bg-success/10 text-[rgb(20_83_45)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
