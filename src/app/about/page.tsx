import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How BreakHeroes works",
  description:
    "The methodology behind our travel timing recommendations — origin pressure, destination disruption, and seasonality.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        Methodology
      </span>
      <h1 className="mt-3 font-display text-balance text-4xl sm:text-5xl font-semibold tracking-tight">
        How we pick the best time
      </h1>
      <p className="mt-5 text-pretty text-xl text-muted-foreground leading-relaxed">
        Most travel sites optimize for flights. We optimize for whether the
        trip is actually going to be good.
      </p>

      <Prose>
        <h2 id="how">Three signals, one score</h2>
        <p>
          Every candidate date window gets scored on three independent layers.
          We weight them based on your priority (cheapest, least-crowded, best
          weather, or balanced), then combine them into a final score from 0
          to 100.
        </p>

        <h3>1. Origin pressure</h3>
        <p>
          Demand <em>from</em> your home country. When UK school half-term
          lines up with your dates, outbound flights from London spike — even
          if your destination is quiet. We track school calendars and major
          holidays for your origin market to measure this pressure.
        </p>

        <h3>2. Destination disruption</h3>
        <p>
          Local forces at your destination — Golden Week in Japan, Ferragosto
          in Italy, Tết in Vietnam. These change what&rsquo;s open, how crowded
          cities are, and whether the trip actually works. Origin pressure and
          destination disruption are <em>different</em> signals and we model
          them separately.
        </p>

        <h3>3. Seasonality</h3>
        <p>
          Weather, daylight, natural events. Cherry blossoms peak at a
          specific week, typhoon season is real, and shoulder months often
          pair great weather with low demand. We encode each destination&rsquo;s
          best, acceptable, and poor months, plus weather modifiers like
          rainy and typhoon seasons.
        </p>

        <h2 id="data">Where the data comes from</h2>
        <p>
          Public holiday data is computed from government-sourced rule
          sets — fixed dates, Easter calculations, lunar-calendar holidays,
          and weekend-shift rules. School holiday data is curated from
          education ministry publications.
        </p>
        <p>
          All data lives in the repository. Nothing is fetched at runtime.
          This keeps the site fast, cheap, and available even if upstream
          APIs go down.
        </p>

        <h2 id="limits">What we don&rsquo;t do</h2>
        <ul>
          <li>
            <strong>Real-time prices.</strong> We don&rsquo;t scrape flights or
            hotels. Our &ldquo;cheaper&rdquo; signal is based on seasonal and
            holiday-adjacent patterns, not live inventory.
          </li>
          <li>
            <strong>Bookings.</strong> We&rsquo;re a timing layer, not a
            reseller. When you find your window, book through the provider of
            your choice.
          </li>
          <li>
            <strong>Guarantees.</strong> Our recommendations are directional.
            Weather varies, events get rescheduled, and prices can surprise
            anyone.
          </li>
        </ul>

        <h2 id="faq">FAQ</h2>
        <h3>Why monthly windows instead of exact dates?</h3>
        <p>
          Most travelers have a few weeks of flexibility, not a specific
          date. Monthly windows let us give you clear, comparable signals.
          We&rsquo;ll refine to week-level windows as data improves.
        </p>

        <h3>Will you add more origin countries?</h3>
        <p>
          Yes — the MVP ships with UK. We&rsquo;ll expand to other major
          markets based on demand.
        </p>

        <h3>Can I trust this for a big trip?</h3>
        <p>
          Use it as one input. We&rsquo;re giving you signal the big booking
          sites hide — but the final call should factor your constraints,
          flexibility, and appetite for risk.
        </p>
      </Prose>

      <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Ready to find your window?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pick a destination and we&rsquo;ll score every month for you.
        </p>
        <Link
          href="/search"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start searching →
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
