import {
  LogoSunrise,
  LogoCalendar,
  LogoCompass,
  Wordmark,
} from "@/components/Logos";

const ICON_OPTIONS = [
  {
    id: 1,
    name: "Sunrise over horizon",
    note: "The right moment / dawn / good day. Warmest tie to the orange palette.",
    Component: LogoSunrise,
  },
  {
    id: 2,
    name: "Calendar with highlighted day",
    note: "Most literal — 'this is the day.' Reads as productivity / planning.",
    Component: LogoCalendar,
  },
  {
    id: 3,
    name: "Compass + clock face",
    note: "Direction + time. Strongest travel cue, more intricate.",
    Component: LogoCompass,
  },
];

export default function LogosPreview() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 space-y-16">
      <header>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Internal preview
        </span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          Logo options
        </h1>
        <p className="mt-3 text-muted-foreground">
          Each option shown in the header lockup, at medium size, and as a hero
          mark.
        </p>
      </header>

      {ICON_OPTIONS.map(({ id, name, note, Component }) => (
        <section
          key={id}
          className="rounded-2xl border border-border bg-card p-8 sm:p-10"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              {id}. {name}
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              0{id}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{note}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-3 items-center">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Header
              </span>
              <div className="flex items-center gap-2">
                <Component />
                <span className="font-display font-semibold text-lg tracking-tight">
                  BreakHeroes
                </span>
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Medium
              </span>
              <div className="scale-[1.6] origin-left inline-block">
                <Component />
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Hero
              </span>
              <div className="scale-[2.6] origin-left inline-block">
                <Component />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            4. Wordmark only
          </h2>
          <span className="text-xs font-mono text-muted-foreground">04</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Drop the icon, lean into the wordmark. Most confident & editorial.
          Two-tone &ldquo;Break&rdquo; + &ldquo;Heroes&rdquo; with an accent
          period.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 items-center">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Header
            </span>
            <Wordmark size="sm" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Medium
            </span>
            <Wordmark size="md" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Hero
            </span>
            <Wordmark size="lg" />
          </div>
        </div>
      </section>

      <footer className="pt-4 text-sm text-muted-foreground">
        Tell me which one and I&rsquo;ll wire it into the header, footer, and
        OG image.
      </footer>
    </div>
  );
}
