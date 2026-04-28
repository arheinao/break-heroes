import Link from "next/link";
import Image from "next/image";
import type { BeevagoDestination } from "@/lib/beevago";

export default function CountryCities({
  countryName,
  cities,
}: {
  countryName: string;
  cities: BeevagoDestination[];
}) {
  if (!cities.length) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        Cities & regions in {countryName}
      </h2>
      <p className="mt-2 text-muted-foreground">
        Drill into a destination for city-specific timing, weather, and crowds.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <li key={c.id}>
            <Link
              href={`/destinations/${c.countrySlug}/${c.slug}`}
              className="group block relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
            >
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-base drop-shadow">{c.name}</h3>
                {c.bestTime && (
                  <p className="mt-0.5 text-xs text-white/80">
                    Best: {c.bestTime}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
