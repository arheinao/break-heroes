import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoSunrise } from "@/components/Logos";

export default function Footer() {
  const t = useTranslations("footer");

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
            {t("tagline")}
          </p>
        </div>

        <FooterGroup
          title={t("product")}
          links={[
            { href: "/destinations", label: t("links.destinations") },
            { href: "/search", label: t("links.findDates") },
            { href: "/about", label: t("links.methodology") },
          ]}
        />

        <FooterGroup
          title={t("resources")}
          links={[
            { href: "/about", label: t("links.howItWorks") },
            { href: "/about#data", label: t("links.ourData") },
            { href: "/about#faq", label: t("links.faq") },
          ]}
        />

        <FooterGroup
          title={t("company")}
          links={[
            { href: "/privacy", label: t("links.privacy") },
            { href: "/terms", label: t("links.terms") },
            {
              href: "mailto:hello@breakheroes.com",
              label: t("links.contact"),
              external: true,
            },
          ]}
        />
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{t("copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("disclaimer")}</span>
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
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) =>
          l.external ? (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
