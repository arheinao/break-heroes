import Link from "next/link";
import { LogoSunrise } from "@/components/Logos";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <LogoSunrise />
            <span className="font-display font-semibold tracking-tight">
              BreakHeroes
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Travel timing intelligence. Pick the right window, not just the
            cheapest flight.
          </p>
        </div>

        <FooterGroup
          title="Product"
          links={[
            { href: "/destinations", label: "Destinations" },
            { href: "/search", label: "Find dates" },
            { href: "/about", label: "Methodology" },
          ]}
        />

        <FooterGroup
          title="Resources"
          links={[
            { href: "/about", label: "How it works" },
            { href: "/about#data", label: "Our data" },
            { href: "/about#faq", label: "FAQ" },
          ]}
        />

        <FooterGroup
          title="Company"
          links={[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "mailto:hello@breakheroes.com", label: "Contact" },
          ]}
        />
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} BreakHeroes. All rights reserved.</span>
          <span>Recommendations are directional. Prices and demand vary.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
