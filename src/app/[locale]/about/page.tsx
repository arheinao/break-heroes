import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {t("eyebrow")}
      </span>
      <h1 className="mt-3 font-display text-balance text-4xl sm:text-5xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-5 text-pretty text-xl text-muted-foreground leading-relaxed">
        {t("intro")}
      </p>

      <Prose>
        <h2 id="how">{t("how.heading")}</h2>
        <p>{t("how.p1")}</p>

        <h3>{t("how.originPressure.heading")}</h3>
        <p>
          {t.rich("how.originPressure.body", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </p>

        <h3>{t("how.destinationDisruption.heading")}</h3>
        <p>
          {t.rich("how.destinationDisruption.body", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </p>

        <h3>{t("how.seasonality.heading")}</h3>
        <p>{t("how.seasonality.body")}</p>

        <h2 id="data">{t("data.heading")}</h2>
        <p>{t("data.p1")}</p>
        <p>{t("data.p2")}</p>

        <h2 id="limits">{t("limits.heading")}</h2>
        <ul>
          <li>
            <strong>{t("limits.prices.label")}</strong>{" "}
            {t("limits.prices.body")}
          </li>
          <li>
            <strong>{t("limits.bookings.label")}</strong>{" "}
            {t("limits.bookings.body")}
          </li>
          <li>
            <strong>{t("limits.guarantees.label")}</strong>{" "}
            {t("limits.guarantees.body")}
          </li>
        </ul>

        <h2 id="faq">{t("faq.heading")}</h2>
        <h3>{t("faq.q1.q")}</h3>
        <p>{t("faq.q1.a")}</p>

        <h3>{t("faq.q2.q")}</h3>
        <p>{t("faq.q2.a")}</p>

        <h3>{t("faq.q3.q")}</h3>
        <p>{t("faq.q3.a")}</p>
      </Prose>

      <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {t("cta.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("cta.subtitle")}</p>
        <Link
          href="/search"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {t("cta.button")}
        </Link>
      </div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-neutral mt-10 max-w-none [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:font-display [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:mt-8 [&>h3]:mb-2 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-5 [&>ul]:text-muted-foreground [&>ul]:leading-relaxed [&>ul]:mb-5 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>p>strong]:text-foreground [&>ul>li>strong]:text-foreground [&>p>em]:text-foreground">
      {children}
    </div>
  );
}
