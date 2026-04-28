import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ExampleResult() {
  const t = useTranslations("exampleResult");
  return (
    <section className="bg-muted/40 py-24 border-y border-border">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              <Bullet>{t("bullets.goldenWeekDrop")}</Bullet>
              <Bullet>{t("bullets.blossomShift")}</Bullet>
              <Bullet>{t("bullets.ukEaster")}</Bullet>
            </ul>

            <Link
              href="/destinations/japan"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {t("cta")}
              <ArrowIcon />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-border bg-card shadow-float overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇯🇵</span>
                  <div>
                    <p className="font-semibold text-sm">{t("card.title")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("card.subtitle")}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {t("card.windows", { count: 3 })}
                </span>
              </div>

              <div className="divide-y divide-border">
                <ResultRow
                  kind="recommend"
                  label={t("card.best")}
                  dates={t("card.rows.may.dates")}
                  score={87}
                  reasons={[
                    t("card.rows.may.reasons.cheaperFlights"),
                    t("card.rows.may.reasons.crowdsDrop"),
                    t("card.rows.may.reasons.weather"),
                  ]}
                />
                <ResultRow
                  kind="acceptable"
                  label={t("card.ok")}
                  dates={t("card.rows.apr15.dates")}
                  score={62}
                  reasons={[
                    t("card.rows.apr15.reasons.lateBlossom"),
                    t("card.rows.apr15.reasons.ukEaster"),
                    t("card.rows.apr15.reasons.weather"),
                  ]}
                />
                <ResultRow
                  kind="avoid"
                  label={t("card.avoid")}
                  dates={t("card.rows.apr29.dates")}
                  score={21}
                  reasons={[
                    t("card.rows.apr29.reasons.peak"),
                    t("card.rows.apr29.reasons.closures"),
                    t("card.rows.apr29.reasons.flightsUp"),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
      <span className="text-foreground">{children}</span>
    </li>
  );
}

function ResultRow({
  kind,
  label,
  dates,
  score,
  reasons,
}: {
  kind: "recommend" | "acceptable" | "avoid";
  label: string;
  dates: string;
  score: number;
  reasons: string[];
}) {
  const styles = {
    recommend: {
      bg: "bg-[rgb(220_252_231)]",
      dot: "bg-success",
      text: "text-[rgb(22_101_52)]",
    },
    acceptable: {
      bg: "bg-[rgb(254_249_195)]",
      dot: "bg-warning",
      text: "text-[rgb(113_63_18)]",
    },
    avoid: {
      bg: "bg-[rgb(254_226_226)]",
      dot: "bg-danger",
      text: "text-[rgb(127_29_29)]",
    },
  }[kind];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${styles.bg} ${styles.text} px-2.5 py-1 text-xs font-semibold`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {label}
          </span>
          <span className="font-semibold text-sm">{dates}</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {score}/100
        </span>
      </div>

      <ul className="space-y-1">
        {reasons.map((reason) => (
          <li
            key={reason}
            className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed"
          >
            <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/60 flex-shrink-0" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
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
