"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setState("error");
      return;
    }

    try {
      const { submitSignup } = await import("@/lib/signup");
      await submitSignup({ email, destination: destination || null });
      setState("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
      setState("error");
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-warm p-10 sm:p-14 text-center">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
              Get your best travel windows — monthly
            </h2>
            <p className="mt-4 text-pretty text-lg text-[rgb(120_53_15)]/80 max-w-xl mx-auto">
              One email per month. The cheapest, least crowded, and
              most-underrated travel windows for your destinations.
            </p>

            {state === "success" ? (
              <div className="mt-8 max-w-md mx-auto rounded-xl bg-success/10 border border-success/30 p-4 text-sm text-[rgb(20_83_45)]">
                Thanks — you&rsquo;re on the list. We&rsquo;ll email you when
                new windows are published.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 max-w-md mx-auto space-y-3"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "loading"}
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50"
                />
                <input
                  type="text"
                  placeholder="Destination you care about (optional)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={state === "loading"}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3.5 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {state === "loading" ? "Signing up…" : "Get travel windows"}
                </button>
                {state === "error" && (
                  <p className="text-sm text-danger">{error}</p>
                )}
                <p className="text-xs text-[rgb(120_53_15)]/70">
                  No spam, ever. Unsubscribe any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
