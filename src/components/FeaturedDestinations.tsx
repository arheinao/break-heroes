import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { destinations, localizedDestination } from "@/lib/data";
import { citiesForCountry } from "@/lib/beevago";

export default async function FeaturedDestinations() {
  const locale = await getLocale();
  const t = await getTranslations("featured");
  const featured = destinations
    .slice(0, 6)
    .map((d) => localizedDestination(d, locale));

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="flex items-end justify-between mb-10">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <Link
          href="/destinations"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:brightness-110 transition-all"
        >
          {t("viewAll")}
          <ArrowIcon />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((d) => {
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
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {d.name}
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground shrink-0">
                    {t("goodMonths", { count: d.bestMonths.length })}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {d.tagline}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {d.bestMonths.slice(0, 4).map((m) => (
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

      <div className="mt-10 text-center sm:hidden">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          {t("viewAllMobile")}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
