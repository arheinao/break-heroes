import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BreakHeroes — Travel at the right time";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  // Hero rich-text "title" includes <highlight> tags — extract plain text
  const titleRaw = tHero.raw("title") as string;
  const title = titleRaw.replace(/<\/?[^>]+>/g, "");

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
          background:
            "linear-gradient(135deg, rgb(255, 237, 213) 0%, rgb(254, 215, 170) 60%, rgb(253, 186, 116) 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "rgb(124, 45, 18)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgb(234,88,12), rgb(220,60,0))",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, display: "flex" }}>
            BreakHeroes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            color: "rgb(20, 20, 20)",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.7,
              lineHeight: 1.3,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {tMeta("ogDescription")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "rgb(140, 50, 0)",
            fontSize: 22,
            opacity: 0.6,
          }}
        >
          breakheroes.com
        </div>
      </div>
    ),
    size,
  );
}
