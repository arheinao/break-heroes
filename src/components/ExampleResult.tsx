import Link from "next/link";

export default function ExampleResult() {
  return (
    <section className="bg-muted/40 py-24 border-y border-border">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              See it in action
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
              Example: Japan in spring
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              The same trip can cost 2× or feel like a different country
              depending on the week. Here&rsquo;s what timing intelligence looks
              like for a family traveling from the UK.
            </p>

            <ul className="mt-8 space-y-3">
              <Bullet>Prices drop sharply after Golden Week ends</Bullet>
              <Bullet>Cherry blossoms shift 7–10 days per region</Bullet>
              <Bullet>UK Easter holiday adds outbound demand pressure</Bullet>
            </ul>

            <Link
              href="/destinations/japan"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See full Japan breakdown
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
                    <p className="font-semibold text-sm">Japan</p>
                    <p className="text-xs text-muted-foreground">
                      From United Kingdom · Apr–May 2026
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  3 windows
                </span>
              </div>

              <div className="divide-y divide-border">
                <ResultRow
                  kind="recommend"
                  dates="May 12 – May 20"
                  score={87}
                  reasons={[
                    "Post-Golden Week: ~25% cheaper flights",
                    "Crowds drop sharply in Kyoto & Tokyo",
                    "Mild weather, low rainfall",
                  ]}
                />
                <ResultRow
                  kind="acceptable"
                  dates="Apr 15 – Apr 23"
                  score={62}
                  reasons={[
                    "Late cherry blossom in northern regions",
                    "UK Easter adds outbound pressure",
                    "Weather mostly pleasant",
                  ]}
                />
                <ResultRow
                  kind="avoid"
                  dates="Apr 29 – May 5"
                  score={21}
                  reasons={[
                    "Golden Week: peak domestic travel",
                    "Most museums & shops closed",
                    "Flights 40%+ above seasonal average",
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
  dates,
  score,
  reasons,
}: {
  kind: "recommend" | "acceptable" | "avoid";
  dates: string;
  score: number;
  reasons: string[];
}) {
  const styles = {
    recommend: {
      label: "Best",
      bg: "bg-[rgb(220_252_231)]",
      dot: "bg-success",
      text: "text-[rgb(22_101_52)]",
    },
    acceptable: {
      label: "OK",
      bg: "bg-[rgb(254_249_195)]",
      dot: "bg-warning",
      text: "text-[rgb(113_63_18)]",
    },
    avoid: {
      label: "Avoid",
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
            {styles.label}
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
