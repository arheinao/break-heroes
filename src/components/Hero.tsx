"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, Wallet, Trees, Sun } from "lucide-react";
import Combobox from "@/components/Combobox";
import { destinations } from "@/lib/data";

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [priority, setPriority] = useState<
    "cheapest" | "least-crowded" | "best-weather" | "balanced"
  >("balanced");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    params.set("priority", priority);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-12 sm:pt-28 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-muted-foreground mb-8 shadow-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            New — timing intelligence, not another booking site
          </div>

          <h1 className="font-display text-balance text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Find the <span className="text-primary">best time</span> to travel
            — not just the cheapest.
          </h1>

          <p className="mt-6 text-pretty text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We analyze public holidays, school breaks, crowds, and seasonality
            to tell you exactly when to go — and when to avoid.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-12 w-full max-w-3xl bg-card rounded-2xl border border-border shadow-float p-2 text-left"
          >
            <div className="grid sm:grid-cols-[1fr_auto] gap-2">
              <Field label="Where to?">
                <Combobox
                  ariaLabel="Destination"
                  placeholder="Pick a destination"
                  value={destination}
                  onChange={setDestination}
                  options={destinations.map((d) => ({
                    value: d.slug,
                    label: d.name,
                    flag: d.flag,
                  }))}
                />
              </Field>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-4 font-semibold hover:brightness-110 transition-all shadow-soft"
              >
                Find my dates
                <ArrowIcon />
              </button>
            </div>

            <div className="mt-3 px-2 pb-1 pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">
                Priority:
              </span>
              {PRIORITIES.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() =>
                      setPriority(
                        p.value as
                          | "cheapest"
                          | "least-crowded"
                          | "best-weather"
                          | "balanced",
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      priority === p.value
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center text-xs text-muted-foreground">
            <Stat value={`${destinations.length}`} label="countries covered" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl px-4 py-3 hover:bg-muted/40 transition-colors">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-semibold text-foreground">{value}</span>
      <span>{label}</span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
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

const PRIORITIES = [
  { value: "balanced", label: "Balanced", icon: Scale },
  { value: "cheapest", label: "Cheapest", icon: Wallet },
  { value: "least-crowded", label: "Less crowded", icon: Trees },
  { value: "best-weather", label: "Best weather", icon: Sun },
];
