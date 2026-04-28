import { Home, Megaphone, CloudSun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-6 pb-24 sm:pt-16">
      <SectionHeader
        eyebrow="How it works"
        title="Three signals, one clear answer"
        description="We combine the forces that actually shape your trip — not just flight prices."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
          <article
            key={step.title}
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
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {step.examples.map((ex) => (
                <li
                  key={ex}
                  className="text-xs text-muted-foreground flex items-start gap-2"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40 flex-shrink-0" />
                  {ex}
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

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  iconColor: string;
  examples: string[];
};

const STEPS: Step[] = [
  {
    title: "Origin pressure",
    description:
      "When your home country's school breaks line up with your dates, demand (and prices) surge on outbound flights.",
    icon: Home,
    bg: "bg-[rgb(254_215_170)]",
    iconColor: "text-[rgb(124_45_18)]",
    examples: [
      "UK half-term spikes outbound demand",
      "US Thanksgiving pushes flight prices 30%+",
      "Shoulder windows reveal hidden value",
    ],
  },
  {
    title: "Destination disruption",
    description:
      "Local holidays close attractions, pack cities, or move prices at your destination independent of your origin.",
    icon: Megaphone,
    bg: "bg-[rgb(204_251_241)]",
    iconColor: "text-[rgb(15_118_110)]",
    examples: [
      "Golden Week in Japan",
      "August in Southern Europe",
      "Chinese New Year impact across Asia",
    ],
  },
  {
    title: "Seasonality",
    description:
      "Weather, daylight, and natural events decide whether the dates are actually pleasant — or miserable.",
    icon: CloudSun,
    bg: "bg-[rgb(219_234_254)]",
    iconColor: "text-[rgb(30_64_175)]",
    examples: [
      "Cherry blossom peak in Kyoto",
      "Typhoon season in Southeast Asia",
      "Shoulder months with ideal weather",
    ],
  },
];
