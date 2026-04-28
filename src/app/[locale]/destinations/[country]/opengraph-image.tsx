import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { destinations, localizedDestination } from "@/lib/data";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BreakHeroes — Best time to visit";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    destinations.map((d) => ({ locale, country: d.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  const base = destinations.find((d) => d.slug === country);
  if (!base) return new Response("Not found", { status: 404 });
  const destination = localizedDestination(base, locale);
  const t = await getTranslations({ locale, namespace: "countryPage" });

  const [g0, g1] = destination.gradient;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${g0} 0%, ${g1} 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "rgb(40, 40, 40)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgb(234,88,12), rgb(220,60,0))",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, display: "flex" }}>
            BreakHeroes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            color: "rgb(20, 20, 20)",
          }}
        >
          <div
            style={{
              fontSize: 220,
              lineHeight: 1,
              display: "flex",
            }}
          >
            {destination.flag}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              opacity: 0.65,
              display: "flex",
            }}
          >
            {t("metaTitle", { name: "" }).replace(/[—:|]\s*$/, "").trim()}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {destination.name}
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              lineHeight: 1.3,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {destination.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "rgb(40, 40, 40)",
            fontSize: 22,
            opacity: 0.5,
          }}
        >
          breakheroes.com
        </div>
      </div>
    ),
    {
      ...size,
      emoji: "twemoji",
    },
  );
}
