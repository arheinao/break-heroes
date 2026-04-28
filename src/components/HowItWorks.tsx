import { useTranslations } from "next-intl";
import { Home, Megaphone, CloudSun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS: {
  key: "originPressure" | "destinationDisruption" | "seasonality";
  icon: LucideIcon;
  bg: string;
  iconColor: string;
  exampleKeys: string[];
}[] = [
  {
    key: "originPressure",
    icon: Home,
    bg: "bg-[rgb(254_215_170)]",
    iconColor: "text-[rgb(124_45_18)]",
    exampleKeys: ["uk", "us", "shoulder"],
  },
  {
    key: "destinationDisruption",
    icon: Megaphone,
    bg: "bg-[rgb(204_251_241)]",
    iconColor: "text-[rgb(15_118_110)]",
    exampleKeys: ["goldenWeek", "augustEurope", "lunarNewYear"],
  },
  {
    key: "seasonality",
    icon: CloudSun,
    bg: "bg-[rgb(219_234_254)]",
    iconColor: "text-[rgb(30_64_175)]",
    exampleKeys: ["kyoto", "typhoon", "shoulder"],
  },
];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  return (
    <section className="mx-auto max-w-6xl px-5 pt-6 pb-24 sm:pt-16">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {t("eyebrow")}
        </span>
        <h2 className="mt-3 font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <article
              key={step.key}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-float transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${step.bg} ${step.iconColor}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="text-xs font-mono font-medium text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold tracking-tight">
                {t(`${step.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`${step.key}.description`)}
              </p>

              <ul className="mt-4 space-y-1.5">
                {step.exampleKeys.map((ex) => (
                  <li
                    key={ex}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40 flex-shrink-0" />
                    {t(`${step.key}.examples.${ex}`)}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
